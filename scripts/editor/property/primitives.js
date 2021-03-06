// iVisDesigner - scripts/editor/property/primitives.js
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

primitives.Color = function(get, set, args) {
    var r = $("<span />")
        .addClass("plain-color")
        .append($("<span />"))
        .click(function() {
            var $this = $(this);
            var cc = get();
            IV.popups.beginColorSelect($this, cc, function(new_color) {
                if(!new_color) new_color = new IV.Color(0, 0, 0, 0);
                var orig = get();
                console.log(orig, new_color);
                if(!orig || !orig.equals(new_color)) {
                    set(new_color);
                    reload();
                }
            });
        });
    var reload = function() {
        var c = get();
        if(c == null)
            r.children("span").css("background-color", "transparent");
        else
            r.children("span").css("background-color", c.toRGBA());
    };
    reload();
    r.data().reload = reload;
    return r;
};

primitives.String = function(get, set, args) {
    if(!args) {
        var val0;
        var r =  $("<input />")
            .addClass("plain-string")
            .bind("keydown focusout", function(e) {
                if(e.type == "focusout" || e.which == 13) {
                    $(this).removeClass("dirty");
                    if(get() != $(this).val()) {
                        set($(this).val());
                        reload();
                    }
                } else if($(this).val() != val0) {
                    $(this).addClass("dirty");
                }
            });
            // .bind("drop", function(e) {
            //     var xfer = e.originalEvent.dataTransfer;
            //     if(xfer.getData("iv/path")) {
            //         var cursor = $(this).get(0).selectionStart;
            //         var current_text = $(this).val();
            //         var txtToAdd = xfer.getData("iv/path");
            //         $(this).val(current_text.substring(0, cursor) + txtToAdd + current_text.substring(cursor));
            //     }
            // });
        var reload = function() {
            val0 = get();
            r.val(val0);
        };
        reload();
        r.data().reload = reload;
        return r;
    } else if(args instanceof Array) {
        var r = $("<span />")
            .addClass("btn")
            .append($("<span />"))
            .append($('<i class="icon-down-dir" /></i>'))
            .click(function() {
                var $this = $(this);
                IV.popups.beginContextMenu($this, args, function(val) {
                    if(get() != val) {
                        set(val);
                        reload();
                    }
                });
            });
        var reload = function() {
            var val0 = get();
            var text = val0;
            for(var k in args) {
                if(typeof(args[k]) == "object") {
                    if(val0 == args[k].name) text = args[k].display;
                }
            }
            r.children("span").text(text + " ");
        };
        reload();
        r.data().reload = reload;
        return r;
    }
};

primitives.Number = function(get, set, args) {
    var val0;
    var r;
    var inp = $("<input />")
        .addClass("plain-string")
        .bind("keydown focusout", function(e) {
            if(e.type == "focusout" || e.which == 13) {
                $(this).removeClass("dirty");
                val0 = +$(this).val();
                if(get() != val0) {
                    set(val0);
                    reload();
                }
            } else if($(this).val() != val0) {
                $(this).addClass("dirty");
            }
        });
    var btn = $("<span />")
        .addClass("btn")
        .text("↕")
        .bind("mousedown", function(e) {
            var v0 = +val0;
            var vmin = -1e100;
            var vmax = 1e100;
            if(args) {
                if(args.min !== undefined) vmin = args.min;
                if(args.max !== undefined) vmax = args.max;
            }
            var vs = (Math.abs(v0) + 0.01) / 100;
            var mousemove = function(e2) {
                var dy = e.pageY - e2.pageY;
                var v = v0 + dy * vs;
                v = +v.toFixed(3);
                if(v < vmin) v = vmin;
                if(v > vmax) v = vmax;
                set(v);
                reload();
            };
            var mouseup = function(e2) {
                $(window).unbind("mousemove", mousemove);
                $(window).unbind("mouseup", mouseup);
            };
            $(window).bind("mousemove", mousemove);
            $(window).bind("mouseup", mouseup);
        });
    var r = $("<span />").addClass("input-group").append(inp).append(btn);
    var reload = function() {
        val0 = get();
        inp.val(val0);
    };
    reload();
    r.data().reload = reload;
    return r;
};

primitives.Path = function(get, set, args) {
    var r = $("<span />")
        .addClass("btn plain-path")
        .append($('<span />').addClass("text"))
        .click(function() {
            var $this = $(this);
            var popup = IV.popups.PathSelect();
            popup.onSelectPath = function(path, ref) {
                var new_path = new IV.Path(path);
                set(new_path);
                if(r.data().reload)
                    reload();
            };
            popup.onHide = function() {
                $this.removeClass("active");
            };
            popup.show($this, 200, 150);
            $this.addClass("active");
        });
    var reload = function() {
        val0 = get();
        r.children(".text").text(" " + val0.toString());
    };
    reload();
    r.data().reload = reload;
    return r;
};

primitives.Toggle = function(get, set, args) {
    if(!args) args = { };
    if(!args['true']) args['true'] = "true";
    if(!args['false']) args['false'] = "false";
    var r = IV._E("span", "btn");
    var strue = IV._E("span", "", args['true']);
    var sfalse = IV._E("span", "", args['false']);
    r.append(strue).append(sfalse);
    var reload = function() {
        if(get()) {
            strue.show();
            sfalse.hide();
        } else {
            sfalse.show();
            strue.hide();
        }
    };
    r.click(function() {
        set(!get());
        reload();
    });
    reload();
    r.data().reload = reload;
    return r;
};
