// iVisDesigner - scripts/node/allomain.js
// Author: Donghao Ren
//
// LICENSE
//
// Copyright (c) 2014, The Regents of the University of California
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors
//    may be used to endorse or promote products derived from this software without
//    specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
// OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
// OF THE POSSIBILITY OF SUCH DAMAGE.

{{include: transport.js}}
{{include: panorama.js}}

var configuration = require("./alloconfig");


var prefix_string = function(prefix, str) {
    return prefix + str.replace(/[\r\n]/g, "\n").replace(/[\n]/g, "\n" + prefix);
};

var RenderSlaveProcess = function(info) {
    var SharedMemory = require("node_sharedmemory").SharedMemory;
    if(!info.width) info.width = 2000;
    if(!info.height) info.height = 2000;
    var tex = new SharedTexture(info, true);
    tex.surface = new graphics.Surface2D(info.width, info.height, tex.buffer);
    tex.timestamp = null;
    this.texture = tex;
    this.index = info.index;

    var spawn = require('child_process').spawn;
    this.process = spawn("node", [__dirname + "/" + info.script, JSON.stringify(info)]);
    this.process.stdout.on('data', function (data) {
        var prefix = 'renderer(' + info.index + '): stdout > ';
        console.log(prefix_string(prefix, data.toString("utf8").trim()));
    });

    this.process.stderr.on('data', function (data) {
        var prefix = 'renderer(' + info.index + '): stderr > ';
        console.log(prefix_string(prefix, data.toString("utf8").trim()));
    });

    this.process.on('close', function (code, signal) {
      console.log('render(' + info.index + '): terminated with code ' + code + ' signal ' + signal);
    });
};

RenderSlaveProcess.prototype.stop = function() {
    this.process.kill("SIGTERM");
    this.texture.shm.delete();
};

var slave_processes = [
    new RenderSlaveProcess({ script: "renderslave.js", index: 0 }),
    new RenderSlaveProcess({ script: "renderslave.js", index: 1 }),
    new RenderSlaveProcess({ script: "renderslave.js", index: 2 })
];

var connection = new MessageTransportTCP(configuration, false);
var index = 0;
var workspace = null;

var workspace_sync = new WorkspaceSync();
workspace_sync.onUpdate = function() {
    workspace = workspace_sync.workspace;
};

connection.onMessage = function(object) {
    // if(object.type == "workspace.set") {
    //     workspace = IV.serializer.deserialize(object.workspace);
    // }
    if(object.type == "panorama.load") {
        panorama_texture.submitImageFile(object.filename, object.stereo_mode);
        panorama_texture_loaded = true;
    }
    if(object.type == "panorama.preload") {
        panorama_texture.preloadImageFile(object.filename);
    }
    if(object.type == "panorama.unload") {
        panorama_texture.unloadImageFile(object.filename);
    }
    if(object.type == "panorama.video.load") {
        loaded_video = new graphics.VideoSurface2D(object.filename);
        loaded_video.stereo_mode = object.stereo_mode;
    }
    if(object.type == "panorama.video.next") {
        loaded_video.nextFrame();
        panorama_texture_loaded = true;
        panorama_texture.submit(loaded_video, loaded_video.stereo_mode);
    }
    if(object.type == "panorama.video.seek") {
        loaded_video.seek(object.timestamp);
    }
    if(object.type == "eval") {
        try {
            eval(object.script);
        } catch(e) {
            console.trace(e);
        }
    }
    workspace_sync.processMessage(object);
};

var before_render, after_render;

if(configuration.allosphere) {
    var allosphere = require("node_allosphere");
    allosphere.initialize();

    var panorama_renderer = new EquirectangularRenderer(allosphere);
    var panorama_texture = new EquirectangularTexture(allosphere, false);
    var loaded_video = null;
    var panorama_texture_loaded = false;

    var GL = allosphere.OpenGL;

    // This is called before each frame.
    allosphere.onFrame(function() {
        // Upload textures if necessary.
        slave_processes.forEach(function(slave_process) {
            var tex = slave_process.texture;
            tex.shm.readLock();
            if(tex.timestamp != tex.getTimestamp()) {
                tex.surface.uploadTexture();
                tex.timestamp = tex.getTimestamp();
            }
            tex.shm.readUnlock();
        });
    });

    // Draw your stuff with OpenGL.
    allosphere.onDraw(function(info) {
        GL.enable(GL.BLEND);
        // The texture output is in premultiplied alpha!
        GL.blendFunc(GL.ONE, GL.ONE_MINUS_SRC_ALPHA);

        if(panorama_texture_loaded)
            panorama_renderer.render(panorama_texture, info);

        if(before_render) {
            try {
                before_render();
            } catch(e) { }
        }

        slave_processes.forEach(function(slave_process) {
            if(!workspace) return;
            var canvas = workspace.canvases[slave_process.index];
            if(!canvas) return;

            var tex = slave_process.texture;

            allosphere.shaderBegin(allosphere.shaderDefault());

            tex.surface.bindTexture(2);

            allosphere.shaderUniformf("texture", 1.0);
            allosphere.shaderUniformi("texture0", 2);
            allosphere.shaderUniformf("lighting", 0);

            var pose = canvas.pose;
            var ex = pose.up.cross(pose.normal).normalize();
            var ey = pose.normal.cross(ex).normalize();
            ex = ex.scale(pose.width / 2);
            ey = ey.scale(pose.width / 2);
            var p1 = pose.center.sub(ex).add(ey);
            var p2 = pose.center.sub(ex).sub(ey);
            var p3 = pose.center.add(ex).sub(ey);
            var p4 = pose.center.add(ex).add(ey);
            GL.begin(GL.QUADS);
            GL.texCoord2f(0, 0); GL.normal3f(pose.normal.x, pose.normal.y, pose.normal.z); GL.vertex3f(p1.x, p1.y, p1.z);
            GL.texCoord2f(0, 1); GL.normal3f(pose.normal.x, pose.normal.y, pose.normal.z); GL.vertex3f(p2.x, p2.y, p2.z);
            GL.texCoord2f(1, 1); GL.normal3f(pose.normal.x, pose.normal.y, pose.normal.z); GL.vertex3f(p3.x, p3.y, p3.z);
            GL.texCoord2f(1, 0); GL.normal3f(pose.normal.x, pose.normal.y, pose.normal.z); GL.vertex3f(p4.x, p4.y, p4.z);
            GL.end();

            tex.surface.unbindTexture(2);

            allosphere.shaderEnd(allosphere.shaderDefault());
        });

        if(after_render) {
            try {
                after_render();
            } catch(e) { }
        }
        GL.flush();
    });

    // Main event loop.
    var timer = setInterval(function() {
        allosphere.tick();
    }, 10);

}

var should_exit = false;
var safe_exit = function() {
    should_exit = true;
    clearInterval(timer);
    slave_processes.forEach(function(p) {
        p.stop();
    });
    connection.close();
    console.log("SIGTERM");
    process.exit();
};

process.on("SIGHUP", safe_exit);
process.on("SIGINT", safe_exit);
process.on("SIGTERM", safe_exit);
process.on("uncaughtException", function(error) {
    console.log('Caught exception: ');
    console.trace(error);
    safe_exit();
});
