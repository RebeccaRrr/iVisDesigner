// iVisDesigner - scripts/utils/utils.js
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

var IV = (function() {
// The namespace to output.
var NS = { };

// Are we running in a browser?
NS.isBrowser = (typeof(document) != "undefined");
NS.isNodejs = !NS.isBrowser;

// ======== Utility Functions ========

// iVisDesigner - scripts/utils/uuid.js
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
var guid_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
NS.generateUUID = function(prefix) {
    // Current format is like `prefix-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
    var r = 'xxxxxxxxxx'.replace(/x/g, function(c) {
        var r = Math.random() * guid_chars.length | 0;
        return guid_chars[r];
    });
    if(prefix) return prefix + r;
    return r;
};


// iVisDesigner - scripts/utils/formatting.js
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

(function(){
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var num_pad = function(s) {
        var j = s.toString();
        while(j.length < 2) j = '0' + j;
        return j;
    };
    // add th,nd,rd to small integers. example: 23 to 23rd.
    var addth = function(day) {
        if(day % 100 == 11 || day % 100 == 12 || day % 100 == 13) return day + "th";
        if(day % 10 == 1) return day + "st";
        if(day % 10 == 2) return day + "nd";
        if(day % 10 == 3) return day + "rd";
        return day + "th";

    };
    Date.prototype.getFullString = function() {
        return months[this.getMonth()] + " " +
               addth(this.getDate()) + ", " +
               this.getFullYear() + " " +
               num_pad(this.getHours()) + ":" +
               num_pad(this.getMinutes());
    };
    Date.prototype.getDayString = function() {
        return months[this.getMonth()] + " " + addth(this.getDate()) + ", " + this.getFullYear();
    };
    Date.prototype.getTimeString = function() {
        return num_pad(this.getHours()) + ":" + num_pad(this.getMinutes());
    };
    //Array.prototype.end = function() {
    //  if (this.length <= 0) return;
    //  return this[this.length-1];
    //}
})();

NS.parseCSV = function(string) {
    var lines = string.replace("\r", "").split("\n");
    var filtered_lines = [];
    for(var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].trim();
        if(lines[i].length > 0) filtered_lines.push(lines[i]);
    }
    var parse_line = function(l) {
        var r = l.split(",").map(function(x) {
            return x.trim();
        });;
        return r;
    };
    var data = filtered_lines.slice(1).map(parse_line);
    var head = parse_line(filtered_lines[0]);
    return {
        data: data,
        head: head
    };
};

// iVisDesigner - scripts/utils/sha1.js
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
(function() {
// Calculate SHA1 of the bytes array.
// Convert UTF-8 string to bytes array.
function sha1_str2bytes(str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xff);
    }
    return bytes;
}
// Convert UTF-8 bytes array back to string.
function sha1_bytes2str(bytes) {
    var string = "";
    var i = 0;
    var c;
    while(i < bytes.length) {
        c = bytes[i];
        string += String.fromCharCode(c);
        i++;
    }
    return string;
}
// Convert a hex string to bytes array.
function sha1_hex2bytes(hexstr) {
    var bytes = [];
    var trans = function(c) {
        if(c <= 0x39 && c >= 0x30) return c - 0x30;
        if(c <= 0x66 && c >= 0x61) return c - 0x61 + 10;
        if(c <= 0x46 && c >= 0x41) return c - 0x41 + 10;
        return 0;
    }
    for(var i = 0; i < hexstr.length; i += 2) {
        bytes.push(trans(hexstr.charCodeAt(i)) << 4 | trans(hexstr.charCodeAt(i + 1)));
    }
    return bytes;
}
// Convert bytes array to hex string.
function sha1_bytes2hex(bytes) {
    var str = "";
    var hex_digits = "0123456789abcdef";
    for(var i = 0; i < bytes.length; i++) {
        str += hex_digits[bytes[i] >> 4];
        str += hex_digits[bytes[i] % 16];
        //str += "("+bytes[i] + ")";
    }
    return str;
}
function sha1_hash(data) {
    var sha1_add = function(x, y) {
        var lb = (x & 0xFFFF) + (y & 0xFFFF);
        var hb = (x >> 16) + (y >> 16) + (lb >> 16);
        return (hb << 16) | (lb & 0xFFFF);
    };
    var sha1_S = function(n, x) {
        return (x << n) | (x >>> (32 - n));
    };
    var sha1_const_K = function(t) {
        if(t < 20) return 0x5A827999;
        if(t < 40) return 0x6ED9EBA1;
        if(t < 60) return 0x8F1BBCDC;
        return 0xCA62C1D6;
    };
    var sha1_func = function(t, B, C, D) {
        if(t < 20) return (B & C) | ((~B) & D);
        if(t < 40) return B ^ C ^ D;
        if(t < 60) return (B & C) | (B & D) | (C & D);
        return B ^ C ^ D;
    };
    var sha1_append = function(bytes) {
        var len = 8 * bytes.length;
        bytes.push(128);
        var n_append = 56 - bytes.length % 64;
        if(n_append < 0) n_append += 64;
        for(var i = 0; i < n_append; i++) bytes.push(0);
        bytes.push(0); bytes.push(0); bytes.push(0); bytes.push(0);
        bytes.push((len >> 24) & 0xFF);
        bytes.push((len >> 16) & 0xFF);
        bytes.push((len >> 8) & 0xFF);
        bytes.push(len & 0xFF);
        return bytes;
    };
    bytes = sha1_append(data);
    words = [];
    for(var i = 0; i < bytes.length; i += 4) {
        var w = bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3];
        words.push(w);
    }
    H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
    for(var i = 0; i < words.length; i += 16) {
        W = [];
        for(var t = 0; t < 16; t++) W[t] = words[i + t];
        for(var t = 16; t < 80; t++)
            W[t] = sha1_S(1, W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16]);
        A = H[0]; B = H[1]; C = H[2]; D = H[3]; E = H[4];
        for(var t = 0; t < 80; t++) {
            tmp = sha1_add(sha1_S(5, A),
                    sha1_add(sha1_add(sha1_add(sha1_func(t, B, C, D), E), W[t]), sha1_const_K(t)));
            E = D; D = C; C = sha1_S(30, B); B = A; A = tmp;
        }
        H[0] = sha1_add(H[0], A);
        H[1] = sha1_add(H[1], B);
        H[2] = sha1_add(H[2], C);
        H[3] = sha1_add(H[3], D);
        H[4] = sha1_add(H[4], E);
    }
    var rslt = [];
    for(var i = 0; i < 5; i++) {
        rslt.push((H[i] >> 24) & 0xFF);
        rslt.push((H[i] >> 16) & 0xFF);
        rslt.push((H[i] >> 8) & 0xFF);
        rslt.push(H[i] & 0xFF);
    }
    return rslt;
}
NS.sha1str = function(s) {
    return sha1_bytes2hex(sha1_hash(sha1_str2bytes(s)));
};
})();


// iVisDesigner - scripts/utils/functional.js
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

NS.waitUntil = function(condition, on_finished, interval, timeout) {
    if(!timeout) timeout = 1e100;
    var time_started = new Date().getTime();
    var timer = setInterval(function() {
        if(condition()) {
            clearInterval(timer);
            if(on_finished) on_finished(true);
        }
        if(new Date().getTime() - time_started > timeout) {
            clearInterval(timer);
            if(on_finished) on_finished(false);
        }
    }, interval ? interval : 100);
};


NS.tryRetry = function(f, on_finished, max_count) {
    var tried = 0;
    var try_once = function() {
        f(function(error, result) {
            if(error) {
                tried++;
                if(tried == max_count) {
                    on_finished(error);
                } else {
                    try_once();
                }
            } else {
                on_finished(null, result);
            }
        });
    };
    try_once();
};


// iVisDesigner - scripts/utils/packing.js
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

NS.packObjects = function(objects, scheme) {
    var r = [];
    return objects.map(function(obj) {
        return scheme.map(function(def) {
            var val;
            if(typeof(def) == "string") {
                val = obj[def];
            } else {
                val = obj[def.key];
                if(def.encode) val = def.encode(val);
            }
            x.push(val);
        });
    });
};

NS.unpackObjects = function(array, scheme) {
    var r = [];
    return array.map(function(x) {
        var obj = { };
        scheme.forEach(function(def) {
            var val = x[j];
            if(typeof(def) == "string") {
                obj[def] = val;
            } else {
                if(def.decode) val = def.decode(val);
                obj[def.key] = val;
            }
        });
        r.push(obj);
    });
};


// iVisDesigner - scripts/utils/events.js
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

NS_values = { };
NS_events = { };

var value_event_prefix = "__value:";

NS.addValue = function(key, type, initial) {
    if(initial === undefined || initial === null) {
        initial = "";
        if(type == "bool") initial = false;
        if(type == "string") initial = "";
        if(type == "number") initial = 0;
        if(type == "object") initial = { };
    }
    NS_values[key] = {
        type: type,
        value: initial
    };
    NS.addEvent(value_event_prefix + key);
    return NS;
};
NS.add = NS.addValue;

NS.setValue = function(key, value, post_event) {
    NS_values[key].value = value;
    if(post_event === null || post_event === undefined || post_event === true) {
        NS.raiseEvent(value_event_prefix + key, value);
    }
    return NS;
};
NS.set = NS.setValue;

NS.existsValue = function(key) {
    return NS_values[key] != undefined;
};
NS.exists = NS.existsValue;

NS.getValue = function(key) {
    return NS_values[key].value;
};
NS.get = NS.getValue;

NS.addValueListener = function(key, listener, priority) {
    NS.addListener(value_event_prefix + key, listener, priority);
    return NS;
};
NS.listen = NS.addValueListener;

NS.addListener = function(key, listener, priority) {
    if(!priority) priority = 1;
    var ev = NS_events[key];
    if(!ev) {
        NS.addEvent(key);
        ev = NS_events[key];
    }
    ev.listeners.push({ f: listener, p: priority });
    ev.listeners.sort(function(a, b) {
        return b.p - a.p;
    });
    return NS;
};
NS.on = NS.addListener;

NS.addEvent = function(key) {
    NS_events[key] = {
        listeners: [],
        running: false
    };
    return NS;
};

NS.raiseEvent = function(key) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ev = NS_events[key];
    if(!ev) return NS;
    if(ev.running) return NS;
    ev.running = true;
    ev.listeners.some(function(listener) {
        var r;
        try {
            r = listener.f.apply(NS, args);
        } catch(e) {
            console.log(e.stack);
        }
        if(r) return true;
        return false;
    });
    ev.running = false;
    return NS;
};
NS.raise = NS.raiseEvent;

// ### Object event passing system.

var object_event_listeners = {};

NS.bindObjectEvent = function(obj, event_key, listener) {
    if(!obj._euid) obj._euid = NS.generateUUID();
    var ll = object_event_listeners[obj._euid];
    if(!ll) ll = object_event_listeners[obj._euid] = {};
    if(!ll[event_key]) ll[event_key] = [];
    ll[event_key].push(listener);
    return {
        unbind: function() {
            var idx = ll[event_key].indexOf(listener);
            if(idx >= 0) {
                ll[event_key].splice(idx, 1);
            }
            if(ll[event_key].length == 0) delete ll[event_key];
        }
    };
};

NS.bindObjectEvents = function(obj, event_keys, listener) {
    var ls = event_keys.map(function(key) {
        return NS.bindObjectEvent(obj, key, function(val) {
            listener(key, val);
        });
    });
    return {
        unbind: function() {
            ls.forEach(function(l) { l.unbind(); });
        }
    };
};

NS.raiseObjectEvent = function(obj, event_key) {
    if(!obj._euid) return;
    if(!object_event_listeners[obj._euid]) return;
    if(!object_event_listeners[obj._euid][event_key]) return;
    var args = [];
    for(var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    object_event_listeners[obj._euid][event_key].forEach(function(f) {
        f.apply(obj, args);
    });
};

NS.EventSource = function() {
    this._event_source_handlers = { };
    this._event_source_values = { };
};

NS.EventSource.prototype.raise = function(event) {
    var $this = this;
    var args = Array.prototype.slice.call(arguments, 1);
    if(this._event_source_handlers[event]) {
        this._event_source_handlers[event].forEach(function(f) {
            f.apply($this, args);
        });
    }
};

NS.EventSource.prototype.bind = function(event, f) {
    if(this._event_source_handlers[event]) {
        this._event_source_handlers[event].push(f);
    } else {
        this._event_source_handlers[event] = [ f ];
    }
};

NS.EventSource.prototype.unbind = function(event, f) {
    if(this._event_source_handlers[event]) {
        var idx = this._event_source_handlers[event].indexOf(f);
        if(idx >= 0) this._event_source_handlers[event].splice(idx, 1);
    }
};

NS.EventSource.prototype.set = function(key, value) {
    this._event_source_values[key] = value;
    this.raise("_value_" + key, value);
};

NS.EventSource.prototype.get = function(key, value) {
    return this._event_source_values[key];
};

NS.EventSource.prototype.listen = function(key, callback) {
    this.bind("_value_" + key, callback);
};

NS.EventSource.prototype.unlisten = function(key, callback) {
    this.unbind("_value_" + key, callback);
};

NS.makeEventSource = function(obj) {
    for(var key in NS.EventSource.prototype) {
        obj[key] = NS.EventSource.prototype[key];
    }
    NS.EventSource.call(obj);
};

// iVisDesigner - scripts/utils/binds.js
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

NS.bindButton = function(selection, event) {
    selection.click(function() {
        NS.raiseEvent(event);
    });
    return NS;
};

NS.bindToggle = function(selection, key) {
    var state = NS.getValue(key);
    if(state) selection.addClass("active");
    else selection.removeClass("active");
    selection.click(function() {
        state = !state;
        NS.setValue(key, state, true);
    });
    NS.addValueListener(key, function(new_state) {
        state = new_state;
        if(state) selection.addClass("active");
        else selection.removeClass("active");
    });
    return NS;
};

NS.bindOption = function(selection, key, cls) {
    if(!cls) cls = "active";
    selection.removeClass(cls);
    selection.filter(".option-" + NS.getValue(key)).addClass(cls);
    selection.click(function() {
        var cls = $(this).attr("class");
        if(!cls) return;
        var option = cls.match(/option-([0-9a-zA-Z\_\-\.]+)/)[1];
        NS.setValue(key, option, true);
    });
    NS.addValueListener(key, function(state) {
        selection.removeClass(cls);
        selection.filter(".option-" + state).addClass(cls);
    });
    return NS;
};

NS.makeOption = function(selection, value, cls) {
    if(!cls) cls = "active";
    selection.removeClass(cls);
    selection.filter(".option-" + value).addClass(cls);
    var rr = {
        value: value,
        setValue: function(state) {
            selection.removeClass(cls);
            selection.filter(".option-" + state).addClass(cls);
            this.value = state;
        }
    };
    selection.click(function() {
        var option = $(this).attr("class").match(/option-([0-9a-zA-Z\_\-\.]+)/)[1];
        rr.setValue(option);
    });
    return rr;
};

NS.bindText = function(selection, key, connector) {
    if(!connector) connector = { };
    var fin = connector.filter_in ? connector.filter_in : function(x) { return x; };
    var fout = connector.filter_out ? connector.filter_out : function(x) { return x; };
    selection.val(NS.getValue(key));
    var forbid_this = false;
    selection.change(function() {
        forbid_this = true;
        NS.setValue(key, fout($(selection).val()), true);
        forbid_this = false;
    });
    NS.addValueListener(key, function(value) {
        if(forbid_this) return;
        selection.val(fin(value));
    });
    return NS;
};

NS.bindSlider = function(selection, key, continuous, connector) {
    if(!connector) connector = { };
    var fin = connector.filter_in ? connector.filter_in : function(x) { return x; };
    var fout = connector.filter_out ? connector.filter_out : function(x) { return x; };
    selection.each(function() {
        var slider = this;
        slider.sliderEvent = function(val, is_up) {
            if(continuous || is_up) {
                // changed.
                NS.setValue(key, fout(slider.sliderValue));
            }
        };
    });
    var update = function(value) {
        selection.each(function() {
            this.sliderSet(fin(value));
        });
    };
    update(NS.getValue(key));
    NS.addValueListener(key, update);
};

NS.bindElement = function(selection, key, transformer) {
    var rep = transformer ? transformer(NS.getValue(key)) : NS.getValue(key);
    selection.html(rep);
    NS.addValueListener(key, function(value) {
        var rep = transformer ? transformer(value) : value;
        selection.html(rep);
    });
    return NS;
};


// iVisDesigner - scripts/utils/template.js
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

NS.getTemplate = function(template_name) {
    var ht = $("#" + template_name + "-" + NS.currentLanguage).html();
    if(ht) return ht;
    //console.log("Warning: template '" + template_name + "-" + NS.currentLanguage + "' not found.");
    return $("#" + template_name).html();
};
NS.render = function(template_name, object) {
    var template = NS.getTemplate(template_name);
    if(template) {
        template = template.replace(/\{\> *([0-9a-zA-Z\-\_\.]+) *\<\}/g, function(g, a) {
            return '<span i18n="' + a + '">' + NS.str(a) + '</span>';
        });
        return Mustache.render(template, object);
    }
    return "";
};

// iVisDesigner - scripts/utils/i18n.js
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

var langs = { };

NS.language = function(name) {
    if(langs[name] == undefined) {
        langs[name] = {
            // key: string
            add: function(data) {
                for(var key in data) {
                    this[key] = data[key];
                    if(!langs._[key]) {
                        langs._[key] = data[key];
                    }
                }
                return this;
            },
            set: function() {
                NS.switchLanguage(name);
                return this;
            }
        };
    }
    return langs[name];
};

NS.str = function(key) {
    var k = langs[NS.currentLanguage][key];
    if(!k) {
        if(langs["_"][key]) return langs["_"][key];
        return "@.@";
    }
    else return k;
};

NS.switchLanguage = function(name) {
    NS.currentLanguage = name;
    $("*[i18n]").each(function() {
        var key = $(this).attr("i18n");
        $(this).html(NS.str(key));
    });
};

NS.language("_");
NS.language("en");
NS.language("zh");
NS.currentLanguage = "en";


// iVisDesigner - scripts/utils/colors.js
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

NS.Color = function(r, g, b, a) {
    this.r = parseFloat(r);
    this.g = parseFloat(g);
    this.b = parseFloat(b);
    this.a = (a !== undefined) ? parseFloat(a) : 1;
};
NS.parseColorChroma = function(c, a) {
    var rgb = c.rgb();
    return new NS.Color(rgb[0], rgb[1], rgb[2], a);
};
NS.parseColorINT = function(s) {
    var v = s.split(",");
    var r = parseInt(v[0]);
    var g = parseInt(v[1]);
    var b = parseInt(v[2]);
    return new NS.Color(r, g, b);
};
NS.parseColorHEX = function(s) {
    var hex2int = {
        "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
        "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15,
        "A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15
    };
    if(s.length == 6) {
        var r = hex2int[s[0]] * 16 + hex2int[s[1]];
        var g = hex2int[s[2]] * 16 + hex2int[s[3]];
        var b = hex2int[s[4]] * 16 + hex2int[s[5]];
        return new NS.Color(r, g, b);
    } else {
        var r = hex2int[s[0]] * 16 + hex2int[s[0]];
        var g = hex2int[s[1]] * 16 + hex2int[s[1]];
        var b = hex2int[s[2]] * 16 + hex2int[s[2]];
        return new NS.Color(r, g, b);
    }
};
NS.parseColorINTA = function(s) {
    var v = s.split(",");
    var r = parseInt(v[0]);
    var g = parseInt(v[1]);
    var b = parseInt(v[2]);
    var a = parseFloat(v[3]);
    return new NS.Color(r, g, b, a);
};
NS.Color.prototype = {
    toINT : function() {
        return parseInt(this.r) + "," + parseInt(this.g) + "," + parseInt(this.b);
    },
    toINTA : function() {
        return parseInt(this.r) + "," + parseInt(this.g) + "," + parseInt(this.b) + "," + this.a.toFixed(3);
    },
    toRGB : function() {
        return "rgb(" + this.toINT() + ")";
    },
    toRGBA : function(alpha) {
        if(alpha === undefined) alpha = 1;
        return "rgba(" + this.toINT() + "," + (this.a * alpha).toFixed(3) + ")";
    },
    toChroma: function() {
        return chroma.color(this.r, this.g, this.b);
    },
    interp: function(dest, s) {
        return new NS.Color(
            this.r + s * (dest.r - this.r),
            this.g + s * (dest.g - this.g),
            this.b + s * (dest.b - this.b),
            this.a + s * (dest.a - this.a)
        );
    },
    interpLab: function(dest, s) {
        var scale = chroma.scale([ this.toChroma(), dest.toChroma() ]);
        var r = NS.parseColorChroma(scale.mode('lab')(s));
        r.a = this.a + s * (dest.a - this.a);
        return r;
    },
    clone: function(alpha) {
        if(alpha !== undefined)
            return new NS.Color(this.r, this.g, this.b, alpha);
        else
            return new NS.Color(this.r, this.g, this.b, this.a);
    },
    equals: function(c) {
        return this.r == c.r && this.g == c.g && this.b == c.b && this.a == c.a;
    },
    serialize: function() {
        return { de: "Color", r: this.r, g: this.g, b: this.b, a: this.a };
    }
};

// Colors.
//   from http://colorbrewer2.org
var color_qualitative = [
    "166,206,227","31,120,180","178,223,138","51,160,44","251,154,153","227,26,28",
    "253,191,111","255,127,0","202,178,214","106,61,154","255,255,153"
];
color_qualitative.getColor = function(index) {
    return color_qualitative[index % color_qualitative.length];
}
var color_qualitative_warm = [
    "255,247,236","254,232,200","253,212,158","253,187,132",
    "252,141,89","239,101,72","215,48,31","179,0,0","127,0,0"
];
var color_qualitative_gray = [
    "255,255,255","240,240,240","217,217,217","189,189,189",
    "150,150,150","115,115,115","82,82,82","37,37,37","0,0,0"
];
var color_qualitative_cold = [
    "255,247,251","236,231,242","208,209,230","166,189,219",
    "116,169,207","54,144,192","5,112,176","4,90,141","2,56,88"
];
var color_qualitative_nodes = [
// red one.
    "#F8AB8E", "#EA9378", "#DA7C64", "#C86652", "#B45241", "#9F3F32", "#882D24", "#701E18", "#57100E", "#3F0500"
// blue
    // "#CFD0FD", "#B3BAEF", "#98A4DF", "#7D8ECD", "#647AB9", "#4D65A3", "#37528C", "#233F73", "#102D59", "#031D3E"
];
var color_qualitative_hcl = [
    "#7D99C6", "#5CA0C3", "#39A5B9", "#1DA8AA", "#1FAA96", "#39AA81", "#54A96B",
    "#6EA656", "#87A145", "#9E9B39", "#B59436", "#C88B3C", "#D98249", "#E47A5B"];

var gradient_interpolate = function(p, gradient) {
    if(p < 0) return gradient[0];
    if(p >= 1) return gradient[gradient.length - 1];
    var pos = p * (gradient.length - 1);
    var idx = Math.floor(pos);
    var dp = pos - idx;
    var dq = 1 - dp;
    var v1 = idx < gradient.length ? gradient[idx] : gradient[gradient.length - 1];
    var v2 = idx + 1 < gradient.length ? gradient[idx + 1] : gradient[gradient.length - 1];
    return [parseInt(v1[0] * dq + v2[0] * dp),
            parseInt(v1[1] * dq + v2[1] * dp),
            parseInt(v1[2] * dq + v2[2] * dp)];
};
var create_gradient = function(str_array) {
    var obj = str_array.map(function(x) {
        if(x[0] == '#') {
            var hex2z = function(hex) {
                if(hex == '0') return 0;
                if(hex == '1') return 1;
                if(hex == '2') return 2;
                if(hex == '3') return 3;
                if(hex == '4') return 4;
                if(hex == '5') return 5;
                if(hex == '6') return 6;
                if(hex == '7') return 7;
                if(hex == '8') return 8;
                if(hex == '9') return 9;
                if(hex == 'A') return 10;
                if(hex == 'B') return 11;
                if(hex == 'C') return 12;
                if(hex == 'D') return 13;
                if(hex == 'E') return 14;
                if(hex == 'F') return 15;
                if(hex == 'a') return 10;
                if(hex == 'b') return 11;
                if(hex == 'c') return 12;
                if(hex == 'd') return 13;
                if(hex == 'e') return 14;
                if(hex == 'f') return 15;
            };
            return [
                hex2z(x[1]) * 16 + hex2z(x[2]),
                hex2z(x[3]) * 16 + hex2z(x[4]),
                hex2z(x[5]) * 16 + hex2z(x[6])
            ];
        } else {
            var s = x.split(",");
            return [parseInt(s[0]), parseInt(s[1]), parseInt(s[2])];
        }
    });
    obj.getColor = function(p) {
        return gradient_interpolate(p, obj).join(",");
    };
    return obj;
};
NS.colormap = { };
NS.colormap.cold = create_gradient(color_qualitative_cold);
NS.colormap.warm = create_gradient(color_qualitative_warm);
NS.colormap.gray = create_gradient(color_qualitative_gray);
NS.colormap.hcl = create_gradient(color_qualitative_hcl);
NS.colormap.nodes = create_gradient(color_qualitative_nodes);
NS.colormap.qualitative = color_qualitative;

NS.addGradient = function(name, desc) {
    NS.colormap[name] = create_gradient(desc);
};

// iVisDesigner - scripts/utils/math.js
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

Math.log10 = function(v) {
    return Math.log(v) / 2.302585092994046;
};

Math.exp10 = function(v) {
    return Math.pow(10, v);
};

NS.Vector = function(x, y) {
    if(!x) x = 0;
    if(!y) y = 0;
    this.x = x;
    this.y = y;
};
NS.Vector.getVector = function(p) {
    return new NS.Vector(p.x, p.y);
};
NS.Vector.prototype = {
    clone: function() {
        return new NS.Vector(this.x, this.y);
    },
    add: function(v) {
        return new NS.Vector(v.x + this.x, v.y + this.y);
    },
    sub: function(v) {
        return new NS.Vector(this.x - v.x, this.y - v.y);
    },
    dot: function(v) {
        return this.x * v.x + this.y * v.y;
    },
    scale: function(s) {
        return new NS.Vector(this.x * s, this.y * s);
    },
    cross: function(v) {
        return this.x * v.y - this.y * v.x;
    },
    length: function() { return Math.sqrt(this.x * this.x + this.y * this.y); },
    normalize: function() {
        var l = this.length();
        return new NS.Vector(this.x / l, this.y / l);
    },
    distance2: function(p) {
        return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
    },
    distance: function(p) {
        return Math.sqrt(this.distance2(p));
    },
    rotate: function(angle) {
        return new NS.Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle),
                             this.x * Math.sin(angle) + this.y * Math.cos(angle));
    },
    rotate90: function() {
        return new NS.Vector(-this.y, this.x);
    },
    angle: function() {
        var l = this.length();
        if (l == 0) return NaN;
        var a = Math.acos(this.x / l);
        if (this.y < 0) a = -a;
        return a;
    },
    interp: function(v, t) {
        return new NS.Vector(this.x + (v.x - this.x) * t,
                             this.y + (v.y - this.y) * t);
    },
    callMoveTo: function(g) { g.moveTo(this.x, this.y); },
    callLineTo: function(g) { g.lineTo(this.x, this.y); },
    serialize: function() {
        return { de: "Vector", x: this.x, y: this.y };
    }
};

NS.Vector3 = function(x, y, z) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
    this.z = z === undefined ? 0 : z;
};
NS.Vector3.prototype = {
    clone: function() {
        return new NS.Vector3(this.x, this.y, this.z);
    },
    add: function(v) {
        return new NS.Vector3(v.x + this.x, v.y + this.y, v.z + this.z);
    },
    sub: function(v) {
        return new NS.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    },
    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    scale: function(s) {
        return new NS.Vector3(this.x * s, this.y * s, this.z * s);
    },
    cross: function(v) {
        return new NS.Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    },
    length: function() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); },
    normalize: function() {
        var l = this.length();
        return new NS.Vector3(this.x / l, this.y / l, this.z / l);
    },
    distance2: function(p) {
        return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y) + (this.z - p.z) * (this.z - p.z);
    },
    distance: function(p) {
        return Math.sqrt(this.distance2(p));
    },
    interp: function(v, t) {
        return new NS.Vector3(this.x + (v.x - this.x) * t,
                              this.y + (v.y - this.y) * t,
                              this.z + (v.z - this.z) * t);
    },
    serialize: function() {
        return { de: "Vector3", x: this.x, y: this.y, z: this.z };
    }
};

NS.Quaternion = function(v, w) {
    this.v = v !== undefined ? v : new NS.Vector3(0, 0, 0);
    this.w = w === undefined ? 0 : w;
};
NS.Quaternion.prototype.conj = function() {
    return new NS.Quaternion(this.v.scale(-1), this.w);
};
NS.Quaternion.prototype.mul = function(q2) {
    var w = this.w * q2.w - this.v.dot(q2.v);
    var v = q2.v.scale(this.w).add(this.v.scale(q2.w)).add(this.v.cross(q2.v));
    return new NS.Quaternion(v, w);
};
NS.Quaternion.prototype.rotate = function(vector) {
    var vq = new NS.Quaternion(vector, 0);
    return this.mul(vq).mul(this.conj()).v;
};
NS.Quaternion.rotation = function(axis, angle) {
    return new NS.Quaternion(axis.normalize().scale(Math.sin(angle / 2)), Math.cos(angle / 2));
};

NS.geometry = { };

NS.geometry.normalizeAngle = function(angle) {
    // ensure angle in [0, 2pi]
    if(angle >= 0) return angle % (2 * Math.PI);
    return angle % (2 * Math.PI) + 2 * Math.PI;
};

NS.geometry.pointLineSegmentDistance = function(pt, p1, p2) {
    var d = p2.sub(p1);
    var t = pt.sub(p1).dot(d) / d.dot(d);
    if(t < 0)
        return pt.distance(p1);
    if(t > 1)
        return pt.distance(p2);
    var pfoot = p1.interp(p2, t);
    return pt.distance(pfoot);
};

NS.geometry.pointArcDistance = function(pt, center, radius, angle1, angle2) {
    var offset = pt.sub(center);
    var len = offset.length();
    if(len / radius < 1e-6) return radius - len;
    var angle = Math.atan2(offset.y, offset.x);
    if(angle < 0) angle += Math.PI * 2;
    angle1 = NS.geometry.normalizeAngle(angle1);
    angle2 = NS.geometry.normalizeAngle(angle2);
    if( (angle1 < angle && angle < angle2) ||
        ((angle < angle2 || angle1 < angle) && (angle2 < angle1)) ) {
        return Math.abs(radius - len);
    }
    var d1 = new IV.Vector(Math.cos(angle1) * radius, Math.sin(angle1) * radius).distance(pt);
    var d2 = new IV.Vector(Math.cos(angle2) * radius, Math.sin(angle2) * radius).distance(pt);
    return Math.min(d1, d2);
};

NS.geometry.insidePolygon = function(poly, pt) {
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
       if ( ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) )
         (c = !c);
     }
    return c;
};

NS.geometry.lineSegmentIntersection = function(p1, p2, q1, q2) {
    var pd = p1.sub(p2), qd = q1.sub(q2);
    var d = pd.cross(qd);
    if(d == 0) return null; // parallel.
    var r1 = (qd.cross(p2) - q1.cross(q2)) / d;
    var r2 = (p1.cross(p2) - pd.cross(q2)) / d;
    if(r1 >= 0 && r1 <= 1 && r2 >= 0 && r2 <= 1) {
        return p1.sub(pd.scale(r1));
    }
};

NS.geometry.lineIntersection = function(p1, p2, q1, q2) {
    var pd = p1.sub(p2), qd = q1.sub(q2);
    var d = pd.cross(qd);
    if(d == 0) return null; // parallel.
    var r1 = (qd.cross(p2) - q1.cross(q2)) / d;
    var r2 = (p1.cross(p2) - pd.cross(q2)) / d;
    return p2.add(pd.scale(r1));
};

NS.geometry.lineIntersectionPD = function(p1, d1, p2, d2) {
    // ( p1 + t d1 - p2 )  dot d2.rotate90 == 0
    // t = (p2 - p1).dot(d2.rotate90) / d1.dot(d2.rotate90);
    var rd2 = { x: -d2.y, y: d2.x };
    var b = d1.cross(d2);
    var a = p2.sub(p1).cross(d2);
    if(b == 0) return null;
    var t = a / b;
    return p1.add(d1.scale(t));
};

NS.geometry.lineIntersectPolygon = function(poly, p1, p2) {
    if(NS.geometry.insidePolygon(poly, p1)) return true;
    if(NS.geometry.insidePolygon(poly, p2)) return true;
    for(var i = 0; i < poly.length; i++) {
        var j = i + 1;
        if(j >= poly.length) j = 0;
        if(NS.geometry.lineSegmentIntersection(poly[i], poly[j], p1, p2)) return true;
    }
};

NS.geometry.distance = function(x0, y0, x1, y1) {
    return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
};

NS.geometry.distance2 = function(a,b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
};

(function() {
// Convex Hull
// Copyright 2001, softSurfer (www.softsurfer.com)
// This code may be freely used and modified for any purpose
// providing that this copyright notice is included with it.
// SoftSurfer makes no warranty for this code, and cannot be held
// liable for any real or imagined damage resulting from its use.
// Users of this code must verify correctness for their application.
// http://softsurfer.com/Archive/algorithm_0203/algorithm_0203.htm
// Assume that a class is already given for the object:
//    Point with coordinates {float x, y;}
//===================================================================

// isLeft(): tests if a point is Left|On|Right of an infinite line.
//    Input:  three points P0, P1, and P2
//    Return: >0 for P2 left of the line through P0 and P1
//            =0 for P2 on the line
//            <0 for P2 right of the line

function sortPointX(a, b) {
    return a.x - b.x;
}
function sortPointY(a, b) {
    return a.y - b.y;
}

function isLeft(P0, P1, P2) {
    return (P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y);
}
//===================================================================

// chainHull_2D(): A.M. Andrew's monotone chain 2D convex hull algorithm
// http://softsurfer.com/Archive/algorithm_0109/algorithm_0109.htm
//
//     Input:  P[] = an array of 2D points
//                   presorted by increasing x- and y-coordinates
//             n = the number of points in P[]
//     Output: H[] = an array of the convex hull vertices (max is n)
//     Return: the number of points in H[]


function chainHull_2D(P, n, H) {
    // the output array H[] will be used as the stack
    var bot = 0,
    top = (-1); // indices for bottom and top of the stack
    var i; // array scan index
    // Get the indices of points with min x-coord and min|max y-coord
    var minmin = 0,
        minmax;

    var xmin = P[0].x;
    for (i = 1; i < n; i++) {
        if (P[i].x != xmin) {
            break;
        }
    }

    minmax = i - 1;
    if (minmax == n - 1) { // degenerate case: all x-coords == xmin
        H[++top] = P[minmin];
        if (P[minmax].y != P[minmin].y) // a nontrivial segment
            H[++top] = P[minmax];
        H[++top] = P[minmin]; // add polygon endpoint
        return top + 1;
    }

    // Get the indices of points with max x-coord and min|max y-coord
    var maxmin, maxmax = n - 1;
    var xmax = P[n - 1].x;
    for (i = n - 2; i >= 0; i--) {
        if (P[i].x != xmax) {
            break;
        }
    }
    maxmin = i + 1;

    // Compute the lower hull on the stack H
    H[++top] = P[minmin]; // push minmin point onto stack
    i = minmax;
    while (++i <= maxmin) {
        // the lower line joins P[minmin] with P[maxmin]
        if (isLeft(P[minmin], P[maxmin], P[i]) >= 0 && i < maxmin) {
            continue; // ignore P[i] above or on the lower line
        }

        while (top > 0) { // there are at least 2 points on the stack
            // test if P[i] is left of the line at the stack top
            if (isLeft(H[top - 1], H[top], P[i]) > 0) {
                break; // P[i] is a new hull vertex
            }
            else {
                top--; // pop top point off stack
            }
        }

        H[++top] = P[i]; // push P[i] onto stack
    }

    // Next, compute the upper hull on the stack H above the bottom hull
    if (maxmax != maxmin) { // if distinct xmax points
        H[++top] = P[maxmax]; // push maxmax point onto stack
    }

    bot = top; // the bottom point of the upper hull stack
    i = maxmin;
    while (--i >= minmax) {
        // the upper line joins P[maxmax] with P[minmax]
        if (isLeft(P[maxmax], P[minmax], P[i]) >= 0 && i > minmax) {
            continue; // ignore P[i] below or on the upper line
        }

        while (top > bot) { // at least 2 points on the upper stack
            // test if P[i] is left of the line at the stack top
            if (isLeft(H[top - 1], H[top], P[i]) > 0) {
                break;  // P[i] is a new hull vertex
            }
            else {
                top--; // pop top point off stack
            }
        }

        if (P[i].x == H[0].x && P[i].y == H[0].y) {
            return top + 1; // special case (mgomes)
        }

        H[++top] = P[i]; // push P[i] onto stack
    }

    if (minmax != minmin) {
        H[++top] = P[minmin]; // push joining endpoint onto stack
    }

    return top + 1;
}
NS.convexHull = function(points) {
    var H = [];
    var pts = [];
    for(var i = 0; i < points.length; i++) pts.push(points[i]);
    pts.sort(sortPointY);
    pts.sort(sortPointX);
    var n = chainHull_2D(pts, points.length, H);
    H = H.slice(0, n);
    return H;
};
})();

NS.affineTransform = function(matrix) {
    if(!matrix) matrix = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    this.m = matrix;
    /*
     0 1 2
     3 4 5
     6 7 8
    */
};

NS.makeTransform = {
    scale: function(sx, sy) {
        return new NS.affineTransform([
            sx,  0,  0,
             0, sy,  0,
             0,  0,  1
        ]);
    },
    translate: function(tx, ty) {
        return new NS.affineTransform([
            1,  0, tx,
            0,  1, ty,
            0,  0,  1
        ]);
    },
    rotate: function(radian) {
        var c = Math.cos(radian), s = Math.sin(radian);
        return new NS.affineTransform([
            c,  -s,  0,
            s,  c,  0,
            0,  0,  1
        ]);
    }
}

NS.affineTransform.prototype = {
    point: function(p) {
        var m = this.m;
        return [m[0] * p.x + m[1] * p.y + m[2],
                m[3] * p.x + m[4] * p.y + m[5]];
    },
    vector: function(v) {
        var m = this.m;
        return [m[0] * v.x + m[1] * v.y,
                m[3] * v.x + m[4] * v.y];
    },
    point_h: function(p) {
        var m = this.m;
        return [m[0] * p[0] + m[1] * p[1] + m[2] * p[2],
                m[3] * p[0] + m[4] * p[1] + m[5] * p[2],
                m[6] * p[0] + m[7] * p[1] + m[8] * p[2]];
    },
    // A.concat(B).point(p) = A.point(B.point(p)).
    concat: function(tr) {
        var m1 = this.m;
        var m2 = tr.m;
        return new NS.affineTransform([
            m1[0] * m2[0] + m1[1] * m2[3] + m1[2] * m2[6],
            m1[0] * m2[1] + m1[1] * m2[4] + m1[2] * m2[7],
            m1[0] * m2[2] + m1[1] * m2[5] + m1[2] * m2[8],
            m1[3] * m2[0] + m1[4] * m2[3] + m1[5] * m2[6],
            m1[3] * m2[1] + m1[4] * m2[4] + m1[5] * m2[7],
            m1[3] * m2[2] + m1[4] * m2[5] + m1[5] * m2[8],
            m1[6] * m2[0] + m1[7] * m2[3] + m1[8] * m2[6],
            m1[6] * m2[1] + m1[7] * m2[4] + m1[8] * m2[7],
            m1[6] * m2[2] + m1[7] * m2[5] + m1[8] * m2[8]
        ]);
    },
    svd: function() {
        var m = this.m;
        var k = [[m[0], m[1]], [m[3], m[4]]];
        var s = numeric.svd(k);
        var S = Math.sqrt((s.S[0] * s.S[0] + s.S[1] * s.S[1]) / 2);
        var U = s.U;
        var V = s.V;
        // VT
        var tmp = V[0][1];
        V[0][1] = V[1][0];
        V[1][0] = tmp;
        return new NS.affineTransform([
            S * U[0][0] * V[0][0] + S * U[0][1] * V[1][0],
            S * U[0][0] * V[0][1] + S * U[0][1] * V[1][1], m[2],
            S * U[1][0] * V[0][0] + S * U[1][1] * V[1][0],
            S * U[1][0] * V[0][1] + S * U[1][1] * V[1][1], m[5],
            0, 0, 1
        ]);
    },
    det: function() {
        var m = this.m;
        return m[0] * m[4] - m[1] * m[3];
    }
};

// width, height may be negative.
NS.Rectangle = function(x0, y0, width, height, angle) {
    if(!angle) angle = 0;
    this.x0 = x0; this.y0 = y0;
    this.width = width;
    this.height = height;
    this.angle = angle;
};

NS.Rectangle.prototype = {
    clone: function() {
        return new NS.Rectangle(this.x0, this.y0, this.width, this.height, this.angle);
    },
    map: function(x, y) {
        var dx = x - this.x0;
        var dy = y - this.y0;
        var p = new NS.Vector(dx, dy).rotate(-this.angle);
        return p;
    },
    inside: function(x, y) {
        var p = this.map(x, y);
        return Math.abs(p.x) < Math.abs(this.width / 2) &&
               Math.abs(p.y) < Math.abs(this.height / 2);
    },
    // 1 -- 2
    // | -> |
    // 4 -- 3
    corner1: function() {
        var p = new NS.Vector(-this.width / 2, -this.height / 2).rotate(this.angle);
        return {
            x: this.x0 + p.x,
            y: this.y0 + p.y
        };
    },
    corner2: function() {
        var p = new NS.Vector(this.width / 2, -this.height / 2).rotate(this.angle);
        return {
            x: this.x0 + p.x,
            y: this.y0 + p.y
        };
    },
    corner3: function() {
        var p = new NS.Vector(this.width / 2, this.height / 2).rotate(this.angle);
        return {
            x: this.x0 + p.x,
            y: this.y0 + p.y
        };
    },
    corner4: function() {
        var p = new NS.Vector(-this.width / 2, this.height / 2).rotate(this.angle);
        return {
            x: this.x0 + p.x,
            y: this.y0 + p.y
        };
    },
    getCorners: function() {
        return [ this.corner1(), this.corner2(), this.corner3(), this.corner4() ];
    },
    distance: function(pt) { // TODO: Doesn't handle angle yet.
        var sx = Math.abs(pt.x - this.x0) - this.width / 2;
        var sy = Math.abs(pt.y - this.y0) - this.height / 2;
        return Math.min(Math.abs(sx), Math.abs(sy));
    },
    serialize: function() {
        return { de: "Rectangle",
                 x0: this.x0, y0: this.y0,
                 width: this.width, height: this.height,
                 angle: this.angle };
    }
};

NS.catmullRomCurveTo = function(ctx, x0, y0, x1, y1, x2, y2, x3, y3) {
    // Convert to bezier.
    ctx.bezierCurveTo(x2 / 6 + x1 - x0 / 6, y2 / 6 + y1 - y0 / 6,
                      x1 / 6 + x2 - x3 / 6, y1 / 6 + y2 - y3 / 6,
                      x2, y2);
};


// iVisDesigner - scripts/utils/expression.js
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

NS.expression = { };

NS.expression.Context = function() {
};

NS.expression.Context.prototype = {
    "+": function(a, b) {
        if(typeof(a) == "number" && typeof(b) == "number") return a + b;
        if(typeof(a) == "string" && typeof(b) == "string") return a + b;
        throw "Invalid operands for operator '+'.";
    },
    "-": function(a, b) {
        if(typeof(a) == "number" && typeof(b) == "number") return a - b;
        throw "Invalid operands for operator '-'.";
    },
    "unary:-": function(a) {
        if(typeof(a) == "number") return -a;
        throw "Invalid operands for operator '-'.";
    },
    "*": function(a, b) {
        if(typeof(a) == "number" && typeof(b) == "number") return a * b;
        throw "Invalid operands for operator '*'.";
    },
    "/": function(a, b) {
        if(typeof(a) == "number" && typeof(b) == "number") return a / b;
        console.log(a, b);
        throw "Invalid operands for operator '/'.";
    },
    "^": function(a, b) {
        if(typeof(a) == "number" && typeof(b) == "number") return Math.pow(a, b);
        throw "Invalid operands for operator '^'.";
    },
    "e": Math.e,
    "pi": Math.PI,
    "year": function(timestamp) { return new Date(timestamp * 1000).getYear(); },
    "month": function(timestamp) { return new Date(timestamp * 1000).getMonth(); },
    "day": function(timestamp) { return new Date(timestamp * 1000).getDay(); },
    "hour": function(timestamp) { return new Date(timestamp * 1000).getHours(); },
    "minutes": function(timestamp) { return new Date(timestamp * 1000).getMinutes(); },
    "seconds": function(timestamp) { return new Date(timestamp * 1000).getSeconds(); },
    "rgba": function(r, g, b, a) { return new IV.Color(r, g, b, a); },
    "rgb": function(r, g, b) { return new IV.Color(r, g, b); },
    "hcl": function(h, c, l) { return NS.parseColorChroma(chroma.lch(l, c, h)); },
    "hcla": function(h, c, l, a) { return NS.parseColorChroma(chroma.lch(l, c, h), a); }
};

(function() {
    var keys = "abs,acos,asin,atan,atan2,ceil,cos,exp,floor,log,max,min,pow,random,round,sin,sqrt,tan";
    keys.split(",").forEach(function(key) {
        NS.expression.Context.prototype[key] = Math[key];
    });
})();

/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.IV_expression_parser = factory();
  }
})(this, function() {
  "use strict";

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
          },

          "class": function(expectation) {
            var escapedParts = "",
                i;

            for (i = 0; i < expectation.parts.length; i++) {
              escapedParts += expectation.parts[i] instanceof Array
                ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                : classEscape(expectation.parts[i]);
            }

            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
          },

          any: function(expectation) {
            return "any character";
          },

          end: function(expectation) {
            return "end of input";
          },

          other: function(expectation) {
            return expectation.description;
          }
        };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/"/g,  '\\"')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/\]/g, '\\]')
        .replace(/\^/g, '\\^')
        .replace(/-/g,  '\\-')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i, j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};

    var peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(expr) { return expr; },
        peg$c1 = /^[+\-]/,
        peg$c2 = peg$classExpectation(["+", "-"], false, false),
        peg$c3 = function(left, others) { return gen_operator(left, others); },
        peg$c4 = /^[*\/]/,
        peg$c5 = peg$classExpectation(["*", "/"], false, false),
        peg$c6 = /^[\^]/,
        peg$c7 = peg$classExpectation(["^"], false, false),
        peg$c8 = /^[\-]/,
        peg$c9 = peg$classExpectation(["-"], false, false),
        peg$c10 = function(op, expr) {
                var k = "unary:" + op;
                return function(ctx) { return ctx[k](expr(ctx)); }
            },
        peg$c11 = "(",
        peg$c12 = peg$literalExpectation("(", false),
        peg$c13 = ")",
        peg$c14 = peg$literalExpectation(")", false),
        peg$c15 = function(name) { return function(ctx) { return ctx[name] }; },
        peg$c16 = function(name, expr) { return function(ctx) { return ctx[name](expr(ctx)); }; },
        peg$c17 = ",",
        peg$c18 = peg$literalExpectation(",", false),
        peg$c19 = function(name, expr1, expr2) { return function(ctx) { return ctx[name](expr1(ctx), expr2(ctx)); }; },
        peg$c20 = function(name, expr1, expr2, expr3) { return function(ctx) { return ctx[name](expr1(ctx), expr2(ctx), expr3(ctx)); }; },
        peg$c21 = function(name, expr1, expr2, expr3, expr4) { return function(ctx) { return ctx[name](expr1(ctx), expr2(ctx), expr3(ctx), expr4(ctx)); }; },
        peg$c22 = /^[0-9]/,
        peg$c23 = peg$classExpectation([["0", "9"]], false, false),
        peg$c24 = ".",
        peg$c25 = peg$literalExpectation(".", false),
        peg$c26 = /^[eE]/,
        peg$c27 = peg$classExpectation(["e", "E"], false, false),
        peg$c28 = function(str) { return function() { return parseFloat(flatten(str)); }; },
        peg$c29 = "\"",
        peg$c30 = peg$literalExpectation("\"", false),
        peg$c31 = /^[^"]/,
        peg$c32 = peg$classExpectation(["\""], true, false),
        peg$c33 = function(repr) { var str = JSON.parse(flatten(repr)); return function(ctx) { return str; } },
        peg$c34 = /^[:$]/,
        peg$c35 = peg$classExpectation([":", "$"], false, false),
        peg$c36 = /^[a-zA-Z_$[\]{}@]/,
        peg$c37 = peg$classExpectation([["a", "z"], ["A", "Z"], "_", "$", "[", "]", "{", "}", "@"], false, false),
        peg$c38 = /^[a-zA-Z0-9_$[\]{}@]/,
        peg$c39 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_", "$", "[", "]", "{", "}", "@"], false, false),
        peg$c40 = ":",
        peg$c41 = peg$literalExpectation(":", false),
        peg$c42 = function(str) {
                var s = flatten(str);
                return function(ctx) { return ctx.get(s); };
            },
        peg$c43 = /^[a-zA-Z_]/,
        peg$c44 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false),
        peg$c45 = /^[a-zA-Z0-9_]/,
        peg$c46 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false),
        peg$c47 = function(name) { return flatten(name); },
        peg$c48 = /^[ \n]/,
        peg$c49 = peg$classExpectation([" ", "\n"], false, false),

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1 }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildStructuredError(
        [peg$otherExpectation(description)],
        input.substring(peg$savedPos, peg$currPos),
        location
      );
    }

    function error(message, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildSimpleError(message, location);
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$anyExpectation() {
      return { type: "any" };
    }

    function peg$endExpectation() {
      return { type: "end" };
    }

    function peg$otherExpectation(description) {
      return { type: "other", description: description };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos], p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(
        peg$SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parseexpression();

      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsesp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parselevel1();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesp();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselevel1() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parselevel2();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsesp();
        if (s4 !== peg$FAILED) {
          if (peg$c1.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c2); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsesp();
            if (s6 !== peg$FAILED) {
              s7 = peg$parselevel2();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsesp();
          if (s4 !== peg$FAILED) {
            if (peg$c1.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c2); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsesp();
              if (s6 !== peg$FAILED) {
                s7 = peg$parselevel2();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c3(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselevel2() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parselevel3();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsesp();
        if (s4 !== peg$FAILED) {
          if (peg$c4.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsesp();
            if (s6 !== peg$FAILED) {
              s7 = peg$parselevel3();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsesp();
          if (s4 !== peg$FAILED) {
            if (peg$c4.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c5); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsesp();
              if (s6 !== peg$FAILED) {
                s7 = peg$parselevel3();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c3(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselevel3() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parselevel4();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsesp();
        if (s4 !== peg$FAILED) {
          if (peg$c6.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsesp();
            if (s6 !== peg$FAILED) {
              s7 = peg$parselevel4();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsesp();
          if (s4 !== peg$FAILED) {
            if (peg$c6.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c7); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsesp();
              if (s6 !== peg$FAILED) {
                s7 = peg$parselevel4();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c3(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselevel4() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (peg$c8.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseitem();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseitem();
      }

      return s0;
    }

    function peg$parseitem() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$parseprimitive();
      if (s0 === peg$FAILED) {
        s0 = peg$parsefunction_call();
        if (s0 === peg$FAILED) {
          s0 = peg$parsevariable();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselector();
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 40) {
                s1 = peg$c11;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c12); }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parsesp();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parselevel1();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parsesp();
                    if (s4 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s5 = peg$c13;
                        peg$currPos++;
                      } else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c14); }
                      }
                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c0(s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsevariable() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c15(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsefunction_call() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16;

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesp();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c11;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesp();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsesp();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c13;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c14); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c16(s1, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsename();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsesp();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s3 = peg$c11;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsesp();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseexpression();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsesp();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s7 = peg$c17;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c18); }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseexpression();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c13;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c14); }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c19(s1, s5, s8);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsename();
          if (s1 !== peg$FAILED) {
            s2 = peg$parsesp();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s3 = peg$c11;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c12); }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parsesp();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseexpression();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsesp();
                    if (s6 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 44) {
                        s7 = peg$c17;
                        peg$currPos++;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c18); }
                      }
                      if (s7 !== peg$FAILED) {
                        s8 = peg$parseexpression();
                        if (s8 !== peg$FAILED) {
                          s9 = peg$parsesp();
                          if (s9 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 44) {
                              s10 = peg$c17;
                              peg$currPos++;
                            } else {
                              s10 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c18); }
                            }
                            if (s10 !== peg$FAILED) {
                              s11 = peg$parseexpression();
                              if (s11 !== peg$FAILED) {
                                s12 = peg$parsesp();
                                if (s12 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 41) {
                                    s13 = peg$c13;
                                    peg$currPos++;
                                  } else {
                                    s13 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c14); }
                                  }
                                  if (s13 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c20(s1, s5, s8, s11);
                                    s0 = s1;
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsename();
            if (s1 !== peg$FAILED) {
              s2 = peg$parsesp();
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                  s3 = peg$c11;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c12); }
                }
                if (s3 !== peg$FAILED) {
                  s4 = peg$parsesp();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseexpression();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsesp();
                      if (s6 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                          s7 = peg$c17;
                          peg$currPos++;
                        } else {
                          s7 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c18); }
                        }
                        if (s7 !== peg$FAILED) {
                          s8 = peg$parseexpression();
                          if (s8 !== peg$FAILED) {
                            s9 = peg$parsesp();
                            if (s9 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 44) {
                                s10 = peg$c17;
                                peg$currPos++;
                              } else {
                                s10 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c18); }
                              }
                              if (s10 !== peg$FAILED) {
                                s11 = peg$parseexpression();
                                if (s11 !== peg$FAILED) {
                                  s12 = peg$parsesp();
                                  if (s12 !== peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 44) {
                                      s13 = peg$c17;
                                      peg$currPos++;
                                    } else {
                                      s13 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c18); }
                                    }
                                    if (s13 !== peg$FAILED) {
                                      s14 = peg$parseexpression();
                                      if (s14 !== peg$FAILED) {
                                        s15 = peg$parsesp();
                                        if (s15 !== peg$FAILED) {
                                          if (input.charCodeAt(peg$currPos) === 41) {
                                            s16 = peg$c13;
                                            peg$currPos++;
                                          } else {
                                            s16 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c14); }
                                          }
                                          if (s16 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c21(s1, s5, s8, s11, s14);
                                            s0 = s1;
                                          } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                          }
                                        } else {
                                          peg$currPos = s0;
                                          s0 = peg$FAILED;
                                        }
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
      }

      return s0;
    }

    function peg$parseprimitive() {
      var s0;

      s0 = peg$parsefloating_point();
      if (s0 === peg$FAILED) {
        s0 = peg$parsestring();
      }

      return s0;
    }

    function peg$parsefloating_point() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c1.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c22.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
          }
        } else {
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s5 = peg$c24;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c25); }
          }
          if (s5 !== peg$FAILED) {
            s6 = [];
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
            if (s7 !== peg$FAILED) {
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                if (peg$c22.test(input.charAt(peg$currPos))) {
                  s7 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c23); }
                }
              }
            } else {
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$currPos;
            if (peg$c26.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
            if (s6 !== peg$FAILED) {
              if (peg$c1.test(input.charAt(peg$currPos))) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c2); }
              }
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              if (s7 !== peg$FAILED) {
                s8 = [];
                if (peg$c22.test(input.charAt(peg$currPos))) {
                  s9 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s9 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c23); }
                }
                if (s9 !== peg$FAILED) {
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    if (peg$c22.test(input.charAt(peg$currPos))) {
                      s9 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c23); }
                    }
                  }
                } else {
                  s8 = peg$FAILED;
                }
                if (s8 !== peg$FAILED) {
                  s6 = [s6, s7, s8];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s2 = [s2, s3, s4, s5];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c28(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c29;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c31.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c32); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c31.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c32); }
          }
        }
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s4 = peg$c29;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c30); }
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c33(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c34.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (peg$c36.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c37); }
        }
        if (s4 !== peg$FAILED) {
          s5 = [];
          if (peg$c38.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c39); }
          }
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            if (peg$c38.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c39); }
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 58) {
            s6 = peg$c40;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$currPos;
            if (peg$c36.test(input.charAt(peg$currPos))) {
              s8 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c37); }
            }
            if (s8 !== peg$FAILED) {
              s9 = [];
              if (peg$c38.test(input.charAt(peg$currPos))) {
                s10 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s10 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c39); }
              }
              while (s10 !== peg$FAILED) {
                s9.push(s10);
                if (peg$c38.test(input.charAt(peg$currPos))) {
                  s10 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s10 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c39); }
                }
              }
              if (s9 !== peg$FAILED) {
                s8 = [s8, s9];
                s7 = s8;
              } else {
                peg$currPos = s7;
                s7 = peg$FAILED;
              }
            } else {
              peg$currPos = s7;
              s7 = peg$FAILED;
            }
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 58) {
              s6 = peg$c40;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c41); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$currPos;
              if (peg$c36.test(input.charAt(peg$currPos))) {
                s8 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s8 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c37); }
              }
              if (s8 !== peg$FAILED) {
                s9 = [];
                if (peg$c38.test(input.charAt(peg$currPos))) {
                  s10 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s10 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c39); }
                }
                while (s10 !== peg$FAILED) {
                  s9.push(s10);
                  if (peg$c38.test(input.charAt(peg$currPos))) {
                    s10 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s10 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c39); }
                  }
                }
                if (s9 !== peg$FAILED) {
                  s8 = [s8, s9];
                  s7 = s8;
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
              } else {
                peg$currPos = s7;
                s7 = peg$FAILED;
              }
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsename() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c43.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c46); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c47(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsesp() {
      var s0, s1;

      s0 = [];
      if (peg$c48.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c48.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
      }

      return s0;
    }


        function flatten(vars) {
            if(vars instanceof Array) {
                var r = "";
                for(var i = 0; i < vars.length; i++)
                    r += flatten(vars[i]);
                return r;
            } else return vars || "";
        }
        function gen_operator(left, others) {
            var r = left;
            for(var i = 0; i < others.length; i++) {
                var op = others[i][1][0];
                var rh = others[i][3];
                r = (function(r, op, rh) {
                    return function(ctx) { return ctx[op](r(ctx), rh(ctx)); };
                })(r, op, rh);
            }
            return r;
        }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
});


NS.expression.parse = function(expr) {
    return IV_expression_parser.parse(expr);
};

NS.expression.eval = function(expr, context) {
    var ctx = new NS.expression.Context();
    for(var f in context) ctx[f] = context[f];
    var p = NS.expression.parse(expr);
    return p(ctx);
};

NS.expression.test = function() {
    var cases = {
        "1+2+3": 6,
        " 1 + 2 + 3 ": 6,
        '"asdf"': "asdf",
        "-sin(34) + cos(12) * tan(1 + cos(2) )": 0.028442790259514683,
        "1 + 3 / -8 ": 0.625,
        "2*3*4*5+99": 219,
        "4 * (9 - 4) / (2 * 6 - 2) + 8": 10,
        "1 + ((123 * 3 - 69) / 100)": 4,
        "2.45/8.5*9.27": 2.6719411764705883,
        "2.45/8.5*9.27+(5*0.0023)": 2.683441176470588
    };
    for(var expr in cases) {
        var evald;
        try {
            evald = NS.expression.eval(expr);
        } catch(e) {
            console.log("RuntimeError: ", expr);
            console.trace(e);
            continue;
        }
        if(evald != cases[expr]) {
            console.log("Error: ", expr, evald, cases[expr]);
        } else {
            console.log("Pass: ", expr, evald, cases[expr]);
        }
    }
};


// iVisDesigner - scripts/utils/misc.js
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

NS.getQuery = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
             .exec(location.search)||[,""])[1]
             .replace(/\+/g, '%20'))||null;
};
NS.buildQuery = function(params) {
    if(!params) return "";
    var params_array = [];
    for(var key in params) {
        params_array.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }
    return params_array.join("&");
};

var tmp_canvas;
if(typeof(document) != "undefined") {
    tmp_canvas = document.createElement("canvas");
} else {
    tmp_canvas = IVWrappers.CreateCanvas();
}
NS.measureText = function(text, font) {
    var tc = tmp_canvas.getContext("2d");
    tc.font = font;
    return tc.measureText(text);
};

NS.wrapText = function(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    if (line !== '') y += lineHeight;
    return y;
};

NS.trackMouseEvents = function(elem, handlers) {
    var move_handler = function(e) {
        if(handlers.move) handlers.move(e);
    };
    var up_handler = function(e) {
        if(handlers.move) $(window).unbind("mousemove", move_handler);
        $(window).unbind("mouseup", up_handler);
        if(handlers.up) handlers.up(e);
    };
    elem.mousedown(function(e) {
        if(handlers.move) $(window).bind("mousemove", move_handler);
        $(window).bind("mouseup", up_handler);
        if(handlers.down) handlers.down(e);
    });
};

NS.attachMouseEvents = function(handlers) {
    var move_handler = function(e) {
        if(handlers.move) handlers.move(e);
    };
    var up_handler = function(e) {
        if(handlers.move) $(window).unbind("mousemove", move_handler);
        $(window).unbind("mouseup", up_handler);
        if(handlers.up) handlers.up(e);
    };
    if(handlers.move) $(window).bind("mousemove", move_handler);
    $(window).bind("mouseup", up_handler);
};

NS.isNull = function(val) {
    return val === null || val === undefined;
};

NS.notNull = function(val) {
    return val !== null && val !== undefined;
};

NS.strings = function(key) {
    return DATA_Strings[key];
};

NS.startsWith = function(str, start) {
    return str.substr(0, start.length) == start;
};

NS.ObjectSet = function() {
    this.set = { };
};

NS.ObjectSet.prototype.add = function(obj) {
    if(!obj.uuid) obj.uuid = NS.generateUUID();
    this.set[obj.uuid] = true;
};

NS.ObjectSet.prototype.unionWith = function(another) {
    for(var k in another.set) {
        if(another.set.hasOwnProperty(k)) this.set[k] = true;
    }
};

NS.ObjectSet.prototype.subtractWith = function(another) {
    for(var k in another.set) {
        if(another.set.hasOwnProperty(k)) delete this.set[k];
    }
};

NS.ObjectSet.prototype.union = function(another) {
    var r = new NS.ObjectSet();
    r.unionWith(this);
    r.unionWith(another);
    return r;
};

NS.ObjectSet.prototype.subtract = function(another) {
    var r = new NS.ObjectSet();
    r.unionWith(this);
    r.subtractWith(another);
    return r;
};

NS.printNumber = function(num) {
    if(Math.abs(num) < 1e10) {
        if(num == Math.round(num)) return num.toString(); // is a integer.
        return num.toPrecision(6);
    } else {
        return num.toPrecision(6);
    }
};

NS.fillDefault = function(obj, defaults) {
    for(var key in defaults) {
        if(obj[key] === undefined) obj[key] = defaults[key];
    }
};

(function() {
    var multiline_regex = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
    NS.multiline = function(fn) {
        var match = multiline_regex.exec(fn.toString());
        if(!match) {
            throw new TypeError('Multiline comment missing.');
        }
        return match[1];
    };
})();


// iVisDesigner - scripts/utils/autoalign.js
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

NS.shiftModify = function(x0, y0, x1, y1) {
    var angle = Math.atan2(Math.abs(y1 - y0), Math.abs(x1 - x0)) / Math.PI * 180.0;
    if(angle < 22.5 || angle > 67.5) {
        if(Math.abs(x1 - x0) > Math.abs(y1 - y0)) y1 = y0;
        else x1 = x0;
    } else {
        if(Math.abs(x1 - x0) < Math.abs(y1 - y0))
            y1 = y0 + ((y1 - y0) > 0 ? 1 : -1) * Math.abs(x1 - x0);
        else
            x1 = x0 + ((x1 - x0) > 0 ? 1 : -1) * Math.abs(y1 - y0);
    }
    return [x1, y1];
};

NS.shiftModifyNoDiagnoal = function(x0, y0, x1, y1) {
    if(Math.abs(x1 - x0) > Math.abs(y1 - y0)) y1 = y0;
    else x1 = x0;
    return [x1, y1];
};

NS.MagneticAlign = function(points) {
    this.accepted = [];
    this.points = points;
    this.threshold = 5;
}

NS.MagneticAlign.prototype.modify = function(x, y) {
    var angles = [ 0, 45, 90, 135 ];

    // Find the first line.
    var min_v = 1e100;
    var min_s = null, min_a = null, min_d;
    for(var i in this.points) {
        var pt = this.points[i];
        var dv = new IV.Vector(x - pt.x, y - pt.y);
        for(var j in angles) {
            var v = dv.rotate(angles[j] / 180.0 * Math.PI);
            if(Math.abs(v.y) < min_v) {
                min_v = Math.abs(v.y);
                v.y = 0;
                v = v.rotate(-angles[j] / 180.0 * Math.PI);
                min_s = new IV.Vector(v.x + pt.x, v.y + pt.y);
                min_a = new IV.Vector(pt.x, pt.y);
                min_d = (new IV.Vector(1, 0)).rotate(-angles[j] / 180.0 * Math.PI);
            }
        }
    }
    if(min_v <= this.threshold) {
        // Find another line that intersect with the first one, test the intersection point.
        var min2_v = 1e100;
        var min2_s = null, min2_a = null;
        for(var i in this.points) {
            var pt = this.points[i];
            for(var j in angles) {
                var dpt = (new IV.Vector(1, 0)).rotate(-angles[j] / 180.0 * Math.PI);
                // cross: pt->dpt, min_a->min_d.
                var p = IV.geometry.lineIntersectionPD(pt, dpt, min_a, min_d);
                if(p) {
                    var d = IV.geometry.distance(min_s.x, min_s.y, p.x, p.y);
                    if(d < min2_v) {
                        min2_v = d;
                        min2_s = p;
                        min2_a = pt;
                    }
                }
            }
        }
        var rp = min_s;
        if(min2_v <= this.threshold) rp = min2_s;

        var anchors = [];

        for(var i in this.points) {
            var pt = this.points[i];
            var dv = new IV.Vector(rp.x - pt.x, rp.y - pt.y);
            for(var j in angles) {
                var v = dv.rotate(angles[j] / 180.0 * Math.PI);
                if(Math.abs(v.y) < 1e-3) {
                    anchors.push(pt);
                }
            }
        }
        var ret = new IV.Vector(rp.x, rp.y);
        ret.anchors = anchors;
        return ret;

    } else return;

};
NS.MagneticAlign.prototype.accept = function(p, x, y) {
    var pt = new IV.Vector(x, y);
    for(var i in p.anchors) {
        this.accepted.push({ dest: pt, src: p.anchors[i] });
    }
};
NS.MagneticAlign.prototype.reset = function() {
    this.accepted = [];
};
NS.MagneticAlign.prototype.render = function(ctx) {
    for(var i in this.accepted) {
        var al = this.accepted[i];
        var x0 = al.dest.x;
        var y0 = al.dest.y;
        var x1 = al.src.x;
        var y1 = al.src.y;
        var d = IV.geometry.distance(x0, y0, x1, y1);
        if(d > 1) {
            var kx = (x1 - x0) / d, ky = (y1 - y0) / d;
            x0 -= kx * 5000;
            y0 -= ky * 5000;
            x1 += kx * 5000;
            y1 += ky * 5000;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.strokeStyle = IV.colors.selection.toRGBA(0.3);
            ctx.stroke();
        }
    }
};


// iVisDesigner - scripts/utils/storage.js
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

NS.localStoragePrefix = "ivisdesigner_";

NS.addEvent("storage");

NS.saveObject = function(key, object) {
    window.localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(object));
};
NS.saveString = function(key, str) {
    window.localStorage.setItem(this.localStoragePrefix + key, str);
};

NS.removeObject = function(key) {
    window.localStorage.removeItem(this.localStoragePrefix + key);
};

NS.loadObject = function(key) {
    var item = window.localStorage.getItem(this.localStoragePrefix + key);
    if(item) return JSON.parse(item);
    return null;
};
NS.loadString = function(key) {
    var item = window.localStorage.getItem(this.localStoragePrefix + key);
    if(item) return item;
    return null;
};

NS.storageKeys = function() {
    var keys = [];
    for(var i in window.localStorage) {
        if(i.substr(0, NS.localStoragePrefix.length) == NS.localStoragePrefix) {
            var key = i.substr(NS.localStoragePrefix.length);
            keys.push(key)
        }
    }
    return keys;
};

if(typeof(window) != "undefined") {
    window.addEventListener("storage", function(e) {
        if(!e) e = window.event;
        if(e.key.substr(0, NS.localStoragePrefix.length) == NS.localStoragePrefix) {
            var key = e.key.substr(NS.localStoragePrefix.length);
            NS.raiseEvent("storage", {
                key: key,
                old_value: JSON.parse(e.oldValue),
                new_value: JSON.parse(e.newValue),
                url: e.url });
        }
    }, false);
}

// iVisDesigner - scripts/utils/oop.js
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

NS.forEachReversed = function(array, f) {
    var i = array.length;
    while(i--) {
        f(array[i]);
    };
};

NS.forEachInObject = function(obj, f) {
    for(var i in obj) {
        f(i, obj[i]);
    }
};

NS.deepClone = function(myObj) {
    if(myObj == null || myObj == undefined) return myObj;
    // If we have clone method, call it.
    if(myObj.clone) return myObj.clone();
    // Not object type, return itself.
    if(typeof(myObj) != 'object') return myObj;
    if(myObj instanceof Array) {
        var r = [];
        for(var i = 0; i < myObj.length; i++)
            r[i] = NS.deepClone(myObj[i]);
        return r;
    } else {
        var myNewObj = new Object();
        for(var i in myObj) myNewObj[i] = NS.deepClone(myObj[i]);
        return myNewObj;
    }
};

NS.extend = function(base, sub, funcs) {
    function inheritance() { };
    inheritance.prototype = base.prototype;
    sub.prototype = new inheritance();
    sub.prototype.constructor = sub;
    sub._base_constructor = base;
    if(funcs) {
        for(var i in funcs) {
            if(i == "$auto_properties") {
                funcs[i].forEach(function(p) {
                    if(funcs["$auto_properties_after"]) {
                        var fafter = funcs["$auto_properties_after"];
                        sub.prototype["_set_" + p] = function(val) {
                            this[p] = val;
                            fafter.call(this, p, val);
                            NS.raiseObjectEvent(this, "set:" + p, val);
                            return val;
                        };
                    } else {
                        sub.prototype["_set_" + p] = function(val) {
                            this[p] = val;
                            NS.raiseObjectEvent(this, "set:" + p, val);
                            return val;
                        };
                    }
                    sub.prototype["_get_" + p] = function() {
                        return this[p];
                    };
                });
            } else {
                sub.prototype[i] = funcs[i];
            }
        }
    }
    return sub;
};

NS.implement = function(base, sub) {
    for(var k in base.prototype) {
        sub.prototype[k] = base.prototype[k];
    }
};


return NS;

})(); // main nested function.

// iVisDesigner - scripts/core/core.js
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

// iVisDesigner - scripts/core/serializer.js
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

(function() {

IV.serializer = { };

var deserializers = { };
var object_types = { };

var is_basic_type = function(x) {
    if(typeof(x) == "string") return true;
    if(typeof(x) == "number") return true;
    if(typeof(x) == "boolean") return true;
    if(typeof(x) == "undefined") return true;
    if(x === null) return true;
    return false;
};

var serialize_internal = function(item, context, existings) {
    if(is_basic_type(item)) {
        return item;
    } else if(item.constructor == Array) {
        var r = item.map(function(single) {
            return serialize_internal(single, context, existings);
        });
        return r;
    } else if(item.serialize) {
        return item.serialize(context);
    } else {
        if(!item.uuid) item.uuid = IV.generateUUID();
        if(context.objects[item.uuid] || existings[item.uuid])
            return { u: item.uuid };
        var obj = { };
        /*if(item.type === undefined) {
            console.log("Can't serialize:", item);
        }*/
        context.objects[item.uuid] = { u: item.uuid, p: obj, t: item.type };
        existings[item.uuid] = item;
        var fields = item.serializeFields ? item.serializeFields() : null;
        if(fields) {
            for(var k = 0; k < fields.length; k++) {
                var i = fields[k];
                obj[i] = serialize_internal(item[i], context, existings);
            }
        } else {
            for(var i in item) {
                if(item.hasOwnProperty(i) && i[0] != '_') {
                    obj[i] = serialize_internal(item[i], context, existings);
                }
            }
        }
        return { u: item.uuid };
    }
};

IV.serializer.registerDeserializer = function(de, func) {
    deserializers[de] = func;
};

IV.serializer.registerObjectType = function(type, constructor) {
    object_types[type] = constructor;
};

var deserialize_internal = function(item, context) {
    if(is_basic_type(item)) {
        return item;
    } else if(item.constructor == Array) {
        var r = item.map(function(single) {
            return deserialize_internal(single, context);
        });
        return r;
    } else if(item.de) {
        return deserializers[item.de](item);
    } else {
        var obj = context.objects[item.u];
        if(obj.__waiting__) {
            delete obj.__waiting__;
            var p = context.data[item.u].p;
            for(var f in p) {
                obj[f] = deserialize_internal(p[f], context);
            }
            obj.type = context.data[item.u].t;
        }
        return obj;
    }
};

IV.Serializer = function() {
    this.serialized_objects = { };
};


IV.Serializer.prototype.serialize = function(element) {
    var context = {
        objects: { }
    };
    context.root = serialize_internal(element, context, this.serialized_objects);
    return context;
};

IV.Serializer.prototype.deserialize = function(d) {
    var context = {
        objects: this.serialized_objects,
        data: d.objects
    };
    for(var u in d.objects) {
        var item = d.objects[u];
        var constructor = Object;
        if(object_types[item.t]) constructor = object_types[item.t];
        //else console.log("Unknown type: " + item.t);
        context.objects[u] = Object.create(constructor.prototype);
        context.objects[u].__waiting__ = true;
    }

    var o = deserialize_internal(d.root, context);

    for(var u in d.objects) {
        var obj = context.objects[u];
        if(obj.postDeserialize)
            obj.postDeserialize(context);
    }
    return o;
};

IV.serializer.serialize = function(object) {
    var s = new IV.Serializer();
    return s.serialize(object);
};

IV.serializer.deserialize = function(object) {
    var s = new IV.Serializer();
    return s.deserialize(object);
};

IV.serializer.unitTest = function() {
    var object = {
        "uuid": "object1",
        "keyA": "valueA",
        "keyB": "valueB",
        "vector": new IV.Vector(10, 20)
    };
    var object2 = {
        "ref": object,
        "vector": new IV.Vector(20, 30)
    };
    var s = new IV.Serializer();
    var repr = s.serialize(object);
    var repr2 = s.serialize(object2);
    console.log(repr, repr2);
    var d = new IV.Serializer();
    var obj = d.deserialize(repr);
    var obj2 = d.deserialize(repr2);
    console.log(obj, obj2);
};

// Initialize for types defined in utils.h.

IV.serializer.registerDeserializer("Vector", function(item) {
    return new IV.Vector(item.x, item.y);
});

IV.serializer.registerDeserializer("Vector3", function(item) {
    return new IV.Vector3(item.x, item.y, item.z);
});

IV.serializer.registerDeserializer("Rectangle", function(item) {
    return new IV.Rectangle(item.x0, item.y0, item.width, item.height, item.angle);
});

IV.serializer.registerDeserializer("Color", function(item) {
    return new IV.Color(item.r, item.g, item.b, item.a);
});

})();

// iVisDesigner - scripts/core/actionmanager.js
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

(function() {

var actions = { };

IV.actions = actions;

IV.ActionManager = function(root) {
    this.action_cache = [];
    this.action_log = [];
    this.undo_stack = [];
    IV.EventSource.call(this);
};

IV.implement(IV.EventSource, IV.ActionManager);

IV.ActionManager.prototype.perform = function(act) {
};

IV.ActionManager.prototype.add = function(act) {
    this.action_cache.push(act);
};

IV.ActionManager.prototype.commit = function() {
    if(this.action_cache.length == 0) return;
    this.raise("perform", this.action_cache);
    for(var i = 0; i < this.action_cache.length; i++) {
        if(this.action_cache[i].perform)
            this.action_cache[i].perform();
    }
    this.action_log.push(this.action_cache);
    this.action_cache = [];
    this.undo_stack = [];
};

IV.ActionManager.prototype.cancel = function() {
    this.action_cache = [];
};

IV.ActionManager.prototype.undo = function() {
    this.commit();
    var acts = this.action_log.pop();
    if(acts) {
        for(var i = acts.length - 1; i >= 0; i--) {
            if(acts[i].rollback)
                acts[i].rollback();
        }
        this.undo_stack.push(acts);
    }
};

IV.ActionManager.prototype.redo = function() {
    this.commit();
    if(this.undo_stack) {
        var acts = this.undo_stack.pop();
        if(acts) {
            for(var i = 0; i < acts.length; i++) {
                if(acts[i].perform)
                    acts[i].perform();
            }
        }
    }
};

// Action types:

actions.SetProperty = IV.extend(Object, function(p1, p2, p3) {
    this.type = "action.SetProperty";
    if(p3 === undefined) {
        this.obj = p1.owner;
        this.field = p1.property;
        this.val = p2;
    } else {
        this.obj = p1;
        this.field = p2;
        this.val = p3;
    }
}, {
    perform: function() {
        this.original = this.obj["_get_" + this.field]();
        this.obj["_set_" + this.field](this.val);
    },
    rollback: function() {
        this.obj["_set_" + this.field](this.original);
    }
});
IV.serializer.registerObjectType("action.SetProperty", actions.SetProperty);

// set index val; splice index howmany vals; push val; pop
actions.SetArrayDirectly = IV.extend(Object, function(obj, field, action, p1, p2, p3) {
    this.type = "action.SetArrayDirectly";
    this.obj = obj;
    this.field = field;
    this.action = action;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
}, {
    perform: function() {
        var array = this.obj[this.field];
        if(this.action == "set") {
            this.original = array[this.p1];
            array[this.p1] = this.p2;
        }
        if(this.action == "splice") {
            this.original = Array.prototype.splice.apply(array, [this.p1, this.p2].concat(this.p3));
        }
        if(this.action == "push") {
            array.push(this.p1);
        }
        if(this.action == "pop") {
            this.original = array.pop();
        }
        IV.raiseObjectEvent(this.obj, "set:" + this.field, this.action);
    },
    rollback: function() {
        var array = this.obj[this.field];
        if(this.action == "set") {
            array[this.p1] = this.original;
        }
        if(this.action == "splice") {
            Array.prototype.splice.apply(array, [this.p1, this.p3.length].concat(this.original));
        }
        if(this.action == "push") {
            array.pop();
        }
        if(this.action == "pop") {
            array.push(this.original);
        }
        IV.raiseObjectEvent(this.obj, "set:" + this.field, this.action);
    }
});
IV.serializer.registerObjectType("action.SetArrayDirectly", actions.SetArrayDirectly);

actions.SetDirectly = IV.extend(Object, function(obj, field, val) {
    this.type = "action.SetDirectly";
    this.obj = obj;
    this.field = field;
    this.val = val;
}, {
    perform: function() {
        this.original = this.obj[this.field];
        this.obj[this.field] = this.val;
        IV.raiseObjectEvent(this.obj, "set:" + this.field, this.val);
    },
    rollback: function() {
        this.obj[this.field] = this.original;
        IV.raiseObjectEvent(this.obj, "set:" + this.field, this.original);
    }
});
IV.serializer.registerObjectType("action.SetDirectly", actions.SetDirectly);

actions.Add = IV.extend(Object, function(obj, f_add, f_remove, item) {
    this.type = "action.Add";
    this.obj = obj;
    this.function_add = f_add;
    this.function_remove = f_remove;
    this.item = item;
}, {
    perform: function() {
        this.obj[this.function_add](this.item);
    },
    rollback: function() {
        this.obj[this.function_remove](this.item);
    }
});
IV.serializer.registerObjectType("action.Add", actions.Add);

})();

// iVisDesigner - scripts/core/syncedobject.js
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

(function() {

IV.SyncedObjectBase = IV.extend(Object, function(name) {
    this.name = name;
}, {
    reload: function(dataset) {
        var $this = this;
        $this.ops = [];
        $this.index = {};
        $this.data = null;
        $this.data = dataset.data;
        $this.rev = dataset.revision;
        $this.build_index();
        $this.perform_ops();
        $this.call_callback();
    },
    addOperation: function(op) {
        this.ops.push(op);
    },
    performOperations: function() {
        this.perform_ops();
        this.call_callback();
    },
    call_callback: function() {
        if(this.onUpdate) this.onUpdate(this.data, this.rev);
    },
    index_object: function(obj) {
        if(!obj) return obj;
        if(obj.constructor == Object) {
            this.index[obj._id] = obj;
            for(var k in obj) {
                this.index_object(obj[k]);
            }
        }
        if(obj.constructor == Array) {
            for(var k = 0; k < obj.length; k++) {
                this.index_object(obj[k]);
            }
        }
        return obj;
    },
    build_index: function() {
        var data = this.data;
        var index = this.index;
        this.index_object(data);
    },
    perform_ops: function() {
        var $this = this;
        if(!this.data) return;
        //console.log("Current revision:", this.rev);
        var ops_container = this.ops;
        this.ops = [];
        for(var kk = 0; kk < ops_container.length; kk++) {
            var ops = ops_container[kk];
            var r = ops[0];
            if(r <= $this.rev) {
                continue;
            } else if(r > $this.rev + 1) {
                $this.rev = undefined;
                if($this.onRequestReload) {
                    $this.onRequestReload();
                }
                return;
            }
            $this.rev = r;
            for(var i = 1; i < ops.length;) {
                var cmd = ops[i];
                var n = 1;
                if(cmd == "INITIALIZE") {
                    $this.index = {};
                    $this.data = ops[i + 1];
                    $this.build_index();
                    n = 2;
                }
                if(cmd == "S") { // S(set), _id, key, value
                    n = 4;
                    $this.index[ops[i + 1]][ops[i + 2]] = $this.index_object(ops[i + 3]);
                }
                if(cmd == "U") { // U(unset), _id, key
                    n = 3;
                    delete $this.index[ops[i + 1]][ops[i + 2]];
                }
                if(cmd == "A") { // A(append), _id, key, value
                    n = 4;
                    $this.index[ops[i + 1]][ops[i + 2]].push($this.index_object(ops[i + 3]));
                }
                if(cmd == "I") { // I(insert), _id, key, index, value
                    n = 5;
                    $this.index[ops[i + 1]][ops[i + 2]].splice(ops[i + 3], 0, $this.index_object(ops[i + 4]));
                }
                if(cmd == "P") { // P(pop), _id, key, index
                    n = 4;
                    var c = $this.index[ops[i + 1]][ops[i + 2]];
                    var index = ops[i + 3];
                    if(index === null) index = c.length - 1;
                    c.splice(index, 1);
                }
                i += n;
            }
        }
    }
});

IV.SyncedObjectClient = IV.extend(IV.SyncedObjectBase, function(name) {
    IV.SyncedObjectBase.call(this, name);
}, {
    processMessage: function(message) {
        var self = this;
        if(message.type == "reload") self.reload(message.data);
        if(message.type == "ops") {
            message.data.forEach(function(ops) {
                self.addOperation(ops);
            });
            self.performOperations();
        }
    }
});

})();


// iVisDesigner - scripts/core/path.js
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

IV.Path = function(str) {
    if(!str || str == "[ROOT]") str = "";
    if(typeof(str) == "string") {
        this.components = [];
        var slices = str == "" ? [] : str.split(":");
        for(var i = 0; i < slices.length; i++) {
            var c = slices[i];
            if(c == "&") {
                this.components.push({
                    type: "reference",
                    name: "_target"
                });
            } else if(c[0] == "[" && c[c.length - 1] == "]") {
                this.components.push({
                    type: "iterate",
                    name: c.substr(1, c.length - 2)
                });
            } else if(c[0] == "{" && c[c.length - 1] == "}") {
                var key = c.substr(1, c.length - 2).split("@");
                this.components.push({
                    type: "attached",
                    ns: key[1],
                    name: key[0]
                });
            } else {
                this.components.push({
                    type: "object",
                    name: c
                });
            }
        }
    } else {
        this.components = str;
    }
};

IV.Path.prototype.slice = function(start, length) {
    var sliced = new IV.Path();
    sliced.components = this.components.slice(start, length);
    return sliced;
};
IV.Path.prototype.truncate = function(count) {
    var sliced = new IV.Path();
    sliced.components = this.components.slice(0, this.components.length - count);
    return sliced;
};

IV.Path.prototype.clone = IV.Path.prototype.slice;

IV.Path.prototype._enumerate_internal = function(ctx, subdata, index, cb) {
    if(index >= this.components.length) {
        return cb(ctx);
    } else {
        var c = this.components[index];
        if(c.type == "iterate") {
            if(subdata) {
                var array = subdata[c.name];
                if(array) {
                    for(var i = 0; i < array.length; i++) {
                        ctx.components[index].obj = array[i];
                        var r = this._enumerate_internal(ctx, array[i], index + 1, cb);
                        if(r === false) return false;
                    }
                }
            }
        } else if(c.type == "attached") {
            var obj = subdata ? ctx.data.getAttached(c.ns, ctx.data.getObjectID(subdata)) : null;
            ctx.components[index].obj = obj;
            var r = this._enumerate_internal(ctx, obj, index + 1, cb);
            if(r === false) return false;
        } else {
            var obj = subdata ? subdata[c.name] : null;
            ctx.components[index].obj = obj;
            var r = this._enumerate_internal(ctx, obj, index + 1, cb);
            if(r === false) return false;
        }
    }
};

IV.PathContext = function(data, root, components) {
    this.data = data;
    this.root = root;
    this.components = components;
};

IV.PathContext.prototype.clone = function() {
    return new IV.PathContext(this.data, this.root, this.components.map(function(c) {
        return {
            type: c.type,
            name: c.name,
            obj: c.obj
        };
    }));
};

IV.PathContext.prototype.val = function() {
    if(this.components.length > 0)
        return this.components[this.components.length - 1].obj;
    return this.root;
};

IV.PathContext.prototype.getEntity = function(path) {
    var i = 0;
    var rc = [];
    var obj = this.root;
    for(; i < this.components.length && i < path.components.length; i++) {
        var tc = this.components[i];
        var pc = path.components[i];
        if(tc.name != pc.name || tc.type != pc.type) {
            break;
        } else {
            rc.push(tc);
            obj = tc.obj;
        }
    }
    if(i >= path.components.length)
        return new IV.PathContext(this.data, this.root, rc);
    else
        return null;
};

// Get value from another path.
IV.PathContext.prototype.get = function(path) {
    var i = 0;
    var rc = [];
    var obj = this.root;
    for(; i < this.components.length && i < path.components.length; i++) {
        var tc = this.components[i];
        var pc = path.components[i];
        if(tc.name != pc.name || tc.type != pc.type) {
            break;
        } else {
            rc.push(tc);
            obj = tc.obj;
        }
    }
    for(; i < path.components.length; i++) {
        var pc = path.components[i];
        var nc;
        if(pc.type == "attached") {
            nc = {
                type: pc.type,
                name: pc.name,
                ns: pc.ns,
                obj: obj ? this.data.getAttached(pc.ns, this.data.getObjectID(obj)) : null
            };
        } else {
            if(pc.type == "iterate") {
                nc = {
                    type: pc.type,
                    name: pc.name,
                    obj: obj ? obj[pc.name][0] : null
                };
            } else {
                nc = {
                    type: pc.type,
                    name: pc.name,
                    obj: obj ? obj[pc.name] : null
                };
            }
        }
        obj = nc.obj;
        rc.push(nc);
    }
    return new IV.PathContext(this.data, this.root, rc);
};

IV.PathContext.prototype.set = function(path, value) {
    var i = 0;
    var obj = this.root;
    for(; i < this.components.length && i < path.components.length - 1; i++) {
        var tc = this.components[i];
        var pc = path.components[i];
        if(tc.name != pc.name || tc.type != pc.type) {
            break;
        } else {
            obj = tc.obj;
        }
    }
    for(; i < path.components.length - 1; i++) {
        var pc = path.components[i];
        var nc;
        if(pc.type == "attached") {
            obj = this.data.getAttached(pc.ns, this.data.getObjectID(obj));
        } else {
            obj = obj[pc.name];
        }
        //obj = nc.obj;
    }
    var pc = path.components[i];
    if(obj._variable) {
        obj[pc.name] = value;
        if(obj._onSetField) {
            obj._onSetField(pc.name, value);
        }
    }
};

IV.PathContext.prototype.getReference = function(referenced_path) {
    var o = this.val();
    var objs = [];
    while(o) {
        objs.push(o);
        o = o._parent;
    }
    var rc = referenced_path.components.map(function(item, idx) {
        return {
            type: item.type,
            name: item.name,
            obj: objs[objs.length - 2 - idx]
        };
    });
    return new IV.PathContext(this.data, this.root, rc);
};

IV.Path.prototype.enumerate = function(data, callback) {
    if(data.constructor == IV.PathContext) return this.enumerateAtContext(data, callback);
    var data_root = data.getRoot();
    if(!callback) return;
    var components = this.components.map(function(c) {
        return {
            type: c.type,
            name: c.name,
            obj: null
        };
    });
    var ctx = new IV.PathContext(data, data_root, components);
    this._enumerate_internal(ctx, data_root, 0, callback);
};

IV.Path.prototype.enumerateAtContext = function(context, callback) {
    var ctx = context.clone();
    var i = 0;
    var obj = ctx.data.getRoot();
    for(; i < ctx.components.length && i < this.components.length; i++) {
        var tc = ctx.components[i];
        var pc = this.components[i];
        if(tc.name != pc.name || tc.type != pc.type) {
            break;
        } else {
            obj = tc.obj;
        }
    }
    var pi = i;
    for(; i < this.components.length; i++) {
        var c = this.components[i];
        ctx.components[i] = {
            type: c.type,
            name: c.name,
            obj: null
        };
    }
    ctx.components = ctx.components.slice(0, i);
    this._enumerate_internal(ctx, obj, pi, callback);
};

IV.Path.prototype.relativePath = function(path) {
    var rp = path.clone();
    rp.components = rp.components.slice(this.components.length);
    return rp;
};

IV.Path.prototype.applyReference = function(path, target_path) {
    var rp = this.clone();
    console.log(this, path, target_path);
    rp.components = rp.components.concat(target_path.relativePath(path).components);
    return rp;
};

IV.Path.prototype.toString = function() {
    if(this.components.length == 0) return "[ROOT]";
    return this.components.map(function(c) {
        if(c.type == "iterate") return "[" + c.name + "]";
        if(c.type == "attached") return "{" + c.name + "@" + c.ns + "}";
        if(c.type == "reference") return "&";
        return c.name;
    }).join(":");
};

IV.Path.prototype.serialize = function() {
    return { de: "Path", str: this.toString() };
};
IV.serializer.registerDeserializer("Path", function(item) {
    return new IV.Path(item.str);
});

IV.Path.prototype.toStringDisplay = function() {
    if(this.components.length == 0) return "[ROOT]"
    return this.components.map(function(c) {
        if(c.type == "iterate") return "[" + c.name + "]";
        if(c.type == "attached") return "{" + c.name + "}";
        if(c.type == "reference") return "&";
        return c.name;
    }).join(":");
};

IV.Path.prototype.toEntityPath = function() {
    var np = this.clone();
    var i = np.components.length - 1;
    for(; i >= 0; i--) {
        if(np.components[i].type == "iterate") break;
    }
    np.components = np.components.slice(0, i + 1);
    return np;
};

IV.Path.prototype.getSchema = function(schema) {
    for(var i = 0; i < this.components.length; i++) {
        schema = schema.fields[this.components[i].name];
    }
    return schema;
};

IV.Path.commonPrefix = function(paths) {
    if(!paths || paths.length == 0) return new IV.Path();
    var common = paths[0].components.slice();
    for(var i = 1; i < paths.length; i++) {
        var p = paths[i].components;
        var t;
        for(t = 0; t < common.length && t < p.length; t++) {
            if(common[t].type != p[t].type || common[t].name != p[t].name) {
                break;
            }
        }
        common = common.slice(0, t);
    }
    return new IV.Path(common);
};

IV.Path.computeBasicStatistics = function(path, data) {
    var min = null;
    var max = null;
    var sum = 0;
    var count = 0;
    path.enumerate(data, function(context) {
        var val = context.val();
        if(val === undefined || val === null) return;
        if(min === null || min > val) min = val;
        if(max === null || max < val) max = val;
        sum += val;
        count += 1;
    });
    if(count == 0) {
        count = 1;
        if(min === null) min = -1;
        if(max === null) max = 1;
    }
    return { min: min, max: max, range: max - min, sum: sum, count: count, avg: sum / count };
};

// iVisDesigner - scripts/core/data.js
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

(function() {

// This class is responsible for maintaining data updates.

IV.DataObject = function(root, schema) {
    this.root = root;
    this.schema = schema;
    this.namespaces = { };
    this.revision = IV.generateUUID();
    IV.EventSource.call(this);
};

IV.implement(IV.EventSource, IV.DataObject);

IV.DataObject.prototype.getSchema = function() {
    return this.schema;
};

// Root object, javascript object.
// _parent: reference the parent object.
// _target: reference the target object for a reference.
IV.DataObject.prototype.getRoot = function() {
    return this.root;
};

IV.DataObject.prototype.updateRoot = function(new_root) {
    return this.root = new_root;
};

IV.DataObject.prototype.getObjectID = function(obj) {
    if(!obj) return null;
    if(!obj._id) obj._id = IV.generateUUID();
    return obj._id;
};

IV.DataObject.prototype.setAttached = function(ns, map) {
    if(!this.namespaces[ns]) this.namespaces[ns] = { };
    var n = this.namespaces[ns];
    for(var i in map) {
        if(map.hasOwnProperty(i)) {
            n[i] = map[i];
        }
    }
};

IV.DataObject.prototype.getAttached = function(ns, id) {
    if(!this.namespaces[ns]) return null;
    return this.namespaces[ns][id];
};

IV.DataObject.prototype.createSubset = function(path, context) {
    var new_root = context.get(path).val();
    var s = this.schema;
    for(var i = 0; i < path.components.length; i++) {
        s = s.fields[path.components[i].name];
    }
    var r = new IV.DataObject(new_root, s);
    r.subset = {
        parent: this,
        path: path
    };
    return r;
};

IV.DataObject.prototype.enumerateOtherSubsets = function(callback) {
    if(this.subset) {
        var $this = this;
        $this.subset.parent.enumerateOtherSubsets(function(ds) {
            $this.subset.path.enumerate(ds, function(context) {
                callback($this.subset.parent.createSubset($this.subset.path, context));
            });
        });
    } else {
        callback(this);
    }
};

IV.DataObject.prototype.computeFullStatistics = function(path, context) {
    var min = null;
    var max = null;
    var sum = 0;
    var count = 0;
    var f_update = function(context) {
        var val = context.val();
        if(val === undefined || val === null) return;
        if(min === null || min > val) min = val;
        if(max === null || max < val) max = val;
        sum += val;
        count += 1;
    };
    this.enumerateOtherSubsets(function(ds) {
        path.enumerate(ds, f_update);
    });
    if(count == 0) {
        count = 1;
        if(min === null) min = -1;
        if(max === null) max = 1;
    }
    return { min: min, max: max, range: max - min, sum: sum, count: count, avg: sum / count };
}

IV.PlainDataset = function(obj, schema) {
    // Preprocess object.
    var process_subtree = function(obj, schema, parent, onobject) {
        if(!obj) return;
        onobject(obj, schema, parent);
        if(schema.type == "object") {
            if(schema.fields) {
                for(var f in schema.fields) {
                    var ss = schema.fields[f];
                    var so = obj[f];
                    process_subtree(so, ss, obj, onobject);
                }
            }
        }
        if(schema.type == "collection" || schema.type == "sequence") {
            if(schema.fields) {
                obj.forEach(function(o) {
                    onobject(o, schema, parent, "item");
                    for(var f in schema.fields) {
                        var ss = schema.fields[f];
                        var so = o[f];
                        process_subtree(so, ss, o, onobject);
                    }
                });
            }
        }
    };
    var id_map = { };
    process_subtree(obj, schema, null, function(obj, schema, parent, rtype) {
        if(obj === null || obj === undefined) return;
        if(schema.type == "object" || rtype == "item")
            obj._parent = parent;
        if(obj._id) {
            id_map[obj._id] = obj;
            obj.__id = obj._id;
        } else {
            if(schema.type == "object" || rtype == "item")
                obj.__id = IV.generateUUID("::");
        }
    });
    process_subtree(obj, schema, null, function(obj, schema, parent) {
        if(obj === null || obj === undefined) return;
        if(schema.type == "reference") {
            obj._target = id_map[obj.ref_id];
        }
    });
    this.id_map = id_map;
    this.obj = obj;
    this.schema = schema;
    this.schema_cache = { };
};

})();

// iVisDesigner - scripts/core/vis.js
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

IV.Visualization = function() {
    this.uuid = IV.generateUUID();
    // All objects of the visualization, ordered in an array.
    this.objects = [];
    // Selected objects.
    this.selection = [];
    this._needs_render = true;
    this.type = "Visualization";
    this.artboard = new IV.Rectangle(-600, -400, 1200, 800);
    this.background = null;
    IV.EventSource.call(this);
};

IV.serializer.registerObjectType("Visualization", IV.Visualization);

IV.implement(IV.EventSource, IV.Visualization);

// Serialization support.
IV.Visualization.prototype.serializeFields = function() {
    return [ "objects", "artboard", "uuid", "background" ];
};

IV.Visualization.prototype.postDeserialize = function() {
    // Deselect all objects.
    this.selection = [];
    this.objects.forEach(function(obj) {
        obj.selected = false;
    });
    if(!this.artboard) {
        // Assign default artboard if non-exist.
        this.artboard = new IV.Rectangle(-600, -400, 1200, 800);
    }
    IV.EventSource.call(this);
};

// Add an object to the visualization.
IV.Visualization.prototype.addObject = function(obj) {
    // Assign object name if not defined.
    if(!obj.name) {
        var names = { };
        this.objects.forEach(function(o) { names[o.name] = true; });
        for(var i = 1;; i++) {
            var name = obj.type + i;
            if(names[name]) continue;
            obj.name = name;
            break;
        }
    }
    // Added this object to the front.
    this.objects.unshift(obj);
    // Call onAttach().
    if(obj.onAttach) {
        obj.onAttach(this);
    }
    // Add object event.
    this.raise("objects");
};

// Remove an object from the visualization.
IV.Visualization.prototype.removeObject = function(obj) {
    // Find it and earse from the array.
    var idx = this.objects.indexOf(obj);
    if(idx >= 0 && idx < this.objects.length) {
        this.objects.splice(idx, 1);
        // Detach this object.
        if(obj.onDetach) {
            obj.onDetach(this);
        }
    }
    // Remove object event.
    this.raise("objects");
};

// Trigger rendering.
IV.Visualization.prototype.setNeedsRender = function() {
    this._needs_render = true;
};

IV.Visualization.prototype.triggerRenderer = function(renderer) {
    if(this._needs_render) {
        renderer.trigger();
        this._needs_render = false;
    }
};

// Validate generated values in response to data changes.
IV.Visualization.prototype.validate = function(data) {
    // Do a topology sort.
    var object_idmap = { }; // uuid => object
    this.objects.forEach(function(obj) { object_idmap[obj.uuid] = { o: obj, deps: new IV.ObjectSet(), done: false }; });
    this.objects.forEach(function(obj) {
        var deps = obj.getDependencies();
        object_idmap[obj.uuid].deps.unionWith(deps);
        for(var uuid in deps.set) {
            var info = object_idmap[uuid];
            if(info) {
                if(info.o._validated === false) {
                    obj._validated = false;
                }
            }
        }
    });
    var sorted = [];
    var append_obj = function(uuid) {
        var info = object_idmap[uuid];
        if(!info || info.done) return;
        for(var depid in info.deps.set) {
            append_obj(depid);
        }
        sorted.push(info.o);
        info.done = true;
    };
    this.objects.forEach(function(obj) {
        append_obj(obj.uuid);
    });
    // Finish topology sort, now validate in dependency order.

    sorted.forEach(function(obj) {
        if(obj.validate) obj.validate(data);
    });
};

// Render the visualization to graphics context.
IV.Visualization.prototype.render = function(data, g) {
    this.validate(data);
    // First we draw the objects.
    IV.forEachReversed(this.objects, function(obj) {
        // Save the graphics state before calling render().
        g.ivSave();
        // Try-catch block to prevent exceptions.
        try {
            obj.render(g, data);
        } catch(e) {
            console.trace(e.stack);
        }
        g.ivRestore();
    });
};

// Render selected objects.
IV.Visualization.prototype.renderSelection = function(data, g) {
    this.validate(data);
    // Then we draw the selections.
    IV.forEachReversed(this.selection, function(c) {
        g.ivSave();
        try {
            c.obj.renderSelected(g, data, c.context, c);
        } catch(e) {
            console.trace(e.stack);
        }
        g.ivRestore();
    });
};

// Render the visualization's guides to graphics context.
// Guides including the axis of the track object, the frame of the scatterplot, etc.
IV.Visualization.prototype.renderGuide = function(data, g) {
    this.validate(data);
    // Same way as render().
    IV.forEachReversed(this.objects, function(obj) {
        g.ivSave();
        try {
            obj.renderGuide(g, data);
        } catch(e) {
            console.trace(e.stack);
        }
        g.ivRestore();
    });
};

// Render guide for selected objects.
IV.Visualization.prototype.renderGuideSelected = function(data, g) {
    this.validate(data);
    IV.forEachReversed(this.selection, function(c) {
        var obj = c.obj;
        g.ivSave();
        try {
            obj.renderGuideSelected(g, data, c.context, c);
        } catch(e) {
            console.trace(e.stack);
        }
        g.ivRestore();
    });
};

// Select an object from the visualization, given the `location` and `action`.
IV.Visualization.prototype.selectObject = function(data, location, action) {
    this.validate(data);
    // We find the most close match by iterate over all objects.
    var best_context = null;
    var mind = 1e10;
    for(var i = 0; i < this.objects.length; i++) {
        var obj = this.objects[i];
        // Call obj.select().
        var context = obj.select(location, data, action);
        if(context) {
            // Distance returned by obj.select().
            var d = context.distance ? context.distance : 1e10;
            context.obj = obj;
            // Update the best match.
            if(!best_context || d < mind) {
                mind = d;
                best_context = context;
            }
        }
    }
    return best_context;
};

// Lasso objects from the visualization, given the `polygon`
IV.Visualization.prototype.lassoObject = function(data, polygon, callback) {
    this.validate(data);
    var result = [];
    for(var i = 0; i < this.objects.length; i++) {
        var obj = this.objects[i];
        if(!obj.lasso) continue;
        obj.lasso(polygon, data, callback);
    }
    return result;
};

// Append a selection to the list of selected objects.
IV.Visualization.prototype.appendSelection = function(ctx) {
    this.selection.push(ctx);
    ctx.obj.selected = true;
    ctx.obj._selection_context = ctx;
    this.raise("selection");
};

// Clear selected objects.
IV.Visualization.prototype.clearSelection = function() {
    this.objects.forEach(function(obj) { obj.selected = false; });
    this.selection.forEach(function(c) { c.obj.selected = false; });
    this.selection = [];
    this.raise("selection");
};

// Handle tick event, pass them to the objects.
IV.Visualization.prototype.timerTick = function(data) {
    this.objects.forEach(function(obj) {
        if(obj.timerTick) obj.timerTick(data);
    });
};


// iVisDesigner - scripts/core/workspace.js
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

IV.Workspace = function() {
    this.type = "Workspace";
    this.uuid = IV.generateUUID();
    // All objects of the visualization, ordered in an array.
    this.canvases = [];
    this.objects = [];
    this.default_canvas = null;
    // Selected objects.
    IV.EventSource.call(this);
};

IV.serializer.registerObjectType("Workspace", IV.Workspace);
IV.implement(IV.EventSource, IV.Workspace);

// Serialization support.
IV.Workspace.prototype.serializeFields = function() {
    return [ "canvases", "objects", "uuid", "default_canvas" ];
};

IV.Workspace.prototype.fillDefault = function() {
};

IV.Workspace.prototype.postDeserialize = function() {
    IV.EventSource.call(this);
    this.fillDefault();
};

// Canvas management.
IV.Workspace.prototype.addCanvas = function(info) {
    /* info = {
     *    name: "Canvas Name"
     *    visualization: <IV.Visualization object>
     *    pose: { // for allosphere.
     *      center: <Vector3>
     *      normal: <Vector3>
     *      up: <Vector3>
     *      width: <Vector3>
     *    }
     * }
     */
     if(!info) info = { };
    if(!info.pose) {
        info.pose = {
            center: new IV.Vector3(5, 0, 0),
            normal: new IV.Vector3(-1, 0, 0),
            up: new IV.Vector3(0, 0, 1),
            width: 1
        };
    }
    if(!info.visualization) info.visualization = new IV.Visualization();
    if(!info.name) {
        var index = 1;
        var names = { };
        this.canvases.forEach(function(c) { names[c.name] = true; });
        while(names["Canvas" + index]) index += 1;
        info.name = "Canvas" + index;
    }
    this.canvases.push(info);
    if(this.default_canvas == null) this.default_canvas = info;
};

IV.Workspace.prototype.removeCanvas = function(info) {
    var index = this.canvases.indexOf(info);
    if(index >= 0) {
        this.canvases.splice(index, 1);
    }
};

IV.Workspace.prototype.validateAll = function(data) {
    this.canvases.forEach(function(canvas) {
        canvas.visualization.validate(data);
    });
    this.objects.forEach(function(canvas) {
        canvas.visualization.validate(data);
    });
};

var WorkspaceSync = function() {
    this.serializer = new IV.Serializer();
    this.workspace = null;
};

WorkspaceSync.prototype.processMessage = function(msg) {
    if(msg.type == "sync.startup") {
        this.serializer = new IV.Serializer();
        this.workspace = this.serializer.deserialize(msg.workspace);
        if(this.onUpdate) this.onUpdate();
    } else if(msg.type == "sync.perform") {
        var actions = this.serializer.deserialize(msg.actions);
        actions.actions.forEach(function(action) {
            if(action.perform) action.perform();
        });
        if(this.onUpdate) this.onUpdate(msg.parameters);
    } else if(msg.type == "sync.rollback") {
    } else return;
    //console.log(msg);
};


// iVisDesigner - scripts/core/objects/objects.js
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

(function() {

var Objects = { };

IV.objects = Objects;

// The base class for objects.
Objects.Object = function() {
    this.uuid = IV.generateUUID();
};
Objects.Object.prototype = {
    _get_name: function() { return this.name; },
    _set_name: function(val) { return this.name = val; },
    setName: function(name) {
        if(this.name != name) {
            this.name = name;
            IV.raiseObjectEvent(this, "p:name", name);
        }
    },
    can: function(cap) { return false; },
    get: function(context) { return null; },
    getStyle: function(context) { return this.get(context); },
    getPoint: function(context) { return this.get(context); },
    getLine: function(context) { return this.get(context); },
    getNumber: function(context) { return this.get(context); },
    getPath: function() { return this.path; },
    getGuidePath: function() { return new IV.Path(""); },
    selectObject: function() { return { }; },
    render: function() { },
    propertyUpdate: function() { },
    renderSelected: function() { },
    renderGuide: function() { },
    renderGuideSelected: function() { },
    setDirty: function() { },
    select: function() { return null; },
    clone: function() {
        throw new Error("Clone not implemented: " + this.type);
    },
    getDependencies: function() { return new IV.ObjectSet(); },
    getPropertyContext: function() {
        var $this = this;
        return [
            make_prop_ctx(this, "name", "Name", "Common", "plain-string")
        ];
    }
};

// iVisDesigner - scripts/core/objects/utils.js
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

var make_anchor_move_context = function(rslt, anchor, action) {
    if(action == "move") {
        if(anchor.type == "Plain") {
            rslt.original = anchor.obj;
            rslt.onMove = function(p0, p1, magnetics) {
                var new_pos = rslt.original.sub(p0).add(p1);
                var np = magnetics.modify(new_pos.x, new_pos.y);
                if(np) {
                    new_pos.x = np.x;
                    new_pos.y = np.y;
                    magnetics.accept(np, new_pos.x, new_pos.y);
                }
                var actions = [ new IV.actions.SetDirectly(anchor, "obj", new_pos) ];
                return { trigger_render: "main,front,back", actions: actions };
            };
        }
        if(anchor.type == "PointOffset") {
            rslt.original = anchor.offset;
            rslt.onMove = function(p0, p1) {
                var new_offset = rslt.original.sub(p0).add(p1);
                var actions = [ new IV.actions.SetDirectly(anchor, "offset", new_offset) ];
                return { trigger_render: "main,front,back", actions: actions };
            };
        }
    }
    if(action == "move-element") {
        if(anchor.beginMoveElement) {
            var c = anchor.beginMoveElement(rslt.context);
            rslt.onMove = function(p0, p1) {
                c.onMove(p0, p1);
            };
        }
    }
    return rslt;
};

// Convenient way to create property context.
var make_prop_ctx = function(obj, property, name, group, type, args) {
    var ctx = { name: name, group: group, type: type, property: property, owner: obj, args: args };
    ctx.get = function() {
        return obj["_get_" + property]();
    };
    ctx.set = function(val) {
        return obj["_set_" + property](val);
    };
    return ctx;
};

var compile_expression = function(expression, base_path) {
    base_path = base_path.toString();
    var compiled = IV.expression.parse(expression);
    return function(variables, context) {
        var ctx = new IV.expression.Context();
        ctx.get = function(path) {
            var p = path[0] == ':' ? base_path + path : path.substr(1);
            var r = context.get(new IV.Path(p)).val();
            return r;
        };
        for(var key in variables) ctx[key] = variables[key];
        return compiled(ctx);
    };
};

// iVisDesigner - scripts/core/objects/basic.js
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

(function() {

// Plain Object.
var Plain = IV.extend(Objects.Object, function(obj) {
    Objects.Object.call(this);
    this.obj = obj;
    this.type = "Plain";
}, {
    can: function(cap) {
        if(cap == "get-point") return true;
        if(cap == "get-number") return true;
        if(cap == "get-style") return true;
    },
    getPath: function() { return new IV.Path(""); },
    getGuidePath: function() { return new IV.Path(""); },
    get: function() { return this.obj; },
    clone: function() {
        return new Plain(IV.deepClone(this.obj));
    }
});

IV.serializer.registerObjectType("Plain", Plain);

Objects.Plain = Plain;
Objects.Number = Plain;
Objects.Style = Plain;
Objects.Point = Plain;

// PassThrough Object.
var PassThrough = IV.extend(Objects.Object, function(path) {
    Objects.Object.call(this);
    this.path = path;
    this.type = "PassThrough";
}, {
    $auto_properties: [ "path" ],
    can: function(cap) {
        if(cap == "get-point") return true;
        if(cap == "get-number") return true;
        if(cap == "get-style") return true;
    },
    getPath: function() { return new IV.Path(""); },
    getGuidePath: function() { return new IV.Path(""); },
    get: function(context) { return context.get(this.path).val(); },
    clone: function() {
        return new PassThrough(IV.deepClone(this.path));
    }
});
Objects.PassThrough = PassThrough;
IV.serializer.registerObjectType("PassThrough", PassThrough);

})();

// iVisDesigner - scripts/core/objects/geometry.js
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

(function() {

// Line Intersection
var LineIntersection = IV.extend(Objects.Object, function(line1, line2) {
    Objects.Object.call(this);
    this.line1 = line1;
    this.line2 = line2;
    this.type = "LineIntersection";
}, {
    get: function(context) {
        var l1 = this.line1.getLine(context);
        var l2 = this.line2.getLine(context);
        if(l1 === null || l2 === null) return null;
        var intersection = IV.geometry.lineIntersection(l1[0], l1[1], l2[0], l2[1]);
        return intersection;
    },
    getPath: function() {
        return this.line1.getPath();
    },
    can: function(cap) {
        if(cap == "get-point") return true;
        return false;
    },
    clone: function() {
        return new LineIntersection(this.line1, this.line2);
    }
});
Objects.LineIntersection = LineIntersection;
IV.serializer.registerObjectType("LineIntersection", LineIntersection);

})();

// iVisDesigner - scripts/core/objects/mappings.js
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

(function() {

// Linear Mapping.
var NumberLinear = IV.extend(Objects.Object, function(path, num1, num2, min, max) {
    Objects.Object.call(this);
    this.path = path;
    this.num1 = num1;
    this.num2 = num2;
    this.min = min;
    this.max = max;
    this.type = "NumberLinear";
}, {
    $auto_properties: [ "path", "num1", "num2", "min", "max", "mapping" ],
    get: function(context) {
        if(!this.path) return null;
        var value = context.get(this.path).val();
        if(value === null) return null;
        if(this.max !== undefined && this.min !== undefined) {
            if(this.mapping == "logarithmic")
                value = (Math.log(value) - Math.log(this.min)) / (Math.log(this.max) - Math.log(this.min));
            else
                value = (value - this.min) / (this.max - this.min);
        }
        return this.num1 + value * (this.num2 - this.num1);
    },
    clone: function() {
        return new NumberLinear(this.path, this.num1, this.num2, this.min, this.max);
    }
});
Objects.NumberLinear = NumberLinear;
IV.serializer.registerObjectType("NumberLinear", NumberLinear);

var MappingExpression = IV.extend(Objects.Object, function(path, expression) {
    Objects.Object.call(this);
    this.path = path;
    this.expression = expression || "0";
    this.type = "MappingExpression";
    this._compile();
}, {
    $auto_properties: [ "path", "expression" ],
    postDeserialize: function() {
        this._compile();
    },
    $auto_properties_after: function(p, val) {
        this._compile();
    },
    _compile: function() {
        try {
            this._compiled = compile_expression(this.expression, this.path);
        } catch(e) {
        }
    },
    get: function(context) {
        if(!this.path) return null;
        try {
            return this._compiled({ }, context);
        } catch(e) {
            return null;
        }
    },
    clone: function() {
        return new MappingExpression(this.path, this.expression);
    }
});
Objects.MappingExpression = MappingExpression;
IV.serializer.registerObjectType("MappingExpression", MappingExpression);

// Color Linear Mapping.
var ColorLinear = IV.extend(Objects.Object, function(path, color1, color2, min, max) {
    Objects.Object.call(this);
    this.path = path;
    this.color1 = color1;
    this.color2 = color2;
    this.min = min;
    this.max = max;

    this.propertyUpdate();

    this.type = "ColorLinear";
    this.mapping = "linear";
}, {
    $auto_properties: [ "path", "color1", "color2", "min", "max", "mapping" ],
    $auto_properties_after: function() {
        this.propertyUpdate();
    },
    get: function(context) {
        if(!this.path || this.min === undefined || this.max === undefined)
            return null;
        var value = context.get(this.path).val();
        if(value === null) return null;
        if(this.mapping == "logarithmic")
            value = (Math.log(value) - Math.log(this.min)) / (Math.log(this.max) - Math.log(this.min));
        else
            value = (value - this.min) / (this.max - this.min);
        if(value < 0) value = 0; if(value > 1) value = 1;
        var tp = this.stops.length - 1;
        var idx1 = Math.floor(value * tp);
        if(idx1 < 0) idx1 = 0;
        if(idx1 >= tp) idx1 = tp - 1;
        var idx2 = idx1 + 1;
        var t = value * tp - idx1;
        return this.stops[idx1].interp(this.stops[idx2], t);
    },
    propertyUpdate: function() {
        var $this = this;
        this.stops = [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ].map(function(x) {
            return $this.color1.interpLab($this.color2, x);
        });
    },
    clone: function() {
        return new ColorLinear(this.path, this.color1, this.color2, this.min, this.max);
    }
});
Objects.ColorLinear = ColorLinear;
IV.serializer.registerObjectType("ColorLinear", ColorLinear);

// Linear Mapping.
var CategoricalMapping = IV.extend(Objects.Object, function(path, keys_values, fallback, value_type) {
    this.type = "CategoricalMapping";
    this.path = path;
    this.keys_values = keys_values;
    this.fallback = fallback;
    this.value_type = value_type;
}, {
    postDeserialize: function() {
        if(this.keys && this.values) {
            var vals = this.values;
            this.keys_values = this.keys.map(function(key, i) {
                return { key: key, value: vals[i] };
            });
            delete this.keys;
            delete this.values;
        }
    },
    $auto_properties: [ "path", "fallback", "$array:keys_values" ],
    get: function(context) {
        if(!this.path)
            return null;
        var value = context.get(this.path).val();
        for(var i = 0; i < this.keys_values.length; i++) {
            var key = this.keys_values[i].key;
            if(value == key) return this.keys_values[i].value;
        }
        return this.fallback;
    },
    clone: function() {
        return new CategoricalMapping(this.path, this.keys_values.slice(), this.fallback, this.value_type);
    }
});
Objects.CategoricalMapping = CategoricalMapping;
IV.serializer.registerObjectType("CategoricalMapping", CategoricalMapping);

// Point Offset.
var PointOffset = IV.extend(Objects.Object, function(point, offset) {
    Objects.Object.call(this);
    this.offset = offset;
    this.point = point;
    this.path = point.path;
    this.type = "PointOffset";
}, {
    get: function(context) {
        var pt = this.point.getPoint(context);
        return pt.add(this.offset);
    },
    getPath: function() {
        return this.point.getPath();
    },
    can: function(cap) {
        if(cap == "get-point") return true;
        return false;
    },
    beginMoveElement: function(context, path) {
        var rc = this.point.beginMoveElement(context, path);
        var $this = this;
        return {
            onMove: function(p0, p1) {
                rc.onMove(p0.sub($this.offset), p1.sub($this.offset));
            }
        };
    },
    clone: function() {
        return new PointOffset(this.point, this.offset);
    }
});
Objects.PointOffset = PointOffset;
IV.serializer.registerObjectType("PointOffset", PointOffset);

var ReferenceWrapper = IV.extend(Objects.Object, function(ref_path, refd_path, object) {
    Objects.Object.call(this);
    this.type = "ReferenceWrapper";
    this.obj = object;
    this.reference_path = ref_path;
    this.referenced_path = refd_path;
}, {
    get: function(context, p1, p2, p3, p4) {
        var ref_context = context.get(this.reference_path).getReference(this.referenced_path);
        return this.obj.get(ref_context, p1, p2, p3, p4);
    },
    getPath: function() {
        return this.reference_path;
    },
    beginMoveElement: function(context) {
        var ref_context = context.get(this.reference_path).getReference(this.referenced_path);
        return this.obj.beginMoveElement(ref_context);
    },
    clone: function() {
        return new ReferenceWrapper(this.reference_path, this.obj);
    }
});
Objects.ReferenceWrapper = ReferenceWrapper;
IV.serializer.registerObjectType("ReferenceWrapper", ReferenceWrapper);

})();

// iVisDesigner - scripts/core/objects/filters.js
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

var RangeFilter = IV.extend(Objects.Object, function(path, min, max) {
    Objects.Object.call(this);
    this.path = path;
    this.min = min;
    this.max = max;
    this.type = "RangeFilter";
}, {
    $auto_properties: [ "path", "min", "max" ],
    get: function(context) {
        if(!this.path) return true;
        var value = context.get(this.path).val();
        if(value === null) return null;
        if(this.min <= this.max)
            return value >= this.min && value <= this.max;
        return value >= this.min || value <= this.max;
    },
    clone: function() {
        return new RangeFilter(this.path, this.min, this.max);
    }
});
Objects.RangeFilter = RangeFilter;
IV.serializer.registerObjectType("RangeFilter", RangeFilter);

// Categorical filter.
var CategoricalFilter = IV.extend(Objects.Object, function(path, keys, is_black_list) {
    this.type = "CategoricalFilter";
    this.path = path;
    this.keys = keys;
    this.is_black_list = is_black_list ? true : false;
}, {
    $auto_properties: [ "path", "$array:keys", "is_black_list" ],
    get: function(context) {
        if(!this.path) return true;
        var value = context.get(this.path).val();
        var found = this.keys.indexOf(value.toString()) >= 0;
        return found ? !this.is_black_list : this.is_black_list;
    },
    clone: function() {
        return new CategoricalFilter(this.path, this.keys.slice(), this.is_black_list);
    }
});
Objects.CategoricalFilter = CategoricalFilter;
IV.serializer.registerObjectType("CategoricalFilter", CategoricalFilter);

var CombinedFilter = IV.extend(Objects.Object, function(path, filters, is_conjunctive) {
    this.type = "CombinedFilter";
    this.filters = filters ? filters : [];
    this.is_conjunctive = is_conjunctive ? true : false;
}, {
    $auto_properties: [ "$array:filters", "is_conjunctive" ],
    get: function(context) {
        if(this.is_conjunctive) {
            for(var i = 0; i < this.filters.length; i++) {
                if(!this.filters[i].get(context)) return false;
            }
            return true;
        } else {
            for(var i = 0; i < this.filters.length; i++) {
                if(this.filters[i].get(context)) return true;
            }
            return false;
        }
    },
});
Objects.CombinedFilter = CombinedFilter;
IV.serializer.registerObjectType("CombinedFilter", CombinedFilter);

// iVisDesigner - scripts/core/objects/style.js
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

Objects.PathStyle = IV.extend(Objects.Object, function(type) {
    Objects.Object.call(this);
    if(type == "Circle" || type == "Text" || type == "Bar") {
        this.actions = [
            {
                type: "fill",
                color: new Objects.Plain(IV.colors.default_fill)
            }
        ];
    } else if(type == "Line" || type == "Arc" || type == "Polyline" || type == "LineThrough") {
        this.actions = [
            {
                type: "stroke",
                color: new Objects.Plain(IV.colors.default_stroke),
                width: new Objects.Plain(1),
                join: new Objects.Plain("bevel"),
                cap: new Objects.Plain("butt")
            }
        ];
    } else {
        // Default attributes.
        this.actions = [
            {
                type: "fill",
                color: new Objects.Plain(IV.colors.default_halffill)
            },
            {
                type: "stroke",
                color: new Objects.Plain(IV.colors.default_stroke),
                width: new Objects.Plain(1),
                join: new Objects.Plain("bevel"),
                cap: new Objects.Plain("butt")
            }
        ];
    }
    this.type = "PathStyle";
}, {
    // path should be an array:
    // string: command, IV.Vector: location.
    renderPath: function(context, g, path) {
        var $this = this;
        this.actions.forEach(function(act) {
            if(act.enabled) {
                if(!act.enabled.get(context)) return;
            }
            $this["_perform_" + act.type](act, context, g, path);
        });
    },
    renderGuide: function(context, g, path) {
        g.strokeStyle = IV.colors.guide.toRGBA();
        g.lineCap = "butt";
        g.lineJoin = "bevel";
        g.ivGuideLineWidth();
        g.beginPath();
        this._run_path(g, path);
        g.stroke();
    },
    renderSelection: function(context, g, path) {
        g.strokeStyle = IV.colors.selection.toRGBA();
        g.lineCap = "butt";
        g.lineJoin = "bevel";
        g.ivGuideLineWidth();
        g.beginPath();
        this._run_path(g, path);
        g.stroke();
    },
    renderText: function(context, g, text, x, y, font) {
        var $this = this;
        this.actions.forEach(function(act) {
            if(act.enabled) {
                if(!act.enabled.get(context)) return;
            }
            $this["_perform_" + act.type + "_text"](act, context, g, text, x, y, font);
        });
    },
    clone: function() {
        var r = new Objects.PathStyle();
        r.actions = this.actions.map(function(act) {
            var c = { type: act.type };
            if(act.color) c.color = act.color.clone();
            if(act.width) c.width = act.width.clone();
            if(act.join) c.join = act.join.clone();
            if(act.cap) c.cap = act.cap.clone();
            return c;
        });
        return r;
    },
    _run_path: function(g, path) {
        // See http://www.w3.org/TR/2013/CR-2dcontext-20130806
        // for canvas's path specification.
        var i = 0;
        while(i < path.length) {
            var cmd = path[i++];
            // M pt: move to
            if(cmd == "M") {
                g.moveTo(path[i].x, path[i].y);
                i += 1;
            }
            // L pt: line to
            if(cmd == "L") {
                g.lineTo(path[i].x, path[i].y);
                i += 1;
            }
            if(cmd == "AT") {
                g.arcTo(path[i].x, path[i].y,
                        path[i + 1].x, path[i + 1].y,
                        path[i + 2]);
                i += 3;
            }
            // Z: close path
            if(cmd == "Z") {
                g.closePath();
            }
            // B c1 c2 pt: bezier curve
            if(cmd == "B") {
                g.bezierCurveTo(path[i].x, path[i].y,
                                path[i + 1].x, path[i + 1].y,
                                path[i + 2].x, path[i + 2].y);
                i += 3;
            }
            // Q c pt: quadratic curve
            if(cmd == "Q") {
                g.quadraticCurveTo(path[i].x, path[i].y,
                                path[i + 1].x, path[i + 1].y);
                i += 2;
            }
            // A pt radius angle1 angle2: arc
            // from angle1 to angle2, clockwise.
            if(cmd == "A") {
                if(path[i + 1] > 0) {
                    g.arc(path[i].x, path[i].y, path[i + 1], path[i + 2], path[i + 3]);
                }
                i += 4;
            }
            // E pt radiusX radiusY rotation angle1 angle2: ellipse
            if(cmd == "E") {
                if(path[i + 1] > 0 && path[i + 2] > 0) {
                    g.ellipse(path[i].x, path[i].y,
                              path[i + 1], path[i + 2],
                              path[i + 3],
                              path[i + 4],  path[i + 5]);
                }
                i += 6;
            }
            // C pt radius: circle
            if(cmd == "C") {
                if(path[i + 1] > 0) {
                    g.arc(path[i].x, path[i].y, path[i + 1], 0, Math.PI * 2);
                }
                i += 2;
            }
            if(cmd == "POLYLINE") {
                var n = path[i++];
                var c = path[i++];
                if(c == "C") {
                    for(var k = 0; k < n; k++) {
                        var p2 = path[i + (k + 1) % n];
                        g.lineTo(p2.x, p2.y);
                    }
                } else {
                    for(var k = 0; k < n - 1; k++) {
                        var p2 = path[i + k + 1];
                        g.lineTo(p2.x, p2.y);
                    }
                }
                i += n;
            }
            if(cmd == "CATMULLROM") {
                var n = path[i++];
                var c = path[i++];
                if(c == "C") {
                    for(var k = 0; k < n; k++) {
                        var p0 = path[i + (n + k - 1) % n];
                        var p1 = path[i + k];
                        var p2 = path[i + (k + 1) % n];
                        var p3 = path[i + (k + 2) % n];
                        IV.catmullRomCurveTo(g, p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
                    }
                } else {
                    for(var k = 0; k < n - 1; k++) {
                        var p0 = path[i + Math.max(0, k - 1)];
                        var p1 = path[i + k];
                        var p2 = path[i + k + 1];
                        var p3 = path[i + Math.min(n - 1, k + 2)];
                        IV.catmullRomCurveTo(g, p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
                    }
                }
                i += n;
            }
        }
    },
    _perform_stroke: function(act, context, g, path) {
        var w = act.width.get(context);
        if(w <= 0) return;
        var color = act.color.get(context).toRGBA();
        g.strokeStyle = color;
        g.lineWidth = w;
        g.lineCap = act.cap.get(context);
        g.lineJoin = act.join.get(context);
        g.miterLimit = 10 * g.iv_pre_ratio; // adapt with pre-scale ratio.
        g.beginPath();
        this._run_path(g, path);
        g.stroke();
    },
    _perform_fill: function(act, context, g, path) {
        var color = act.color.get(context).toRGBA();
        g.fillStyle = color;
        g.beginPath();
        this._run_path(g, path);
        g.fill();
    },
    _perform_stroke_text: function(act, context, g, text, x, y, font) {
        var w = act.width.get(context);
        if(w <= 0) return;
        var color = act.color.get(context).toRGBA();
        g.strokeStyle = color;
        g.lineWidth = w;
        g.lineCap = act.cap.get(context);
        g.lineJoin = act.join.get(context);
        g.miterLimit = 10 * g.iv_pre_ratio; // adapt with pre-scale ratio.
        g.ivSetFont(font);
        g.ivStrokeText(text, x, y);
    },
    _perform_fill_text: function(act, context, g, text, x, y, font) {
        var color = act.color.get(context).toRGBA();
        g.fillStyle = color;
        g.ivSetFont(font);
        g.ivFillText(text, x, y);
    }
});

IV.serializer.registerObjectType("PathStyle", Objects.PathStyle);

var FontStyle = IV.extend(Objects.Object, function(info) {
    this.fillDefault();
    this.type = "FontStyle";
}, {
    $auto_properties: [ "font_family", "font_size" ],
    fillDefault: function() {
        if(this.font_family === undefined) this.font_family = "Arial";
        if(this.font_size === undefined) this.font_size = 14;
    },
    postDeserialize: function() {
        this.fillDefault();
    },
    getPropertyContext: function() {
        var $this = this;
        return [
            make_prop_ctx(this, "font_family", "Family", undefined, "plain-string"),
            make_prop_ctx(this, "font_size", "Size", undefined, "plain-number")
        ];
    },
    getFont: function() {
        return {
            family: this.font_family,
            size: this.font_size
        };
    }
});
IV.serializer.registerObjectType("FontStyle", FontStyle);

var TickStyle = IV.extend(Objects.Object, function(info) {
    this.fillDefault();
    this.type = "TickStyle";
}, {
    $auto_properties: [ "show_ticks", "tick_size", "tick_width", "rotation", "tick_count", "tick_color", "tick_format" ],
    fillDefault: function() {
        if(this.show_ticks === undefined) this.show_ticks = true;
        if(this.tick_width === undefined) this.tick_width = 1;
        if(this.tick_size === undefined) this.tick_size = 2;
        if(this.tick_count === undefined) this.tick_count = 5;
        if(this.tick_color === undefined) this.tick_color = IV.colors.default_guide;
        if(this.tick_format === undefined) this.tick_format = "g";
        if(this.rotation === undefined) this.rotation = 0;
        if(this.font === undefined) this.font = new FontStyle();
    },
    postDeserialize: function() {
        this.fillDefault();
    },
    getPropertyContext: function() {
        var $this = this;
        return [
            make_prop_ctx(this, "show_ticks", "Show", undefined, "plain-bool"),
            make_prop_ctx(this, "tick_size", "Size", undefined, "plain-number"),
            make_prop_ctx(this, "tick_width", "Width", undefined, "plain-number"),
            make_prop_ctx(this, "rotation", "Rotation", undefined, "plain-number"),
            make_prop_ctx(this, "tick_count", "Count", undefined, "plain-string"),
            make_prop_ctx(this, "tick_color", "Color", undefined, "plain-color"),
            make_prop_ctx(this, "tick_format", "Format", undefined, "plain-string"),
            {
                name: "Font",
                type: "nested",
                properties: $this.font.getPropertyContext()
            }
        ];
    }
});
IV.serializer.registerObjectType("TickStyle", TickStyle);

// iVisDesigner - scripts/core/objects/track.js
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

(function() {

var Track = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.path = info.path;
    this.type = "Track";
    this.anchor1 = info.anchor1;
    this.anchor2 = info.anchor2;
    this.min = info.min !== undefined ? info.min : new IV.objects.Plain(0);
    this.max = info.max !== undefined ? info.max : new IV.objects.Plain(100);
    this.guide_path = IV.Path.commonPrefix([ this.anchor1.getPath(), this.anchor2.getPath() ]);
    this.fillDefault();
}, {
    $auto_properties: [ "path", "anchor1", "anchor2", "min", "max", "mapping", "guide_path" ],
    fillDefault: function() {
        if(this.tick_style === undefined) this.tick_style = new TickStyle();
        if(this.mapping === undefined) this.mapping = "linear";
        //if(this.additional_paths === undefined) this.additional_paths = [];
    },
    postDeserialize: function() {
        this.fillDefault();
    },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    getPath: function() {
        return this.path;
    },
    getAnchors: function() {
        var r = [];
        if(this.anchor1.type == "Plain") r.push(this.anchor1.obj);
        if(this.anchor2.type == "Plain") r.push(this.anchor2.obj);
        return r;
    },
    getGuidePath: function() {
        return this.guide_path;
    },
    get: function(context, type) {
        var p1 = this.anchor1.getPoint(context);
        var p2 = this.anchor2.getPoint(context);
        if(type == "anchor1") return p1;
        if(type == "anchor2") return p2;
        var min = this.min.get(context);
        var max = this.max.get(context);
        var value;
        if(type && type.constructor == IV.Path) {
            value = context.get(type).val();
        } else {
            value = context.get(this.path).val();
        }
        if(value === null || p1 === null || p2 === null || min === null || max === null) return null;
        if(this.mapping == "logarithmic") {
            if(value <= 0) value = -0.05;
            else value = (Math.log10(value) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
        } else {
            value = (value - min) / (max - min);
        }
        var r = p1.interp(p2, value);
        r.ex = p2.sub(p1).normalize();
        r.ey = r.ex.rotate90();
        return r;
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "guide_path", "Selector", "Track", "path"),
            make_prop_ctx($this, "path", "Value", "Track", "path"),
            //make_prop_ctx($this, "additional_paths", "Values", "Track", "*path"),
            make_prop_ctx($this, "min", "Min", "Track", "number"),
            make_prop_ctx($this, "max", "Max", "Track", "number"),
            make_prop_ctx($this, "anchor1", "Anchor1", "Track", "point"),
            make_prop_ctx($this, "anchor2", "Anchor2", "Track", "point"),
            make_prop_ctx($this, "mapping", "Mapping", "Track", "string",
                [{ name: "linear", display: "Linear" }, { name: "logarithmic", display: "Logarithmic" }]
            ),
            {
                name: "Tick",
                group: "Track",
                type: "nested",
                properties: $this.tick_style.getPropertyContext()
            }
        ]);
    },
    enumerateGuide: function(data, callback) {
        var $this = this;
        this.guide_path.enumerate(data, function(context) {
            var p1 = $this.anchor1.getPoint(context);
            var p2 = $this.anchor2.getPoint(context);
            callback(p1, p2, context);
        });
    },
    renderGuide: function(g, data) {
        this.enumerateGuide(data, function(p1, p2) {
            g.strokeStyle = "rgba(128,128,128,0.5)";
            g.fillStyle = "rgba(128,128,128,1)";

            var r = g.ivGuideLineWidth() * 2;

            g.beginPath();
            g.moveTo(p1.x, p1.y);
            g.lineTo(p2.x, p2.y);
            g.stroke();

            g.beginPath();
            g.arc(p1.x, p1.y, r, 0, Math.PI * 2);
            g.fill();

            g.beginPath();
            g.arc(p2.x, p2.y, r, 0, Math.PI * 2);
            g.fill();
        });
    },
    renderGuideSelected: function(g, data) {
        this.enumerateGuide(data, function(p1, p2) {
            g.strokeStyle = IV.colors.selection.toRGBA();
            g.fillStyle = IV.colors.selection.toRGBA();

            var r = g.ivGuideLineWidth() * 3;

            g.beginPath();
            g.moveTo(p1.x, p1.y);
            g.lineTo(p2.x, p2.y);
            g.stroke();

            g.beginPath();
            g.arc(p1.x, p1.y, r, 0, Math.PI * 2);
            g.fill();

            g.beginPath();
            g.arc(p2.x, p2.y, r, 0, Math.PI * 2);
            g.fill();
        });
    },
    getD3Scale: function(context) {
        var scale = d3.scale.linear();
        if(this.mapping == "logarithmic") {
            scale = d3.scale.log();
            scale.base(10);
        }
        scale.domain([ this.min.get(context), this.max.get(context) ]);
        scale.range([0, 1]);
        return scale;
    },
    render: function(g, data) {
        var $this = this;
        var tick_style = $this.tick_style;
        if(tick_style.show_ticks) {
            g.strokeStyle = tick_style.tick_color.toRGBA();
            g.fillStyle = tick_style.tick_color.toRGBA();
            g.lineWidth = tick_style.tick_width;
            g.ivSetFont(tick_style.font.getFont());
            var format = d3.format(tick_style.tick_format);
            if(tick_style.tick_format.slice(-2) == ".T") {
                var tf = d3.time.format(tick_style.tick_format.slice(0, -2));
                format = function(val) {
                    return tf(new Date(val * 1000));
                };
            }
            $this.enumerateGuide(data, function(p1, p2, ctx) {
                var dir = p2.sub(p1).normalize();
                var len = p2.distance(p1);
                g.save();
                g.translate(p1.x, p1.y);
                g.rotate(Math.atan2(dir.y, dir.x));

                g.beginPath();
                g.moveTo(0, 0);
                g.lineTo(len, 0);
                g.stroke();

                var scale = $this.getD3Scale(ctx);
                scale.range([0, len]);

                var ts = tick_style.tick_size;
                var ticks = scale.ticks(Math.round(tick_style.tick_count));
                for(var i = 0; i < ticks.length; i++) {
                    var v = scale(ticks[i]);
                    g.beginPath();
                    g.moveTo(v, -ts);
                    g.lineTo(v, ts);
                    g.stroke();
                }
                for(var i = 0; i < ticks.length; i++) {
                    var ti = ticks[i];
                    if($this.mapping == "logarithmic")
                        if(Math.abs(Math.round(Math.log10(ti)) - Math.log10(ti)) > 1e-6)
                            continue;
                    var v = scale(ti);
                    var text = format(ti);

                    var font_height = tick_style.font.font_size;
                    var rotation = tick_style.rotation;
                    // Make rotation within -180 to 180.
                    rotation = rotation % 360;
                    if(rotation < 0) rotation += 360;
                    if(rotation > 180) rotation -= 360;
                    var rotation_rad = rotation / 180.0 * Math.PI;
                    var font_width = g.ivMeasureText(text).width;
                    var sh = Math.min(Math.abs(rotation) / 10, 1);
                    g.textAlign = "center";
                    var roffset = tick_style.font.font_size / 5;
                    if(ts >= 0) {
                        var rsh = Math.cos(rotation_rad) * font_width / 2 * sh;
                        if(rotation > 0) rsh = -rsh;
                        var rsw = 0;
                        if(Math.abs(rotation) < 90) rsw = Math.abs(Math.cos(rotation_rad)) * font_height;
                        g.save();
                        g.translate(v + rsh, -roffset - ts - Math.abs(Math.sin(rotation_rad)) * font_width / 2 - rsw);
                        g.rotate(rotation_rad);
                        g.ivFillText(text, 0, 0);
                        g.restore();
                    } else {
                        var rsh = Math.cos(rotation_rad) * font_width / 2 * sh;
                        if(rotation < 0) rsh = -rsh;
                        var rsw = 0;
                        if(Math.abs(rotation) > 90) rsw = Math.abs(Math.cos(rotation_rad)) * font_height;
                        g.save();
                        g.translate(v + rsh, roffset - ts + Math.abs(Math.sin(rotation_rad)) * font_width / 2 + rsw);
                        g.rotate(rotation_rad);
                        g.ivFillText(text, 0, 0);
                        g.restore();
                        //g.fillText(text, v, -ts + font_height);
                    }
                }
                g.restore();
            });
        }
    },
    select: function(pt, data, action) {
        if(action == "move-element") return null;
        var $this = this;
        var rslt = null;
        this.enumerateGuide(data, function(p1, p2) {
            var d = IV.geometry.pointLineSegmentDistance(pt, p1, p2);
            var threshold = 4.0 / pt.view_scale;
            if(d < threshold) {
                rslt = { distance: d };
                if(action == "move") {
                    var move_targets = [];
                    var can_move = function(a) { return a.type == "Plain" || a.type == "PointOffset"; };
                    if(p1.distance(pt) < threshold) {
                        if(can_move($this.anchor1)) {
                            move_targets.push($this.anchor1);
                        }
                    } else if(p2.distance(pt) < threshold) {
                        if(can_move($this.anchor2)) {
                            move_targets.push($this.anchor2);
                        }
                    } else if(can_move($this.anchor1) && can_move($this.anchor2)) {
                        move_targets.push($this.anchor1);
                        move_targets.push($this.anchor2);
                    }
                    if(move_targets.length > 0) {
                        rslt.originals = move_targets.map(function(plain) {
                            if(plain.type == "Plain")
                                return plain.obj;
                            if(plain.type == "PointOffset")
                                return plain.offset;
                        });
                        rslt.onMove = function(p0, p1, magnetics) {
                            var best_shift = { x: 0, y: 0 };
                            var accept_info = null;
                            var best_distance = 1e100;
                            var actions = [];

                            for(var i = 0; i < move_targets.length; i++) {
                                if(move_targets[i].type == "Plain") {
                                    var p = p1.sub(p0).add(this.originals[i]);
                                    var np = magnetics.modify(p.x, p.y);
                                    if(np) {
                                        (function(np) {
                                            var sh = { x: np.x - p.x, y: np.y - p.y };
                                            var d = sh.x * sh.x + sh.y * sh.y;
                                            if(best_distance > d) {
                                                best_distance = d;
                                                best_shift = sh;
                                                accept_info = [ np, np.x, np.y ];
                                            }
                                        })(np);
                                    }
                                }
                            }

                            if(accept_info) {
                                magnetics.accept(accept_info[0], accept_info[1], accept_info[2]);
                            }

                            for(var i = 0; i < move_targets.length; i++) {
                                if(move_targets[i].type == "Plain") {
                                    var p = p1.sub(p0).add(this.originals[i]);
                                    p.x += best_shift.x;
                                    p.y += best_shift.y;
                                    actions.push(new IV.actions.SetDirectly(move_targets[i], "obj", p));
                                }
                                if(move_targets[i].type == "PointOffset")
                                    var new_offset = p1.sub(p0).add(this.originals[i]).add(
                                        new IV.Vector(best_shift.x, best_shift.y)
                                    );
                                    actions.push(new IV.actions.SetDirectly(move_targets[i], "offset", p));
                            }
                            return {
                                actions: actions,
                                trigger_render: "main,back,front"
                            };
                        };
                    }
                }
            }
        });
        return rslt;
    },
    beginMoveElement: function(context, d, path) {
        if(!path) path = this.path;
        var $this = this;
        var a1 = this.anchor1.getPoint(context);
        var a2 = this.anchor2.getPoint(context);
        var min = this.min.get(context);
        var max = this.max.get(context);
        if(!d) d = a2.sub(a1).rotate90();
        return {
            onMove: function(p0, p1) {
                var new_value = p1.sub(a1).cross(d) / a2.sub(a1).cross(d);
                if($this.mapping == "logarithmic") {
                    new_value = Math.exp10(new_value * (Math.log10(max) - Math.log10(min)) + Math.log10(min));
                } else {
                    new_value = new_value * (max - min) + min;
                }
                context.set(path, new_value);
            }
        };
    }
});

// Point Offset.
var TrackWrapper = IV.extend(Objects.Object, function(track, path) {
    Objects.Object.call(this);
    this.track = track;
    this.path = path;
    this.type = "TrackWrapper";
}, {
    get: function(context) {
        var pt = this.track.get(context, this.path);
        return pt;
    },
    beginMoveElement: function(context) {
        return this.track.beginMoveElement(context, null, this.path);
    },
    can: function(cap) {
        if(cap == "get-point") return true;
        return false;
    },
    clone: function() {
        return new TrackWrapper(this.track, this.path);
    }
});
Objects.TrackWrapper = TrackWrapper;
IV.serializer.registerObjectType("TrackWrapper", TrackWrapper);

var Scatter = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.type = "Scatter";
    this.track1 = info.track1;
    this.track2 = info.track2;
    var resolve_wrapper = function(o) {
        if(o.type == "ReferenceWrapper") return resolve_wrapper(o.obj);
        return o;
    };
    this.real_track1 = resolve_wrapper(this.track1);
    this.real_track2 = resolve_wrapper(this.track2);
    this.path = IV.Path.commonPrefix([ this.track1.getPath(), this.track2.getPath() ]);
    this.guide_path = IV.Path.commonPrefix([ this.real_track1.getGuidePath(), this.real_track2.getGuidePath() ]);
    this.fillDefault();
}, {
    $auto_properties: [ "show_x_ticks", "show_y_ticks", "track1", "track2", "path", "guide_path" ],
    fillDefault: function() {
        if(this.show_x_ticks === undefined) this.show_x_ticks = true;
        if(this.show_y_ticks === undefined) this.show_y_ticks = true;
        if(!this.real_track1) this.real_track1 = this.track1;
        if(!this.real_track2) this.real_track2 = this.track2;
    },
    postDeserialize: function() {
        this.fillDefault();
    },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    getPath: function() {
        return this.path;
    },
    getGuidePath: function() {
        return this.guide_path;
    },
    get: function(context) {
        var p1 = this.track1.getPoint(context);
        var p2 = this.track2.getPoint(context);
        if(p1 === null || p2 === null) return null;

        var d2 = this.track1.get(context, "anchor2")
                .sub(this.track1.get(context, "anchor1")).rotate90();
        var d1 = this.track2.get(context, "anchor2")
                .sub(this.track2.get(context, "anchor1"));

        var p = d1.scale(p2.sub(p1).dot(d2) / d1.dot(d2)).add(p1);
        p.ex = d1.normalize();
        p.ey = d2.rotate90().normalize();
        return p;
    },
    enumerateGuide: function(data, callback) {
        var $this = this;
        this.guide_path.enumerate(data, function(context) {
            var p1 = $this.track1.get(context, "anchor1");
            var p2 = $this.track1.get(context, "anchor2");
            var q1 = $this.track2.get(context, "anchor1");
            var q2 = $this.track2.get(context, "anchor2");
            callback(p1, p2, q1, q2, context);
        });
    },
    _getmarkers: function(p1, p2, q1, q2) {
        var d2 = p2.sub(p1).rotate90();
        var d1 = q2.sub(q1);
        var scatter = function(p1, p2) {
            return d1.scale(p2.sub(p1).dot(d2) / d1.dot(d2)).add(p1);
        };
        var kscatter = function(k1, k2) {
            return scatter(p1.interp(p2, k1), q1.interp(q2, k2));
        };
        var s = 0.05;
        var s1 = 0.06;
        var s2 = 0.04;
        var lines = [
            [kscatter(0, s), kscatter(0, 1 - s)],
            [kscatter(1, s), kscatter(1, 1 - s)],
            [kscatter(s, 0), kscatter(1 - s, 0)],
            [kscatter(s, 1), kscatter(1 - s, 1)],
            [kscatter(s1, s), kscatter(s2, s)],
            [kscatter(1 - s1, s), kscatter(1 - s2, s)],
            [kscatter(s1, 1 - s), kscatter(s2, 1 - s)],
            [kscatter(1 - s1, 1 - s), kscatter(1 - s2, 1 - s)],
            [kscatter(s, s1), kscatter(s, s2)],
            [kscatter(s, 1 - s1), kscatter(s, 1 - s2)],
            [kscatter(1 - s, s1), kscatter(1 - s, s2)],
            [kscatter(1 - s, 1 - s1), kscatter(1 - s, 1 - s2)]
        ];
        return lines;
    },
    renderGuide: function(g, data) {
        var $this = this;
        $this.enumerateGuide(data, function(p1, p2, q1, q2) {
            g.strokeStyle = "rgba(128,128,128,0.5)";
            g.fillStyle = "rgba(128,128,128,1)";
            g.ivGuideLineWidth();
            $this._getmarkers(p1, p2, q1, q2).forEach(function(l) {
                g.beginPath();
                l[0].callMoveTo(g);
                l[1].callLineTo(g);
                g.stroke();
            });
        });
    },
    renderGuideSelected: function(g, data) {
        var $this = this;
        $this.enumerateGuide(data, function(p1, p2, q1, q2) {
            g.strokeStyle = IV.colors.selection.toRGBA();
            g.fillStyle = IV.colors.selection.toRGBA();
            g.ivGuideLineWidth();
            $this._getmarkers(p1, p2, q1, q2).forEach(function(l) {
                g.beginPath();
                l[0].callMoveTo(g);
                l[1].callLineTo(g);
                g.stroke();
            });
        });
    },
    render: function(g, data) {
        var $this = this;
        $this.enumerateGuide(data, function(p1, p2, q1, q2, context) {
            var scale1 = $this.real_track1.getD3Scale(context);
            var scale2 = $this.real_track2.getD3Scale(context);
            var d2 = p2.sub(p1);
            var d2r = d2.rotate90();
            var d1 = q2.sub(q1);
            var p = d1.scale(q1.sub(p1).dot(d2r) / d1.dot(d2r)).add(p1);
            g.ivGuideLineWidth();
            if($this.show_x_ticks) {
                g.strokeStyle = $this.real_track1.tick_style.tick_color.toRGBA(0.1);
                var ticks = scale1.ticks($this.real_track2.tick_style.tick_count).map(scale1);
                for(var i = 0; i < ticks.length; i++) {
                    var s = p.add(d2.scale(ticks[i]));
                    var t = s.add(d1);
                    g.beginPath();
                    s.callMoveTo(g);
                    t.callLineTo(g);
                    g.stroke();
                }
            }
            if($this.show_y_ticks) {
                g.strokeStyle = $this.real_track2.tick_style.tick_color.toRGBA(0.1);
                var ticks = scale2.ticks($this.real_track2.tick_style.tick_count).map(scale2);
                for(var i = 0; i < ticks.length; i++) {
                    var s = p.add(d1.scale(ticks[i]));
                    var t = s.add(d2);
                    g.beginPath();
                    s.callMoveTo(g);
                    t.callLineTo(g);
                    g.stroke();
                }
            }
        });
    },
    select: function(pt, data, action) {
        if(action == "move-element") return null;
        var $this = this;
        var rslt = null;
        $this.enumerateGuide(data, function(p1, p2, q1, q2) {
            $this._getmarkers(p1, p2, q1, q2).forEach(function(l) {
                var d = IV.geometry.pointLineSegmentDistance(pt, l[0], l[1]);
                if(d < 4.0 / pt.view_scale) rslt = { distance: d };
            });
        });
        return rslt;
    },
    beginMoveElement: function(context) {
        d1 = this.track1.get(context, "anchor1").sub(this.track1.get(context, "anchor2"));
        d2 = this.track2.get(context, "anchor1").sub(this.track2.get(context, "anchor2"));
        var c1 = this.track1.beginMoveElement(context, d2);
        var c2 = this.track2.beginMoveElement(context, d1);
        return {
            onMove: function(p0, p1) {
                c1.onMove(p0, p1);
                c2.onMove(p0, p1);
            }
        };
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "guide_path", "Selector", "Scatter", "path"),
            make_prop_ctx($this, "path", "Value", "Scatter", "path"),
            make_prop_ctx(this, "show_x_ticks", "XTicks", "Scatter", "plain-bool"),
            make_prop_ctx(this, "show_y_ticks", "YTicks", "Scatter", "plain-bool")
        ]);
    }
});

Objects.Track = Track;
Objects.Scatter = Scatter;

IV.serializer.registerObjectType("Track", Track);
IV.serializer.registerObjectType("Scatter", Scatter);
})();

// iVisDesigner - scripts/core/objects/shapes.js
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

Objects.Shape = IV.extend(Objects.Object,function(info) {
    this.path = info.path;
    if(info.style)
        this.style = info.style;
    else
        this.style = new Objects.PathStyle(this.type);
    if(info.filter)
        this.filter = info.filter;
    else
        this.filter = null;
}, {
    $auto_properties: [ "path", "filter" ],
    render: function(g, data) {
        var $this = this;
        $this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            $this.shapePaths(context, function(path) {
                $this.style.renderPath(context, g, path);
            });
        });
    },
    renderSelected: function(g, data, context) {
        var $this = this;
        var draw_with_context = function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            $this.shapePaths(context, function(path) {
                $this.style.renderSelection(context, g, path);
            });
        };
        if(context) draw_with_context(context);
        else $this.path.enumerate(data, draw_with_context);
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path", "Selector", "Shape", "path"),
            make_prop_ctx($this, "filter", "Filter", "Shape", "filter")
        ]);
    }
});

Objects.Circle = IV.extend(Objects.Shape, function(info) {
    this.type = "Circle";
    Objects.Shape.call(this, info);
    // Center.
    this.center = info.center ? info.center : new Objects.Plain(new IV.Vector(0, 0));
    this.radius = info.radius ? info.radius : new Objects.Plain(2);
}, {
    $auto_properties: [ "radius", "center" ],
    shapePaths: function(context, cb) {
        var c = this.center.getPoint(context);
        var r = this.radius.get(context);
        if(c === null || r === null) return;
        cb([ "C", c, r ]);
    },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    get: function(context) {
        return this.center.getPoint(context);
    },
    getPoint: function(context) {
        return this.center.getPoint(context);
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "center", "Center", "Shape", "point"),
            make_prop_ctx($this, "radius", "Radius", "Shape", "number")
        ]);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            var c = $this.center.getPoint(context);
            var radius = $this.radius.get(context);
            if(c === null || radius === null) return;
            var d = Math.abs(pt.distance(c) - radius);
            if(d <= 4.0 / pt.view_scale) {
                if(!rslt || rslt.distance > d) {
                    rslt = { distance: d, context: context.clone() };
                    make_anchor_move_context(rslt, $this.center, action);
                }
            }
        });
        return rslt;
    },
    lasso: function(polygon, data, callback) {
        var $this = this;
        var contexts = [];
        this.path.enumerate(data, function(context) {
            var c = $this.center.getPoint(context);
            if(c) {
                if(IV.geometry.insidePolygon(polygon, c)) {
                    callback($this, context);
                }
            }
        });
        if(contexts.length == 0) return null;
        return contexts;
    },
    beginMoveElement: function(context) {
        return this.center.beginMoveElement(context);
    }
});

Objects.Line = IV.extend(Objects.Shape, function(info) {
    this.type = "Line";
    Objects.Shape.call(this, info);
    this.point1 = info.point1;
    this.point2 = info.point2;
}, {
    $auto_properties: [ "point1", "point2" ],
    shapePaths: function(context, cb) {
        var p1 = this.point1.getPoint(context);
        var p2 = this.point2.getPoint(context);
        if(p1 === null || p2 === null) return;
        cb([ "M", p1, "L", p2 ]);
    },
    getLine: function(context) {
        var p1 = this.point1.getPoint(context);
        var p2 = this.point2.getPoint(context);
        if(p1 === null || p2 === null) return null;
        return [p1, p2];
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "point1", "Point1", "Shape", "point"),
            make_prop_ctx($this, "point2", "Point2", "Shape", "point")
        ]);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        var anchor_selected = false;
        this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 === null || p2 === null) return;
            var threshold = 4.0 / pt.view_scale, d;
            d = Math.abs(pt.distance(p1));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point1, action);
                anchor_selected = true;
            }
            d = Math.abs(pt.distance(p2));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point2, action);
                anchor_selected = true;
            }
            d = IV.geometry.pointLineSegmentDistance(pt, p1, p2);
            if(!anchor_selected && d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
            }
        });
        return rslt;
    },
    lasso: function(polygon, data, callback) {
        var $this = this;
        var contexts = [];
        this.path.enumerate(data, function(context) {
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 && p2) {
                if(IV.geometry.lineIntersectPolygon(polygon, p1, p2)) {
                    callback($this, context);
                }
            }
        });
        if(contexts.length == 0) return null;
        return contexts;
    }
});

Objects.Bezier = IV.extend(Objects.Shape, function(info) {
    this.type = "Bezier";
    Objects.Shape.call(this, info);
    this.point1 = info.point1;
    this.point2 = info.point2;
    this.control1 = info.control1;
    this.control2 = info.control2;
}, {
    $auto_properties: [ "point1", "point2", "control1", "control2" ],
    shapePaths: function(context, cb) {
        var p1 = this.point1.getPoint(context);
        var p2 = this.point2.getPoint(context);
        var c1 = this.control1.getPoint(context);
        var c2 = this.control2.getPoint(context);
        if(p1 === null || p2 === null || c1 === null || c2 === null) return;
        cb([ "M", p1, "B", c1, c2, p2 ]);
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "point1", "Point1", "Shape", "point"),
            make_prop_ctx($this, "control1", "Control1", "Shape", "point"),
            make_prop_ctx($this, "control2", "Control2", "Shape", "point"),
            make_prop_ctx($this, "point2", "Point2", "Shape", "point")
        ]);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        var anchor_selected = false;
        this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 === null || p2 === null) return;
            var threshold = 4.0 / pt.view_scale, d;
            d = Math.abs(pt.distance(p1));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point1, action);
                anchor_selected = true;
            }
            d = Math.abs(pt.distance(p2));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point2, action);
                anchor_selected = true;
            }
            d = IV.geometry.pointLineSegmentDistance(pt, p1, p2);
            if(!anchor_selected && d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
            }
        });
        return rslt;
    },
    lasso: function(polygon, data, callback) {
        var $this = this;
        var contexts = [];
        this.path.enumerate(data, function(context) {
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 && p2) {
                if(IV.geometry.lineIntersectPolygon(polygon, p1, p2)) {
                    callback($this, context);
                }
            }
        });
        if(contexts.length == 0) return null;
        return contexts;
    }
});

Objects.Arc = IV.extend(Objects.Shape, function(info) {
    this.type = "Arc";
    Objects.Shape.call(this, info);
    this.point1 = info.point1;
    this.point2 = info.point2;
    this.radius = info.radius;
}, {
    $auto_properties: [ "point1", "point2", "radius" ],
    shapePaths: function(context, cb) {
        var arc = this.getArc(context);
        if(arc === null) return;
        cb([ "A" ].concat(arc));
    },
    getArc: function(context) {
        var p1 = this.point1.getPoint(context);
        var p2 = this.point2.getPoint(context);
        var r = this.radius.get(context);
        if(p1 === null || p2 === null || r === null) return null;
        var dp = p2.sub(p1);
        var len = dp.length();
        var direction = dp.rotate90().scale(1.0 / len);
        var h = r * len;
        r = h / 2 + len * len / 8 / h;
        direction = direction.scale(h - r);
        o = p1.add(p2).scale(0.5).add(direction);
        var dp1 = p1.sub(o);
        var dp2 = p2.sub(o);
        var angle1 = Math.atan2(dp1.y, dp1.x);
        var angle2 = Math.atan2(dp2.y, dp2.x);
        if(r > 0) {
            return [ o, r, angle2, angle1 ];
        } else {
            return [ o, -r, angle1, angle2 ];
        }
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "point1", "Point1", "Shape", "point"),
            make_prop_ctx($this, "point2", "Point2", "Shape", "point"),
            make_prop_ctx($this, "radius", "Radius", "Shape", "number")
        ]);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        var anchor_selected = false;
        this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 === null || p2 === null) return;
            var threshold = 4.0 / pt.view_scale, d;
            d = Math.abs(pt.distance(p1));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point1, action);
                anchor_selected = true;
            }
            d = Math.abs(pt.distance(p2));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point2, action);
                anchor_selected = true;
            }
            var arcinfo = $this.getArc(context);
            if(arcinfo) {
                d = IV.geometry.pointArcDistance(pt, arcinfo[0], arcinfo[1], arcinfo[2], arcinfo[3]);
            }
            if(!anchor_selected && d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
            }
        });
        return rslt;
    },
    lasso: function(polygon, data, callback) {
        var $this = this;
        var contexts = [];
        this.path.enumerate(data, function(context) {
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 && p2) {
                if(IV.geometry.lineIntersectPolygon(polygon, p1, p2)) {
                    callback($this, context);
                }
            }
        });
        if(contexts.length == 0) return null;
        return contexts;
    }
});

Objects.Polyline = IV.extend(Objects.Shape, function(info) {
    this.type = "Polyline";
    Objects.Shape.call(this, info);
    this.points = info.points;
    this.curved = info.curved ? true : false;
    this.closed = info.closed ? true : false;
}, {
    $auto_properties: [ "curved", "closed" ],
    postDeserialize: function() {
        if(!this.curved) this.curved = false;
        if(!this.closed) this.closed = false;
    },
    shapePaths: function(context, cb) {
        var pts = this.points.map(function(p) { return p.getPoint(context); });
        var desc = ["M", pts[0], this.curved ? "CATMULLROM" : "POLYLINE", pts.length, this.closed ? "C" : "L"];
        for(var i in pts) {
            if(pts[i] === null) return;
            desc.push(pts[i]);
        }
        cb(desc);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            var p1 = null;
            var threshold = 4.0 / pt.view_scale, d, anchor_selected = false;
            for(var i = 0; i < $this.points.length; i++) {
                var p2 = $this.points[i].getPoint(context);
                if(p2 === null) return;
                d = Math.abs(pt.distance(p2));
                if(d < threshold && (!rslt || rslt.distance > d)) {
                    rslt = { distance: d, context: context.clone() };
                    make_anchor_move_context(rslt, $this.points[i], action);
                    anchor_selected = true;
                }
                if(p1 !== null) {
                    d = IV.geometry.pointLineSegmentDistance(pt, p1, p2);
                    if(!anchor_selected && d < threshold && (!rslt || rslt.distance > d)) {
                        rslt = { distance: d, context: context.clone() };
                    }
                }
                p1 = p2;
            }
        });
        return rslt;
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "closed", "Closed", "Shape", "plain-bool"),
            make_prop_ctx($this, "curved", "Curved", "Shape", "plain-bool")
        ]);
    },
});

Objects.Bar = IV.extend(Objects.Shape, function(info) {
    this.type = "Bar";
    Objects.Shape.call(this, info);
    this.point1 = info.point1;
    this.point2 = info.point2;
    this.width = info.width;
}, {
    $auto_properties: [ "width", "point1", "point2" ],
    shapePaths: function(context, cb) {
        var p1 = this.point1.getPoint(context);
        var p2 = this.point2.getPoint(context);
        if(p1 === null || p2 === null) return;
        var d = p1.sub(p2).normalize().rotate90().scale(0.5 * this.width.get(context));
        cb([
            "M", p1.add(d),
            "L", p1.sub(d),
            "L", p2.sub(d),
            "L", p2.add(d),
            "Z"
        ]);
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "point1", "Point1", "Shape", "point"),
            make_prop_ctx($this, "point2", "Point2", "Shape", "point"),
            make_prop_ctx($this, "width", "Width", "Shape", "number")
        ]);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        this.path.enumerate(data, function(context) {
            if($this.filter && !$this.filter.get(context)) return;
            var p1 = $this.point1.getPoint(context);
            var p2 = $this.point2.getPoint(context);
            if(p1 === null || p2 === null) return;
            var threshold = 4.0 / pt.view_scale, d, anchor_selected = false;
            d = Math.abs(pt.distance(p1));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point1, action);
                anchor_selected = true;
            }
            d = Math.abs(pt.distance(p2));
            if(d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
                make_anchor_move_context(rslt, $this.point2, action);
                anchor_selected = true;
            }
            d = IV.geometry.pointLineSegmentDistance(pt, p1, p2);
            if(!anchor_selected && d < threshold && (!rslt || rslt.distance > d)) {
                rslt = { distance: d, context: context.clone() };
            }
        });
        return rslt;
    }
});

Objects.LineThrough = IV.extend(Objects.Shape, function(info) {
    this.type = "LineThrough";
    Objects.Shape.call(this, info);
    this.points = info.points;
    this.curved = false;
    this.closed = false;
}, {
    $auto_properties: [ "curved", "closed", "points" ],
    postDeserialize: function() {
        if(!this.curved) this.curved = false;
        if(!this.closed) this.closed = false;
    },
    shapePaths: function(context, cb) {
        var $this = this;
        var line = [];
        $this.points.getPath().enumerateAtContext(context, function(ctx) {
            var pt = $this.points.getPoint(ctx);
            if(pt === null) return;
            line.push(pt);
        });
        if(line.length >= 2) {
            var desc = ["M", line[0], $this.curved ? "CATMULLROM" : "POLYLINE", line.length, $this.closed ? "C" : "L"];
            cb(desc.concat(line));
        }
    },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    get: function(context) {
        return this.points.getPoint(context);
    },
    select: function(pt, data, action) {
        if(action == "move-element") return null;
        var rslt = null;
        var $this = this;
        $this.path.enumerate(data, function(fctx) {
            if($this.filter && !$this.filter.get(context)) return;
            var pts = [];
            $this.points.getPath().enumerateAtContext(fctx, function(context) {
                var pt = $this.points.getPoint(context);
                if(pt !== null)
                    pts.push(pt);
            });
            for(var i = 0; i < pts.length - 1; i++) {
                var d = IV.geometry.pointLineSegmentDistance(pt, pts[i], pts[i + 1]);
                if(d <= 4.0 / pt.view_scale) {
                    if(!rslt || rslt.distance > d)
                        rslt = { distance: d, context: fctx.clone() };
                }
            }
        });
        return rslt;
    },
    lasso: function(polygon, data, callback) {
        var $this = this;
        var contexts = [];
        this.path.enumerate(data, function(fctx) {
            var pts = [];
            $this.points.getPath().enumerateAtContext(fctx, function(context) {
                var pt = $this.points.getPoint(context);
                if(pt !== null)
                    pts.push(pt);
            });
            for(var i = 0; i < pts.length - 1; i++) {
                var p1 = pts[i];
                var p2 = pts[i + 1];
                if(IV.geometry.lineIntersectPolygon(polygon, p1, p2)) {
                    callback($this, fctx);
                }
            }
        });
        if(contexts.length == 0) return null;
        return contexts;
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Shape.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "points", "Points", "Shape", "point"),
            make_prop_ctx($this, "closed", "Closed", "Shape", "plain-bool"),
            make_prop_ctx($this, "curved", "Curved", "Shape", "plain-bool")
        ]);
    }
});

IV.serializer.registerObjectType("Circle", Objects.Circle);
IV.serializer.registerObjectType("Line", Objects.Line);
IV.serializer.registerObjectType("Arc", Objects.Arc);
IV.serializer.registerObjectType("Bar", Objects.Bar);
IV.serializer.registerObjectType("LineThrough", Objects.LineThrough);
IV.serializer.registerObjectType("Polyline", Objects.Polyline);

// iVisDesigner - scripts/core/objects/text.js
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

Objects.Text = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this, info);
    this.type = "Text";
    this.path = info.path;
    // Center.
    this.anchor = IV.notNull(info.anchor) ? info.anchor : new Objects.Plain(new IV.Vector(0, 0));
    this.text = IV.notNull(info.text) ? info.text : new Objects.Plain("text");
    this.text_align = IV.notNull(info.text_align) ? info.text_align : new Objects.Plain("left");
    this.font_family = IV.notNull(info.font_family) ? info.font_family : new Objects.Plain("Arial");
    this.font_size = IV.notNull(info.font_size) ? info.font_size : new Objects.Plain(14);
    this.style = IV.notNull(info.style) ? info.style : new Objects.PathStyle(this.type);
}, {
    $auto_properties: [ "path", "anchor", "text", "text_align", "font_family", "font_size" ],
    onAttach: function(vis) {
        this.vis = vis;
    },
    getAnchors: function() {
        var r = [];
        if(this.anchor.type == "Plain") r.push(this.anchor.obj);
        return r;
    },
    _get_rect: function(context, no_offset) {
        var text = this.text.get(context);
        if(text === null) return null;
        var text_align = this.text_align.get(context);
        if(text_align === null) return null;
        var font = {
            family: this.font_family.get(context),
            size: this.font_size.get(context)
        };
        if(font.family === null || font.size === null) return null;
        var p = this.anchor.get(context);
        if(p === null) return null;
        var x0 = p.x;
        var y0 = p.y;
        var w = IV.measureText(text, "36px " + font.family).width / 36 * font.size;
        var h = font.size;
        y0 += h / 2;
        if(text_align == "left")
            x0 += w / 2;
        if(text_align == "right")
            x0 -= w / 2;
        if(!no_offset && this.offsets) {
            var oid = context.data.getObjectID(context.val());
            if(this.offsets[oid]) {
                x0 += this.offsets[oid].x;
                y0 += this.offsets[oid].y;
            }
        }
        return [ x0, y0, w, h ];
    },
    render: function(g, data) {
        var $this = this;
        $this.path.enumerate(data, function(context) {
            var text = $this.text.get(context);
            var text_align = $this.text_align.get(context);
            if(text_align === null) return;
            var font = {
                family: $this.font_family.get(context),
                size: $this.font_size.get(context)
            };
            if(font.family === null || font.size === null) return;
            var p = $this.anchor.get(context);
            if(p === null) return;
            g.textAlign = $this.text_align.get(context);
            if($this.offsets) {
                var oid = data.getObjectID(context.val());
                if(oid && $this.offsets[oid]) {
                    p.x += $this.offsets[oid].x;
                    p.y += $this.offsets[oid].y;
                }
            }
            $this.style.renderText(context, g, text, p.x, p.y, font);
        });
    },
    renderSelected: function(g, data, context) {
        var $this = this;
        var draw_with_context = function(context) {
            var r = $this._get_rect(context);
            if(r === null) return;
            g.ivGuideLineWidth();
            g.strokeStyle = IV.colors.selection.toRGBA();
            g.fillStyle = IV.colors.selection.toRGBA();
            g.beginPath();
            var w = r[2] / 2, h = r[3] / 2;
            g.moveTo(r[0] - w, r[1] - h);
            g.lineTo(r[0] + w, r[1] - h);
            g.lineTo(r[0] + w, r[1] + h);
            g.lineTo(r[0] - w, r[1] + h);
            g.closePath();
            g.stroke();
        };
        if(context) draw_with_context(context);
        else $this.path.enumerate(data, draw_with_context);
    },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    get: function(context) {
        return this.anchor.getPoint(context);
    },
    _label_adjust: function() {
        var $this = this;
        if(!this.offsets) this.offsets = { };
        var data = this.vis.data;
        var rects = [];
        $this.path.enumerate(data, function(context) {
            var r = $this._get_rect(context, true);
            if(r === null) return;
            rects.push([ data.getObjectID(context.val()), r[0], r[1], r[2] * 1.05, r[3] * 1.05 ]);
        });
        var Y = [];
        for(var i = 0; i < rects.length; i++) {
            Y[i*2] = 0;
            Y[i*2+1] = 0;
        }
        var k_spring = 1;
        var k_collision = 20;
        var dydt = function(t, y) {
            var r = [];
            for(var i = 0; i < rects.length; i++) {
                r[i*2] = -k_spring * y[i*2];
                r[i*2+1] = -k_spring * y[i*2+1];
            }
            for(var i = 0; i < rects.length; i++) {
                for(var j = i + 1; j < rects.length; j++) {
                    var dx = y[j*2] + rects[j][1] - y[i*2] - rects[i][1];
                    var dy = y[j*2+1] + rects[j][2] - y[i*2+1] - rects[i][2];
                    var dfx = (rects[i][3] + rects[j][3]) / 2 - Math.abs(dx);
                    var dfy = (rects[i][4] + rects[j][4]) / 2 - Math.abs(dy);
                    if(dfx > 0 && dfy > 0) {
                        var area = Math.sqrt(dfx * dfy);
                        var s = k_collision / Math.sqrt(dx * dx + dy * dy);
                        r[i*2] -= area * dx * s;
                        r[j*2] += area * dx * s;
                        r[i*2+1] -= area * dy * s;
                        r[j*2+1] += area * dy * s;
                    }
                }
            }
            return r;
        };
        var sol = numeric.dopri(0, 20, Y, dydt);
        for(var i = 0; i < rects.length; i++) {
            var y_last = sol.y[sol.y.length - 1];
            this.offsets[rects[i][0]] = {
                x: y_last[i*2],
                y: y_last[i*2+1]
            };
        }
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx(this, "path", "Selector", "Text", "path"),
            make_prop_ctx(this, "text", "Text", "Text", "string"),
            make_prop_ctx(this, "anchor", "Anchor", "Text", "point"),
            make_prop_ctx(this, "text_align", "Align", "Text", "string", [
                { name: "left", display: "Left" },
                { name: "center", display: "Center" },
                { name: "right", display: "Right" }
            ]),
            make_prop_ctx(this, "font_family", "Family", "Text", "string"),
            make_prop_ctx(this, "font_size", "Size", "Text", "number"),
            {
                name: "Adjust",
                group: "Text",
                type: "button",
                get: function() { return "Run,Reset"; },
                set: function(val) {
                    if(val == "Run")
                        $this._label_adjust();
                    if(val == "Reset")
                        $this.offsets = {};
                }
            }
        ]);
    },
    select: function(pt, data, action) {
        var rslt = null;
        var $this = this;
        this.path.enumerate(data, function(context) {
            var r = $this._get_rect(context);
            if(r === null) return;
            if(Math.abs(pt.x - r[0]) < r[2] / 2 && Math.abs(pt.y - r[1]) < r[3] / 2) {
                var d = pt.distance(new IV.Vector(r[0], r[1]));
                if(!rslt || rslt.distance > d) {
                    rslt = { distance: d, context: context.clone() };
                    make_anchor_move_context(rslt, $this.anchor, action);
                }
            }
        });
        return rslt;
    }
});
IV.serializer.registerObjectType("Text", Objects.Text);

// iVisDesigner - scripts/core/objects/layout.js
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

(function() {

Objects.ForceLayout = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.path_nodes = info.path_nodes;
    this.path_edgeA = info.path_edgeA;
    this.path_edgeB = info.path_edgeB;
    this.points = null;
    this.speed = 0.05;
    this.gravity = 1000;
    this._validated = false;
    this.type = "ForceLayout";
    this.enabled = false;
}, {
    $auto_properties: [ "path_nodes", "path_edgeA", "path_edgeB", "enabled", "speed", "gravity" ],
    postDeserialize: function() {
        if(!this.gravity) this.gravity = 1000;
        if(!this.speed) this.speed = 0.05;
    },
    onAttach: function(vis) {
        this.vis = vis;
    },
    validate: function(data) {
        if(data.revision !== this._revision) {
            this._validated = false;
        }
        if(!this._validated) {
            this._runStep(data);
            this._revision = data.revision;
            this._validated = true;
        }
    },
    onDetach: function(vis) {
    },
    timerTick: function(data) {
        if(this.enabled) {
            this._runStep(data);
            if(this.vis) this.vis.setNeedsRender();
        }
    },
    getAttachedSchemas: function() {
        return [
            {
                path: this.path_nodes,
                schema: {
                    type: "object",
                    fields: {
                        x: { type: "number", min: -1, max: 1 },
                        y: { type: "number", min: -1, max: 1 }
                    }
                }
            }
        ];
    },
    getPropertyContext: function(data) {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "enabled", "Enabled", "ForceLayout", "plain-bool"),
            make_prop_ctx($this, "gravity", "Gravity", "ForceLayout", "plain-number"),
            make_prop_ctx($this, "speed", "Speed", "ForceLayout", "plain-number")
        ]);
    },
    _runStep: function(data) {
        var $this = this;
        var objs = { };
        var edges = [];
        if(!this.points) this.points = { };
        $this.path_edgeA.enumerate(data, function(context) {
            var idA = data.getObjectID(context.get($this.path_edgeA).val());
            var idB = data.getObjectID(context.get($this.path_edgeB).val());
            if(idA && idB)
                edges.push([ idA, idB ]);
        });
        var count = 0;
        $this.path_nodes.enumerate(data, function(context) {
            var id = data.getObjectID(context.val());
            if($this.points[id]) {
                var pt = $this.points[id];
                objs[id] = {
                    x: pt.x, y: pt.y,
                    dx: 0, dy: 0
                };
            } else {
                objs[id] = {
                    x: Math.random() - 0.5, y: Math.random() - 0.5,
                    dx: 0, dy: 0
                };
            }
            count++;
        });
        var N_iterate = 10;
        var gravity = $this.gravity; //1000;
        var speed = $this.speed; //0.05;
        var k = Math.sqrt(4) / Math.sqrt(1 + count);
        var max_displace = 0.1;
        var eps = 1e-8;
        for(var iterate = 0; iterate < N_iterate; iterate++) {
            // Accumulate forces.
            for(var i in objs) for(var j in objs) {
                if(i == j) continue;
                var p = objs[i];
                var q = objs[j];
                var dx = p.x - q.x;
                var dy = p.y - q.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if(d < eps) d = eps;
                var f = k * k / d;
                p.dx += dx / d * f;
                p.dy += dy / d * f;
            }
            var edges_l = edges.length;
            for(var i = 0; i < edges_l; i++) {
                var p = objs[edges[i][0]];
                var q = objs[edges[i][1]];
                var dx = p.x - q.x;
                var dy = p.y - q.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if(d < eps) d = eps;
                var f = d * d / k;
                p.dx -= dx / d * f;
                p.dy -= dy / d * f;
                q.dx += dx / d * f;
                q.dy += dy / d * f;
            }
            for(var i in objs) {
                var p = objs[i];
                var dx = p.x, dy = p.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if(d < eps) d = eps;
                var f = 0.01 * k * gravity * d;
                p.dx -= dx / d * f;
                p.dy -= dy / d * f;
            }
            for(var i in objs) {
                var p = objs[i];
                p.dx *= speed;
                p.dy *= speed;
                var d = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
                if(d < eps) d = eps;
                var dl = Math.min(max_displace * speed, d);
                var dx = p.dx / d * dl;
                var dy = p.dy / d * dl;
                p.x += dx;
                p.y += dy;
            }
        }
        for(var i in objs) {
            if(!$this.points[i]) {
                $this.points[i] = { x: objs[i].x, y: objs[i].y, _variable: true };
            } else {
                $this.points[i].x = objs[i].x;
                $this.points[i].y = objs[i].y;
                $this.points[i]._variable = true;
            }
        }

        data.setAttached($this.uuid, $this.points);
    }
});
IV.serializer.registerObjectType("ForceLayout", Objects.ForceLayout);

})();

// iVisDesigner - scripts/core/objects/map.js
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

(function() {

// Mercator Projection
var GoogleMapMercator = function(lng, lat) {
    var x = lng;
    var rlat = lat / 180.0 * Math.PI;
    var y = Math.log( (1 + Math.sin(rlat)) / (1 - Math.sin(rlat)) ) / 2;
    return new IV.Vector(x / 360.0, y / Math.PI / 2);
};

var GoogleMapMercatorInverse = function(x, y) {
    var tanh = function(x) {
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    };
    lng = x * 360.0;
    lat = 180 * Math.asin(tanh(2 * Math.PI * y)) / Math.PI;
    return [lng, lat];
};

var GoogleMapImage = function(maptype, zoom) {
    this.maptype = maptype;
    this.zoom = zoom;
    this.map_width = 256 * (1 << this.zoom);
    this.images = { };
    this.callback = function() { };
};
G_T = 0;
GoogleMapImage.prototype.renderImages = function(g, cx, cy, width, height) {
    var tile_size = 512;
    var tile_count = (1 << this.zoom) / 2;
    var x_min = Math.floor((cx) / tile_size);
    var x_max = Math.floor((cx + width) / tile_size);
    var y_min = Math.floor((cy) / tile_size);
    var y_max = Math.floor((cy + height) / tile_size);
    if(y_min < 0) y_min = 0; if(y_min >= tile_count) y_min = tile_count - 1;
    if(y_max < 0) y_max = 0; if(y_max >= tile_count) y_max = tile_count - 1;
    for(var x = x_min; x <= x_max; x++) {
        for(var y = y_min; y <= y_max; y++) {
            var tile = this.requestTile((x % tile_count + tile_count) % tile_count, y);
            try {
                var sx = 64, sy = 64, sw = tile_size, sh = tile_size;
                var dx = x * tile_size - cx, dy = y * tile_size - cy;
                if(dx < 0) { sx -= dx; sw += dx; dx = 0; }
                if(dy < 0) { sy -= dy; sh += dy; dy = 0; }
                if(dx + sw > width) { sw = width - dx; }
                if(dy + sh > height) { sh = height - dy; }
                if(sw > 0 && sh > 0 && dx < width && dy < height) {
                    g.drawImage(tile, sx * 2, sy * 2, sw * 2, sh * 2, dx, dy, sw, sh);
                }
            } catch(e) { }
        }
    }
    this.purgeImages();
};

GoogleMapImage.prototype.purgeImages = function() {
    var now = new Date().getTime();
    for(var k in this.images) {
        if(now - this.images[k].last_used > 10000 * 1000) delete this.images[k];
    }
};

GoogleMapImage.prototype.requestTile = function(x, y) {
    var key = this.maptype + "," + x + "," + y;
    var $this = this;
    if(this.images[key]) {
        this.images[key].last_used = new Date().getTime();
        return this.images[key].img;
    } else {
        var o = {
            img: new Image(),
            last_used: new Date().getTime()
        };
        o.img.onload = function() {
            $this.callback($this);
        };
        o.img.src = this.getTileURL(x, y);
        this.images[key] = o;
        return o.img;
    }
};

GoogleMapImage.prototype.getTileURL = function(x, y) {
    // In this function we work in the GoogleMapMercator coordinate, world range: -0.5 ~ 0.5.
    var cell_width = Math.pow(2, -(this.zoom - 1));
    var xy_first_cell = -0.5 + cell_width / 2.0;
    var lnglat = GoogleMapMercatorInverse(xy_first_cell + cell_width * x, -xy_first_cell - cell_width * y);
    var params = {
        center: lnglat[1] + "," + lnglat[0], // lat,lng
        zoom: this.zoom,
        size: "640x640",
        sensor: "false",
        scale: 2,
        maptype: this.maptype,
        key: "AIzaSyBWFLxkr7mBCEpjyJotpP50n_ZOtcW-RTo",
        language: "en_US",
        visual_refresh: "true"
    };
    if(IV.server && IV.server.getDelegateURL) {
        return IV.server.getDelegateURL("https://maps.googleapis.com/", "maps/api/staticmap", params);
    } else {
        var baseurl = "https://maps.googleapis.com/maps/api/staticmap";
        var params_array = [];
        for(var key in params) {
            params_array.push(escape(key) + "=" + escape(params[key]));
        }
        return baseurl + "?" + params_array.join("&");
    }
};

var GoogleMapStatic = function(lng, lat, zoom, size_x, size_y, maptype, scale) {
    this.center_lng = lng;
    this.center_lat = lat;
    this.zoom = zoom;
    this.size_x = size_x;
    this.size_y = size_y;
    this.scale = scale;
    this.maptype = maptype;
    this.images = { };
};

GoogleMapStatic.prototype = {
    lngLatToPixel: function(lng, lat, zoom) {
        var world_width = 256 * Math.pow(2, this.zoom);
        var pt = GoogleMapMercator(lng, lat);
        var p0 = GoogleMapMercator(this.center_lng, this.center_lat);
        var sh = pt.sub(p0).scale(world_width);
        return sh.add(new IV.Vector(this.size_x / 2, this.size_y / 2));
    },
    lngLatToPixelCentered: function(lng, lat) {
        var world_width = 256 * Math.pow(2, this.zoom);
        var pt = GoogleMapMercator(lng, lat);
        var p0 = GoogleMapMercator(this.center_lng, this.center_lat);
        var sh = pt.sub(p0).scale(world_width);
        return sh;
    },
    pixelToLngLatCentered: function(x, y) {
        var world_width = 256 * Math.pow(2, this.zoom);
        var p0 = GoogleMapMercator(this.center_lng, this.center_lat);
        x /= world_width;
        y /= world_width;
        x += p0.x;
        y += p0.y;
        return GoogleMapMercatorInverse(x, y);
    },
    render: function(g) {
        var map_zoom = Math.round(this.zoom);
        if(map_zoom < 1) map_zoom = 1; if(map_zoom > 22) map_zoom = 22;
        if(!this.delegate || this.delegate.zoom != map_zoom) {
            this.delegate = new GoogleMapImage(this.maptype, map_zoom);
            var self = this;
            this.delegate.callback = function(s) {
                if(self.callback && self.delegate == s) self.callback(self);
            };
        }
        g.save();
        this.delegate.maptype = this.maptype;
        var my_world_width = 256 * Math.pow(2, this.zoom);
        var s = my_world_width / this.delegate.map_width;
        g.scale(s, s);
        var p0 = GoogleMapMercator(this.center_lng, -this.center_lat);
        var sh = p0.scale(this.delegate.map_width).add(new IV.Vector(this.delegate.map_width / 2, this.delegate.map_width / 2));
        g.translate(-this.size_x / s / 2, -this.size_y / s / 2);
        this.delegate.renderImages(g, sh.x - this.size_x / s / 2, sh.y - this.size_y / s / 2, this.size_x / s, this.size_y / s);
        g.restore();
    }
};

// IV.vis.addObject(new Objects.GoogleMap("stations:lng", "stations:lat", new IV.Vector(0, 0), 116.37371, 39.86390, 10));
Objects.GoogleMap = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    var $this = this;
    this.type = "GoogleMap";
    this.path = new IV.Path();
    this.maptype = "roadmap";
    this.longitude = info.longitude;
    this.latitude = info.latitude;
    this.scale = info.scale;
    this.center_offset = info.center;
    this.path_longitude = info.path_longitude;
    this.path_latitude = info.path_latitude;
    this.size_x = info.size_x ? info.size_x : 640;
    this.size_y = info.size_y ? info.size_y : 640;
    this.transparency = IV.notNull(info.transparency) ? info.transparency : 1;
    this.reloadMap();
}, {
    $auto_properties: [ "path_longitude", "path_latitude", "center_offset", "transparency" ],
    _set_longitude: function(val) { this.longitude = val; this.reloadMap(); },
    _get_longitude: function() { return this.longitude; },
    _set_latitude: function(val) { this.latitude = val; this.reloadMap(); },
    _get_latitude: function() { return this.latitude; },
    _set_scale: function(val) { this.scale = val; this.reloadMap(); },
    _get_scale: function() { return this.scale; },
    _set_maptype: function(val) { this.maptype = val; this.reloadMap(); },
    _get_maptype: function() { return this.maptype; },
    _set_size_x: function(val) { this.size_x = val; this.reloadMap(); },
    _get_size_x: function() { return this.size_x; },
    _set_size_y: function(val) { this.size_y = val; this.reloadMap(); },
    _get_size_y: function() { return this.size_y; },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    postDeserialize: function() {
        if(!this.maptype) this.maptype = "roadmap";
        if(!this.size_x) this.size_x = 640;
        if(!this.size_y) this.size_y = 640;
        if(IV.isNull(this.transparency)) this.transparency = 1;
        if(!this.path) this.path = new IV.Path();
        this.reloadMap();
    },
    onAttach: function(vis) {
        this.vis = vis;
    },
    reloadMap: function() {
        var $this = this;
        if(!this._map) {
            this._map = new GoogleMapStatic(this.longitude, this.latitude, this.scale, this.size_x, this.size_y, this.maptype, 2);
            this._map.callback = function(s) {
                if(s == $this._map)
                    if($this.vis) $this.vis.setNeedsRender();
            };
        } else {
            this._map.center_lng = this.longitude;
            this._map.center_lat = this.latitude;
            this._map.zoom = this.scale;
            this._map.maptype = this.maptype;
            this._map.size_x = this.size_x;
            this._map.size_y = this.size_y;
        }
    },
    render: function(g, data) {
        var $this = this;
        g.ivSave();
        g.translate(this.center_offset.x, this.center_offset.y);
        g.scale(1, -1);
        var show_rect = false;
        g.globalAlpha = this.transparency;
        this._map.render(g);
        g.ivRestore();
        var off = this.center_offset;
        if(show_rect) {
            var rect = new IV.Rectangle(off.x, off.y, this._map.size_x + 5, this._map.size_y + 5, 0);
            var c1 = rect.corner1();
            var c2 = rect.corner2();
            var c3 = rect.corner3();
            var c4 = rect.corner4();
            g.beginPath();
            g.strokeStyle = IV.colors.selection.toRGBA();
            g.lineWidth = 1.0 / g.ivGetTransform().det();
            g.moveTo(c1.x, c1.y);
            g.lineTo(c2.x, c2.y);
            g.lineTo(c3.x, c3.y);
            g.lineTo(c4.x, c4.y);
            g.closePath();
            g.stroke();
        }
    },
    get: function(context) {
        var lng = context.get(this.path_longitude).val();
        var lat = context.get(this.path_latitude).val();
        if(lng === null || lat === null) return null;
        var pt = this._map.lngLatToPixelCentered(lng, lat);
        return pt.add(this.center_offset);
    },
    renderSelected: function(g, data) {
        var rect = new IV.Rectangle(this.center_offset.x, this.center_offset.y, this._map.size_x + 5, this._map.size_y + 5, 0);
        var c1 = rect.corner1();
        var c2 = rect.corner2();
        var c3 = rect.corner3();
        var c4 = rect.corner4();
        g.beginPath();
        g.strokeStyle = IV.colors.selection.toRGBA();
        g.lineWidth = 1.0 / g.ivGetTransform().det();
        g.moveTo(c1.x, c1.y);
        g.lineTo(c2.x, c2.y);
        g.lineTo(c3.x, c3.y);
        g.lineTo(c4.x, c4.y);
        g.closePath();
        g.stroke();
    },
    beginMoveElement: function(context) {
        var $this = this;
        return {
            onMove: function(p0, p1) {
                var px = p1.x - $this.center_offset.x;
                var py = p1.y - $this.center_offset.y;
                var lnglat = $this._map.pixelToLngLatCentered(px, py);
                context.set($this.path_longitude, lnglat[0]);
                context.set($this.path_latitude, lnglat[1]);
            }
        };
    },
    select: function(pt, data, action) {
        var rect = new IV.Rectangle(this.center_offset.x, this.center_offset.y, this._map.size_x, this._map.size_y, 0);
        var rslt = null;
        if((!action || action == "move") && rect.distance(pt) < 4.0 / pt.view_scale) {
            rslt = { distance: rect.distance(pt) };
            var $this = this;
            rslt.original = $this.center_offset;
            rslt.onMove = function(p0, p1) {
                $this.center_offset = rslt.original.sub(p0).add(p1);
                return { trigger_render: "main,front,back" };
            };
        }
        if(action == "move-element" && rect.inside(pt)) {
            rslt = { distance: 10 };
            var $this = this;
            var prev = [ $this.longitude, $this.latitude ];
            rslt.onMove = function(p0, p1) {
                $this._map.center_lng = prev[0];
                $this._map.center_lat = prev[1];
                var off_p1 = $this._map.pixelToLngLatCentered(p0.x - p1.x, p0.y - p1.y);
                $this.longitude = off_p1[0];
                $this.latitude = off_p1[1];
                $this._map.center_lng = $this.longitude;
                $this._map.center_lat = $this.latitude;
                $this.reloadMap();
                return { trigger_render: "main,front,back" };
            };
        }
        return rslt;
    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path_longitude", "Longitude", "GoogleMap", "path"),
            make_prop_ctx($this, "path_latitude", "Latitude", "GoogleMap", "path"),
            make_prop_ctx(this, "scale", "Scale", "GoogleMap", "plain-number"),
            make_prop_ctx(this, "maptype", "MapType", "GoogleMap", "plain-string", ["terrain", "roadmap", "satellite", "hybrid"]),
            make_prop_ctx(this, "longitude", "Longitude", "GoogleMap", "plain-number"),
            make_prop_ctx(this, "latitude", "Latitude", "GoogleMap", "plain-number"),
            make_prop_ctx(this, "size_x", "Width", "GoogleMap", "plain-number"),
            make_prop_ctx(this, "size_y", "Height", "GoogleMap", "plain-number"),
            make_prop_ctx(this, "transparency", "Opacity", "GoogleMap", "plain-number")
        ]);
    }
});
IV.serializer.registerObjectType("GoogleMap", Objects.GoogleMap);
})();

(function() {

var ImageCache = function() {
    this.entries = { };
    this.loading = { };
};

ImageCache.prototype.loadImage = function(src, onload) {
    var self = this;
    if(this.entries[src]) {
        onload(this.entries[src]);
    } else if(this.loading[src]) {
        this.loading[src].handlers.push(onload);
    } else {
        var img = new Image();
        img.onload = function() {
            self.entries[src] = img;
            delete self.loading[src];
            img.handlers.forEach(function(f) { f(img); });
        };
        img.src = src;
        img.handlers = [ onload ];
        this.loading[src] = img;
    }
};

var cache = new ImageCache();

Objects.Image = IV.extend(Objects.Object, function(info) {
    this.type = "Image";
    Objects.Object.call(this);
    this.path = info.path;
    this.source = info.source;
    this.scale = info.scale ? info.scale : new Objects.Plain(1.0);
    this.position = info.position ? info.position : new Objects.Plain(new IV.Vector(0, 0));
    this._images = { };
}, {
    $auto_properties: [ "path", "source", "scale", "position" ],
    $auto_properties_after: function() {
    },
    can: function(cap) {
        if(cap == "get-point") return true;
    },
    postDeserialize: function() {
        this._reload();
    },
    onAttach: function(vis) {
        this.vis = vis;
    },
    _reload: function() {
        this._images = { };
    },
    render: function(g, data) {
        var $this = this;
        this.path.enumerate(data, function(context) {
            var src = $this.source.get(context);
            var position = $this.position.get(context);
            var scale = $this.scale.get(context);
            if(!src || !position || !scale) return;
            if($this._images[src]) {
                var w = $this._images[src].width;
                var h = $this._images[src].height;
                g.ivSave();
                g.translate(position.x, position.y);
                g.scale(scale, -scale);
                g.drawImage($this._images[src], 0, 0, w, h, -w / 2, -h / 2, w, h);
                g.ivRestore();
            } else {
                cache.loadImage(src, function(img) {
                    $this._images[src] = img;
                    if($this.vis) $this.vis.setNeedsRender();
                });
            }
        });
    },
    get: function(context) {
        return this.position.get(context);
    },
    // renderSelected: function(g, data) {
    //     // var rect = new IV.Rectangle(this.center_offset.x, this.center_offset.y, this._map.size_x + 5, this._map.size_y + 5, 0);
    //     // var c1 = rect.corner1();
    //     // var c2 = rect.corner2();
    //     // var c3 = rect.corner3();
    //     // var c4 = rect.corner4();
    //     // g.beginPath();
    //     // g.strokeStyle = IV.colors.selection.toRGBA();
    //     // g.lineWidth = 1.0 / g.ivGetTransform().det();
    //     // g.moveTo(c1.x, c1.y);
    //     // g.lineTo(c2.x, c2.y);
    //     // g.lineTo(c3.x, c3.y);
    //     // g.lineTo(c4.x, c4.y);
    //     // g.closePath();
    //     // g.stroke();
    // },
    // select: function(pt, data, action) {
    //     return null;
    //     // var rect = new IV.Rectangle(this.center_offset.x, this.center_offset.y, this._map.size_x, this._map.size_y, 0);
    //     // var rslt = null;
    //     // if((!action || action == "move") && rect.distance(pt) < 4.0 / pt.view_scale) {
    //     //     rslt = { distance: rect.distance(pt) };
    //     //     var $this = this;
    //     //     rslt.original = $this.center_offset;
    //     //     rslt.onMove = function(p0, p1) {
    //     //         $this.center_offset = rslt.original.sub(p0).add(p1);
    //     //         return { trigger_render: "main,front,back" };
    //     //     };
    //     // }
    //     // return rslt;
    // },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx(this, "source", "Source", "Image", "string"),
            make_prop_ctx(this, "scale", "Scale", "Image", "number"),
            make_prop_ctx(this, "position", "Position", "Image", "point")
        ]);
    }
});
IV.serializer.registerObjectType("Image", Objects.Image);
})();

// iVisDesigner - scripts/core/objects/generators/generators.js
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

// iVisDesigner - scripts/core/objects/generators/statistics.js
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

(function() {

Objects.Statistics = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.path = info.path;
    this.path_data = info.path_data;
    this.results = null;
    this._validated = false;
    this.type = "Statistics";
}, {
    $auto_properties: [ "path", "path_data" ],
    onAttach: function(vis) {
        this.vis = vis;
    },
    validate: function(data) {
        if(data.revision !== this._revision) {
            this._validated = false;
        }
        if(!this._validated) {
            this._compute(data);
            this._revision = data.revision;
            this._validated = true;
        }
    },
    onDetach: function(vis) {
    },
    getAttachedSchemas: function() {
        return [
            {
                path: this.path,
                schema: {
                    type: "object",
                    fields: {
                        count: { type: "number" },
                        min: { type: "number" },
                        max: { type: "number" },
                        mean: { type: "number" }
                    }
                }
            }
        ];
    },
    getPropertyContext: function(data) {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path", "Anchor", "Statistics", "path"),
            make_prop_ctx($this, "path_data", "Data", "Statistics", "path")
        ]);
    },
    _compute: function(data) {
        var $this = this;
        $this.results = { };
        $this.path.enumerate(data, function(fctx) {
            var count = 0;
            var sum = 0;
            var min = null;
            var max = null;
            $this.path_data.enumerateAtContext(fctx, function(context) {
                var val = context.val();
                if(val !== null && !isNaN(val)) {
                    if(min === null || min > val) min = val;
                    if(max === null || max < val) max = val;
                    sum += val;
                    count += 1;
                }
            });
            var id = data.getObjectID(fctx.val());
            $this.results[id] = {
                count: count,
                min: min, max: max,
                sum: sum,
                mean: count > 0 ? sum / count : null
            };
        });
        data.setAttached($this.uuid, $this.results);
    }
});
IV.serializer.registerObjectType("Statistics", Objects.Statistics);

})();

// iVisDesigner - scripts/core/objects/generators/expression.js
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

Objects.Expression = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.type = "Expression";
    this.expression = info.expression;
    this.path = info.path;
    this.count = IV.isNull(info.count) ? info.count : 1;
}, {
    $auto_properties: [ "path" ],
    _set_expression: function(val) {
        this.expression = val;
        this._validated = false;
    },
    _get_expression: function() {
        return this.expression;
    },
    postDeserialize: function() {
        this._validated = false;
    },
    onAttach: function(vis) {
        this.vis = vis;
    },
    validate: function(data) {
        if(data.revision !== this._revision) {
            this._validated = false;
        }
        if(!this._validated) {
            this._compute(data);
            this._revision = data.revision;
            this._validated = true;
        }
    },
    getAttachedSchemas: function() {
        return [
            {
                path: this.path,
                schema: {
                    type: "object",
                    fields: {
                        value: { type: "number" },
                        index: { type: "number" }
                    }
                }
            }
        ];
    },
    getPropertyContext: function(data) {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path", "Anchor", "Expression", "path"),
            make_prop_ctx($this, "expression", "Expression", "Expression", "plain-string")
        ]);
    },
    _compute: function(data) {
        var $this = this;
        $this.results = { };
        var index = 0;
        var compiled = compile_expression(this.expression, this.path);
        $this.path.enumerate(data, function(fctx) {
            index += 1;
            var id = data.getObjectID(fctx.val());
            try {
                $this.results[id] = {
                    value: compiled({ index: index }, fctx),
                    index: index,
                    _variable: true
                };
            } catch(e) {
            }
        });
        data.setAttached($this.uuid, $this.results);
    },
    getDependencies: function() {
        var r = new IV.ObjectSet();
        for(var i in this.path.components) {
            var c = this.path.components[i];
            if(c.type == "attached") {
                r.add({ uuid: c.ns });
            }
        }
        return r;
    },
    onDetach: function(vis) {
    },
});

IV.serializer.registerObjectType("Expression", Objects.Expression);

// iVisDesigner - scripts/core/objects/generators/aggregator.js
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

(function() {

Objects.Aggregator = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.path = info.path;
    this.path_data = info.path_data;
    this.bin_count = info.bin_count ? info.bin_count : 10;
    this.bin_min = info.bin_min ? info.bin_min : null;
    this.bin_max = info.bin_max ? info.bin_max : null;
    this.filter_value = null;
    this.filter_min = null;
    this.filter_max = null;
    this.results = null;
    this._validated = false;
    this.type = "Aggregator";
}, {
    $auto_properties: [ "path", "path_data", "bin_count", "bin_min", "bin_max", "filter_min", "filter_max", "filter_value" ],
    $auto_properties_after: function() {
        this._validated = false;
    },
    onAttach: function(vis) {
        this.vis = vis;
    },
    validate: function(data) {
        if(data.revision !== this._revision) {
            this._validated = false;
        }
        if(!this._validated) {
            this._compute(data);
            this._revision = data.revision;
            this._validated = true;
        }
    },
    onDetach: function(vis) {
    },
    getAttachedSchemas: function() {
        return [
            {
                path: this.path,
                schema: {
                    type: "object",
                    fields: {
                        count: { type: "number" },
                        min: { type: "number" },
                        max: { type: "number" },
                        mean: { type: "number" },
                        bins: {
                            type: "collection",
                            fields: {
                                index: { type: "number" },
                                min: { type: "number" },
                                max: { type: "number" },
                                count: { type: "number" },
                                percentage: { type: "number" }
                            }
                        }
                    }
                }
            }
        ];
    },
    getPropertyContext: function(data) {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path", "Anchor", "Aggregator", "path"),
            make_prop_ctx($this, "path_data", "Data", "Aggregator", "path"),
            make_prop_ctx($this, "filter_value", "Filter Value", "Aggregator", "number"),
            make_prop_ctx($this, "filter_min", "Filter Min", "Aggregator", "number"),
            make_prop_ctx($this, "filter_max", "Filter Max", "Aggregator", "number"),
            make_prop_ctx($this, "bin_count", "Bins", "Aggregator", "plain-number"),
            make_prop_ctx($this, "bin_min", "Min", "Aggregator", "plain-number"),
            make_prop_ctx($this, "bin_max", "Max", "Aggregator", "plain-number")
        ]);
    },
    _compute: function(data) {
        var $this = this;
        $this.results = { };
        $this.path.enumerate(data, function(fctx) {
            var count = 0;
            var sum = 0;
            var min = null;
            var max = null;
            $this.path_data.enumerateAtContext(fctx, function(context) {
                var val = context.val();
                if(val !== null && !isNaN(val)) {
                    if(min === null || min > val) min = val;
                    if(max === null || max < val) max = val;
                    sum += val;
                    count += 1;
                }
            });
            var bins = [ ];
            var bin_min = $this.bin_min === null ? min : $this.bin_min;
            var bin_max = $this.bin_max === null ? max : $this.bin_max;
            var bin_count = Math.round($this.bin_count);
            for(var i = 0; i < bin_count; i++) {
                var bmin = bin_min + (bin_max - bin_min) / bin_count * i;
                var bmax = bin_min + (bin_max - bin_min) / bin_count * (i + 1);
                var bcount = 0;
                $this.path_data.enumerateAtContext(fctx, function(context) {
                    var val = context.val();
                    if(val !== null && !isNaN(val)) {
                        if($this.filter_value && $this.filter_min && $this.filter_max) {
                            var fval = $this.filter_value.get(context);
                            var vmin = $this.filter_min.get(fctx);
                            var vmax = $this.filter_max.get(fctx);
                            if(fval !== null && vmin !== null && vmax !== null && (fval < vmin || fval > vmax)) return;
                        }
                        if(val >= bmin && val < bmax) bcount++;
                    }
                });
                bins.push({
                    min: bmin,
                    max: bmax,
                    index: i,
                    count: bcount,
                    percentage: count > 0 ? bcount / count : 0
                });
            }
            var id = data.getObjectID(fctx.val());
            $this.results[id] = {
                count: count,
                min: min, max: max,
                sum: sum,
                mean: count > 0 ? sum / count : null,
                bins: bins
            };
        });
        data.setAttached($this.uuid, $this.results);
    }
});
IV.serializer.registerObjectType("Aggregator", Objects.Aggregator);

})();

// iVisDesigner - scripts/core/objects/generators/range.js
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

Objects.GenerateRange = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.type = "GenerateRange";
    this.path = info.path;
    this.min = info.min;
    this.max = info.max;
    this.step = info.step;
    this.storage = { };
}, {
    $auto_properties: [ "path", "min", "max", "step" ],
    $auto_properties_after: function() {
        this._validated = false;
    },
    postDeserialize: function() {
        this._validated = false;
    },
    getAttachedSchemas: function() {
        return [
            {
                path: this.path,
                schema: {
                    type: "object",
                    fields: {
                        items: {
                            type: "collection",
                            fields: {
                                value: { type: "number" }
                            }
                        }
                    }
                }
            }
        ];
    },
    validate: function(data) {
        if(data.revision !== this._revision) {
            this._validated = false;
        }
        if(!this._validated) {
            this._compute(data);
            this._revision = data.revision;
            this._validated = true;
        }
    },
    _compute: function(data) {
        var $this = this;
        $this.path.enumerate(data, function(fctx) {
            var id = data.getObjectID(fctx.val());
            var collection = [];
            if($this.step != 0 && $this.step * ($this.max - $this.min) >= 0) {
                for(var i = $this.min; i <= $this.max; i += $this.step) {
                    collection.push({
                        value: i,
                        _variable: true
                    });
                }
            }
            $this.storage[id] = { "items": collection };
        });
        data.setAttached($this.uuid, $this.storage);
    },
    getPropertyContext: function(data) {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path", "Anchor", "GenerateRange", "path"),
            make_prop_ctx($this, "min", "Min", "GenerateRange", "plain-number"),
            make_prop_ctx($this, "max", "Max", "GenerateRange", "plain-number"),
            make_prop_ctx($this, "step", "Step", "GenerateRange", "plain-number")
        ]);
    }
});

IV.serializer.registerObjectType("GenerateRange", Objects.GenerateRange);

// iVisDesigner - scripts/core/objects/generators/brushingvalue.js
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

Objects.BrushingValue = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this);
    this.type = "BrushingValue";
    this.path = info.path;
    this.storage = { };
    this.value_type = "plain-number";
    this.value = 1;
    this.default_value = 0;
}, {
    $auto_properties: [ "path", "value", "default_value" ],
    postDeserialize: function() {
        this._validated = false;
    },
    _set_default_value: function(val) {
        this.default_value = val;
        for(var i in this.storage) {
            if(i != "uuid" && this.storage[i] !== undefined && !this.storage[i].brushed) {
                this.storage[i].value = this.default_value;
            }
        }
        this._validated = false;
        IV.raiseObjectEvent(this, "set:default_value", val);
    },
    _get_default_value: function() { return this.default_value; },
    _set_value_type: function(val) {
        this.value_type = val;
        if(this.value_type == "plain-number") {
            this._set_value(1);
            this._set_default_value(0);
        }
        if(this.value_type == "plain-color") {
            this._set_value(new IV.Color(255, 255, 255, 1));
            this._set_default_value(new IV.Color(0, 0, 0, 1));
        }
        IV.raiseObjectEvent(this, "set:value_type", val);
    },
    _get_value_type: function() { return this.value_type; },
    validate: function(data) {
        if(data.revision !== this._revision) {
            this._validated = false;
        }
        if(!this._validated) {
            this._compute(data);
            this._revision = data.revision;
            this._validated = true;
        }
    },
    onAttach: function(vis) {
        this.vis = vis;
    },
    getAttachedSchemas: function() {
        return [
            {
                path: this.path,
                schema: {
                    type: "object",
                    fields: {
                        value: { "type": this.type }
                    }
                }
            }
        ];
    },
    getPropertyContext: function(data) {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "path", "Anchor", "BrushingValue", "path"),
            make_prop_ctx($this, "value", "Value", "BrushingValue", $this.value_type),
            make_prop_ctx($this, "default_value", "Default", "BrushingValue", $this.value_type),
            make_prop_ctx($this, "value_type", "Type", "BrushingValue", "plain-string", [
                { name: "plain-number", display: "Number" }, { name: "plain-color", display: "Color" }
            ]),
            {
                name: "Reset",
                group: "BrushingValue",
                type: "button",
                get: function() { return "Reset"; },
                set: function(val) {
                    if(val == "Reset") {
                        $this.storage = { };
                        $this._validated = false;
                    }
                }
            }
        ]);
    },
    performBrushing: function(data, context) {
        var entity = context.getEntity(this.path);
        if(entity) {
            var id = data.getObjectID(entity.val());
            this.storage[id] = { value: this.value, brushed: true, _variable: true };
            this._validated = false;
        }
    },
    _compute: function(data) {
        var $this = this;
        $this.path.enumerate(data, function(fctx) {
            var id = data.getObjectID(fctx.val());
            if($this.storage[id] === undefined) {
                $this.storage[id] = { value: $this.default_value, _variable: true };
            }
        });
        data.setAttached($this.uuid, $this.storage);
    },
    onDetach: function(vis) {
    },
});

IV.serializer.registerObjectType("BrushingValue", Objects.BrushingValue);


// iVisDesigner - scripts/core/objects/component.js
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

Objects.Component = IV.extend(Objects.Object, function(info) {
    Objects.Object.call(this, info);
    this.type = "Component";
    // Center.
    this.path = info.path;
    this.center = info.center ? info.center : new Objects.Plain(new IV.Vector(0, 0));
    this.scale = info.scale ? info.scale : new Objects.Plain(1);
    this.objects = info.objects ? info.objects : [];
}, {
    $auto_properties: [ "path", "center", "scale" ],
    postDeserialize: function() {
        var $this = this;
        this.objects.forEach(function(obj) {
            obj.selected = false;
            if(!obj.name) {
                var names = { };
                $this.objects.forEach(function(o) { names[o.name] = true; });
                for(var i = 1;; i++) {
                    var name = obj.type + i;
                    if(names[name]) continue;
                    obj.name = name;
                    break;
                }
            }
        });
    },
    addObject: function(obj) {
        var $this = this;
        if(!obj.name) {
            var names = { };
            $this.objects.forEach(function(o) { names[o.name] = true; });
            for(var i = 1;; i++) {
                var name = obj.type + i;
                if(names[name]) continue;
                obj.name = name;
                break;
            }
        }
        this.objects.push(obj);
    },
    can: function(cap) {

    },
    getPropertyContext: function() {
        var $this = this;
        return Objects.Object.prototype.getPropertyContext.call(this).concat([
            make_prop_ctx($this, "center", "Center", "Component", "point"),
            make_prop_ctx($this, "scale", "Scale", "Component", "number")
        ]);
    },
    toLocalCoordinate: function(pt, context) {
        var p = this.center.getPoint(context);
        var scale = this.scale.getPoint(context);
        return pt.sub(p).scale(1.0 / scale);
    },
    fromLocalCoordinate: function(pt, context) {
        var p = this.center.getPoint(context);
        var scale = this.scale.getPoint(context);
        return pt.scale(scale).add(p);
    },
    render: function(g, data) {
        var $this = this;
        this.path.enumerate(data, function(context) {
            var p = $this.center.getPoint(context);
            var scale = $this.scale.getPoint(context);
            if(p === null || scale === null) return;
            g.ivSave();
            g.ivAppendTransform(
                        IV.makeTransform.translate(p.x, p.y)
                .concat(IV.makeTransform.scale(scale, scale))
            );
            IV.forEachReversed($this.objects, function(obj) {
                g.ivSave();
                try {
                    obj.render(g, context);
                } catch(e) {
                    console.trace(e.stack);
                }
                g.ivRestore();
            });
            g.ivRestore();
        });
    },
    renderSelected: function(g, data, context, selection_context) {
        var $this = this;
        var render_for_context = function(context) {
            var p = $this.center.getPoint(context);
            var scale = $this.scale.getPoint(context);
            g.ivSave();
            g.ivAppendTransform(
                        IV.makeTransform.translate(p.x, p.y)
                .concat(IV.makeTransform.scale(scale, scale))
            );
            if(selection_context.selected_object) {
                if(selection_context.selected_object.renderSelected)
                    selection_context.selected_object.renderSelected(g, context, selection_context.inner.context, selection_context.inner);
            } else {
                IV.forEachReversed($this.objects, function(obj) {
                    g.ivSave();
                    try {
                        obj.renderSelected(g, context);
                    } catch(e) {
                        console.trace(e.stack);
                    }
                    g.ivRestore();
                });
            }
            g.ivRestore();
        };
        if(context) {
            render_for_context(context);
        } else {
            $this.path.enumerate(data, render_for_context);
        }
    },
    renderGuideSelected: function(g, data, context, selection_context) {
        var $this = this;
        var render_for_context = function(context) {
            var p = $this.center.getPoint(context);
            var scale = $this.scale.getPoint(context);
            g.ivSave();
            g.ivAppendTransform(
                        IV.makeTransform.translate(p.x, p.y)
                .concat(IV.makeTransform.scale(scale, scale))
            );
            if(selection_context.selected_object) {
                if(selection_context.selected_object.renderGuideSelected)
                    selection_context.selected_object.renderGuideSelected(g, context, selection_context.inner.context, selection_context.inner);
            } else {
                IV.forEachReversed($this.objects, function(obj) {
                    g.ivSave();
                    try {
                        obj.renderGuideSelected(g, context);
                    } catch(e) {
                        console.trace(e.stack);
                    }
                    g.ivRestore();
                });
            }
            g.ivRestore();
        };
        if(context) {
            render_for_context(context);
        } else {
            $this.path.enumerate(data, render_for_context);
        }
    },
    select: function(pt, data, action) {
        var $this = this;
        var rslt = null;
        this.path.enumerate(data, function(context) {
            var p = $this.center.getPoint(context);
            var scale = $this.scale.getPoint(context);
            var pt2 = pt.sub(p).scale(1.0 / scale);
            pt2.view_det = pt.view_det.slice();
            pt2.view_det[0] *= scale;
            pt2.view_det[1] *= scale;
            pt2.view_det[2] *= scale;
            pt2.view_det[3] *= scale;
            pt2.view_scale = pt.view_scale * scale;
            if(p === null) return;
            IV.forEachReversed($this.objects, function(obj) {
                var r = obj.select(pt2, context, action);
                if(r && (!rslt || rslt.distance > r.distance)) {
                    r.obj = obj;
                    rslt = {
                        distance: r.distance,
                        selected_object: obj,
                        inner: r,
                        context: context.clone()
                    };
                    if(r.onMove) {
                        rslt.onMove = function(p0, p1, magnetics) {
                            var rp0 = p0.sub(p).scale(1.0 / scale);
                            var rp1 = p1.sub(p).scale(1.0 / scale);
                            magnetics_delegate = {
                                modify: function(x, y) {
                                },
                                accept: function(c, x, y) {
                                }
                            };
                            return r.onMove(rp0, rp1, magnetics_delegate);
                        };
                    }
                }
            });
        });
        return rslt;
    },
    selectObject: function(data, obj, r) {
        return {
            inner: r,
            selected_object: obj,
            context: null
        };
    }
});
IV.serializer.registerObjectType("Component", Objects.Component);

G_CREATE_TEST_COMPONENT = function() {
    var scatter = new Objects.Scatter({
        track1: new Objects.Track({
            path: new IV.Path("[stations]:lng"),
            min: new Objects.Plain(115.972),
            max: new Objects.Plain(117.12),
            anchor1: new Objects.Plain(new IV.Vector(-310, -300)),
            anchor2: new Objects.Plain(new IV.Vector(-310, 300))
        }),
        track2: new Objects.Track({
            path: new IV.Path("[stations]:lat"),
            min: new Objects.Plain(39.52),
            max: new Objects.Plain(40.499),
            anchor1: new Objects.Plain(new IV.Vector(-300, -310)),
            anchor2: new Objects.Plain(new IV.Vector(300, -310))
        })
    });
    var scatterk = new Objects.Scatter({
        track1: new Objects.Track({
            path: new IV.Path("[stations]:[measurements]:PM2_5"),
            min: new Objects.Plain(0),
            max: new Objects.Plain(100),
            anchor1: new Objects.Plain(new IV.Vector(0, 0)),
            anchor2: new Objects.Plain(new IV.Vector(0, 30))
        }),
        track2: new Objects.Track({
            path: new IV.Path("[stations]:[measurements]:time"),
            min: new Objects.Plain(1367337600),
            max: new Objects.Plain(1367474400),
            anchor1: new Objects.Plain(new IV.Vector(0, 0)),
            anchor2: new Objects.Plain(new IV.Vector(30, 0))
        })
    });
    var component = new Objects.Component({
        path: new IV.Path("[stations]"),
        center: scatter,
        objects: [
            scatterk,
            scatterk.track1,
            scatterk.track2,
            new Objects.Line({
                path: new IV.Path("[stations]:[measurements]"),
                point1: scatterk,
                point2: scatterk.track2
            })
        ]
    });
    IV.editor.vis.addObject(scatter);
    IV.editor.vis.addObject(scatter.track1);
    IV.editor.vis.addObject(scatter.track2);
    IV.editor.vis.addObject(component);
};


})();


// iVisDesigner - scripts/core/render.js
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

if(IV.isBrowser) {
    IV.getOptimalRatio = function() {
        var canvas = document.createElement("canvas");
        var g = canvas.getContext("2d");
        var dev_ratio = window.devicePixelRatio || 1;
        var backing_ratio = g.webkitBackingStorePixelRatio ||
                            g.mozBackingStorePixelRatio ||
                            g.msBackingStorePixelRatio ||
                            g.oBackingStorePixelRatio ||
                            g.backingStorePixelRatio || 1;
        return dev_ratio / backing_ratio;
    };
} else {
    IV.getOptimalRatio = function() { return 1; }
}

// Class: IV.CanvasManager
// Class to manage canvases.
// Helps adding canvas, and maintain heights.

IV.CanvasManager = function(width, height) {
    this.width = width ? width : 600;
    this.height = height ? height : 400;
    this.ratio = IV.getOptimalRatio();
    this.canvas = { };
};

IV.CanvasManager.prototype.getResolutionRatio = function() {
    return this.ratio;
};

IV.CanvasManager.prototype.setResolutionRatio = function(ratio) {
    this.ratio = ratio;
    this.resize(this.width, this.height, false);
};

// Add a canvas.
IV.CanvasManager.prototype.add = function(key, canvas, set_css) {
    this.canvas[key] = canvas;
    canvas.width = this.ratio * this.width;
    canvas.height = this.ratio * this.height;
};

// Get a canvas by name.
IV.CanvasManager.prototype.get = function(key) {
    return this.canvas[key];
};

// Resize the canvases.
IV.CanvasManager.prototype.resize = function(width, height, set_css) {
    this.width = width;
    this.height = height;
    for(var key in this.canvas) {
        var c = this.canvas[key];
        c.width = this.ratio * this.width;
        c.height = this.ratio * this.height;
        if(set_css) {
            $(c).css("width", this.width + "px");
            $(c).css("height", this.height + "px");
        }
    }
};

// Class: IV.Renderer
// Visualization renderer.

IV.Renderer = function() {
    this.data = null;
    this.vis = null;
    this.view = null;
    this.manager = null;
    this.center = new IV.Vector(0, 0);
    this.scale = 1;
    this.needs_render = { };
    this.frame_origin = false;
    this.frame_grid = false;
    this.grid_size = 10;
    this.show_guide = true;
    var $this = this;

    IV.EventSource.call(this);

    this.bind("main", function(data, g) {
        if($this.vis) {
            $this.vis.render(data, g);
        }
    });
    this.bind("front", function(data, g) {
        if($this.vis && $this.show_guide) {
            $this.vis.renderGuideSelected(data, g);
        }
        if($this.vis) {
            $this.vis.renderSelection(data, g);
        }
    });
    this.bind("back", function(data, g) {
        if($this.vis && $this.show_guide) {
            g.strokeStyle = "gray";
            var w = g.ivGuideLineWidth();
            g.strokeRect($this.vis.artboard.x0, $this.vis.artboard.y0, $this.vis.artboard.width, $this.vis.artboard.height);
        }
        if($this.frame_grid) {
            var gs = this.grid_size;
            while(gs * this.scale < 5) {
                gs *= 10;
            }
            while(gs * this.scale > 50) {
                gs /= 10;
            }
            var render_grid = function(gs) {
                var w = g.ivGuideLineWidth();
                var nx = Math.ceil($this.manager.width / $this.scale / 2 / gs);
                var kx = Math.round(-$this.center.x / gs / $this.scale);
                var ny = Math.ceil($this.manager.height / $this.scale / 2 / gs);
                var ky = Math.round(-$this.center.y / gs / $this.scale);
                g.beginPath();
                for(var i = -nx; i<= nx; i++) {
                    g.moveTo((i + kx) * gs, (ny + ky) * gs);
                    g.lineTo((i + kx) * gs, (ky - ny) * gs);
                }
                for(var i = -ny; i<= ny; i++) {
                    g.moveTo((nx + kx) * gs, (i + ky) * gs);
                    g.lineTo((kx - nx) * gs, (i + ky) * gs);
                }
                g.strokeStyle = IV.colors.guide.toRGBA();
                g.lineCap = "butt";
                g.stroke();
            };
            render_grid(gs);
            render_grid(gs * 10);
        }
        if($this.frame_origin) {
            var w = g.ivGuideLineWidth();
            var l = 10 * w;
            g.beginPath();
            g.moveTo(-l, 0);
            g.lineTo(l, 0);
            g.moveTo(0, -l);
            g.lineTo(0, l);
            g.strokeStyle = "gray";
            g.stroke();
        }
        if($this.vis && $this.show_guide) {
            $this.vis.renderGuide(data, g);
        }
    });
};

IV.implement(IV.EventSource, IV.Renderer);

// Set dataset.
// Note that the schema is only needed for editing, not rendering.
IV.Renderer.prototype.setData = function(data) {
    this.data = data;
};

// Set visualzation to render, attach event handlers.
IV.Renderer.prototype.setVisualization = function(vis) {
    this.vis = vis;
};

// Set view transform, given center and scale.
IV.Renderer.prototype.setView = function(center, scale) {
    this.center = center;
    this.scale = scale;
};

IV.Renderer.prototype.getView = function() {
    return {
        center: this.center,
        scale: this.scale
    };
};

IV.Renderer.prototype.autoView = function(vis) {
    var ab = vis.artboard;
    var w = this.manager.width;
    var h = this.manager.height;
    this.scale = Math.min(
        (w - 10) / ab.width,
        (h - 10) / ab.height
    );
    this.center = new IV.Vector(-(ab.x0 + ab.width / 2) * this.scale,
                                -(ab.y0 + ab.height / 2) * this.scale);
};

IV.Renderer.prototype.getConfig = function() {
    return {
        view: this.getView(),
        frame_origin: this.frame_origin,
        frame_grid: this.frame_grid,
        grid_size: this.grid_size
    };
};

IV.Renderer.prototype.setConfig = function(config) {
    this.setView(config.view.center, config.view.scale);
    this.frame_origin = config.frame_origin;
    this.frame_grid = config.frame_grid;
    this.grid_size = config.grid_size;
};



IV.Renderer.prototype.getOffsetFromScreen = function(pt) {
    var x = (pt.x - this.manager.width / 2 - this.center.x) / this.scale;
    var y = -(pt.y - this.manager.height / 2 + this.center.y) / this.scale;
    var r = new IV.Vector(x, y);
    r.view_det = [ this.scale, 0, 0, this.scale ];
    r.view_scale = this.scale;
    return r;
};

// Set the CanvasManager.
IV.Renderer.prototype.setCanvasManager = function(manager) {
    this.manager = manager;
};

// Trigger render for layers.
IV.Renderer.prototype.trigger = function(items) {
    if(items === null || items === undefined) {
        items = [ "front", "back", "main", "overlay" ];
    }
    if(typeof(items) == "string") items = items.split(",");
    for(var i = 0; i < items.length; i++)
        this.needs_render[items[i]] = true;
};

if(IV.isBrowser) {
    CanvasRenderingContext2D.prototype.ivSave = function() {
        this.save();
        if(!this.iv_transform_stack) this.iv_transform_stack = [];
        this.iv_transform_stack.push(this.iv_transform);
    };

    CanvasRenderingContext2D.prototype.ivRestore = function() {
        this.restore();
        if(!this.iv_transform_stack) this.iv_transform_stack = [];
        this.iv_transform = this.iv_transform_stack.pop();
    };

    // CanvasRenderingContext2D.prototype.ivSetTransform = function(tr) {
    //     if(!tr) tr = new IV.affineTransform();
    //     var r = this.iv_pre_ratio;
    //     this.setTransform(r * tr.m[0], r * tr.m[1], r * tr.m[3], r * tr.m[4], r * tr.m[2], r * tr.m[5]);
    //     this.iv_transform = tr;
    // };

    CanvasRenderingContext2D.prototype.ivAppendTransform = function(tr) {
        if(this.iv_transform)
            this.iv_transform = this.iv_transform.concat(tr);
        else
            this.iv_transform = tr;
        this.transform(tr.m[0], tr.m[1], tr.m[3], tr.m[4], tr.m[2], tr.m[5]);
    };

    CanvasRenderingContext2D.prototype.ivGetTransform = function(tr) {
        if(this.iv_transform)
            return this.iv_transform;
        return new IV.affineTransform();
    };

    CanvasRenderingContext2D.prototype.ivGetGuideWidth = function() {
        return 1.0 / Math.sqrt(Math.abs(this.ivGetTransform().det()));
    };

    CanvasRenderingContext2D.prototype.ivGuideLineWidth = function(scale) {
        return this.lineWidth = this.ivGetGuideWidth() * (scale !== undefined ? scale : 1);
    };

    CanvasRenderingContext2D.prototype.ivSetFont = function(font_info) {
        var sz = font_info.size ? font_info.size : 12;
        var f = font_info.family ? font_info.family : "Arial";
        this.font = "36px " + f;
        this._font_size = sz;
    };

    CanvasRenderingContext2D.prototype.ivMeasureText = function(s) {
        var r = this.measureText(s);
        return { width: r.width / 36 * this._font_size };
    };

    CanvasRenderingContext2D.prototype.ivFillText = function(s, x, y) {
        this.save();
        var scale = 1.0 / 36.0 * this._font_size;
        this.translate(x, y);
        this.scale(scale, -scale);
        this.fillText(s, 0, 0);
        this.restore();
    };
    CanvasRenderingContext2D.prototype.ivStrokeText = function(s, x, y) {
        this.save();
        var scale = 1.0 / 36.0 * this._font_size;
        this.translate(x, y);
        this.lineWidth /= this._font_size / 36;
        this.scale(scale, -scale);
        this.strokeText(s, 0, 0);
        this.restore();
    };
}

IV.Renderer.prototype._set_transform = function(ctx) {
    //ctx.iv_pre_ratio = this.manager.ratio;
    if(IV.isBrowser) {
        ctx.ivAppendTransform(new IV.affineTransform([
            this.manager.ratio, 0, 0,
            0, this.manager.ratio, 0,
            0, 0, 1
        ]));
        ctx.ivAppendTransform(new IV.affineTransform([
            this.scale, 0, this.center.x + this.manager.width / 2,
            0, -this.scale, -this.center.y + this.manager.height / 2,
            0, 0, 1
        ]));
    } else {
        ctx.ivAppendTransform(new IV.affineTransform([
            this.scale, 0, this.center.x + this.manager.width / 2,
            0, -this.scale, -this.center.y + this.manager.height / 2,
            0, 0, 1
        ]));
    }
};

IV.Renderer.prototype._perform_render = function(key) {
    var canvas = this.manager.get(key);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, this.manager.width * this.manager.ratio, this.manager.height * this.manager.ratio);

    ctx.ivSave();
    this._set_transform(ctx);

    this.raise(key + ":before", this.data, ctx);
    this.raise(key, this.data, ctx);
    this.raise(key + ":after", this.data, ctx);

    ctx.ivRestore();
};

// Render the visualizaion.
IV.Renderer.prototype.render = function() {
    var rendered = false;
    for(var key in this.needs_render) {
        if(!this.needs_render[key]) continue;
        this._perform_render(key);
        rendered = true;
        this.needs_render[key] = false;
    }
    return rendered;
};

IV.Renderer.prototype.renderSVG = function() {
    var ab = this.vis.artboard;
    var ctx = new C2S(ab.width, ab.height);
    // Copy extended methods.
    for(var name in CanvasRenderingContext2D.prototype) {
        if(name.substr(0, 2) != "iv") continue;
        ctx[name] = CanvasRenderingContext2D.prototype[name];
    }
    // Render stuff.
    ctx.ivAppendTransform(new IV.affineTransform([
        1, 0, -ab.x0,
        0, -1, ab.y0 + ab.height,
        0, 0, 1
    ]));
    this.vis.render(this.data, ctx);
    var svg = ctx.getSerializedSvg();
    return svg;
};

IV.Renderer.prototype.renderBitmap = function(ratio) {
    var canvas = document.createElement("canvas");
    var ab = this.vis.artboard;
    canvas.width = ab.width * ratio;
    canvas.height = ab.height * ratio;
    var ctx = canvas.getContext("2d");
    ctx.ivAppendTransform(new IV.affineTransform([
        ratio, 0, 0,
        0, ratio, 0,
        0, 0, 1
    ]));
    ctx.ivAppendTransform(new IV.affineTransform([
        1, 0, -ab.x0,
        0, -1, ab.y0 + ab.height,
        0, 0, 1
    ]));
    this.vis.render(this.data, ctx);
    return canvas.toDataURL("image/png").split(",")[1];
};


// ------------------------------------------------------------------------
// Global Colors
// ------------------------------------------------------------------------
IV.colors_white = {
    selection: IV.parseColorHEX("1754AD"),
    guide: new IV.Color(0, 0, 0, 0.03),
    foreground: new IV.Color(0, 0, 0, 1),
    background: new IV.Color(255, 255, 255, 1),
    default_fill: new IV.Color(0, 0, 0, 1),
    default_halffill: new IV.Color(128, 128, 128, 1),
    default_stroke: new IV.Color(0, 0, 0, 1),
    default_guide: new IV.Color(0, 0, 0, 1)
};

IV.colors_black = {
    selection: IV.parseColorHEX("1754AD"),
    guide: new IV.Color(255, 255, 255, 0.3),
    foreground: new IV.Color(255, 255, 255, 1),
    background: new IV.Color(0, 0, 0, 1),
    default_fill: new IV.Color(255, 255, 255, 1),
    default_halffill: new IV.Color(128, 128, 128, 1),
    default_stroke: new IV.Color(255, 255, 255, 1),
    default_guide: new IV.Color(255, 255, 255, 1)
};

IV.colors = IV.colors_white;

// iVisDesigner - scripts/interface/interface.js
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

// iVisDesigner - scripts/interface/utils.js
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

(function() {
    var object_types = { };

    IV.registerObjectType = function(c, func, args) {
        object_types[c] = func;
        var keys = args ? args.split(",") : [];
        if(keys.indexOf("unique") >= 0)
            func._is_unique = true;
        $(c).each(function() {
            var d = $(this).data();
            if(func._is_unique && d["__objtype_" + c]) return;
            d["__objtype_" + c] = true;
            func.call($(this));
        });
    };

    document.body.addEventListener("DOMNodeInserted", function(event) {
        var $new_element = $(event.target);
        for(var c in object_types) {
            $new_element.find(c).each(function() {
                var func = object_types[c];
                var d = $(this).data();
                if(func._is_unique && d["__objtype_" + c]) return;
                d["__objtype_" + c] = true;
                func.call($(this));
            });
        }
    }, false);
})();

// data-apply-children
IV.registerObjectType("[data-apply-children]", function() {
    var attr = $(this).attr("data-apply-children");
    var kvs = attr.split(";").map(function(x) {
        var k = x.split("=");
        return { key: k[0], value: k[1] };
    });
    $(this).children().each(function() {
        var $this = $(this);
        if($this.attr("data-apply-children-resist")) return;
        kvs.forEach(function(t) {
            $this.attr(t.key, t.value);
        });
    });
}, "unique");
// data-remove-text-nodes
IV.registerObjectType("[data-remove-text-nodes]", function() {
    $(this).contents().filter(function() { return this.nodeType === 3; }).remove();
}, "unique");
// data-switch
IV.registerObjectType("span[data-switch]", function() {
    var key = $(this).attr("data-switch");
    var value = $(this).attr("data-value");
    var $this = $(this);
    if(!IV.exists(key)) IV.add(key, "string");
    IV.listen(key, function(v) {
        if(v == value) {
            $this.addClass("active");
        } else {
            $this.removeClass("active");
        }
    });
    $(this).click(function() {
        IV.set(key, value);
    });
}, "unique");
// data-toggle
IV.registerObjectType("span[data-toggle]", function() {
    var id = $(this).attr("data-toggle");
    if(id[0] == "#") {
        $(id).data().toggle_selector = $(this);
        if($(id).is(":visible")) {
            $(this).addClass("toggle-on");
        } else {
            $(this).removeClass("toggle-on");
        }
        $(this).click(function() {
            $(id).toggle();
            $(this).toggleClass("toggle-on");
        });
    } else {
        if(!IV.exists(id)) IV.add(id, "bool");
        var th = $(this);
        var f = function() {
            if(IV.get(id)) {
                th.addClass("toggle-on");
            } else {
                th.removeClass("toggle-on");
            }
        };
        IV.listen(id, f);
        f();
        $(this).click(function() {
            IV.set(id, !IV.get(id));
        });
    }
}, "unique");
// data-popup
IV.registerObjectType("span[data-popup]", function() {
    var key = $(this).attr("data-popup");
    $(this).click(function() {
        var data = IV.popups[key]();
        data.show($(this));
    });
}, "unique");
// data-href
IV.registerObjectType("span[data-open-page]", function() {
    var href = $(this).attr("data-open-page");
    var title = $(this).attr("data-open-page-title");
    $(this).click(function() {
        $("#panel-page").IVPanel("show");
        $("#panel-page").IVPanel("front");
        if(title) {
            $("#panel-page").IVPanel({ title: title });
        }
        if(href[0] == "#") {
            $("#panel-page-container").html($(href).html());
        } else {
            if(href.substr(0, 7) == "base64:") {
                var ht = atob(href.substr(7));
                $("#panel-page-container").html(ht);
            } else {
                $("#panel-page-container").load(href);
            }
        }
    });
}, "unique");
// data-command
IV.registerObjectType("span[data-command]", function() {
    var command = $(this).attr("data-command");
    $(this).click(function() {
        IV.raiseEvent("command:" + command, $(this).attr("data-parameters"));
    });
}, "unique");

// iVisDesigner - scripts/interface/controls.js
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

IV._E = function(type, cls, text) {
    var e = $("<" + type + " />");
    if(cls) e.addClass(cls);
    if(text) e.text(text);
    return e;
};

IV._icon = function(cls) {
    return $('<i class="' + cls + '"></i>');
};

$.fn.IVInputNumeric = function(num) {
    var $this = this;
    var data = $this.data();
    if(!data.is_created) {
        data.delta_scale = 1;
        data.min = 0;
        data.max = 1;
        if($this.attr("data-delta-scale") !== undefined) {
            data.delta_scale = parseFloat($this.attr("data-delta-scale"));
        }
        if($this.attr("data-min") !== undefined) {
            data.min = parseFloat($this.attr("data-min"));
        }
        if($this.attr("data-max") !== undefined) {
            data.max = parseFloat($this.attr("data-max"));
        }
        var input = $('<input type="text" />');
        var btn_show_slider = $('<span/>').html('↕');

        var fire = function() {
            if(data.changed) data.changed(data.get());
        };

        $this.append(input);
        $this.append(btn_show_slider);
        var slider_context = null;
        btn_show_slider.mousedown();
        IV.trackMouseEvents(btn_show_slider, {
            down: function(e) {
                slider_context = { y: e.pageY, val: data.get() };
                if(slider_context.val === null) slider_context.val = 0;
                return;
            },
            move: function(e) {
                if(slider_context) {
                    var dy = -e.pageY + slider_context.y;
                    var newval = slider_context.val + dy * 0.02 * data.delta_scale;
                    if(newval < data.min) newval = data.min;
                    if(newval > data.max) newval = data.max;
                    data.set(newval.toFixed(2));
                    fire();
                }
            },
            up: function() {
                if(slider_context) {
                    slider_context = null;
                    fire();
                }
            }
        });
        input.focusout(fire);
        input.keydown(function(e) {
            if(e.which == 13) {
                fire();
            }
        });
        data.get = function() {
            var v = input.val().trim();
            if(v == "") return null;
            var r = parseFloat(v);
            if(isNaN(r)) return null;
            return r;
        };
        data.set = function(num) {
            if(num === undefined || num === null || isNaN(num)) {
                input.val("");
            } else {
                input.val(num);
            }
        };
        data.set(null);
        data.is_created = true;
    }
    var input = $this.children("input");
    if(num !== undefined) {
        if(typeof(num) == "function") {
            data.changed = num;
        } else {
            data.set(num);
        }
        return this;
    } else {
        return data.get();
    }
};
IV.registerObjectType(".input-numeric", $.fn.IVInputNumeric);

// ### IVInputString
// String input box.

$.fn.IVInputString = function(str) {
    var $this = this;
    var data = $this.data();
    if(!data.is_created) {
        var input = $('<input type="text" />');
        var fire = function() {
            if(data.changed) data.changed(data.get());
        };
        $this.append(input);
        input.focusout(fire);
        input.keydown(function(e) {
            if(e.which == 13) {
                fire();
            }
        });
        data.get = function() {
            return input.val();
        };
        data.set = function(str) {
            input.val(str);
        };
        if($this.attr("data-default")) data.set($this.attr("data-default"));
        else data.set("");
        data.is_created = true;
    }
    var input = $this.children("input");
    if(str !== undefined) {
        if(typeof(str) == "function") {
            data.changed = str;
        } else {
            data.set(str);
        }
        return this;
    } else {
        return data.get();
    }
};
IV.registerObjectType(".input-string", $.fn.IVInputString);

// ### IVInputPath
// Path select box.

$.fn.IVInputPath = function(str) {
    var $this = this;
    var data = $this.data();
    if(!data.is_created) {
        var input = $('<span />');
        data.path = null;
        data.ref = null;
        var fire = function() {
            if(data.changed) data.changed(data.get());
        };
        $this.append(input);
        input.click(function() {
            var $this = $(this);
            if($this.is(".active")) return;
            var popup = IV.popups.PathSelect();
            popup.onSelectPath = function(path, ref) {
                data.set(path, ref);
                fire();
                $this.removeClass("active");
            };
            popup.onHide = function() {
                $this.removeClass("active");
            };
            popup.show($this, 200, 150);
            $this.addClass("active");
        });
        data.get = function() {
            return data.path;
        };
        data.set = function(path, ref) {
            data.path = new IV.Path(path);
            data.ref = ref ? new IV.Path(ref) : null;
            if(!data.path) input.text("[ROOT]");
            else if(!data.ref) {
                input.text(data.path.toStringDisplay());
            } else {
                input.text(data.path.toStringDisplay() + "@" + data.ref.toStringDisplay());
            }
        };
        data.set(null);
        data.is_created = true;
    }
    if(str !== undefined) {
        if(typeof(str) == "function") {
            data.changed = str;
        } else {
            data.set(str);
        }
        return this;
    } else {
        return data.get();
    }
};
IV.registerObjectType(".input-path", $.fn.IVInputPath);

$.fn.IVInputObject = function(str) {
    var $this = this;
    var data = $this.data();
    if(!data.is_created) {
        var input = $('<span />');
        data.path = null;
        data.ref = null;
        var fire = function() {
            if(data.changed) data.changed(data.get());
        };
        $this.append(input);
        input.click(function() {
            var $this = $(this);
            if($this.is(".active")) return;
            var popup = IV.popups.ObjectSelect();
            popup.onSelectObject = function(canvas, object) {
                data.set(canvas, object);
                fire();
                $this.removeClass("active");
            };
            popup.onHide = function() {
                $this.removeClass("active");
            };
            popup.show($this, 200, 150);
            $this.addClass("active");
        });
        data.get = function() {
            return [data.canvas, data.object];
        };
        data.set = function(canvas, object) {
            data.canvas = canvas;
            data.object = object;
            if(!canvas || !object) input.text("None");
            else input.text(canvas.name + "/" + object.name);
        };
        data.set(null, null);
        data.is_created = true;
    }
    if(str !== undefined) {
        if(typeof(str) == "function") {
            data.changed = str;
        } else {
            data.set(arguments[0], arguments[1]);
        }
        return this;
    } else {
        return data.get();
    }
};
IV.registerObjectType(".input-object", $.fn.IVInputObject);

// ### IVColorPicker
// Color selectors.

$.fn.IVColorPicker = function(obj) {
    var $this = $(this);
    var data = $this.data();
    if(!data.is_created) {
        data.is_created = true;
        data.set = function(color) {
            if(!color) {
                data.color = null;
                $this.css("background-color", "transparent");
                $this.addClass("empty");
            } else {
                data.color = color.clone();
                $this.css("background-color", color.toRGBA());
                $this.removeClass("empty");
            }
        };
        data.get = function() {
            if(data.color)
                return data.color.clone();
            return null;
        };
        $this.click(function() {
            IV.popups.beginColorSelect($this, data.get(), function(value) {
                data.set(value);
                if(data.changed)
                    data.changed(value);
            });
        });
    }
    if(obj === undefined) return data.get();
    if(typeof(obj) == "function") {
        data.changed = obj;
    }
    if(typeof(obj) == "object") {
        data.set(obj);
    }
    return this;
};
IV.registerObjectType(".color-selector", $.fn.IVColorPicker);

// ### IVSelectValue
// Select a value from a list of options.

$.fn.IVSelectValue = function(obj) {
    var $this = this;
    var data = $this.data();
    if(!data.is_created) {

        data.select = $("<span />");
        data.optmap = { };
        data.val = null;
        data.options = $this.attr("data-options").split(",").map(function(s) {
            var sp = s.split("|");
            if(sp.length == 1) return { name: s, display: s };
            data.optmap[sp[0]] = sp[1];
            return { name: sp[0], display: sp[1] };
        });
        $this.append(data.select)
             .append($('<i class="icon-down-dir" style="margin-left:-4px;margin-right:-4px" /></i>'));

        data.select.click(function() {
            IV.popups.beginContextMenu($this, data.options, function(val) {
                data.set(val);
                if(data.changed) data.changed(data.get());
            });
        });

        data.get = function() {
            return data.val;
        };
        data.set = function(v) {
            data.select.text(data.optmap[v] + " ");
            data.val = v;
        };

        if($this.attr("data-default")) data.set($this.attr("data-default"));
        else data.set(data.options[0].name);

        data.is_created = true;
    }
    if(obj === undefined) return data.get();
    if(typeof(obj) == "function")
        data.changed = obj;
    else data.set(obj);
    return this;
};
IV.registerObjectType(".control-select-value", $.fn.IVSelectValue);

// ### ScrollView
// Scrollable view, automatically handle content and window resize.

$.fn.ScrollView = function() {
    var container = this;
    var $this = this;
    var data = $this.data();

    if(!data.is_created) {
        data.is_created = true;

        var view = container.children("div");
        view.addClass("scrollview-content");
        var scrollbar = $("<div />").addClass("scrollbar");
        var guide = $("<div />").addClass("guide");
        scrollbar.append(guide);
        container.append(scrollbar);

        var get_top = function() {
            var top = view.css("top");
            if(!top) top = 0;
            else top = parseFloat(top.replace("px", ""));
            if(isNaN(top)) top = 0;
            return top;
        };
        var set_top = function(top) {
            var view_h = view.outerHeight();
            var cont_h = container.height();
            if(view_h < cont_h || view_h == 0) {
                top = 0;
                scrollbar.addClass("hide");
                container.addClass("hide");
            } else {
                if(top > 0) top = 0;
                if(top < cont_h - view_h) top = cont_h - view_h;
                scrollbar.removeClass("hide");
                container.removeClass("hide");
                guide.css({
                    height: (cont_h / view_h * cont_h) + "px",
                    top: (-top / view_h * cont_h) + "px"
                });
            }
            view.css("top", top + "px");
        };
        container.mousewheel(function(e, delta) {
            set_top(get_top() + delta);
        });

        var check_size = function() {
            set_top(get_top());
        };
        data.check_size_timer = setInterval(check_size, 200);

        IV.trackMouseEvents(guide, {
            down: function(e) {
                this.top0 = parseFloat(guide.css("top").replace("px", ""));
                this.mouse0 = e.pageY;
                e.preventDefault();
                scrollbar.addClass("dragging");
            },
            move: function(e) {
                var new_top = this.top0 + e.pageY - this.mouse0;
                var view_h = view.outerHeight();
                var cont_h = container.height();
                var rtop = -new_top * view_h / cont_h;
                set_top(rtop);
            },
            up: function() {
                scrollbar.removeClass("dragging");
            }
        });
    }
};
IV.registerObjectType(".scrollview", $.fn.ScrollView);

// ### IVTab
// Tab control.

$.fn.IVTab = function() {
    var $this = this;
    var data = $this.data();
    if(!data.is_created) {
        var header = $this.children(".header");
        var tabs = $this.children(".tabs");
        var show_tab = function(name) {
            tabs.children().each(function() {
                if($(this).attr("data-tab") == name)
                    $(this).show();
                else $(this).hide();
            });
            header.children("[data-tab]").each(function() {
                if($(this).attr("data-tab") == name)
                    $(this).addClass("active");
                else $(this).removeClass("active");
            });
            data.current = name;
        };
        header.children("[data-tab]").each(function() {
            $(this).click(function() {
                var tabname = $(this).attr("data-tab");
                show_tab(tabname);
            });
        });
        if($this.attr("data-default"))
            show_tab($this.attr("data-default"));
        else
            $(header.children("[data-tab]")[0]).click();
    };
};
IV.registerObjectType(".tab", $.fn.IVTab);

// iVisDesigner - scripts/interface/menu.js
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

(function($) {

$(".menu > li").each(function() {
    var $this = $(this);
    var title = $this.children("span");
    var menu = $this.children("ul");
    var should_prevent = false;
    title.click(function(e) {
        if(menu.is(":visible")) {
            menu.hide();
            $this.removeClass("active");
        } else {
            menu.show();
            $this.addClass("active");
            should_prevent = $this;
        }
    });
    title.mouseenter(function(e) {
        if($(".menu > li").is(".active")) {
            $(".menu > li > ul").hide();
            $(".menu > li").removeClass("active");
            menu.show();
            $this.addClass("active");
        }
    });
    $(window).click(function() {
        if(should_prevent != $this) {
            menu.hide();
            $this.removeClass("active");
        }
        should_prevent = false;
    });
});

})(jQuery);

// iVisDesigner - scripts/interface/panel.js
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

(function($) {
  $.fn.IVPanel = function(params) {
    var $this = this;
    var data = this.data();

    if(!data.is_created) {
        var min_width = 50;
        var min_height = 38;
        if(params.min_width !== undefined) min_width = params.min_width;
        if(params.min_height !== undefined) min_height = params.min_height;
        var container = $(
            '<div class="content-wrapper"></div>' +
            '<div class="title-wrapper">' +
                '<div class="title">' + $this.attr("data-title") + '</div>' +
                '<div class="buttons">' +
                    '<div class="button-minimize" title="Minimize"><i class="icon-up-open-mini"></i></div>' +
                    '<div class="button-close" title="Close"><i class="xicon-cross"></i></div>' +
                '</div>' +
            '</div>' +
            '<div class="resize rb" data-resize="0+0+"></div>' +
            '<div class="resize lb" data-resize="+-0+"></div>' +
            '<div class="resize lt" data-resize="+-+-"></div>'
        );
        $(container[0]).append($this.children());

        $this.append(container);

        $this.css({
            left: "0px", top: "0px",
            width: "100px", height: "100px"
        });

        var title_wrapper = $this.children(".title-wrapper");

        title_wrapper.children(".buttons").children(".button-close").click(function() {
            $this.hide();
            if(data.toggle_selector)
                data.toggle_selector.removeClass("toggle-on");
        });

        title_wrapper.children(".buttons").children(".button-minimize").click(function() {
            $this.toggleClass("minimized");
        });

        title_wrapper.mousedown(function(e) {
            var left0 = parseFloat($this.css("left").replace("px", ""));
            var top0 = parseFloat($this.css("top").replace("px", ""));
            IV.attachMouseEvents({
                move: function(emove) {
                    var nx = emove.pageX - e.pageX + left0;
                    var ny = emove.pageY - e.pageY + top0;
                    if(ny < 30) ny = 30;
                    $this.css("left", nx + "px");
                    $this.css("top", ny + "px");
                }
            });
        });

        $this.children(".resize").mousedown(function(e) {
            var x0 = parseFloat($this.css("left").replace("px", ""));
            var y0 = parseFloat($this.css("top").replace("px", ""));
            var w0 = $this.width();
            var h0 = $this.height();
            var info = $(this).attr("data-resize");
            e.stopPropagation();
            e.preventDefault();
            IV.attachMouseEvents({
                move: function(emove) {
                    var dx = emove.pageX - e.pageX;
                    var dy = emove.pageY - e.pageY;
                    if(emove.shiftKey) {
                        var r = IV.shiftModifyNoDiagnoal(0, 0, dx, dy);
                        dx = r[0]; dy = r[1];
                    }
                    var x1 = x0, y1 = y0, w1 = w0, h1 = h0;
                    if(info[0] == '+') x1 += dx; if(info[2] == '+') y1 += dy;
                    if(info[0] == '-') x1 -= dx; if(info[2] == '-') y1 -= dy;
                    if(info[1] == '+') w1 += dx; if(info[3] == '+') h1 += dy;
                    if(info[1] == '-') w1 -= dx; if(info[3] == '-') h1 -= dy;
                    if(w1 < min_width) w1 = min_width;
                    if(h1 < min_height) h1 = min_height;
                    if(y1 < 30) y1 = 30;
                    $this.css("left", x1 + "px");
                    $this.css("top", y1 + "px");
                    $this.css("width", w1 + "px");
                    $this.css("height", h1 + "px");
                }
            });
        });

        data.reorder = function() {
            // Reorder panels.
            var panels = $("#panel-container > .panel");
            var zidxs = [];
            var myidx = null;
            panels.each(function() {
                var zidx = parseInt($(this).css("z-index"));
                if($this.get(0) == this) myidx = zidxs.length;
                zidxs.push(zidx);
            });
            zidxs[myidx] = 100000;
            var base_idx = 10;
            var order = zidxs.map(function(z, i) { return [ z, i ] })
                                .sort(function(a, b) { return a[0] - b[0] })
                                .map(function(f) { return f[1] });
            for(var i = 0; i < order.length; i++) {
                zidxs[order[i]] = base_idx + +i;
            }
            var idx = 0;
            panels.each(function() {
                $(this).css("z-index", zidxs[idx++]);
            });
        };
        $this.mousedown(function(e) {
            data.reorder();
        });
        data.is_created = true;
    }
    if(params == "show") {
        $this.show();
        if(data.toggle_selector)
            data.toggle_selector.addClass("toggle-on");
        return;
    }
    if(params == "hide") {
        $this.hide();
        if(data.toggle_selector)
            data.toggle_selector.removeClass("toggle-on");
        return;
    }
    if(params == "front") {
        data.reorder();
        return;
    }
    var menu_height = 30;
    var status_height = 18;
    var border_width = 1;
    var area_width = $(window).width();
    var area_height = $(window).height() - menu_height - status_height;

    if(params.width) {
        $(this).css("width", params.width + "px");
    }
    if(params.height) {
        $(this).css("height", params.height + "px");
    }
    if(params.top) {
        $(this).css("top", menu_height + params.top - border_width + "px");
        if(params.bottom) {
            $(this).css("height", area_height - (params.top + params.bottom) + "px");
        }
    } else if(params.bottom) {
        $(this).css("top", $(window).height() - status_height - params.bottom - $this.height() + "px");
    }
    if(params.left) {
        $(this).css("left", params.left - border_width + "px");
        if(params.right) {
            $(this).css("width", area_width - (params.left + params.right) + "px");
        }
    } else if(params.right) {
        $(this).css("left", area_width - params.right - $this.width() - border_width + "px");
    }
    if(params.vcenter !== undefined) {
        var l = (area_width - $this.width()) / 2.0 + params.vcenter;
        $this.css("left", l - border_width + "px");
    }
    if(params.hcenter !== undefined) {
        var l = (area_height - $this.height()) / 2.0 + menu_height + params.hcenter;
        $this.css("top", l - border_width + "px");
    }
    if(params.title) {
        $this.children(".title-wrapper").children(".title").text(params.title);
    }
    return $this;
  };
})(jQuery);

// iVisDesigner - scripts/interface/panels/panels.js
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

IV.panels = { };


// iVisDesigner - scripts/interface/popup.js
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

(function() {
    // Popups
    IV.popups = { };
    var should_block_popup_hide = false;
    IV.popups.create = function() {
        var popup = $("<div />").addClass("popup");
        var data = popup.data();

        var mouse_state = null;

        popup.append('<div class="content"></div>');
        popup.append('<div class="topbar"></div>');
        popup.append('<div class="resize"></div>');

        var resize_button = popup.children(".resize");
        var topbar_move = popup.children(".topbar");

        popup.mousedown(function(e) {
            if(data.shown) {
                should_block_popup_hide = true;
            }
        });

        resize_button.mousedown(function(e) {
            mouse_state = [
                "resize",
                e.pageX, e.pageY,
                popup.width(),
                popup.height()
            ];
            $(window).bind("mousemove", my_move);
            $(window).bind("mouseup", my_up);
        });

        topbar_move.mousedown(function(e) {
            var l = popup.css("left");
            var t = popup.css("top");
            if(!l) l = 0; else l = parseFloat(l.replace("px"), "");
            if(!t) t = 0; else t = parseFloat(t.replace("px"), "");

            mouse_state = [
                "move",
                e.pageX, e.pageY,
                l, t
            ];
            $(window).bind("mousemove", my_move);
            $(window).bind("mouseup", my_up);
        });

        var my_move = function(e) {
            if(mouse_state && mouse_state[0] == "resize") {
                var nx = e.pageX - mouse_state[1] + mouse_state[3];
                var ny = e.pageY - mouse_state[2] + mouse_state[4];
                if(nx < 50) nx = 50;
                if(ny < 40) ny = 40;
                popup.css("width", nx + "px");
                popup.css("height", ny + "px");
            }
            if(mouse_state && mouse_state[0] == "move") {
                var nx = e.pageX - mouse_state[1] + mouse_state[3];
                var ny = e.pageY - mouse_state[2] + mouse_state[4];
                if(nx < 50) nx = 50;
                if(ny < 40) ny = 40;
                popup.css("left", nx + "px");
                popup.css("top", ny + "px");
            }
        };

        var my_up = function(e) {
            mouse_state = null;
            $(window).unbind("mousemove", my_move);
            $(window).unbind("mouseup", my_up);
        };

        data.selector = popup;

        data.hide = function() {
            popup.remove();
            if(data.onHide) data.onHide();
            if(data.finalize) data.finalize();
            return data;
        };

        var get_real_bounds = function(elem) {
            if(elem instanceof IV.Vector) {
                return { x0: elem.x, y0: elem.y, x1: elem.x, y1: elem.y };
            }
            var bound = { x0: -1e10, y0: -1e10, x1: 1e10, y1: 1e10 };
            while(elem) {
                var off = elem.offset();
                var w = elem.outerWidth();
                var h = elem.outerHeight();
                if(off && w != 0 && h != 0) {
                    var x0 = off.left;
                    var y0 = off.top;
                    var x1 = x0 + w;
                    var y1 = y0 + h;
                    if(bound.x0 < x0) bound.x0 = x0;
                    if(bound.y0 < y0) bound.y0 = y0;
                    if(bound.x1 > x1) bound.x1 = x1;
                    if(bound.y1 > y1) bound.y1 = y1;
                }
                if(elem.get(0) == elem.parent().get(0)) break;
                elem = elem.parent();
            }
            return bound;
        };

        data.show = function(anchor, width, height, info) {
            var p = popup;
            if(!width) width = p.default_width;
            if(!height) height = p.default_height;
            $("#popup-container").append(p);
            var margin = 5;
            var x, y;
            if(anchor) {
                var bound = get_real_bounds(anchor);
                x = bound.x1 - width - 2;
                y = bound.y0 - height - margin - 7;
                var cx = (bound.x0 + bound.x1) / 2;
                var cy = (bound.y0 + bound.y1) / 2;
                if(cx < $(window).width() / 2) x = bound.x0;
                if(cy < $(window).height() / 2) y = bound.y1 + margin;
            } else {
                x = ($(window).width() - width) / 2;
                y = ($(window).height() - height) / 2;
            }
            p.css({
                width: width + "px",
                height: height + "px",
                left: x + "px",
                top: y + "px"
            });

            if(p.data().onShow) p.data().onShow(info);
            data.shown = true;
            return p.data();
        };

        data.addActions = function(acts) {
            var actions = $('<div class="actions"></div>');
            popup.append(actions);
            if(!acts) acts = [];
            if(acts.indexOf("ok") != -1) {
                actions.append($('<span class="btn btn-s"><i class="xicon-mark"></i></span>').click(function() {
                    if(data.onOk) data.onOk();
                }));
            }
            if(acts.indexOf("cancel") != -1) {
                actions.append($('<span class="btn btn-s"><i class="xicon-cross"></i></span>').click(function() {
                    if(data.onCancel) data.onCancel();
                }));
            }
            popup.addClass("has-actions");
            popup.append(resize_button);
            return actions;
        };

        return data;
    };

    $(window).mousedown(function() {
        if(!should_block_popup_hide) {
            $("#popup-container").children().each(function() {
                var data = $(this).data();
                data.hide();
            });
        }
        should_block_popup_hide = false;
    });

})();

// iVisDesigner - scripts/interface/popups/popups.js
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

// iVisDesigner - scripts/interface/popups/menu.js
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

IV.popups.beginContextMenu = function(anchor, list, callback) {
    var data = IV.popups.create();
    var ul = $("<ul />").addClass("context-menu");
    var max_width = 50;
    list.forEach(function(text) {
        var disp = text;
        var name = text;
        if(typeof(text) == "object") {
            disp = text.display;
            name = text.name;
        }
        ul.append($("<li />").text(disp).click(function() {
            data.hide();
            callback(name);
        }));
        // TODO: Font hardcoded.
        var m = IV.measureText(disp, "12px 'Lucida Sans Unicode', 'Lucida Grande', sans-serif");
        if(m.width > max_width) max_width = m.width;
    });
    data.selector.children(".content").append(ul);
    // TODO: Auto compute metrics.
    data.show(anchor, max_width + 14, 18 * list.length - 2);
};

// iVisDesigner - scripts/interface/popups/colorselect.js
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

IV.popups.ColorSelect = function() {
    var data = IV.popups.create();

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_color_select"));
    p.attr("data-popup", "color-selector");

    data.addActions([ "ok" ])
        .prepend($('<span class="btn btn-s" data-action="remove">Remove</span>'))
        .prepend($('<span class="selected-color"><span class="selected-color-inner"></span></span>'));

    var mycolor = null;
    var inp_r = p.find(".input-red");
    var inp_g = p.find(".input-green");
    var inp_b = p.find(".input-blue");
    var refresh = function(fire) {
        p.find(".selected-color-inner").css({
            "background-color": mycolor ? mycolor.toRGBA() : "transparent"
        });
        p.find(".predefined span[data-color]").each(function() {
            var c = $(this).attr("data-color");
            var color = IV.parseColorHEX(c.substr(1));
            if(mycolor) {
                if(color.r == mycolor.r && color.g == mycolor.g && color.b == mycolor.b) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            } else {
                $(this).removeClass("active");
            }
        });
        if(mycolor) {
            inp_r.IVInputNumeric(mycolor.r);
            inp_g.IVInputNumeric(mycolor.g);
            inp_b.IVInputNumeric(mycolor.b);
        }
        if(fire) {
            if(data.onSelectColor) data.onSelectColor(mycolor ? mycolor.clone() : null, true);
        }
    };
    // data.onOk = function() {
    //     if(data.onSelectColor) data.onSelectColor(mycolor ? mycolor.clone() : null);
    //     data.hide();
    // };
    data.onOk = function() {
        data.hide();
    };
    p.find('[data-action="remove"]').click(function() {
        mycolor = null;
        refresh();
        if(data.onSelectColor) data.onSelectColor(mycolor ? mycolor.clone() : null);
        data.hide();
    });
    p.find(".predefined").each(function() {
        var ht = $(this).html().trim();
        ht = ht.split(",").map(function(x) {
            return '<span data-color="#' + x.trim() + '"></span>';
        }).join("");
        $(this).html(ht);
    });
    p.find(".predefined span[data-color]").each(function() {
        var c = $(this).attr("data-color");
        var color = IV.parseColorHEX(c.substr(1));
        $(this).css("background-color", color.toRGBA());
        $(this).click(function() {
            if(!mycolor) mycolor = new IV.Color(0, 0, 0, 1);
            mycolor.r = color.r;
            mycolor.g = color.g;
            mycolor.b = color.b;
            if(mycolor) hclpicker_load(mycolor);
            refresh(true);
        });
    });
    p.find(".input-alpha").IVInputNumeric(function(val) {
        if(!mycolor) mycolor = new IV.Color(0, 0, 0, 1);
        mycolor.a = val;
        refresh(true);
    });
    inp_r.IVInputNumeric(function(val) {
        if(!mycolor) mycolor = new IV.Color(0, 0, 0, 1);
        val = Math.floor(val);
        if(val < 0) val = 0; if(val > 255) val = 255;
        mycolor.r = val;
        refresh(true);
        if(mycolor) hclpicker_load(mycolor);
    });
    inp_g.IVInputNumeric(function(val) {
        if(!mycolor) mycolor = new IV.Color(0, 0, 0, 1);
        val = Math.floor(val);
        if(val < 0) val = 0; if(val > 255) val = 255;
        mycolor.g = val;
        refresh(true);
        if(mycolor) hclpicker_load(mycolor);
    });
    inp_b.IVInputNumeric(function(val) {
        if(!mycolor) mycolor = new IV.Color(0, 0, 0, 1);
        val = Math.floor(val);
        if(val < 0) val = 0; if(val > 255) val = 255;
        mycolor.b = val;
        refresh(true);
        if(mycolor) hclpicker_load(mycolor);
    });
    data.onShow = function(color) {
        if(color) {
            mycolor = new IV.Color(color.r, color.g, color.b, color.a);
            p.find(".input-alpha").IVInputNumeric(mycolor.a);
            refresh();
        } else {
            mycolor = null;
            p.find(".input-alpha").IVInputNumeric(1);
            refresh();
        }
        if(mycolor) hclpicker_load(mycolor);
    };
    var hclpicker_load;
    (function() {
        // HCL picker.
        var H_range = 360;
        var C_range = 140;
        var L_range = 100;
        var mode = "L";
        var px = 0.5, py = 0.5, pl = 0.5; // selected positins, [0, 1]
        var get_hcl = function(px, py, pl) {
            var h, c, l;
            var mp;
            if(mode == "C") mp = [ px, 1 - pl, 1 - py ];
            if(mode == "H") mp = [ 1 - pl, px, 1 - py ];
            if(mode == "L") mp = [ px, 1 - py, 1 - pl ];
            h = mp[0] * H_range;
            c = mp[1] * C_range;
            l = mp[2] * L_range;
            return [ h, c, l ];
        };
        var from_hcl = function(h, c, l) {
            var a0 = h / H_range;
            var a1 = c / C_range;
            var a2 = l / L_range;
            if(mode == "C") return [ a0, 1 - a2, 1 - a1 ];
            if(mode == "H") return [ a1, 1 - a2, 1 - a0 ];
            if(mode == "L") return [ a0, 1 - a1, 1 - a2 ];
        };
        var get_color = function(px, py, pl) {
            var hcl = get_hcl(px, py, pl);
            var c = chroma.lch(hcl[2], hcl[1], hcl[0]);
            return c;
        };
        var cpicker = p.find(".picker-canvas")[0];
        var cside = p.find(".picker-canvas-side")[0];
        var ctx_picker = cpicker.getContext("2d");
        var ctx_side = cside.getContext("2d");
        var cpicker_w = 250;
        var cpicker_h = 100;
        var cside_h = 100;
        var draw_hcl_picker = function() {
            ctx_picker.clearRect(0, 0, cpicker.width, cpicker.height);
            ctx_side.clearRect(0, 0, cside.width, cside.height);
            var idata = ctx_picker.createImageData(cpicker.width, cpicker.height);
            for(var i = 0; i < idata.width; i++) {
                for(var j = 0; j < idata.height; j++) {
                    var color = get_color(i / (idata.width - 1), j / (idata.height - 1), pl);
                    if(color) {
                        var rgb = color.rgb();
                        var k = idata.width * 4 * j + i * 4;
                        idata.data[k] = rgb[0];
                        idata.data[k + 1] = rgb[1];
                        idata.data[k + 2] = rgb[2];
                        idata.data[k + 3] = 255;
                    }
                }
            }
            ctx_picker.putImageData(idata, 0, 0);
            for(var i = 0; i < cside.height; i++) {
                var color = get_color(px, py, i / (cside.height - 1));
                if(color) {
                    ctx_side.fillStyle = color.hex();
                    ctx_side.fillRect(0, i, cside.width, 1);
                }
            }
            p.find(".xy-marker").css({
                left: (px * cpicker_w - 0.5 - 2) + "px",
                top: (py * cpicker_h - 0.5 - 2) + "px",
            });
            p.find(".l-marker").css({
                top: (pl * cside_h - 0.5 - 1.5) + "px"
            });
        };
        var picker_mouse_mode = null;
        var picker_move_f = function(e) {
            if(picker_mouse_mode == "xy") {
                var x = e.pageX - $(cpicker).offset().left;
                var y = e.pageY - $(cpicker).offset().top;
                px = (x + 0.5) / cpicker_w;
                py = (y + 0.5) / cpicker_h;
                if(px < 0) px = 0; if(px > 1) px = 1;
                if(py < 0) py = 0; if(py > 1) py = 1;
                draw_hcl_picker();
                mycolor = IV.parseColorChroma(get_color(px, py, pl));
                refresh(true);
            }
            if(picker_mouse_mode == "l") {
                var y = e.pageY - $(cside).offset().top;
                pl = (y + 0.5) / cside_h;
                if(pl < 0) pl = 0; if(pl > 1) pl = 1;
                draw_hcl_picker();
                mycolor = IV.parseColorChroma(get_color(px, py, pl));
                refresh(true);
            }
        };
        $(cpicker).parent().mousedown(function(e) {
            picker_mouse_mode = "xy";
            picker_move_f(e);
            $(window).bind("mousemove", picker_move_f);
            $(window).bind("mouseup", picker_up);
        });
        $(cside).parent().mousedown(function(e) {
            picker_mouse_mode = "l";
            picker_move_f(e);
            $(window).bind("mousemove", picker_move_f);
            $(window).bind("mouseup", picker_up);
        });
        var picker_up = function() {
            if(picker_mouse_mode) {
                picker_mouse_mode = null;
                if(mycolor) hclpicker_load(mycolor);
            }
            $(window).unbind("mousemove", picker_move_f);
            $(window).unbind("mouseup", picker_up);
        };
        p.find(".hcl-picker .method").change(function() {
            var val = $(this).val();
            var hcl = get_hcl(px, py, pl);
            mode = val;
            var xyl = from_hcl(hcl[0], hcl[1], hcl[2]);
            px = xyl[0]; py = xyl[1]; pl = xyl[2];
            draw_hcl_picker();
        });
        hclpicker_load = function(color) {
            var lch = color.toChroma().lch();
            while(lch[2] > 360) lch[2] -= 360;
            while(lch[2] < 0) lch[2] += 360;
            var xyl = from_hcl(lch[2], lch[1], lch[0]);
            px = xyl[0]; py = xyl[1]; pl = xyl[2];
            draw_hcl_picker();
        };
        draw_hcl_picker();
    })();

    refresh();

    return data;
};

IV.popups.beginColorSelect = function(anchor, cur_color, callback) {
    var d = IV.popups.ColorSelect();
    var ref = d.show(anchor, 302, 220, cur_color);
    ref.onSelectColor = function(color) {
        callback(color);
    };
    return d;
};



// iVisDesigner - scripts/interface/modal.js
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

IV.modals = { };

IV.modals.constructModal = function(info) {
    var ctx = { };
    ctx.item = $("<div />").addClass("panel full-title");
    ctx.item.append(
      $("<div />").addClass("content-wrapper").append($("<div />").html(info.html))
    ).append(
      $("<div />").addClass("title-wrapper").append(
        $("<div />").addClass("title").text(info.title)
      ).append(
        '<div class="buttons">' +
          '<div class="button-close" title="Close"><i class="xicon-cross"></i></div>' +
        '</div>'
      )
    );
    $("#modal-container").append(ctx.item).show();

    ctx.item.width(info.width ? info.width : 600);
    ctx.item.height(info.height ? info.height : 400);
    ctx.item.css("left", ($(window).width() - ctx.item.width()) / 2);
    ctx.item.css("top", ($(window).height() - ctx.item.height()) / 2 * 0.7);

    ctx.item.find("[data-for]").each(function() {
        ctx[$(this).attr("data-for")] = $(this);
    });

    ctx.item.find(".button-close").click(function() {
        ctx.close();
    });

    ctx.status_working = function() {
        ctx.status.text("...");
    };
    ctx.status_error = function(text) {
        ctx.status.text(text);
    };

    ctx.close = function() {
        $("#modal-container").hide();
        ctx.item.remove();
    };
    return ctx;
};


$(window).resize(function(){
    IV.raise("window:resize");
});

// iVisDesigner - scripts/editor/editor.js
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

(function() {

// Initialize editor.
var Editor = {
    data: null,
    vis: null,
    renderer: new IV.Renderer(),
    canvas: new IV.CanvasManager()
};

IV.editor = Editor;

IV.makeEventSource(Editor);

Editor.renderer.setCanvasManager(Editor.canvas);

Editor.canvas.add("main", document.getElementById("canvas-main"));
Editor.canvas.add("front", document.getElementById("canvas-front"));
Editor.canvas.add("back", document.getElementById("canvas-back"));
Editor.canvas.add("overlay", document.getElementById("canvas-overlay"));

$(window).resize(function() {
    var v = $("#view");
    Editor.canvas.resize(v.width(), v.height(), true);
    Editor.renderer.trigger();
    Editor.renderer.render();
}).resize();

Editor.bind("objects", function() {
    Editor.generateObjectList();
    if(Editor.schema) {
        Editor.renderDataSchema(Editor.schema);
    }
});

Editor.bind("selection", function() {
    $("#object-list").children(".item").each(function() {
        $(this).data().update();
    });
    Editor.generateObjectList();
});

Editor.set("selected-path", new IV.Path());
Editor.set("selected-reference", null);

Editor.set("current-component", null);

Editor.doAddObject = function(obj) {
    if(Editor.vis) {
        var current_component = Editor.get("current-component");
        if(current_component) {
            obj.parent = current_component;
            Actions.add(current_component.addObjectAction(obj));
            Actions.commit();
            //current_component.addObject(obj);
        } else {
            Actions.add(new IV.actions.Add(Editor.vis, "addObject", "removeObject", obj));
            Actions.commit();
            Editor.vis.clearSelection();
            var ctx = obj.selectObject(Editor.data);
            ctx.obj = obj;
            Editor.vis.appendSelection(ctx);
        }
    }
};

Editor.doAddWorkspaceObject = function(obj) {
    if(Editor.vis) {
        var act = new IV.actions.SetArrayDirectly(Editor.workspace, "objects", "push", obj);
        Actions.add(act);
        Actions.commit();
    }
};


// iVisDesigner - scripts/editor/objectlist.js
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

(function() {

var staged_paths = { };

var olist = $("#object-list");
var panel_objects = $("#panel-objects");
panel_objects.bind("drop", function(e) {
    var p = new IV.Path(e.originalEvent.dataTransfer.getData("iv/path"));
    p = p.toEntityPath();
    staged_paths[p.toString()] = true;
    Editor.generateObjectList();
});
panel_objects.bind("dragover", function(e) {
    e.preventDefault();
});

Editor.bind("reset", function() {
    staged_paths = { };
    staged_paths['[ROOT]'] = true;
});

var object_icons = {
    "Track": "xicon-tools-track",
    "Scatter": "xicon-tools-scatter",
    "Arc": "xicon-tools-arc",
    "Circle": "xicon-tools-circle",
    "Line": "xicon-tools-line",
    "Polyline": "xicon-tools-polyline",
    "LineThrough": "xicon-tools-linethrough",
    "Text": "xicon-tools-text",
    "Component": "xicon-tools-component",
    "Statistics": "xicon-tools-statistics",
    "Expression": "xicon-tools-expression",
    "BrushingValue": "xicon-tools-brushing",
    "ForceLayout": "xicon-tools-graph-layout",
    "GoogleMap": "xicon-tools-map",
    "Line3D": "xicon-tools-line3d"
};

IV.editor.object_icons = object_icons;

var generate_prefix_tree = function(paths) {
    var root = { name: "[ROOT]", children: { } };
    for(var i = 0; i < paths.length; i++) {
        if(paths[i] == "[ROOT]") continue;
        var cs = paths[i].split(":");
        var w = root;
        for(var j = 0; j < cs.length; j++) {
            var c = cs[j];
            if(!w.children[c]) {
                w.children[c] = { name: w == root ? c : w.name + ":" + c, children: { } };
            }
            w = w.children[c];
        }
    }
    return root;
};

Editor.generateObjectList = function() {
    olist.children().remove();
    var vis = Editor.vis;
    if(!vis) return;

    var classes = { };

    for(var p in staged_paths) classes[p] = [];

    var all_objects = vis.objects.slice();
    if(Editor.workspace && Editor.workspace.objects) all_objects = all_objects.concat(Editor.workspace.objects);

    all_objects.forEach(function(obj) {
        var p = obj.getPath();
        if(!p) p = new IV.Path();
        p = p.toEntityPath();
        var s = p.toString();
        if(!classes[s]) classes[s] = [];
        classes[s].push(obj);
    });

    var classes_array = [];
    for(var s in classes) {
        classes_array.push(s);
    }

    var tree = generate_prefix_tree(classes_array);

    var render_object = function(obj, ul, parents) {
        var li = IV._E("li", "object group");
        ul.append(li);
        if(object_icons[obj.type]) {
            var icon = IV._E("i", "icon " + object_icons[obj.type]);
            li.append(icon);
            li.append(IV._E("span", "name", " " + obj.name));
        } else {
            li.append(IV._E("span", "name", obj.name));
            li.append(IV._E("span", "type", " " + obj.type));
        }
        var buttons = $("<span >").addClass("buttons");
        li.append(buttons);
        buttons.append($("<span >").append($('<i class="xicon-cross"></i>')).click(function(e) {
            vis.clearSelection();
            e.stopPropagation();
            if(parents.length == 0) {
                if(vis.objects.indexOf(obj) >= 0) {
                    Actions.add(new IV.actions.Add(vis, "removeObject", "addObject", obj));
                    Actions.commit();
                } else if(Editor.workspace.objects.indexOf(obj) >= 0) {
                    var idx = Editor.workspace.objects.indexOf(obj);
                    console.log("Remove from workspace.objects", obj, idx);
                }
            } else {
                var parent_collection = parents[parents.length - 1].objects;
                var idx = parent_collection.indexOf(obj);
                if(idx >= 0) {
                    parent_collection.splice(idx, 1);
                }
                vis.raise("objects");
            }
        }));
        li.click(function(e) {
            if(!e.shiftKey) vis.clearSelection();
            var ctx = obj.selectObject(Editor.data);
            ctx.obj = obj;
            var po = obj;
            for(var i = parents.length - 1; i >= 0; i--) {
                ctx = parents[i].selectObject(Editor.data, po, ctx);
                ctx.obj = parents[i];
                po = parents[i];
            }
            vis.appendSelection(ctx);
            if(li.is(".selected") && !li.is(".target")) {
                if(obj.type == "Component") {
                    // Create a editing context for this component.
                    var context = null;
                    obj.path.enumerate(Editor.data, function(ctx) {
                        context = ctx.clone();
                        return false;
                    });
                    Editor.set("current-component", {
                        component: obj,
                        context: context,
                        toLocalCoordinate: function(pt) {
                            return obj.toLocalCoordinate(pt, this.context);
                        },
                        fromLocalCoordinate: function(pt) {
                            return obj.fromLocalCoordinate(pt, this.context);
                        },
                        addObjectAction: function(o) {
                            return new IV.actions.Add(obj, "addObject", "removeObject", o);
                        },
                        addObject: function(o) {
                            obj.addObject(o);
                            Editor.vis.raise("objects");
                        },
                        resolveSelection: function(selection) {
                            console.log(selection);
                            return selection.inner;
                        }
                    });
                }
            }
            if(li.is(".target")) {
                Editor.set("current-component", null);
            }
        });
        li.contextmenu(function(e) {
            var parent_collection = parents.length == 0 ? all_objects : parents[parents.length - 1].objects;
            IV.popups.beginContextMenu(new IV.Vector(e.pageX, e.pageY), [
              { name: "F", display: "Bring to front" },
              { name: "-", display: "Bring forward" },
              { name: "+", display: "Bring backward" },
              { name: "B", display: "Bring to back" }
            ], function(c) {
                var idx = parent_collection.indexOf(obj);
                var target = 0;
                if(c == "F") target = 0;
                if(c == "-") target = idx - 1;
                if(c == "+") target = idx + 1;
                if(c == "B") target = parent_collection.length - 1;
                if(idx >= 0 && idx < parent_collection.length &&
                   target >= 0 && target < parent_collection.length &&
                   idx != target) {
                    if(idx > target) {
                        for(var t = idx; t > target; t--) {
                            parent_collection[t] = parent_collection[t - 1];
                        }
                        parent_collection[target] = obj;
                    }
                    if(idx < target) {
                        for(var t = idx; t < target; t++) {
                            parent_collection[t] = parent_collection[t + 1];
                        }
                        parent_collection[target] = obj;
                    }
                    Editor.generateObjectList();
                }
            });
        });
        var data = li.data();
        data.update = function() {
            if(parents.length == 0) {
                if(obj.selected) {
                    li.addClass("selected");
                } else {
                    li.removeClass("selected");
                }
            } else {
                if(parents[0].selected) {
                    var c = parents[0]._selection_context;
                    for(var k = 1; k < parents.length; k++) {
                        if(c.selected_object == parents[k]) {
                            c = c.selected_object;
                        } else {
                            break;
                        }
                    }
                    if(c.selected_object == obj) li.addClass("selected");
                    else li.removeClass("selected");
                } else {
                    li.removeClass("selected");
                }
            }
            if(Editor.get("current-component") && Editor.get("current-component").component == obj) {
                li.addClass("target");
            } else {
                li.removeClass("target");
            }
        };
        data.update();
        if(obj.type == "Component") {
            var ul2 = IV._E("ul");
            ul.append(ul2);
            obj.objects.forEach(function(o) {
                render_object(o, ul2, parents.concat([obj]));
            });
        }
    };

    var render_tree_node = function(tree, output) {
        var p = tree.name;
        var div_sel = IV._E("div", "selector", p);
        var p_selected = Editor.get("selected-path").toEntityPath();
        if(p_selected.toString() == p) {
            div_sel.addClass("active");
        }
        div_sel.click(function() {
            Editor.set("selected-path", new IV.Path(p))
        });
        output.append(div_sel);
        var ul = IV._E("ul", "objects");
        output.append(ul);
        if(classes[p]) {
            classes[p].forEach(function(obj) {
                render_object(obj, ul, []);
            });
        }
        var ul_children = IV._E("ul", "children");
        output.append(ul_children);
        for(var c in tree.children) {
            render_tree_node(tree.children[c], ul_children);
        }
    };
    render_tree_node({ name: "[ROOT]", children: { } }, olist);
    for(var c in tree.children) {
        render_tree_node(tree.children[c], olist);
    }
    for(var p in classes) { (function(p) {

    })(p); }
};

Editor.listen("selected-path", function() {
    Editor.generateObjectList();
});

Editor.listen("current-component", function() {
    Editor.generateObjectList();
});

})();

// iVisDesigner - scripts/editor/schemaview.js
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

(function() {

var get_attached_schemas = function() {
    var attached_paths = { };
    if(Editor.vis) {
        Editor.vis.objects.forEach(function(obj) {
            if(obj.getAttachedSchemas) {
                obj.getAttachedSchemas().forEach(function(item) {
                    var key = item.path.toString();
                    var info = {
                        schema: item.schema,
                        path: item.path,
                        ns: obj.uuid,
                        name: obj.name
                    };
                    if(key == "[ROOT]") key = "";
                    if(!attached_paths[key]) attached_paths[key] = [ info ];
                    else attached_paths[key].push(info);
                });
            }
        });
    }
    return attached_paths;
};

var computed_statistics = { };
var compute_all_statistics = function() {
    computed_statistics = { };
    var enumerateSchema = function(s, cb, prev) {
        cb(prev, s.type);
        if(s.type == "collection" || s.type == "sequence" || s.type == "object") {
            for(var key in s.fields) {
                var name = key;
                var f = s.fields[key];
                if(f.type == "collection" || f.type == "sequence") name = "[" + name + "]";
                enumerateSchema(f, cb, prev != "" ? prev + ":" + name : name);
            }
        }
    };
    enumerateSchema(Editor.schema, function(path, type) {
        if(type == "number") {
            var stat = Editor.computePathStatistics(new IV.Path(path));
            computed_statistics[path] = stat;
        }
        if(type == "sequence" || type == "collection") {
            var count = 0;
            new IV.Path(path).enumerate(Editor.data, function() {
                count++;
            });
            computed_statistics[path] = { count: count };
        }
    }, "");
    return computed_statistics;
};

Editor.computeDataStatistics = compute_all_statistics;

Editor.renderSchemaFields = function(info, fields, previous_path) {
    if(!info.attached_paths) {
        info.attached_paths = get_attached_schemas();
    }
    var attached_paths = info.attached_paths;
    compute_all_statistics();
    var results = $("<ul></ul>");
    if(previous_path == "") {
        var rootelem_span = $('<span class="key">ROOT</span>');
        var rootelem = $("<li/>").append(rootelem_span);
        rootelem_span.data().path = "";
        if(Editor.get("selected-path").toString() == "[ROOT]") rootelem_span.addClass("active");
    }
    for(var name in fields) { if(name[0] == '_') continue; (function(name, field) {
        var this_path = "";
        if(field.type == "collection" || field.type == "sequence") {
            this_path = "[" + name + "]";
        } else if(field.type == "reference") {
            this_path = name + ":&";
        } else {
            this_path = name;
        }
        if(previous_path != "") this_path = previous_path + ":" + this_path;
        // Fix abbreviations.
        if(typeof(field) == "string") field = { "type": field };
        // The text for key.
        var span = IV._E("span", "key", name);
        // Types.
        if(field.type == "number") {
            span.append(IV._E("span", "type", "num"));
            var s = computed_statistics[this_path];
            if(s) {
                var text = "total: " + IV.printNumber(s.count) + ", min: " + IV.printNumber(s.min) + ", max: " + IV.printNumber(s.max) + ", mean: " + IV.printNumber(s.avg);
                span.attr("title", text);
            }
        }
        if(field.type == "collection" || field.type == "sequence") {
            span.append(IV._E("span", "type", "set"));
            var s = computed_statistics[this_path];
            if(s) {
                var text = "(" + s.count + ")";
                span.append(IV._E("span", "statistics", text));
            }
        }
        if(field.type == "object")
            span.append(IV._E("span", "type", "obj"));
        if(info.show_reference_button && field.type == "reference") {
            var ref_button = IV._E("span", "ref", "ref");
            span.append(ref_button);
        }

        if(info.set_active) {
            if(Editor.get("selected-path") && IV.startsWith(Editor.get("selected-path").toString(), this_path))
                span.addClass("active");
            if(Editor.get("selected-reference") && this_path == Editor.get("selected-reference").toString())
                span.children(".ref").addClass("active");
        }

        span.data().path = this_path;
        span.data().ref_target = field.of;

        if(field.type == "reference") {
            // add a reference button.
            var ref_dropdown = IV._E("i", "ref-dropdown icon-down-dir", "");
            ref_dropdown.click(function(e) {
                var of_path = new IV.Path(field.of);
                var path_select = IV.popups.PathSelect(of_path.getSchema(Editor.schema).fields, field.of);
                path_select.show($(this), 200, 150);
                path_select.onSelectPath = function(path) {
                    var new_path = this_path + path.substr(field.of.length);
                    info.onSelectPath(new_path);
                };
                e.stopPropagation();
            });
            span.append(ref_dropdown);
        }

        var li = $("<li></li>").append(span);

        (function(this_path) {
            span.attr("draggable", true);
            span.bind("dragstart", function(e) {
                e.originalEvent.dataTransfer.setData("iv/path", this_path);
                e.originalEvent.dataTransfer.setData("text/plain", this_path);
            });
        })(this_path);
        if(field.type == "collection" || field.type == "object" || field.type == "sequence")
            li.append(Editor.renderSchemaFields(info, field.fields, this_path));
        results.append(li);

    })(name, fields[name]); }

    if(attached_paths[previous_path]) {
        attached_paths[previous_path].forEach(function(item) {
            var iul = $("<ul />");
            var span = IV._E("span", "attached key", item.name);
            var ili = $("<li />").append(span);
            var new_path = "{" + item.name + "@" + item.ns + "}";
            if(previous_path != "") new_path = previous_path + ":" + new_path;
            span.data().path = new_path;
            ili.append(Editor.renderSchemaFields(info, item.schema.fields, new_path));
            iul.append(ili);
            results = results.add(iul);
            //console.log(item);
        });
    }

    results.find("span.key").each(function() {
        var span = $(this);
        if(span.data().__attached__) return;
        span.data().__attached__ = true;
        var path = span.data().path;
        var ref_target = span.data().ref_target;
        span.click(function(e) {
            info.onSelectPath(path);
            e.stopPropagation();
        });
        span.find(".ref").click(function(e) {
            if($(this).is(".active")) {
                info.onSelectReference(null, null);
            } else {
                info.onSelectReference(path, ref_target);
            }
            e.stopPropagation();
        });
    });
    return results;
};

Editor.renderDataSchema = function() {
    $("#data-schema").children().remove();
    var rootelem_span = $('<span class="key">ROOT</span>');
    var rootelem = $("<li/>").append(rootelem_span);
    rootelem_span.data().path = "";
    if(Editor.get("selected-path").toString() == "[ROOT]") rootelem_span.addClass("active");
    $("#data-schema").append($('<ul style="margin-bottom: 2px"></ul>').append(rootelem));
    var info = {
        set_active: true,
        show_reference_button: true,
        onSelectPath: function(path) {
            Editor.set("selected-path", new IV.Path(path));
            Editor.renderDataSchema();
        },
        onSelectReference: function(path, ref_target) {
            if(path === null) {
                Editor.set("selected-reference", null);
                Editor.set("selected-reference-target", null);
            } else {
                Editor.set("selected-reference", new IV.Path(path));
                Editor.set("selected-reference-target", new IV.Path(ref_target));
            }
            Editor.renderDataSchema();
        }
    };
    rootelem_span.click(function(e) {
        info.onSelectPath("");
        e.stopPropagation();
    });
    $("#data-schema").append(Editor.renderSchemaFields(info, Editor.schema.fields, "", true));
};

Editor.listen("selected-path", function() {
    Editor.renderDataSchema();
});

})();

// iVisDesigner - scripts/editor/workspace.js
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

(function() {

Editor.renderWorkspaceMenu = function() {
    var container = $("#workspace-container");
    container.children().remove();
    if(!Editor.workspace) return;
    var w = Editor.workspace;
    w.canvases.forEach(function(canvas) {
        var li = IV._E("li");
        var span = IV._E("span", "", canvas.name);
        span.append('<span class="toggle-indicator"><i class="xicon-mark"></i></span>');
        li.append(span);
        span.click(function() {
            Editor.workspaceSwitchCanvas(canvas);
        });
        if(w.default_canvas == canvas) {
            span.addClass("toggle-on");
        }
        container.append(li);
    });
    container.append(IV._E("li", "divider"));
    var li = IV._E("li");
    var span = IV._E("span", "", "New Canvas");
    span.click(function() {
        var info = {
            visualization: new IV.Visualization(),
        }
        Editor.workspace.addCanvas(info);
        Editor.workspaceSwitchCanvas(info);
        Editor.renderWorkspaceMenu();
    });
    li.append(span);
    container.append(li);
};

})();


// iVisDesigner - scripts/editor/popups/popups.js
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

// iVisDesigner - scripts/editor/popups/pathselect.js
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

IV.popups.PathSelect = function(fields, previous_path) {
    if(!fields) fields = IV.editor.schema.fields;
    if(!previous_path) previous_path = "";

    var data = IV.popups.create();
    data.addActions([ "cancel" ]);
    var p = data.selector;
    var content = p.children(".content");
    var c = $("<div />").addClass("data-schema");
    content.append(c);
    content.addClass("scrollview").ScrollView();

    function onSelectPath(path, ref) {
        if(data.onSelectPath) data.onSelectPath(path, ref);
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };


    var info = {
        set_active: false,
        onSelectPath: function(path) {
            onSelectPath(path);
        }
    };
    if(previous_path == "") {
        var rootelem_span = $('<span class="key">ROOT</span>');
        var rootelem = $("<li/>").append(rootelem_span);
        rootelem_span.data().path = "";
        c.append($('<ul style="margin-bottom: 2px"></ul>').append(rootelem));
        rootelem_span.click(function(e) {
            info.onSelectPath("");
            e.stopPropagation();
        });
    }
    var elems = IV.editor.renderSchemaFields(info, fields, previous_path);
    c.append(elems);

    return data;
/*
    var selected_ref = null;


    c.find("span.key").each(function() {
        var $this = $(this);
        $this.click(function() {
            c.find("span.key").removeClass("active");
            $this.addClass("active");
            var data = $this.data();
            onSelectPath(data.path, selected_ref);
        });
    });
    c.find("span.ref").each(function() {
        var $this = $(this);
        var p = $this.parent();
        $this.click(function(e) {
            if($this.is(".active")) {
                c.find("span.ref").removeClass("active");
                selected_ref = null;
            } else {
                c.find("span.ref").removeClass("active");
                $this.addClass("active");
                var data = p.data();
                selected_ref = data.path;
            }
            e.stopPropagation();
        });
    });
    return data;
*/
};

// iVisDesigner - scripts/editor/popups/objectselect.js
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

IV.popups.ObjectSelect = function() {
    var data = IV.popups.create();
    data.addActions([ "cancel" ]);
    var p = data.selector;
    var content = p.children(".content");
    var c = $("<div />").addClass("object-list");
    content.append(c);
    content.addClass("scrollview").ScrollView();

    function onSelectObject(canvas, obj) {
        if(data.onSelectObject) data.onSelectObject(canvas, obj);
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };

    var ws = IV.editor.workspace;
    ws.canvases.forEach(function(canvas) {
        c.append(IV._E("div", "selector", canvas.name));
        var ul = IV._E("ul", "objects");
        c.append(ul);
        canvas.visualization.objects.forEach(function(obj) {
            var li = IV._E("li", "object", " " + obj.name);
            li.prepend(IV._E("i", "icon " + IV.editor.object_icons[obj.type]));
            ul.append(li);
            li.click(function() {
                onSelectObject(canvas, obj);
            });
        });
    });

    return data;
/*
    var selected_ref = null;


    c.find("span.key").each(function() {
        var $this = $(this);
        $this.click(function() {
            c.find("span.key").removeClass("active");
            $this.addClass("active");
            var data = $this.data();
            onSelectPath(data.path, selected_ref);
        });
    });
    c.find("span.ref").each(function() {
        var $this = $(this);
        var p = $this.parent();
        $this.click(function(e) {
            if($this.is(".active")) {
                c.find("span.ref").removeClass("active");
                selected_ref = null;
            } else {
                c.find("span.ref").removeClass("active");
                $this.addClass("active");
                var data = p.data();
                selected_ref = data.path;
            }
            e.stopPropagation();
        });
    });
    return data;
*/
};

// iVisDesigner - scripts/editor/popups/createlayout.js
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

IV.popups.CreateLayout = function() {
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_create_layout"));

    p.default_width = 300;
    p.default_height = 130;
    var data = p.data();
    data.onOk = function() {
        var vertex_path = p.find('[data-field="vertex-path"]').data().get();
        var edgeA = p.find('[data-field="edge-a"]').data().get();
        var edgeB = p.find('[data-field="edge-b"]').data().get();
        var algo = p.find('[data-field="algorithm"]').data().get();
        var obj = new IV.objects.ForceLayout({
            path_nodes: vertex_path,
            path_edgeA: edgeA,
            path_edgeB: edgeB
        });
        Editor.doAddObject(obj);
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    return data;
};

// iVisDesigner - scripts/editor/popups/createmap.js
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

IV.popups.CreateMap = function() {
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_create_map"));

    p.default_width = 300;
    p.default_height = 130;
    var data = p.data();

    var input_longitude = p.find(".input-longitude");
    var input_latitude = p.find(".input-latitude");
    var input_scale = p.find(".input-scale");

    input_longitude.IVInputNumeric(104.1);
    input_latitude.IVInputNumeric(35.6);
    input_scale.IVInputNumeric(6);

    data.onOk = function() {
        var info = {
            longitude: input_longitude.data().get(),
            latitude: input_latitude.data().get(),
            path_longitude: p.find('[data-field="path-longitude"]').data().get(),
            path_latitude: p.find('[data-field="path-latitude"]').data().get(),
            scale: input_scale.data().get()
        };
        Editor.tools.beginSelectLocation(function(loc) {
            if(loc && loc.type == "Plain") {
                info.center = loc.obj;
                var map = new IV.objects.GoogleMap(info);
                Editor.doAddObject(map);
            }
            Editor.tools.endSelectLocation("tools:GoogleMap");
            data.hide();
        }, "tools:GoogleMap");
        /*
        var vertex_path = p.find('[data-field="vertex-path"]').data().get();
        var edgeA = p.find('[data-field="edge-a"]').data().get();
        var edgeB = p.find('[data-field="edge-b"]').data().get();
        var algo = p.find('[data-field="algorithm"]').data().get();
        var obj = new IV.objects.ForceLayout({
            path_nodes: vertex_path,
            path_edgeA: edgeA,
            path_edgeB: edgeB
        });
        Editor.doAddObject(obj);
        data.hide();
        */
    };
    data.onCancel = function() {
        data.hide();
    };
    return data;
};

IV.popups.CreateImage = function() {
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_create_image"));

    p.default_width = 300;
    p.default_height = 130;
    var data = p.data();

    p.find(".input-numeric").each(function() {
        var t = $(this);
        var def = t.attr("data-default");
        if(def !== undefined) {
            t.IVInputNumeric(parseFloat(def));
        } else {
            t.IVInputNumeric();
        }
    });

    data.onOk = function() {
        var info = {
            path: p.find('[data-field="path"]').data().get(),
            source: new IV.objects.Plain(p.find('[data-field="source"]').data().get()),
            scale: new IV.objects.Plain(parseFloat(p.find('[data-field="scale"]').data().get()))
        };
        Editor.tools.beginSelectLocation(function(loc) {
            info.position = loc;
            var image = new IV.objects.Image(info);
            Editor.doAddObject(image);
            Editor.tools.endSelectLocation("tools:Image");
            data.hide();
            IV.set("tools:current", "Select");
        }, "tools:Image");
        /*
        var vertex_path = p.find('[data-field="vertex-path"]').data().get();
        var edgeA = p.find('[data-field="edge-a"]').data().get();
        var edgeB = p.find('[data-field="edge-b"]').data().get();
        var algo = p.find('[data-field="algorithm"]').data().get();
        var obj = new IV.objects.ForceLayout({
            path_nodes: vertex_path,
            path_edgeA: edgeA,
            path_edgeB: edgeB
        });
        Editor.doAddObject(obj);
        data.hide();
        */
    };
    data.onCancel = function() {
        data.hide();
    };
    return data;
};

// iVisDesigner - scripts/editor/popups/creategenerator.js
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

IV.popups.CreateStatistics = function() {
    // We put statistics and generators together.
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_create_statistics"));

    p.default_width = 400;
    p.default_height = 130;
    var data = p.data();

    p.find(".input-numeric").each(function() {
        var t = $(this);
        var def = t.attr("data-default");
        if(def !== undefined) {
            t.IVInputNumeric(parseFloat(def));
        } else {
            t.IVInputNumeric();
        }
    });

    data.onOk = function() {
        var active_tab = p.find(".tab").data().current;
        if(active_tab == "statistics") {
            var tab = p.find('[data-tab="statistics"]');
            var path = tab.find('[data-field="path"]').data().get();
            var path_data = tab.find('[data-field="path-data"]').data().get();
            var obj = new IV.objects.Statistics({
                path: path,
                path_data: path_data
            });
            Editor.doAddObject(obj);
        }
        if(active_tab == "aggregator") {
            var tab = p.find('[data-tab="aggregator"]');
            var path = tab.find('[data-field="path"]').data().get();
            var path_data = tab.find('[data-field="path-data"]').data().get();
            var obj = new IV.objects.Aggregator({
                path: path,
                path_data: path_data
            });
            Editor.doAddObject(obj);
        }
        if(active_tab == "expression") {
            var tab = p.find('[data-tab="expression"]');
            var path = tab.find('[data-field="path"]').data().get();
            var expression = tab.find('[data-field="expression"]').data().get();
            var obj = new IV.objects.Expression({
                path: path,
                expression: expression
            });
            Editor.doAddObject(obj);
        }
        if(active_tab == "brushing") {
            var tab = p.find('[data-tab="brushing"]');
            var path = tab.find('[data-field="path"]').data().get();
            var obj = new IV.objects.BrushingValue({
                path: path
            });
            Editor.doAddObject(obj);
        }
        if(active_tab == "range") {
            var tab = p.find('[data-tab="range"]');
            var path = tab.find('[data-field="path"]').data().get();
            var min = tab.find('[data-field="min"]').data().get();
            var max = tab.find('[data-field="max"]').data().get();
            var step = tab.find('[data-field="step"]').data().get();
            var obj = new IV.objects.GenerateRange({
                path: path, min: min, max: max, step: step
            });
            Editor.doAddObject(obj);
        }
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    return data;
};

// iVisDesigner - scripts/editor/popups/createlink3d.js
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

IV.popups.CreateLink3D = function() {
    // We put statistics and generators together.
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_create_link3d"));

    p.default_width = 300;
    p.default_height = 230;
    var data = p.data();

    p.find(".input-numeric").each(function() {
        var t = $(this);
        var def = t.attr("data-default");
        if(def !== undefined) {
            t.IVInputNumeric(parseFloat(def));
        } else {
            t.IVInputNumeric();
        }
    });

    data.onOk = function() {
        var active_tab = p.find(".tab").data().current;
        if(active_tab == "line3d") {
            var tab = p.find('[data-tab="line3d"]');
            var path = tab.find('[data-field="path"]').data().get();
            var obj1 = tab.find('[data-field="anchor1"]').data().get();
            var obj2 = tab.find('[data-field="anchor2"]').data().get();
            var wrapper1, wrapper2;
            if(obj1[0] && obj1[1]) {
                wrapper1 = new IV.objects.CanvasWrapper3D(obj1[0], obj1[1]);
            } else {
                wrapper1 = new IV.objects.PointFromData3D(tab.find('[data-field="anchor1-path"]').data().get());
            }
            if(obj2[0] && obj2[1]) {
                wrapper2 = new IV.objects.CanvasWrapper3D(obj2[0], obj2[1]);
            } else {
                wrapper2 = new IV.objects.PointFromData3D(tab.find('[data-field="anchor2-path"]').data().get());
            }
            var line = new IV.objects.Line3D({
                path: path,
                point1: wrapper1,
                point2: wrapper2
            });
            line.name = tab.find('[data-field="name"]').data().get();
            if(!line.name || line.name == "") line.name = "Line3D";
            IV.editor.doAddWorkspaceObject(line);
        }
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    return data;
};

IV.popups.CreateSphere3D = function() {
    // We put statistics and generators together.
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_create_sphere3d"));

    p.default_width = 300;
    p.default_height = 230;
    var data = p.data();

    p.find(".input-numeric").each(function() {
        var t = $(this);
        var def = t.attr("data-default");
        if(def !== undefined) {
            t.IVInputNumeric(parseFloat(def));
        } else {
            t.IVInputNumeric();
        }
    });

    data.onOk = function() {
        var active_tab = p.find(".tab").data().current;
        if(active_tab == "sphere3d") {
            var tab = p.find('[data-tab="sphere3d"]');
            var path = tab.find('[data-field="path"]').data().get();
            var obj1 = tab.find('[data-field="anchor1"]').data().get();
            var wrapper1;
            if(obj1[0] && obj1[1]) {
                wrapper1 = new IV.objects.CanvasWrapper3D(obj1[0], obj1[1]);
            } else {
                wrapper1 = new IV.objects.PointFromData3D(tab.find('[data-field="anchor1-path"]').data().get());
            }
            var sphere = new IV.objects.Sphere3D({
                path: path,
                center: wrapper1,
                radius: new IV.objects.Plain(0.2)
            });
            sphere.name = tab.find('[data-field="name"]').data().get();
            if(!sphere.name || sphere.name == "") sphere.name = "Sphere3D";
            IV.editor.doAddWorkspaceObject(sphere);
        }
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    return data;
};

// iVisDesigner - scripts/editor/popups/templates.js
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

(function() {

var templates = { };

var beginSelectingRectangle = function(callback) {
    var p0 = null, p1 = null;
    Editor.tools.beginOverlay({
        renderOverlay: function(g) {
            g.strokeStyle = IV.colors.guide.toRGBA();
            if(p0 && p1) {
                g.beginPath();
                g.rect(Math.min(p0.x, p1.x), Math.min(p0.y, p1.y), Math.abs(p0.x - p1.x), Math.abs(p0.y - p1.y));
                g.stroke();
            }
        }
    });
    Editor.tools.beginTrackMouse(function(e) {
        p0 = e.offset;
        e.move(function(e_move) {
            p1 = e_move.offset;
            IV.editor.tools.triggerRender("overlay");
            IV.editor.renderer.render();
        });
        e.release(function(e_release) {
            Editor.tools.endTrackMouse("temporary");
            Editor.tools.endOverlay();
            var minp = new IV.Vector(Math.min(e.offset.x, e_release.offset.x), Math.min(e.offset.y, e_release.offset.y));
            var maxp = new IV.Vector(Math.max(e.offset.x, e_release.offset.x), Math.max(e.offset.y, e_release.offset.y));
            callback(minp, maxp);
        });
    }, "temporary");
};

templates.Scatterplot = function() {
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_template_scatterplot"));

    p.default_width = 300;
    p.default_height = 130;
    var data = p.data();
    data.onOk = function() {
        var path_x = p.find('[data-field="path-x"]').data().get();
        var path_y = p.find('[data-field="path-y"]').data().get();
        var stat_x = Editor.computePathStatistics(path_x);
        var stat_y = Editor.computePathStatistics(path_y);
        beginSelectingRectangle(function(p0, p1) {
            var track_x = new IV.objects.Track({
                path: path_x,
                anchor1: new IV.objects.Plain(new IV.Vector(p0.x, p0.y - 10)),
                anchor2: new IV.objects.Plain(new IV.Vector(p1.x, p0.y - 10)),
                min: new IV.objects.Plain(stat_x.min),
                max: new IV.objects.Plain(stat_x.max)
            });
            var track_y = new IV.objects.Track({
                path: path_y,
                anchor1: new IV.objects.Plain(new IV.Vector(p0.x - 10, p0.y)),
                anchor2: new IV.objects.Plain(new IV.Vector(p0.x - 10, p1.y)),
                min: new IV.objects.Plain(stat_y.min),
                max: new IV.objects.Plain(stat_y.max)
            });
            track_y.tick_style.tick_size = -2;
            track_y.tick_style.rotation = -90;
            var scatter = new IV.objects.Scatter({
                track1: track_x, track2: track_y
            });
            var circle = new IV.objects.Circle({
                path: path_x.toEntityPath(),
                center: scatter
            });
            circle.style.actions = [{
                type: "fill",
                color: new IV.objects.Plain(IV.colors.default_fill)
            }];
            Editor.doAddObject(track_x);
            Editor.doAddObject(track_y);
            Editor.doAddObject(scatter);
            Editor.doAddObject(circle);
        });
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    data.show();
};

templates.Timeline = function() {
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_template_timeline"));

    p.default_width = 300;
    p.default_height = 130;
    var data = p.data();
    data.onOk = function() {
        var path_x = p.find('[data-field="path-x"]').data().get();
        var path_y = p.find('[data-field="path-y"]').data().get();
        var stat_x = Editor.computePathStatistics(path_x);
        var stat_y = Editor.computePathStatistics(path_y);
        beginSelectingRectangle(function(p0, p1) {
            var track_x = new IV.objects.Track({
                path: path_x,
                anchor1: new IV.objects.Plain(new IV.Vector(p0.x, p0.y - 10)),
                anchor2: new IV.objects.Plain(new IV.Vector(p1.x, p0.y - 10)),
                min: new IV.objects.Plain(stat_x.min),
                max: new IV.objects.Plain(stat_x.max)
            });
            var track_y = new IV.objects.Track({
                path: path_y,
                anchor1: new IV.objects.Plain(new IV.Vector(p0.x - 10, p0.y)),
                anchor2: new IV.objects.Plain(new IV.Vector(p0.x - 10, p1.y)),
                min: new IV.objects.Plain(stat_y.min),
                max: new IV.objects.Plain(stat_y.max)
            });
            track_y.tick_style.tick_size = -2;
            track_y.tick_style.rotation = -90;
            var scatter = new IV.objects.Scatter({
                track1: track_x, track2: track_y
            });
            var line = new IV.objects.LineThrough({
                path: path_x.toEntityPath().truncate(1),
                points: scatter
            });
            line.style.actions = [{
                type: "stroke",
                color: new IV.objects.Plain(IV.colors.default_stroke),
                width: new IV.objects.Plain(1),
                join: new IV.objects.Plain("bevel"),
                cap: new IV.objects.Plain("butt")
            }];
            Editor.doAddObject(track_x);
            Editor.doAddObject(track_y);
            Editor.doAddObject(scatter);
            Editor.doAddObject(line);
        });
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    data.show();
};

templates.Graph = function() {
    var data = IV.popups.create();
    data.addActions([ "ok", "cancel" ]);

    var p = data.selector;
    p.children(".content").html(IV.strings("popup_template_graph"));

    p.default_width = 300;
    p.default_height = 130;
    var data = p.data();
    data.onOk = function() {
        var path_nodes = p.find('[data-field="path-nodes"]').data().get();
        var path_edges = p.find('[data-field="path-edges"]').data().get();
        var path_source = p.find('[data-field="path-source"]').data().get();
        var path_target = p.find('[data-field="path-target"]').data().get();
        beginSelectingRectangle(function(p0, p1) {
            var layout = new IV.objects.ForceLayout({
                path_nodes: path_nodes,
                path_edgeA: path_source,
                path_edgeB: path_target
            });
            var path_x = new IV.Path(path_nodes.toString() + ":{Layout@" + layout.uuid + "}:x");
            var path_y = new IV.Path(path_nodes.toString() + ":{Layout@" + layout.uuid + "}:y");
            var track_x = new IV.objects.Track({
                path: path_x,
                anchor1: new IV.objects.Plain(new IV.Vector(p0.x, p0.y - 10)),
                anchor2: new IV.objects.Plain(new IV.Vector(p1.x, p0.y - 10)),
                min: new IV.objects.Plain(-2),
                max: new IV.objects.Plain(2)
            });
            var track_y = new IV.objects.Track({
                path: path_y,
                anchor1: new IV.objects.Plain(new IV.Vector(p0.x - 10, p0.y)),
                anchor2: new IV.objects.Plain(new IV.Vector(p0.x - 10, p1.y)),
                min: new IV.objects.Plain(-2),
                max: new IV.objects.Plain(2)
            });
            track_y.tick_style.tick_size = -2;
            track_y.tick_style.rotation = -90;
            var scatter = new IV.objects.Scatter({
                track1: track_x, track2: track_y
            });
            var line = new IV.objects.Line({
                path: path_edges,
                point1: new IV.objects.ReferenceWrapper(path_source, path_nodes, scatter),
                point2: new IV.objects.ReferenceWrapper(path_target, path_nodes, scatter),
            });
            var circle = new IV.objects.Circle({
                path: path_nodes,
                center: scatter
            });
            circle.style.actions = [{
                type: "fill",
                color: new IV.objects.Plain(IV.colors.default_fill)
            }];
            line.style.actions = [{
                type: "stroke",
                color: new IV.objects.Plain(IV.colors.default_stroke.clone(0.2)),
                width: new IV.objects.Plain(1),
                join: new IV.objects.Plain("bevel"),
                cap: new IV.objects.Plain("butt")
            }];
            layout.enabled = true;
            Editor.doAddObject(layout);
            Editor.doAddObject(track_x);
            Editor.doAddObject(track_y);
            Editor.doAddObject(scatter);
            Editor.doAddObject(line);
            Editor.doAddObject(circle);
        });
        data.hide();
    };
    data.onCancel = function() {
        data.hide();
    };
    data.show();
};

IV.on("command:toolkit.template", function(param) {

    templates[param]();
});

})();



// iVisDesigner - scripts/editor/property/property.js
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

(function() {

// iVisDesigner - scripts/editor/property/render.js
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

var primitives = { };
var object_renderers = { };

// iVisDesigner - scripts/editor/property/utils.js
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

var make_table = function() {
    var tr = IV._E("tr");
    for(var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if(typeof(arg) == "string") {
            if(arg == "|") {
                tr.append(IV._E("td").append(IV._E("span", "sep", " ")))
            } else {
                tr.append(IV._E("td").append(IV._E("span", "", arg)))
            }
        } else {
            tr.append(IV._E("td").append(arg));
        }
    }
    return IV._E("table", "linear-even").append(tr);
}

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

// iVisDesigner - scripts/editor/property/objects.js
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

object_renderers.Plain = function(item, args, callback) {
    var obj = item.obj;
    var _listen = function(elem) {
        var listener = IV.bindObjectEvents(item,
        ["set:obj"],
        function(ev, val) {
            elem.data().reload();
        });
        elem.bind("destroyed", function() { listener.unbind(); });
        return elem;
    }
    if(obj.constructor == Number) {
        return _listen(primitives.Number(function() { return item.obj; }, function(new_val) {
            Actions.add(new IV.actions.SetDirectly(item, "obj", new_val));
            Actions.commit();
            callback();
            return new_val;
        }, args));
    }
    if(obj.constructor == String) {
        return _listen(primitives.String(function() { return item.obj; }, function(new_val) {
            Actions.add(new IV.actions.SetDirectly(item, "obj", new_val));
            Actions.commit();
            callback();
            return new_val;
        }, args));
    }
    if(obj instanceof IV.Vector) {
        return IV._E("span", "plain-vector", "(" + obj.x + ", " + obj.y + ")");
    }
    if(obj instanceof IV.Color) {
        return _listen(primitives.Color(function() { return item.obj; }, function(new_val) {
            Actions.add(new IV.actions.SetDirectly(item, "obj", new_val));
            Actions.commit();
            callback();
            return new_val;
        }, args));
    }
};

object_renderers.CategoricalMapping = function(item, args, callback) {
    var value_primitive = function(get, set) {
        if(item.value_type == "string")
            return primitives.String(get, set, args);
        if(item.value_type == "number")
            return primitives.Number(get, set);
        if(item.value_type == "color")
            return primitives.Color(get, set);
    };
    var r = IV._E("span");
    var kv_container = IV._E("span");
    r.append(kv_container);
    var rebuild_key_values = function() {
        kv_container.children().remove();
        for(var i = 0; i < item.keys_values.length; i++) {
            (function(index) {
                var sp = primitives.String(function() {
                    if(item.keys_values[index].key === null) return "null";
                    return item.keys_values[index].key.toString();
                }, function(new_val) {
                    if(new_val == "true") new_val = true;
                    if(new_val == "false") new_val = false;
                    if(new_val == "null") new_val = null;
                    var new_kv = { key: new_val, value: item.keys_values[index].value };
                    Actions.add(new IV.actions.SetArrayDirectly(item, "keys_values", "set", index, new_kv));
                    Actions.commit();
                    callback();
                    return new_val;
                });
                var ss = value_primitive(function() { return item.keys_values[index].value; }, function(new_val) {
                    var new_kv = { key: item.keys_values[index].key, value: new_val };
                    Actions.add(new IV.actions.SetArrayDirectly(item, "keys_values", "set", index, new_kv));
                    Actions.commit();
                    callback();
                    return new_val;
                });
                var btn_remove = $("<span />").addClass("btn").append($('<i class="xicon-cross"></i>')).click(function() {
                    Actions.add(new IV.actions.SetArrayDirectly(item, "keys_values", "splice", index, 1, []));
                    Actions.commit();
                    callback();
                });
                var elem = make_table("|", ss, "|", ":", "|", sp, "|", btn_remove);
                elem.addClass("keyvalue-item");
                kv_container.append(elem);
                return {
                    elem: elem,
                    reload: function() {
                        sp.reload();
                        ss.reload();
                    }
                };
            })(i);
        }
    };

    rebuild_key_values();

    var btn_add = $("<span />").addClass("btn").text("+").click(function() {
        var nv = null;
        if(item.value_type == "number")
            nv = { key: "new", value: 0 };
        else if(item.value_type == "color")
            nv = { key: "new", value: new IV.Color(0, 0, 0, 1) };
        else
            nv = { key: "new", value: null };
        Actions.add(new IV.actions.SetArrayDirectly(item, "keys_values", "push", nv));
        Actions.commit();
        callback();
    });
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var fallback_control = value_primitive(function() { return item.fallback; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "fallback", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    r.append(make_table("|", fallback_control, "|", btn_add));
    r.append(path);
    var listener = IV.bindObjectEvents(item,
        ["set:fallback", "set:keys_values", "set:path"],
    function(ev, val) {
        if(ev == "set:fallback") fallback_control.data().reload();
        if(ev == "set:keys_values") rebuild_key_values();
        if(ev == "set:path") path.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};

object_renderers.ColorLinear = function(item, args, callback) {
    var c1 = primitives.Color(function() { return item.color1; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "color1", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var c2 = primitives.Color(function() { return item.color2; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "color2", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var vmin = primitives.Number(function() { return item.min; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "min", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var vmax = primitives.Number(function() { return item.max; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "max", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        var stat = Editor.computePathStatistics(new_val);
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.add(new IV.actions.SetProperty(item, "min", stat.min));
        Actions.add(new IV.actions.SetProperty(item, "max", stat.max));
        Actions.commit();
        vmin.data().reload();
        vmax.data().reload();
        callback();
        return new_val;
    });
    var mapping_type = primitives.String(function() { return item.mapping ? item.mapping : "linear"; }, function(new_val) {
        item.mapping = new_val;
        callback();
        return new_val;
    }, [{ name: "linear", display: "Linear" }, { name: "logarithmic", display: "Logarithmic" }]);
    var r = $("<span />");
    r.append(c1)
     .append("<span> - </span>")
     .append(c2)
     .append("<br />")
     .append(make_table(vmin, " - ", vmax))
     .append(mapping_type).append("<br />")
     .append(path);
    var listener = IV.bindObjectEvents(item,
        ["set:min", "set:max", "set:color1", "set:color2", "set:mapping", "set:path"],
    function(ev, val) {
        if(ev == "set:color1") c1.data().reload();
        if(ev == "set:color2") c2.data().reload();
        if(ev == "set:min") vmin.data().reload();
        if(ev == "set:max") vmax.data().reload();
        if(ev == "set:mapping") mapping_type.data().reload();
        if(ev == "set:path") path.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};
object_renderers.NumberLinear = function(item, args, callback) {
    var c1 = primitives.Number(function() { return item.num1; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "num1", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var c2 = primitives.Number(function() { return item.num2; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "num2", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        var stat = Editor.computePathStatistics(new_val);
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.add(new IV.actions.SetProperty(item, "min", stat.min));
        Actions.add(new IV.actions.SetProperty(item, "max", stat.max));
        Actions.commit();
        vmin.data().reload();
        vmax.data().reload();
        callback();
        return new_val;
    });
    var vmin = primitives.Number(function() { return item.min; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "min", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var vmax = primitives.Number(function() { return item.max; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "max", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var mapping_type = primitives.String(function() { return item.mapping ? item.mapping : "linear"; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "mapping", new_val));
        Actions.commit();
        callback();
        return new_val;
    }, [{ name: "linear", display: "Linear" }, { name: "logarithmic", display: "Logarithmic" }]);

    var r = IV._E("span");
    r.append(make_table(c1, " - ", c2))
     .append(make_table(vmin, " - ", vmax))
     .append(mapping_type).append("<br />")
     .append(path);
    var listener = IV.bindObjectEvents(item,
        ["set:min", "set:max", "set:num1", "set:num2", "set:mapping", "set:path"],
    function(ev, val) {
        if(ev == "set:num1") c1.data().reload();
        if(ev == "set:num2") c2.data().reload();
        if(ev == "set:min") vmin.data().reload();
        if(ev == "set:max") vmax.data().reload();
        if(ev == "set:mapping") mapping_type.data().reload();
        if(ev == "set:path") path.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};

object_renderers.MappingExpression = function(item, args, callback) {
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var expr = primitives.String(function() { return item.expression; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "expression", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var r = IV._E("span").append(path).append("<br />").append(expr);
    var listener = IV.bindObjectEvents(item,
        ["set:path", "set:expression"],
    function(ev, val) {
        if(ev == "set:path") path.data().reload();
        if(ev == "set:expression") expr.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};

object_renderers.RangeFilter = function(item, args, callback) {
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        var stat = Editor.computePathStatistics(new_val);
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.add(new IV.actions.SetProperty(item, "min", stat.min));
        Actions.add(new IV.actions.SetProperty(item, "max", stat.max));
        Actions.commit();
        vmin.data().reload();
        vmax.data().reload();
        callback();
        return new_val;
    });
    var vmin = primitives.Number(function() { return item.min; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "min", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var vmax = primitives.Number(function() { return item.max; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "max", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var r = IV._E("span");
    r.append(make_table(vmin, " - ", vmax))
     .append(path);
    var listener = IV.bindObjectEvents(item,
        ["set:min", "set:max", "set:path"],
    function(ev, val) {
        if(ev == "set:min") vmin.data().reload();
        if(ev == "set:max") vmax.data().reload();
        if(ev == "set:path") path.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};

object_renderers.CategoricalFilter = function(item, args, callback) {
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var r = IV._E("span");
    var k_container = IV._E("span");
    r.append(k_container);
    var rebuild_keys = function() {
        k_container.children().remove();
        for(var i = 0; i < item.keys.length; i++) {
            (function(index) {
                var sp = primitives.String(function() {
                    if(item.keys[index] === null) return "null";
                    return item.keys[index].toString();
                }, function(new_val) {
                    Actions.add(new IV.actions.SetArrayDirectly(item, "keys", "set", index, new_val));
                    Actions.commit();
                    callback();
                    return new_val;
                });
                var btn_remove = $("<span />").addClass("btn").append($('<i class="xicon-cross"></i>')).click(function() {
                    Actions.add(new IV.actions.SetArrayDirectly(item, "keys", "splice", index, 1, []));
                    Actions.commit();
                    callback();
                });
                var elem = make_table("|", sp, "|", btn_remove);
                elem.addClass("key-item");
                k_container.append(elem);
                return {
                    elem: elem,
                    reload: function() {
                        sp.reload();
                    }
                };
            })(i);
        }
    };

    rebuild_keys();

    var btn_add = $("<span />").addClass("btn").text("+").click(function() {
        var nv = "new";
        Actions.add(new IV.actions.SetArrayDirectly(item, "keys", "push", nv));
        Actions.commit();
        callback();
    });
    var btn_is_black_list = primitives.Toggle(function() { return item.is_black_list; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "is_black_list", new_val));
        Actions.commit();
        callback();
        return new_val;
    }, { "true": "Black List", "false": "White List" });
    r.append(make_table("|", btn_is_black_list, "|", btn_add));
    r.append(path);
    var listener = IV.bindObjectEvents(item,
        ["set:is_black_list", "set:keys", "set:path"],
    function(ev, val) {
        if(ev == "set:is_black_list") btn_is_black_list.data().reload();
        if(ev == "set:keys") rebuild_keys();
        if(ev == "set:path") path.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};

object_renderers.PassThrough = function(item, args, callback) {
    var path = primitives.Path(function() { return item.path; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "path", new_val));
        Actions.commit();
        callback();
        return new_val;
    });
    var r = IV._E("span").append(path);
    var listener = IV.bindObjectEvents(item,
        ["set:path"],
    function(ev, val) {
        if(ev == "set:path") path.data().reload();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};

object_renderers.CombinedFilter = function(item, args, callback) {
    var r = IV._E("span");
    var fc = IV._E("span");
    var render_filters = function() {
        fc.children().remove();
        for(var i = 0; i < item.filters.length; i++) { (function(index) {
            console.log("R", item.filters[index]);
            var elem = render_object_value(item.filters[index], args, function(val) {
                if(val) {
                    Actions.add(new IV.actions.SetArrayDirectly(item, "filters", "set", index, val));
                    Actions.commit();
                }
                callback();
                return val;
            });
            var btn_remove = $("<span />").addClass("btn").append($('<i class="xicon-cross"></i>')).click(function() {
                Actions.add(new IV.actions.SetArrayDirectly(item, "filters", "splice", index, 1, []));
                Actions.commit();
                callback();
            });
            fc.append(make_table(IV._E("span", "small", item.filters[index].type), "|", btn_remove));
            fc.append(elem);
        })(i) };
    };
    render_filters();
    var btn_add = $("<span />").addClass("btn").text("+").click(function() {
        IV.popups.beginContextMenu($(this), [ "Range", "Categorical", "Combined"], function(val) {
            var new_filter;
            if(val == "Range") {
                new_filter = new IV.objects.RangeFilter(new IV.Path(), 0, 1);
            }
            if(val == "Categorical") {
                new_filter = new IV.objects.CategoricalFilter(new IV.Path(), [], false);
            }
            if(val == "Combined") {
                new_filter = new IV.objects.CombinedFilter([], false);
            }
            Actions.add(new IV.actions.SetArrayDirectly(item, "filters", "push", new_filter));
            Actions.commit();
            callback();
        });
    });
    var btn_is_conjunctive = primitives.Toggle(function() { return item.is_conjunctive; }, function(new_val) {
        Actions.add(new IV.actions.SetProperty(item, "is_conjunctive", new_val));
        Actions.commit();
        callback();
        return new_val;
    }, { "true": "Conjunctive", "false": "Disjunctive" });
    r.append(fc);
    var buttons = make_table(btn_is_conjunctive, "|", btn_add);
    r.append(buttons);
    var listener = IV.bindObjectEvents(item,
        ["set:is_conjunctive", "set:filters"],
    function(ev, val) {
        if(ev == "set:is_conjunctive") btn_is_conjunctive.data().reload();
        if(ev == "set:filters") render_filters();
    });
    r.bind("destroyed", function() { listener.unbind(); });
    return r;
};


// Object value.
var render_object_value = function(item, args, callback) {
    if(item === undefined || item === null) return IV._E("span").text("None");
    if(item.constructor == Number) {
        return primitives.Number(function() { return item; }, function(new_val) {
            callback(new_val);
            return new_val;
        }, args);
    }
    if(item.constructor == String) {
        return primitives.String(function() { return item; }, function(new_val) {
            callback(new_val);
            return new_val;
        }, args);
    }
    if(item.constructor == Boolean) {
        return primitives.Toggle(function() { return item; }, function(new_val) {
            callback(new_val);
            return new_val;
        }, args);
    }
    if(item instanceof IV.Color) {
        return primitives.Color(function() { return item; }, function(new_val) {
            callback(new_val);
            return new_val;
        });
    }
    if(item instanceof IV.Path) {
        return primitives.Path(function() { return item; }, function(new_val) {
            callback(new_val);
            return new_val;
        }, args);
    }
    if(object_renderers[item.type]) {
        return object_renderers[item.type](item, args, callback);
    }
    if(!item.name) {
        return IV._E("span").append(
            IV._E("span", "gray", " " + item.type)
        );
    } else {
        return IV._E("span").text(item.name).append(
            IV._E("span", "gray", " " + item.type)
        );
    }
    return r;
};

var property_clipboard = null;

var make_set_action = function(item, val) {
    if(item.set_action) return item.set_action(val);
    return new IV.actions.SetProperty(item, val);
};

var render_property_field_array = function(item) {
    var type = item.type.substr(1);
    var target = IV._E("div", "field group");
    var iName = IV._E("span", "name").append(
        IV._E("span").text(item.name).click(function() {
            var $this = $(this);
            IV.popups.beginContextMenu($this, [ "Copy", "Paste", "Reference" ], function(val) {
                if(val == "Copy") {
                    property_clipboard = item.get();
                }
                if(val == "Paste" && property_clipboard) {
                    item.set(property_clipboard.clone());
                    reload_item();
                    Editor.renderer.trigger();
                    Editor.renderer.render();
                }
                if(val == "Reference" && property_clipboard) {
                    item.set(property_clipboard);
                    reload_item();
                    Editor.renderer.trigger();
                    Editor.renderer.render();
                }
            });
        })
    );

    var iVal = IV._E("span", "val");
    var reload_items = function() {
        iVal.children().remove();
        var array = item.get();
        array.forEach(function(array_item, index) {
            var element = render_object_value(array_item, item.args, function(new_value) {
                array[index] = new_value;
                reload_items();
                Editor.renderer.trigger();
                Editor.renderer.render();
            });
            var container = IV._E("div");
            container.append(element);
            container.append(IV._E("span", "multi btn", "x").click(function() {
                array.splice(index, 1);
                reload_items();
                Editor.renderer.trigger();
                Editor.renderer.render();
            }));
            iVal.append(container);
        });
        iVal.append(IV._E("div").append(IV._E("span", "btn", "+").click(function() {
            if(type == "path")
                array.push(new IV.Path());
            reload_items();
            Editor.renderer.trigger();
            Editor.renderer.render();
        })));
    };
    target.append(iName);
    target.append(iVal);

    reload_items();

    return target;
};

// Render a property field's value part.
var render_property_field = function(item) {
    if(item.type[0] == "*") {
        return render_property_field_array(item);
    }
    var target = IV._E("div", "field group");
    var iName = IV._E("span", "name").append(
        IV._E("span").text(item.name).click(function() {
            var $this = $(this);
            IV.popups.beginContextMenu($this, [ "Copy", "Paste", "Reference" ], function(val) {
                if(val == "Copy") {
                    property_clipboard = item.get();
                }
                if(val == "Paste" && property_clipboard) {
                    item.set(property_clipboard.clone());
                    reload_item();
                    Editor.renderer.trigger();
                    Editor.renderer.render();
                }
                if(val == "Reference" && property_clipboard) {
                    item.set(property_clipboard);
                    reload_item();
                    Editor.renderer.trigger();
                    Editor.renderer.render();
                }
            });
        })
    );
    var iVal = IV._E("span", "val");
    var type = item.type;
    var reload_item = function(val) {
        if(val !== undefined) {
            Actions.add(make_set_action(item, val));
            Actions.commit();
            Editor.renderer.trigger();
            Editor.renderer.render();
        }
        iVal.children().remove();
        if(item.type == "button") {
            item.get().split(",").forEach(function(name) {
                iVal.append(IV._E("span", "btn", name).click(function() {
                    item.set(name);
                    Editor.renderer.trigger();
                    Editor.renderer.render();
                }));
            });
        } else {
            iVal.append(render_object_value(item.get(), item.args, function(new_val) {
                if(new_val !== undefined) {
                    Actions.add(make_set_action(item, new_val));
                    Actions.commit();
                    //item.set(new_val);
                    reload_item();
                }
                Editor.renderer.trigger();
                Editor.renderer.render();
            }));
        }
    };
    target.append(iName);
    target.append(iVal);

    var make_switch_button = function(list, callback) {
        target.append(
           IV._E("span")
            .append(IV._icon("xicon-tools-list"))
            .addClass("multi btn").click(function() {
                IV.popups.beginContextMenu($(this), list, function(val) {
                    callback(val);
                    Editor.renderer.trigger();
                    Editor.renderer.render();
                });
            })
        );
    };

    if(type == "color") {
        make_switch_button([ "Plain", "Linear", "Categorical", "Expression", "Equals"], function(val) {
            if(val == "Plain") {
                reload_item(new IV.objects.Plain(IV.colors.foreground));
            }
            if(val == "Linear") {
                reload_item(new IV.objects.ColorLinear(new IV.Path(), IV.colors.background, IV.colors.foreground));
            }
            if(val == "Categorical") {
                reload_item(new IV.objects.CategoricalMapping(new IV.Path(), [], IV.colors.foreground, "color"));
            }
            if(val == "Expression") {
                reload_item(new IV.objects.MappingExpression(new IV.Path(), IV.colors.foreground.toRGB()));
            }
            if(val == "Equals") {
                reload_item(new IV.objects.PassThrough(new IV.Path()));
            }
        });
    }
    if(type == "number") {
        make_switch_button([ "Plain", "Linear", "Categorical", "Expression", "Equals" ], function(val) {
            if(val == "Plain") {
                reload_item(new IV.objects.Plain(0));
            }
            if(val == "Linear") {
                reload_item(new IV.objects.NumberLinear(new IV.Path(), 0, 1, 0, 1));
            }
            if(val == "Categorical") {
                reload_item(new IV.objects.CategoricalMapping(new IV.Path(), [], 0, "number"));
            }
            if(val == "Expression") {
                reload_item(new IV.objects.MappingExpression(new IV.Path(), "0"));
            }
            if(val == "Equals") {
                reload_item(new IV.objects.PassThrough(new IV.Path()));
            }
        });
    }
    if(type == "string") {
        make_switch_button([ "Plain", "Categorical", "Equals"], function(val) {
            if(val == "Plain") {
                reload_item(new IV.objects.Plain(""));
            }
            if(val == "Categorical") {
                reload_item(new IV.objects.CategoricalMapping(new IV.Path(), [], "", "string"));
            }
            if(val == "Equals") {
                reload_item(new IV.objects.PassThrough(new IV.Path()));
            }
        });
    }
    if(type == "filter") {
        make_switch_button([ "None", "Range", "Categorical", "Combined"], function(val) {
            if(val == "None") {
                reload_item(null);
            }
            if(val == "Range") {
                reload_item(new IV.objects.RangeFilter(new IV.Path(), 0, 1));
            }
            if(val == "Categorical") {
                reload_item(new IV.objects.CategoricalFilter(new IV.Path(), [], false));
            }
            if(val == "Combined") {
                reload_item(new IV.objects.CombinedFilter([], false));
            }
        });
    }
    if(type == "point") {
        target.append(
           IV._E("span")
            .append(IV._icon("xicon-tools-arrow"))
            .addClass("multi btn").click(function() {
                Editor.tools.disable();
                Editor.tools.beginSelectLocation(function(loc) {
                    Editor.tools.endSelectLocation("temporary");
                    Editor.tools.enable();
                    reload_item(loc);
                }, "temporary");
            })
        );
    }
    reload_item();
    if(item.owner && item.property) {
        var listener = IV.bindObjectEvents(item.owner,
            ["set:" + item.property],
        function(ev, val) {
            reload_item();
        });
        target.bind("destroyed", function() { listener.unbind(); });
    }

    return target;
};

var render_field = function(name, item, type, callback, args) {
    return render_property_field({
        name: name,
        get: function() { return item; },
        type: type,
        set: callback,
        args: args
    });
};

// Render the caption of the property field.
var render_caption = function(cap) {
    return IV._E("div", "item-caption", " " + cap)
        .prepend($('<i class="icon-right-dir" style="display:none" /></i>'))
        .prepend($('<i class="icon-down-dir" /></i>'))
        .click(function() {
            $(this).children(".icon-right-dir").toggle();
            $(this).children(".icon-down-dir").toggle();
            $(this).next().toggle();
        });
};
// Render the caption of the property field.
var render_nested_caption = function(cap) {
    return IV._E("div", "nested-caption", " " + cap)
        .prepend($('<i class="icon-right-dir" style="display:none" /></i>'))
        .prepend($('<i class="icon-down-dir" /></i>'))
        .click(function() {
            $(this).children(".icon-right-dir").toggle();
            $(this).children(".icon-down-dir").toggle();
            $(this).parent().children(":not(:first-child)").toggle();
        });
};
// Render the caption of the property field.
var render_info = function(cap) {
    return IV._E("div", "item-info", cap);
};


// iVisDesigner - scripts/editor/property/style.js
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

(function() {

var Style = Editor.Style = { };

IV.makeEventSource(Style);

var current = null; //new IV.objects.PathStyle;

Style.beginEditStyle = function(style) {
    current = style;
    render();
};

Style.endEditStyle = function() {
    current = null;
    //if(current) current = current.clone();
    render();
};

Editor.bind("selection", function() {
    if(Editor.vis && Editor.vis.selection.length == 1) {
        var selobj = Editor.vis.selection[0].obj;
        if(Editor.vis.selection[0].selected_object)
            selobj = Editor.vis.selection[0].selected_object;
        if(selobj.style) {
            Editor.Style.beginEditStyle(selobj.style);
        } else {
            Editor.Style.endEditStyle();
        }
    } else {
        Editor.Style.endEditStyle();
    }
});

var build_style_property_item = function(name, act, key, type, args) {
    return render_property_field({
        name: name,
        args: args,
        type: type,
        owner: act,
        property: key,
        get: function() {
            return act[key];
        },
        set: function(val) {
            act[key] = val;
        },
        set_action: function(val) {
            return new IV.actions.SetDirectly(act, key, val);
        }
    });
};

var render = function() {
    var container = $("#panel-style-display");
    container.children().remove();
    if(!current) {
        container.append(render_info("Nothing Selected"));
        return;
    }
    var actions = current.actions;

    var make_caption = function(text, act) {
        var r = render_caption(text);
        r.append($("<span />").addClass("rightmost btn").append($('<i class="xicon-cross"></i>')).click(function() {
            var idx = actions.indexOf(act);
            if(idx >= 0) {
                actions.splice(idx, 1);
                render();
                Editor.renderer.trigger();
                Editor.renderer.render();
            }
        }));
        var tracking_idx = null;
        IV.trackMouseEvents(r, {
            down: function() { tracking_idx = null; },
            move: function(e) {
                var items = container.children(".item-caption");
                var min_diff = 1e100;
                var cidx = -1;
                items.each(function(idx) {
                    var t = $(this).offset().top;
                    var h = $(this).height() + $(this).next().height();
                    t += h / 2;
                    var diff = Math.abs(e.pageY - t);
                    if(diff < min_diff) {
                        cidx = e.pageY > t ? idx + 1 : idx;
                        min_diff = diff;
                    }
                });
                container.children(".item-divider").remove();
                var myidx = actions.indexOf(act);
                if(cidx >= 0 && cidx != myidx && cidx != myidx + 1) {
                    var pl = $("<div />").addClass("item-divider");
                    if(cidx == items.length) items.eq(cidx - 1).next().after(pl);
                    else items.eq(cidx).before(pl);
                    tracking_idx = cidx;
                }
            },
            up: function(e) {
                container.children(".item-divider").remove();
                if(tracking_idx !== null) {
                    var myidx = actions.indexOf(act);
                    if(myidx < 0) return;
                    if(myidx > tracking_idx) {
                        actions.splice(tracking_idx, 0, act);
                        actions.splice(myidx + 1, 1);
                        render();
                    } else if(myidx < tracking_idx) {
                        actions.splice(tracking_idx, 0, act);
                        actions.splice(myidx, 1);
                        render();
                    }
                }
            }
        });
        return r;
    };

    var toolbar = $("<div />").addClass("item-tools");
    toolbar.append($("<span />").addClass("btn").text("+").click(function() {
        IV.popups.beginContextMenu($(this), [ "Stroke", "Fill" ], function(s) {
            if(s == "Fill") {
                actions.push({
                    type: "fill",
                    color: new IV.objects.Plain(IV.colors.default_fill)
                });
            }
            if(s == "Stroke") {
                actions.push({
                    type: "stroke",
                    color: new IV.objects.Plain(IV.colors.default_stroke),
                    width: new IV.objects.Plain(1),
                    join: new IV.objects.Plain("round"),
                    cap: new IV.objects.Plain("round")
                });
            }
            render();
            Editor.renderer.trigger();
            Editor.renderer.render();
        });
    }));

    actions.forEach(function(act) {
        var target = $("<div />").addClass("item-action");
        var cap = "Unknown";
        if(act.type == "stroke") {
            container.append(make_caption("Stroke", act));
            target.append(build_style_property_item("Color", act, "color", "color"));
            target.append(build_style_property_item("Width", act, "width", "number"));
            target.append(build_style_property_item("Join", act, "join", "list", [ "bevel", "round", "miter" ]));
            target.append(build_style_property_item("Cap", act, "cap", "list", [ "butt", "round", "square" ]));
        }
        if(act.type == "fill") {
            container.append(make_caption("Fill", act));
            target.append(build_style_property_item("Color", act, "color", "color"));
        }
        container.append(target);
    });
    container.append(toolbar);
};

render();

})();


// Style editor.

(function() {

var Property = Editor.Property = { };

IV.makeEventSource(Property);

var current = null;
//var current_context = null;

Property.beginEditProperty = function(obj) {
    current = obj;
    render();
};

Property.endEditProperty = function() {
    current = null;
    render();
};

var make_inspector = function(obj) {
    var r = IV._E("span");
    if(typeof(obj) == "object") {
        if(obj instanceof Array) {
        } else {
            var ul = IV._E("ul");
            for(var key in obj) {
                if(obj.hasOwnProperty(key) && key[0] != '_') {
                    var nest = make_inspector(obj[key]);
                    var li = IV._E("li");
                    li.append(IV._E("span", "", key + ":")).append(nest);
                    ul.append(li);
                }
            }
            r.append(ul);
        }
    } else {
        r.text(obj.toString());
    }
    return r;
};

Editor.bind("selection", function() {
    if(Editor.vis && Editor.vis.selection.length == 1) {
        current = Editor.vis.selection[0].obj;
        if(Editor.vis.selection[0].selected_object)
            current = Editor.vis.selection[0].selected_object;
        //current_context = Editor.vis.selection[0].context;
        Property.beginEditProperty(current);
        var context = Editor.vis.selection[0].context;
        if(context) {
            $("#data-inspector").children().remove();
            $("#data-inspector").append(make_inspector(context.val()));
        }
    } else {
        Property.endEditProperty();
    }
});

var render = function() {
    var container = $("#panel-property-display");
    container.children().remove();
    if(!current || !current.getPropertyContext) {
        container.append(render_info("Nothing Selected"));
        return;
    }
    var context = current.getPropertyContext();

    var groups = {};
    context.forEach(function(c) {
        if(!groups[c.group]) groups[c.group] = [];
        groups[c.group].push(c);
    });

    var render_item = function(item, target) {
        if(item.type == "nested") {
            var nested_group = IV._E("div", "nested");
            nested_group.append(render_nested_caption(item.name));
            item.properties.forEach(function(subitem) {
                render_item(subitem, nested_group);
            });
            target.append(nested_group);
        } else {
            target.append(render_property_field(item));
        }
    };

    IV.forEachInObject(groups, function(g, group) {
        container.append(render_caption(g));
        var target = $("<div />").addClass("item-action");
        group.forEach(function(item) {
            render_item(item, target);
        });

        container.append(target);
    });
};

render();

})();

})();


// iVisDesigner - scripts/editor/ui.js
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

IV.addListener("command:panels.reset", function() {
    $("#panel-schema").IVPanel({ left: 10, top: 10, width: 180, height: 400 }).IVPanel("show");
    $("#panel-objects").IVPanel({ left: 10, top: 420, width: 180, bottom: 10 }).IVPanel("show");
    $("#panel-tools").IVPanel({ left: 200, top: 10, right: 220, height: 38, min_height: 38 }).IVPanel("show");
    $("#panel-log").IVPanel({ left: 10, bottom: 10, right: 10, height: 100 }).IVPanel("hide");
    $("#panel-page").IVPanel({ vcenter: 0, bottom: 200, top: 60, width: 600 }).IVPanel("hide");
    $("#panel-style").IVPanel({ right: 10, top: 10, width: 200, height: 300 }).IVPanel("show");
    $("#panel-property").IVPanel({ right: 10, top: 320, width: 200, bottom: 10 }).IVPanel("show");
    $("#panel-inspector").IVPanel({ right: 220, bottom: 10, width: 200, height: 200 }).IVPanel("hide");
    $("#panel-pose").IVPanel({ right: 220, bottom: 10, width: 200, height: 200 }).IVPanel("hide");
    $("#panel-code-editor").IVPanel({ left: 200, bottom: 10, right: 220, height: 200 }).IVPanel("hide");
});
IV.raiseEvent("command:panels.reset");

IV.add("status", "string");
IV.listen("status", function(s) {
    $(".status-text").text(s);
});


(function() {
    // Mouse events.
    var mouse_state = false;

    IV.isTrackingMouse = function() { return mouse_state; }

    $(window).contextmenu(function(e) {
        if(e.target.tagName == "INPUT") return;
        e.preventDefault();
    });

    $("#view").mousedown(function(e) {
        var offsetX = e.pageX - $("#view").offset().left;
        var offsetY = e.pageY - $("#view").offset().top;
        var pt = new IV.Vector(offsetX, offsetY);
        pt = Editor.renderer.getOffsetFromScreen(pt);
        var o = { offset: pt,
                  page: new IV.Vector(e.pageX, e.pageY),
                  shift: e.shiftKey };
        mouse_state = true;
        Editor.raise("view:mousedown", o);
        Editor.renderer.render();
    });
    $(window).mousemove(function(e) {
        var offsetX = e.pageX - $("#view").offset().left;
        var offsetY = e.pageY - $("#view").offset().top;
        var pt = new IV.Vector(offsetX, offsetY);
        pt = Editor.renderer.getOffsetFromScreen(pt);
        var o = { offset: pt,
                  page: new IV.Vector(e.pageX, e.pageY),
                  shift: e.shiftKey };
        var w = $("#view").width();
        var h = $("#view").height();
        var insideView = offsetX >= 0 && offsetX < w && offsetY >= 0 && offsetY < h;
        if(mouse_state || insideView) {
            Editor.raise("view:mousemove", o);
            Editor.renderer.render();
        }
        return true;
    });
    $(window).mouseup(function(e) {
        var offsetX = e.pageX - $("#view").offset().left;
        var offsetY = e.pageY - $("#view").offset().top;
        var pt = new IV.Vector(offsetX, offsetY);
        pt = Editor.renderer.getOffsetFromScreen(pt);
        var o = { offset: pt,
                  page: new IV.Vector(e.pageX, e.pageY),
                  shift: e.shiftKey };
        mouse_state = false;
        Editor.raise("view:mouseup", o);
        Editor.renderer.render();
        return true;
    });
    // For iPad like platforms:
    // attach the touchstart, touchmove, touchend event listeners.
    var view_elem = document.getElementById("view");
    var touch_state = false;
    view_elem.addEventListener('touchstart',function(e) {
        //if(e.target != view_elem && e.target != canvas_front) return;
        e.preventDefault();
        touch_state = true;
        var offsetX = e.touches[0].pageX - $("#view").offset().left;
        var offsetY = e.touches[0].pageY - $("#view").offset().top;
        var pt = new IV.Vector(offsetX, offsetY);
        pt = Editor.renderer.getOffsetFromScreen(pt);
        var o = { offset: pt,
                  page: new IV.Vector(e.pageX, e.pageY),
                  shift: false };
        Editor.raise("view:mousedown", o);
        Editor.renderer.render();
    });
    view_elem.addEventListener('touchmove',function(e) {
        var offsetX = e.touches[0].pageX - $("#view").offset().left;
        var offsetY = e.touches[0].pageY - $("#view").offset().top;
        var pt = new IV.Vector(offsetX, offsetY);
        pt = Editor.renderer.getOffsetFromScreen(pt);
        var o = { offset: pt,
                  page: new IV.Vector(e.pageX, e.pageY),
                  shift: false };
        Editor.raise("view:mousemove", o);
        Editor.renderer.render();
    });
    view_elem.addEventListener('touchend', function(e) {
        var offsetX = e.changedTouches[0].pageX - $("#view").offset().left;
        var offsetY = e.changedTouches[0].pageY - $("#view").offset().top;
        var pt = new IV.Vector(offsetX, offsetY);
        pt = Editor.renderer.getOffsetFromScreen(pt);
        var o = { offset: pt,
                  page: new IV.Vector(e.pageX, e.pageY),
                  shift: false };
        Editor.raise("view:mouseup", o);
        Editor.renderer.render();
    });

    IV.log = function(str) {
        var s;
        if(typeof(str) == "string") s = str;
        else s = JSON.stringify(str, null, " ");
        $("#log-container > ul").prepend($("<li></li>").append($("<pre></pre>").text(s)));
    };


    Editor.status = {
        start: function() {
            $(".status-text").html("");
            return this;
        },
        add: function(info) {
            this.append(info);
            return this;
        },
        append: function(info) { // append will return a descriptor, while add return the obj.
            var sp = $("<span />").text(info);
            $(".status-text").append(sp);
            var ctx = {
                set: function(info) {
                    sp.text(info);
                }
            };
            return ctx;
        },
        end: function() {
            $(".status-text").html("");
            return this;
        }
    };

    var editor_messages = {};

    Editor.showMessage = function(str) {
        var s;
        if(editor_messages[str]) {
            s = editor_messages[str];
            clearTimeout(s.data().timeout);
        } else {
            s = IV._E("div").append(IV._E("span", type ? "msg-" + type : "message", str));
            editor_messages[str] = s;
            $("#editor-messages").append(s);
        }
        s.data().timeout = setTimeout(function() {
            s.remove();
            delete editor_messages[str];
        }, 2000);
    };

    $(window).keydown(function(e) {
        if(e.keyCode == 8 && e.target == document.body) {
            e.preventDefault();
        }
    });
    $(document).bind('touchmove', function(e) {
        e.preventDefault();
    });

    var codemirror = CodeMirror(document.getElementById("code-editor-container"), {
        value: "// Input Javascript code here.\n",
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        keyMap: "sublime",
        theme: "monokai",
        lineNumbers: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        mode: "javascript"
    });
    $("#code-editor-remote-run").click(function() {
        var code = codemirror.getSelection();
        IV.allosphere.postMessage({
            type: "eval",
            script: code
        });
    });
    $("#code-editor-local-run").click(function() {
        var code = codemirror.getSelection();
        eval(code);
    });
    var predefined_codes = { };
    predefined_codes["sample"] = { name: "Sample", code: "alert('Hello World!');" };
    if(IV_Config.get_predefined_codes) {
        var pdcs = IV_Config.get_predefined_codes();
        for(var key in pdcs) {
            predefined_codes[key] = pdcs[key];
        }
    }
    for(var id in predefined_codes) {
        var name = predefined_codes[id].name;
        $("#code-editor-predefined").append(IV._E("option").attr("value", id).text(name));
    }
    $("#code-editor-predefined").change(function() {
        codemirror.setValue(predefined_codes[$(this).val()].code);
        codemirror.execCommand("selectAll");
    });
})();


// iVisDesigner - scripts/editor/tools/tools.js
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

Editor.tools = { };


// Mouse event dispatcher
(function() {
    var Tools = Editor.tools;

    var mouse_trackers = { };
    var mousemove_handlers = { };

    var MouseContext = function() {
        this.move_listeners = [];
        this.release_listeners = [];
    };
    MouseContext.prototype = {
        dispatchDown: function(e) {
            var $this = this;
            e.move = function(f) { $this.move_listeners.push(f); };
            e.release = function(f) { $this.release_listeners.push(f); };
            for(var i in mouse_trackers) {
                (mouse_trackers[i])(e);
            }
        },
        dispatchMove: function(e) {
            this.move_listeners.forEach(function(f) {
                f(e);
            });
        },
        dispatchRelease: function(e) {
            this.release_listeners.forEach(function(f) {
                f(e);
            });
        }
    };
    var current_context = null;

    Editor.bind("view:mousedown", function(e) {
        current_context = new MouseContext();
        current_context.dispatchDown(e);
        Editor.renderer.render();
    });
    Editor.bind("view:mousemove", function(e) {
        if(current_context) current_context.dispatchMove(e);
        for(var i in mousemove_handlers) {
            mousemove_handlers[i](e, current_context != null);
        }
        Editor.renderer.render();
    });
    Editor.bind("view:mouseup", function(e) {
        var tc = current_context;
        current_context = null;
        if(tc) tc.dispatchRelease(e);
        Editor.renderer.render();
    });

    Tools.beginTrackMouse = function(f, key) {
        mouse_trackers[key] = f;
    };
    Tools.endTrackMouse = function(key) {
        delete mouse_trackers[key];
    };
    Tools.beginTrackMouseMove = function(f, key) {
        mousemove_handlers[key] = f;
    };
    Tools.endTrackMouseMove = function(key) {
        delete mousemove_handlers[key];
    };

    var overlay_info = null;

    Tools.beginSelectObject = function(f, key, action) {
        overlay_info = {
            action: "select-object",
            hover: null
        };
        Tools.beginTrackMouse(function(e) {
            var context;
            if(Editor.vis && Editor.data)
                context = Editor.vis.selectObject(Editor.data, e.offset, action);
            f(context, e);
        }, key);
        Tools.beginTrackMouseMove(function(e, tracking) {
            if(tracking) {
                overlay_info.hover = null;
            } else {
                var context;
                if(Editor.vis && Editor.data)
                    context = Editor.vis.selectObject(Editor.data, e.offset);
                if(context && context.obj) {
                    overlay_info.hover = context;
                } else {
                    overlay_info.hover = null;
                }
            }
            Tools.triggerRender("overlay");
        }, key);
    };
    Tools.endSelectObject = function(key) {
        Tools.endTrackMouse(key);
        Tools.endTrackMouseMove(key);
        overlay_info = null;
    };

    Tools.beginSelectLocation = function(f, key) {
        // callback(obj, mouse_event)
        overlay_info = {
            action: "select-location",
            hover: null
        };

        Tools.beginTrackMouse(function(e) {
            var p0 = e.offset;
            var context = Editor.vis.selectObject(Editor.data, p0);
            var current_component = Editor.get("current-component");
            if(context && current_component) {
                context = current_component.resolveSelection(context);
            }

            var captured_object = function(obj) {
                if(obj.type == "Track" && e.shift) {
                    var path_select = IV.popups.PathSelect();
                    path_select.show(e.page, 200, 150);
                    path_select.onSelectPath = function(path) {
                        captured_object(new IV.objects.TrackWrapper(obj, new IV.Path(path)));
                    };
                    return;
                }
                var ref_path = Editor.get("selected-reference");
                var refd_path = Editor.get("selected-reference-target");
                if(ref_path) f(new IV.objects.ReferenceWrapper(ref_path, refd_path, obj), e);
                else f(obj, e);
            };

            if(context && context.obj.can("get-point")) {
                var diff = null;
                e.move(function(e_move) {
                    diff = new IV.Vector(e_move.offset.x - p0.x, e_move.offset.y - p0.y);
                    overlay_info.line = [ p0, new IV.Vector(e_move.offset.x, e_move.offset.y) ];
                });
                e.release(function() {
                    overlay_info.line = null;
                    if(diff == null) {
                        captured_object(context.obj);
                    } else {
                        captured_object(new IV.objects.PointOffset(context.obj, diff));
                    }
                });
            } else {
                e.release(function() {
                    var pt = e.offset;
                    // To component coordinate if editing a component.
                    var current_component = Editor.get("current-component");
                    if(current_component) {
                        pt = current_component.toLocalCoordinate(pt);
                    }
                    // Captured the point.
                    captured_object(new IV.objects.Plain(pt));
                });
            }
        }, key);

        var mousemove_handler = null;
        var result = {
            mousemove: function(handler) {
                mousemove_handler = handler;
                return result;
            }
        };

        Tools.beginTrackMouseMove(function(e, tracking) {
            if(tracking) {
                overlay_info.hover = null;
            } else {
                var context = Editor.vis.selectObject(Editor.data, e.offset);
                if(context && context.obj) {
                    overlay_info.hover = context;
                } else {
                    overlay_info.hover = null;
                }
            }
            if(mousemove_handler) mousemove_handler(e, tracking);
            Tools.triggerRender("overlay");
        }, key);

        return result;
    };
    Tools.endSelectLocation = function(key) {
        Tools.endTrackMouse(key);
        Tools.endTrackMouseMove(key);
        overlay_info = null;
    };

    Tools.renderOverlay = function(g) {
        if(overlay_info) {
            if(overlay_info.hover) {
                var obj = overlay_info.hover.obj;
                g.ivSave();
                if(obj.renderSelected) obj.renderSelected(g, IV.data, overlay_info.hover.context, overlay_info.hover);
                if(obj.renderGuideSelected) obj.renderGuideSelected(g, IV.data,  overlay_info.hover.context, overlay_info.hover);
                g.ivRestore();
            }
            if(overlay_info.line) {
                g.ivGuideLineWidth();
                g.beginPath();
                overlay_info.line[0].callMoveTo(g);
                overlay_info.line[1].callLineTo(g);
                g.strokeStyle = IV.colors.selection.toRGBA();
                g.stroke();
            }
        }
        if(IV.current_tool.renderOverlay)
            IV.current_tool.renderOverlay(g);

        var current_component = Editor.get("current-component");
        if(current_component) {
            var pc = current_component.fromLocalCoordinate(new IV.Vector(0, 0));
            var w = g.ivGuideLineWidth() * 200;
            g.beginPath();
            g.moveTo(pc.x - w, pc.y);
            g.lineTo(pc.x + w, pc.y);
            g.moveTo(pc.x, pc.y - w);
            g.lineTo(pc.x, pc.y + w);
            g.strokeStyle = "rgba(0, 0, 0, 0.5)";
            g.stroke();

        }
    };

    Tools.triggerRender = function(items) {
        Editor.renderer.trigger(items);
    };

    Tools.disable = function() {
        if(IV.current_tool && IV.current_tool.onInactive)
            IV.current_tool.onInactive();
    };

    Tools.enable = function() {
        if(IV.current_tool && IV.current_tool.onActive)
            IV.current_tool.onActive();
    };

    var overlay_original = null;
    Tools.beginOverlay = function(new_tool) {
        if(IV.current_tool) {
            if(IV.current_tool.onInactive)
                IV.current_tool.onInactive();
            overlay_original = IV.current_tool;
        }
        IV.current_tool = new_tool;
    };
    Tools.endOverlay = function() {
        IV.current_tool = overlay_original;
        if(IV.current_tool.onActive)
        IV.current_tool.onActive();
    };

    Editor.renderer.bind("overlay", function(data, g) {
        Tools.renderOverlay(g);
    });
    Editor.listen("current-component", function() {
        Tools.triggerRender("overlay");
    });

IV.listen("tools:current", function(val) {
    if(IV.current_tool && IV.current_tool.onInactive)
        IV.current_tool.onInactive();

    if(Tools[val]) {
        IV.current_tool = Tools[val];
    } else {
        IV.current_tool = {
            onActive: function() {
                Editor.showMessage("This tool is not implemeted yet.");
            }
        };
    }

    if(IV.current_tool.onActive)
        IV.current_tool.onActive();
});

// iVisDesigner - scripts/editor/tools/select.js
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

(function() {

Tools.createMagnetics = function() {
    var points = [];
    for(var i in Editor.vis.objects) {
        var obj = Editor.vis.objects[i];
        if(obj.getAnchors) {
            var r = obj.getAnchors();
            points = points.concat(r);
        }
    }
    return new IV.MagneticAlign(points);
};

Tools.Select = {
    onActive: function() {
        var $this = this;
        Tools.triggerRender("main,front,back,overlay");
        IV.set("status", "Select object.");

        Tools.beginSelectObject(function(context, e_down) {
            if(context) {
                if(!e_down.shift) Editor.vis.clearSelection();
                Editor.vis.appendSelection(context);
                Tools.triggerRender("main,front,back,overlay");
            } else {
                Editor.vis.clearSelection();
                Tools.triggerRender("main,front,back,overlay");
                return;
            }
            if(context.onMove) {
                $this.magnetics = Tools.createMagnetics();
                $this.magnetics.threshold = 5 / e_down.offset.view_scale;
                var handle_r = function(r) {
                    if(!r) return;
                    console.log(r);
                    if(r.actions) {
                        r.actions.forEach(function(act) {
                            Actions.add(act);
                        });
                        Actions.commit();
                    }
                    if(r.trigger_render) Tools.triggerRender(r.trigger_render);
                };
                e_down.move(function(e_move) {
                    var p0 = e_down.offset;
                    var p1 = e_move.offset;
                    $this.magnetics.reset();
                    var r = context.onMove(p0, p1, $this.magnetics);
                    handle_r(r);
                });
                e_down.release(function(e_release) {
                    $this.magnetics = null;
                    var p0 = e_down.offset;
                    var p1 = e_release.offset;
                    if(context.onRelease) {
                        var r = context.onRelease(p0, p1);
                        handle_r(r);
                    }
                });
            }
        }, "tools:Select", "move");
    },
    renderOverlay: function(g) {
        if(this.magnetics) {
            g.ivSave();
            g.ivGuideLineWidth();
            this.magnetics.render(g);
            g.ivRestore();
        }
    },
    onInactive: function() {
        Tools.endSelectObject("tools:Select");
    }
};

})();

// iVisDesigner - scripts/editor/tools/track.js
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

(function() {

Tools.Track = {
    magneticsLocation2: function(loc, e) {
        var $this = this;
        if(loc.type == "Plain") {
            var magnetics = Tools.createMagnetics();
            magnetics.threshold = 5 / e.offset.view_scale;
            if($this.loc1) {
                $this.loc1.getPath().enumerate(Editor.data, function(context) {
                    $this.overlay_p1 = $this.loc1.getPoint(context);
                    return false;
                });
                magnetics.points.push($this.overlay_p1);
            }
            var new_pos = new IV.Vector(loc.obj.x, loc.obj.y);
            var np = magnetics.modify(new_pos.x, new_pos.y);
            if(np) {
                loc.obj.x = np.x;
                loc.obj.y = np.y;
            }
        }
    },
    onActive: function() {
        var $this = this;
        $this.loc1 = null;
        $this.loc2 = null;
        var sA = Editor.status.start()
            .add("Track: ")
            .append("A: [please select]");

        var popup = IV.popups.PathSelect();
        popup.show($("#tool-icon-track"), 200, 200);
        popup.onSelectPath = function(selected_path, selected_ref) {
            Tools.beginSelectLocation(function(loc, mouse_event) {
                if(!$this.loc1) {
                    $this.loc1 = loc;
                    sA.set("A: " + loc.type);
                    Editor.status.append("B: [please select]");
                    return;
                } else {
                    $this.magneticsLocation2(loc, mouse_event);
                    $this.loc2 = loc;
                    var path = new IV.Path(selected_path);
                    if(true) {
                        var stat = Editor.computePathStatistics(path);
                        var diff = stat.max - stat.min;
                        stat.min -= diff * 0.05;
                        stat.max += diff * 0.05;
                        var track = new IV.objects.Track({
                            path: path,
                            anchor1: $this.loc1,
                            anchor2: $this.loc2,
                            min: new IV.objects.Plain(stat.min),
                            max: new IV.objects.Plain(stat.max)
                        });
                        guide_count = 0;
                        var num = track.enumerateGuide(Editor.data, function() { guide_count += 1; });
                        if(guide_count > 10) {
                            track.tick_style.show_ticks = false;
                        }
                        Editor.doAddObject(track);
                    }
                    $this.loc1 = null;
                    $this.loc2 = null;
                    sA = Editor.status.start()
                        .add("Track: ")
                        .append("A: [please select]");
                }
            }, "tools:Track").mousemove(function(e) {
                if($this.loc1 && !$this.loc2) {
                    $this.loc1.getPath().enumerate(Editor.data, function(context) {
                        $this.overlay_p1 = $this.loc1.getPoint(context);
                        return false;
                    });
                    var magnetics = Tools.createMagnetics();
                    magnetics.threshold = 5 / e.offset.view_scale;
                    magnetics.points.push($this.overlay_p1);
                    var new_pos = new IV.Vector(e.offset.x, e.offset.y);
                    var np = magnetics.modify(new_pos.x, new_pos.y);
                    if(np) {
                        new_pos.x = np.x;
                        new_pos.y = np.y;
                        magnetics.accept(np, new_pos.x, new_pos.y);
                    }
                    $this.overlay_p2 = new_pos;
                }
            });
        };
    },
    renderOverlay: function(g) {
        if(this.loc1 && !this.loc2) {
            g.beginPath();
            g.moveTo(this.overlay_p1.x, this.overlay_p1.y);
            g.lineTo(this.overlay_p2.x, this.overlay_p2.y);
            g.ivGuideLineWidth();
            g.strokeStyle = IV.colors.selection.toRGBA();
            g.stroke();
        }
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Track");
    }
};

})();

(function() {

Tools.Scatter = {
    onActive: function() {
        var obj1 = null;
        var obj2 = null;
        Editor.vis.clearSelection();

        var sA = Editor.status.start()
            .add("Scatter: ")
            .append("A: [please select]");

        var get_inner_object = function(context) {
            var current_component = Editor.get("current-component");
            if(current_component) {
                context = current_component.resolveSelection(context);
            }
            var ref_path = Editor.get("selected-reference");
            var refd_path = Editor.get("selected-reference-target");
            if(ref_path) return new IV.objects.ReferenceWrapper(ref_path, refd_path, context.obj);
            return context.obj;
        };

        Tools.beginSelectObject(function(context) {
            var path = Editor.get("selected-path");
            if(!context) {
                obj1 = null;
                obj2 = null;
                Editor.vis.clearSelection();
                sA = Editor.status.start()
                    .add("Scatter: ")
                    .append("A: [please select]");
                return;
            }
            if(!obj1) {
                obj1 = get_inner_object(context);
                Editor.vis.appendSelection(context);
                sA.set("A: " + obj1.type);
                Editor.status.append("B: [please select]");
            } else if(!obj2) {
                obj2 = get_inner_object(context);
                var is_track = function(t) {
                    if(t.type == "Track") return true;
                    if(t.type == "ReferenceWrapper") {
                        return is_track(t.obj);
                    }
                };
                if(is_track(obj1) && is_track(obj2)) {
                    var scatter = new IV.objects.Scatter({
                        track1: obj1, track2: obj2
                    });
                    Editor.doAddObject(scatter);
                }
                obj1 = null;
                obj2 = null;
                Editor.vis.clearSelection();
                sA = Editor.status.start()
                    .add("Track: ")
                    .append("A: [please select]");
            }
        }, "tools:Line");
    },
    onInactive: function() {
        Tools.endSelectObject("tools:Line");
    }
};

})();

// iVisDesigner - scripts/editor/tools/circle.js
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

(function() {

Tools.Circle = {
    onActive: function() {
        var $this = this;
        IV.set("status", "Circle: Select the center.");
        Tools.beginSelectLocation(function(loc) {
            var path = Editor.get("selected-path");
            if(path) {
                var circle = new IV.objects.Circle({
                    path: path,
                    center: loc
                });
                Editor.doAddObject(circle);
            } else {
                Editor.showMessage("No path selected.");
            }
        }, "tools:Circle");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Circle");
    }
};

})();

// iVisDesigner - scripts/editor/tools/line.js
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

(function() {

Tools.Line = {
    onActive: function() {
        var $this = this;
        $this.loc1 = null;
        $this.loc2 = null;
        var sA = Editor.status.start()
            .add("Line: ")
            .append("A: [please select]");

        Tools.beginSelectLocation(function(loc) {
            if(!$this.loc1) {
                $this.loc1 = loc;
                sA.set("A: " + loc.type);
                Editor.status.append("B: [please select]");
                return;
            } else {
                $this.loc2 = loc;
                var path = Editor.get("selected-path");
                var line = new IV.objects.Line({
                    path: path,
                    point1: $this.loc1,
                    point2: $this.loc2
                });
                Editor.doAddObject(line);
                $this.loc1 = null;
                $this.loc2 = null;
                sA = Editor.status.start()
                    .add("Line: ")
                    .append("A: [please select]");
            }
        }, "tools:Line");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Line");
    }
};

Tools.Arc = {
    onActive: function() {
        var $this = this;
        $this.loc1 = null;
        $this.loc2 = null;
        var sA = Editor.status.start()
            .add("Arc: ")
            .append("A: [please select]");

        Tools.beginSelectLocation(function(loc) {
            if(!$this.loc1) {
                $this.loc1 = loc;
                sA.set("A: " + loc.type);
                Editor.status.append("B: [please select]");
                return;
            } else {
                $this.loc2 = loc;
                var path = Editor.get("selected-path");
                var arc = new IV.objects.Arc({
                    path: path,
                    point1: $this.loc1,
                    point2: $this.loc2,
                    radius: new IV.objects.Plain(0.5)
                });
                Editor.doAddObject(arc);
                $this.loc1 = null;
                $this.loc2 = null;
                sA = Editor.status.start()
                    .add("Arc: ")
                    .append("A: [please select]");
            }
        }, "tools:Arc");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Arc");
    }
};

Tools.Bar = {
    onActive: function() {
        var $this = this;
        $this.loc1 = null;
        $this.loc2 = null;
        var sA = Editor.status.start()
            .add("Bar: ")
            .append("A: [please select]");

        Tools.beginSelectLocation(function(loc) {
            if(!$this.loc1) {
                $this.loc1 = loc;
                sA.set("A: " + loc.type);
                Editor.status.append("B: [please select]");
                return;
            } else {
                $this.loc2 = loc;
                var path = Editor.get("selected-path");
                var line = new IV.objects.Bar({
                    path: path,
                    point1: $this.loc1,
                    point2: $this.loc2,
                    width: new IV.objects.Plain(1)
                });
                Editor.doAddObject(line);
                $this.loc1 = null;
                $this.loc2 = null;
                sA = Editor.status.start()
                    .add("Bar: ")
                    .append("A: [please select]");
            }
        }, "tools:Bar");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Bar");
    }
};

Tools.Polyline = {
    onActive: function() {
        var $this = this;
        if($this.locs && $this.locs.length >= 2) {
            var path = Editor.get("selected-path");
            var line = new IV.objects.Polyline({
                path: path,
                points: $this.locs
            });
            Editor.doAddObject(line);
            $this.locs = [];
            sA = Editor.status.start()
                .add("Polyline: ")
                .append("1: [please select]");
        }
        $this.locs = [];
        var sA = Editor.status.start()
            .add("Polyline: ")
            .append("1: [please select]");

        Tools.beginSelectLocation(function(loc) {
            if(loc) {
                $this.locs.push(loc);
                sA.set($this.locs.length + ": " + loc.type);
                sA = Editor.status.append(($this.locs.length + 1) + ": [please select]");
            }
        }, "tools:Polyline");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Polyline");
    }
};


Tools.LineThrough = {
    onActive: function() {
        var $this = this;
        sA = Editor.status.start()
                .add("LinkThrough: ")
                .append("Points: [please select]");
        Tools.beginSelectLocation(function(loc) {
            var path = Editor.get("selected-path");
            if(true) {
                var line = new IV.objects.LineThrough({
                    path: path,
                    points: loc
                });
                Editor.doAddObject(line);
            }
        }, "tools:LineThrough");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:LineThrough");
    }
};

})();

// iVisDesigner - scripts/editor/tools/geometry.js
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

(function() {

Tools.LineIntersection = {
    onActive: function() {
        var obj1 = null;
        var obj2 = null;
        Editor.vis.clearSelection();

        var sA = Editor.status.start()
            .add("LineIntersection: ")
            .append("A: [please select]");

        var get_inner_object = function(context) {
            var current_component = Editor.get("current-component");
            if(current_component) {
                context = current_component.resolveSelection(context);
            }
            var ref_path = Editor.get("selected-reference");
            var refd_path = Editor.get("selected-reference-target");
            if(ref_path) return new IV.objects.ReferenceWrapper(ref_path, refd_path, context.obj);
            return context.obj;
        };

        Tools.beginSelectObject(function(context) {
            var path = Editor.get("selected-path");
            if(!context) {
                obj1 = null;
                obj2 = null;
                Editor.vis.clearSelection();
                sA = Editor.status.start()
                    .add("LineIntersection: ")
                    .append("A: [please select]");
                return;
            }
            if(!obj1) {
                obj1 = get_inner_object(context);
                Editor.vis.appendSelection(context);
                sA.set("A: " + obj1.type);
                Editor.status.append("B: [please select]");
            } else if(!obj2) {
                obj2 = get_inner_object(context);
                var is_line = function(t) {
                    if(t.type == "Line") return true;
                    if(t.type == "ReferenceWrapper") {
                        return is_line(t.obj);
                    }
                };
                if(is_line(obj1) && is_line(obj2)) {
                    var intersection = new IV.objects.LineIntersection(obj1, obj2);
                    var circle = new IV.objects.Circle({
                        path: intersection.getPath(),
                        center: intersection
                    });
                    Editor.doAddObject(circle);
                }
                obj1 = null;
                obj2 = null;
                Editor.vis.clearSelection();
                sA = Editor.status.start()
                    .add("LineIntersection: ")
                    .append("A: [please select]");
            }
        }, "tools:LineIntersection");
    },
    onInactive: function() {
        Tools.endSelectObject("tools:LineIntersection");
    }
};

})();

// iVisDesigner - scripts/editor/tools/component.js
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

(function() {

Tools.Component = {
    onActive: function() {
        var $this = this;
        IV.set("status", "Component: Select the center.");
        Tools.beginSelectLocation(function(loc) {
            var path = Editor.get("selected-path");
            if(path) {
                var circle = new IV.objects.Component({
                    path: path,
                    center: loc
                });
                Editor.doAddObject(circle);
            }
        }, "tools:Component");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Component");
    }
};

})();

// iVisDesigner - scripts/editor/tools/text.js
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

(function() {

Tools.Text = {
    onActive: function() {
        var $this = this;
        IV.set("status", "Text: Select the anchor.");
        Tools.beginSelectLocation(function(loc) {
            var path = Editor.get("selected-path");
            if(path) {
                var text = new IV.objects.Text({
                    path: path,
                    anchor: loc
                });
                Editor.doAddObject(text);
            }
        }, "tools:Text");
    },
    onInactive: function() {
        Tools.endSelectLocation("tools:Text");
    }
};

})();

// iVisDesigner - scripts/editor/tools/viewarea.js
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

(function() {

Tools.Move = {
    onActive: function() {
        var $this = this;
        IV.set("status", "Drag to move the canvas.");
        Tools.beginTrackMouse(function(e_down) {
            var p0 = e_down.page;
            var l0 = Editor.renderer.center.clone();
            e_down.move(function(e_move) {
                var p1 = e_move.page;
                Editor.renderer.setView(l0.add(new IV.Vector(p1.x - p0.x, p0.y - p1.y)), Editor.renderer.scale);
                Tools.triggerRender();
            });
        }, "tools:Move");
    },
    onInactive: function() {
        Tools.endTrackMouse("tools:Move");
    }
};

Tools.Zoom = {
    onActive: function() {
        var $this = this;
        IV.set("status", "Drag to zoom the canvas.");
        Tools.beginTrackMouse(function(e_down) {
            var y0 = e_down.page.y;
            var l0 = Editor.renderer.center.clone();
            var s0 = Editor.renderer.scale;
            var p0 = e_down.offset;
            e_down.move(function(e_move) {
                var new_scale = s0 * Math.exp((e_move.page.y - y0) / -200.0);
                if(new_scale > 500) new_scale = 500;
                if(new_scale < 1.0 / 500) new_scale = 1.0 / 500;
                Editor.renderer.setView(l0.add(p0.scale(s0 - new_scale)), new_scale);
                Tools.triggerRender();
            });
        }, "tools:Zoom");
    },
    onInactive: function() {
        Tools.endTrackMouse("tools:Zoom");
    }
};

Tools.Artboard = {
    onActive: function() {
        var $this = this;
        IV.set("status", "Drag to change the artboard.");
        Tools.beginTrackMouse(function(e_down) {
            e_down.move(function(e_move) {
                if(Editor.vis) {
                    Editor.vis.artboard = new IV.Rectangle(
                        Math.min(e_down.offset.x, e_move.offset.x), Math.min(e_down.offset.y, e_move.offset.y),
                        Math.abs(e_down.offset.x - e_move.offset.x), Math.abs(e_down.offset.y - e_move.offset.y)
                    );
                    Tools.triggerRender();
                }
            });
        }, "tools:Zoom");
    },
    onInactive: function() {
        Tools.endTrackMouse("tools:Zoom");
    }
};

})();

// iVisDesigner - scripts/editor/tools/moveelement.js
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

(function() {

Tools.MoveElement = {
    onActive: function() {
        var $this = this;
        if(Editor.vis) Editor.vis.clearSelection();
        Tools.triggerRender(["main", "back"]);
        IV.set("status", "Select element.");

        Tools.beginSelectObject(function(context, e_down) {
            if(context) {
                if(Editor.vis) {
                    Editor.vis.clearSelection();
                    Editor.vis.appendSelection(context);
                }
            } else {
                Editor.vis.clearSelection();
                return;
            }
            if(context.onMove) {
                var handle_r = function(r) {
                    if(!r) return;
                    if(r.trigger_render) Tools.triggerRender(r.trigger_render);
                };
                e_down.move(function(e_move) {
                    var p0 = e_down.offset;
                    var p1 = e_move.offset;
                    var r = context.onMove(p0, p1);
                    Tools.triggerRender("main,back,front,overlay");
                    handle_r(r);
                });
                e_down.release(function(e_release) {
                    var p0 = e_down.offset;
                    var p1 = e_release.offset;
                    if(context.onRelease) {
                        var r = context.onRelease(p0, p1);
                        handle_r(r);
                    }
                });
            }
        }, "tools:MoveElement", "move-element");
    },
    onInactive: function() {
        Tools.endSelectObject("tools:MoveElement");
    }
};

})();

// iVisDesigner - scripts/editor/tools/brushing.js
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

(function() {

Tools.Brushing = {
    onActive: function() {
        this.lasso = [];
        var $this = this;

        if(Editor.vis && Editor.data) {
            if(Editor.vis.selection.length != 1 || !Editor.vis.selection[0].obj.performBrushing) {
                Editor.vis.clearSelection();
                for(var i = 0; i < Editor.vis.objects.length; i++) {
                    var o = Editor.vis.objects[i];
                    if(o.performBrushing) {
                        var ctx = o.selectObject(Editor.data);
                        ctx.obj = o;
                        Editor.vis.appendSelection(ctx);
                        break;
                    }
                }
            }
        }

        Tools.beginTrackMouse(function(e) {
            $this.lasso.push(e.offset);

            e.move(function(e_move) {
                $this.lasso.push(e_move.offset);
                Tools.triggerRender("overlay");
            });
            e.release(function(e_release) {
                var lasso = $this.lasso;
                $this.lasso = [];
                Tools.triggerRender("overlay");
                if(Editor.vis) {
                    if(Editor.vis.selection.length == 1) {
                        var target = Editor.vis.selection[0].obj;
                        if(target.performBrushing) {
                            var r = Editor.vis.lassoObject(Editor.data, lasso, function(object, context) {
                                target.performBrushing(Editor.data, context);
                            });
                        }
                    }
                    Tools.triggerRender();
                }
            });
        }, "tools:Brushing");
    },
    renderOverlay: function(g) {
        if(this.lasso.length >= 3) {
            g.ivGuideLineWidth(2);
            g.beginPath();
            for(var i = 0; i < this.lasso.length; i++) {
                if(i == 0) g.moveTo(this.lasso[i].x, this.lasso[i].y);
                else g.lineTo(this.lasso[i].x, this.lasso[i].y);
            }
            g.closePath();
            g.strokeStyle = IV.colors.selection.toRGBA();
            g.fillStyle = IV.colors.selection.toRGBA(0.1);
            g.lineJoin = "round";
            g.fill();
            g.stroke();
        }
    },
    onInactive: function() {
        Tools.endTrackMouse("tools:Brushing");
    }
};

})();


IV.set("tools:current", "Select");

})();


// iVisDesigner - scripts/editor/panels/poseeditor.js
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

(function() {
    // Pose editor for Allosphere.
    // We assume normal = - ||center||, and up = 0, 0, 1
    var PoseEditor = function() {
        var self = this;

        this.canvas = document.createElement("canvas");

        var track_context = null;
        this._handlers = { };
        IV.trackMouseEvents($(this.canvas), {
            down: function(e) {
                var p = self.fromEventCoordinates(e);
                for(var i in self._handlers) {
                    if(self._handlers[i]) {
                        track_context = self._handlers[i](p);
                        if(track_context) return;
                    }
                }
            },
            move: function(e) {
                var p = self.fromEventCoordinates(e);
                if(track_context) {
                    track_context.move(p);
                }
            },
            up: function() { track_context = null; }
        });

        this.resize(100, 100);

        this.setPose({
            center: new IV.Vector3(1, 0, 0),
            normal: new IV.Vector3(-1, 0, 0),
            up: new IV.Vector3(0, 0, 1),
            width: 0.5
        });
    };

    IV.PoseEditor = PoseEditor;

    var sphere_center = { x: 65, y: 55 };
    var sphere_spacing = 5;
    var sphere_radius = 40;
    var handle_size = 10;
    var altitude_center = { x: 130, y: 55 };
    var distance_slider_y = 130
    var distance_slider_begin = 10;
    var distance_slider_end = 190;
    var distance_slider_size = 6;
    var distance_max = 10;

    var width_slider_y = 160
    var width_slider_begin = 10;
    var width_slider_end = 190;
    var width_slider_size = 6;
    var width_max = 10;

    PoseEditor.prototype.fromEventCoordinates = function(e) {
        var x = e.pageX - $(this.canvas).offset().left;
        var y = e.pageY - $(this.canvas).offset().top;
        var w = this.width;
        var h = this.height;
        var r = { x: x / w * 200, y : y / w * 200 };
        return r;
    };

    PoseEditor.prototype.resize = function(w, h) {
        this.ratio = IV.getOptimalRatio();
        this.width = w;
        this.height = h;
        this.canvas.width = w * this.ratio;
        this.canvas.height = h * this.ratio;
        $(this.canvas).css("width", w + "px");
        $(this.canvas).css("height", h + "px");

        this.render();
    };

    PoseEditor.prototype.render = function() {
        var self = this;
        var ctx = this.canvas.getContext("2d");
        var w = this.width;
        var h = this.height;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.save();

        ctx.scale(this.ratio, this.ratio);
        ctx.scale(w / 200, h / 200);

        ctx.save();

        ctx.strokeStyle = IV.colors.foreground.toRGBA();

        // Draw allosphere.
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sphere_center.x + sphere_spacing, sphere_center.y, sphere_radius, -0.5 * Math.PI, 0.5 * Math.PI);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sphere_center.x - sphere_spacing, sphere_center.y, sphere_radius, 0.5 * Math.PI, 1.5 * Math.PI);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(altitude_center.x, altitude_center.y, sphere_radius, -0.5 * Math.PI, 0.5 * Math.PI);
        ctx.closePath();
        ctx.stroke();

        (function() {
            var radius = sphere_radius + handle_size * 1.2;
            var pos_x = sphere_center.x + radius * Math.cos(-self.phi);
            var pos_y = sphere_center.y + radius * Math.sin(-self.phi);
            ctx.save();
            ctx.translate(pos_x, pos_y);
            ctx.rotate(-self.phi);
            ctx.beginPath();
            ctx.moveTo(0, +handle_size);
            ctx.lineTo(0, -handle_size);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
            self._handlers.phi = function(p) {
                if((p.x - pos_x) * (p.x - pos_x) + (p.y - pos_y) * (p.y - pos_y) < handle_size * handle_size) {
                    return {
                        move: function(p2) {
                            self.phi = -Math.atan2(p2.y - sphere_center.y, p2.x - sphere_center.x);
                            self.render();
                            self._raise();
                        }
                    };
                }
                return null;
            };
        })();

        (function() {
            var radius = sphere_radius + handle_size;
            var pos_x = altitude_center.x + radius * Math.cos(-self.theta);
            var pos_y = altitude_center.y + radius * Math.sin(-self.theta);
            ctx.save();
            ctx.translate(pos_x, pos_y);
            ctx.rotate(-self.theta);
            ctx.beginPath();
            ctx.moveTo(0, +handle_size);
            ctx.lineTo(0, -handle_size);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
            self._handlers.theta = function(p) {
                if((p.x - pos_x) * (p.x - pos_x) + (p.y - pos_y) * (p.y - pos_y) < handle_size * handle_size) {
                    return {
                        move: function(p2) {
                            self.theta = -Math.atan2(p2.y - altitude_center.y, p2.x - altitude_center.x);
                            var max_allowed = Math.PI / 2 * 0.9;
                            if(self.theta < -max_allowed) self.theta = -max_allowed;
                            if(self.theta > max_allowed) self.theta = max_allowed;
                            self.render();
                            self._raise();
                        }
                    };
                }
                return null;
            };
        })();

        (function() {
            ctx.beginPath();
            ctx.moveTo(distance_slider_begin, distance_slider_y);
            ctx.lineTo(distance_slider_end, distance_slider_y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = IV.colors.foreground.toRGBA();
            ctx.fillStyle = IV.colors.foreground.toRGBA();
            ctx.stroke();
            var pos_x = self.distance / distance_max * (distance_slider_end - distance_slider_begin) + distance_slider_begin;
            ctx.beginPath();
            ctx.arc(pos_x, distance_slider_y, distance_slider_size, 0, Math.PI * 2);
            ctx.fillStyle = IV.colors.foreground.toRGBA();
            ctx.fill();

            ctx.fillText("Distance", distance_slider_begin, distance_slider_y - distance_slider_size - 4);

            self._handlers.distance = function(p) {
                if((p.x - pos_x) * (p.x - pos_x) + (p.y - distance_slider_y) * (p.y - distance_slider_y) < distance_slider_size * distance_slider_size) {
                    return {
                        move: function(p2) {
                            self.distance = (p2.x - distance_slider_begin) / (distance_slider_end - distance_slider_begin) * distance_max;
                            if(self.distance > distance_max) self.distance = distance;
                            if(self.distance < 1e-2) self.distance = 1e-2;
                            self.render();
                            self._raise();
                        }
                    };
                }
            }
        })();

        (function() {
            ctx.beginPath();
            ctx.moveTo(width_slider_begin, width_slider_y);
            ctx.lineTo(width_slider_end, width_slider_y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = IV.colors.foreground.toRGBA();
            ctx.fillStyle = IV.colors.foreground.toRGBA();
            ctx.stroke();
            var pos_x = self.texture_width / width_max * (width_slider_end - width_slider_begin) + width_slider_begin;
            ctx.beginPath();
            ctx.arc(pos_x, width_slider_y, width_slider_size, 0, Math.PI * 2);
            ctx.fillStyle = IV.colors.foreground.toRGBA();
            ctx.fill();

            ctx.fillText("Width", width_slider_begin, width_slider_y - width_slider_size - 4);

            self._handlers.width = function(p) {
                if((p.x - pos_x) * (p.x - pos_x) + (p.y - width_slider_y) * (p.y - width_slider_y) < width_slider_size * width_slider_size) {
                    return {
                        move: function(p2) {
                            self.texture_width = (p2.x - width_slider_begin) / (width_slider_end - width_slider_begin) * width_max;
                            if(self.texture_width > width_max) self.texture_width = width_max;
                            if(self.texture_width < 1e-2) self.texture_width = 1e-2;
                            self.render();
                            self._raise();
                        }
                    };
                }
            }
        })();

        ctx.restore();

        ctx.restore();
    };

    PoseEditor.prototype.setPose = function(pose) {
        this.pose = pose;
        this._updateAngles();
        this.render();
    };

    PoseEditor.prototype._raise = function() {
        this.pose.center = new IV.Vector3(
            this.distance * Math.cos(this.phi) * Math.cos(this.theta),
            this.distance * Math.sin(this.phi) * Math.cos(this.theta),
            this.distance * Math.sin(this.theta)
        );
        this.pose.normal = this.pose.center.normalize().scale(-1);
        this.pose.width = this.texture_width;
        if(this.onPoseChanged) {
            this.onPoseChanged({
                center: this.pose.center,
                normal: this.pose.normal,
                up: this.pose.up,
                width: this.pose.width
            });
        }
    };

    PoseEditor.prototype._updateAngles = function() {
        var pose = this.pose;
        pose.normal = pose.center.normalize().scale(-1);
        this.phi = Math.atan2(pose.center.y, pose.center.x);
        this.theta = Math.atan2(pose.center.z, Math.sqrt(pose.center.x * pose.center.x + pose.center.y * pose.center.y));
        this.distance = pose.center.length();
        this.texture_width = pose.width;
    };


    Editor.pose_editor = new IV.PoseEditor();
    $("#pose-view").append($(Editor.pose_editor.canvas));
    Editor.pose_editor.resize(198, 198);

})();


// iVisDesigner - scripts/editor/actionmanager.js
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

var Actions = new IV.ActionManager();
Editor.actions = Actions;

Actions.bind("perform", function(actions) {
    if(IV.allosphere) IV.allosphere.sync.perform(actions);
});

IV.on("command:editor.undo", function() {
    Actions.undo();
    Editor.renderer.trigger();
    Editor.renderer.render();
});

IV.on("command:editor.redo", function() {
    Actions.redo();
    Editor.renderer.trigger();
    Editor.renderer.render();
});


Editor.setData = function(data) {
    Editor.data = data;
    Editor.renderer.setData(Editor.data);
    Editor.schema = data.getSchema();
    Editor.computeDataStatistics();
    Editor.renderDataSchema(Editor.schema);
    data.bind("update", function() {
        Editor.computeDataStatistics();
        Editor.renderDataSchema(Editor.schema);
        if(Editor.vis) Editor.vis.validate(data);
        Editor.renderer.trigger();
        Editor.renderer.render();
    });
    if(Editor.vis) {
        Editor.vis.data = Editor.data;
    }
};

Editor.setWorkspace = function(w) {
    Editor.unsetWorkspace();
    Editor.workspace = w;
    if(w.default_canvas) {
        Editor.workspaceSwitchCanvas(w.default_canvas);
    }
    Editor.renderWorkspaceMenu();
    if(IV.allosphere) IV.allosphere.sync.startup();
};

Editor.unsetWorkspace = function() {
    Editor.unsetVisualization();
    Editor.workspace = null;
};

Editor.workspaceSwitchCanvas = function(canvas) {
    Editor.setVisualization(canvas.visualization);
    Editor.workspace.default_canvas = canvas;
    Editor.pose_editor.setPose(canvas.pose);
    Editor._tmp_onUpdatePose = function() {
        Editor.pose_editor.setPose(canvas.pose);
    };
    if(canvas.visualization.background) {
        $("#view").css("background-color", canvas.visualization.background.toRGBA());
    } else {
        $("#view").css("background-color", IV.colors.background);
    }
    $("#pose-color-selector").IVColorPicker(canvas.visualization.background ? canvas.visualization.background : IV.colors.background);
    $("#pose-color-selector").data().changed = function(value) {
        Editor.actions.add(new IV.actions.SetDirectly(canvas.visualization, "background", value));
        Editor.actions.commit();
        if(canvas.visualization.background) {
            $("#view").css("background-color", canvas.visualization.background.toRGBA());
        } else {
            $("#view").css("background-color", IV.colors.background);
        }
    };
    Editor.pose_editor.onPoseChanged = function(pose) {
        Editor.actions.add(new IV.actions.SetDirectly(canvas, "pose", pose));
        Editor.actions.commit();
    };
    Editor.renderWorkspaceMenu();
};

Editor.setVisualization = function(vis) {
    Editor.unsetVisualization();
    Editor.vis = vis;
    if(Editor.data) {
        Editor.vis.data = Editor.data;
    }
    Editor.renderer.setVisualization(vis);
    this.vis_listener = {
        objects: function() {
            Editor.raise("objects");
            Editor.renderer.trigger();
            Editor.renderer.render();
        },
        selection: function() {
            Editor.raise("selection");
            Editor.renderer.trigger();
            Editor.renderer.render();
        }
    };
    vis.bind("objects", this.vis_listener.objects);
    vis.bind("selection", this.vis_listener.selection);

    Editor.raise("reset");
};

Editor.unsetVisualization = function() {
    if(Editor.vis) {
        Editor.vis.unbind("objects", this.vis_listener.objects);
        Editor.vis.unbind("selection", this.vis_listener.selection);
        Editor.renderer.setVisualization(null);
        Editor.vis = null;
        Editor.raise("reset");
    }
};

Editor.component_stack = [];
Editor.beginEditingComponent = function(path, context, component_vis) {
    Editor.component_stack.push({
        data: Editor.data,
        vis: Editor.vis,
        render_config: Editor.renderer.getConfig()
    });
    Editor.component_path = path;
    Editor.setData(Editor.data.createSubset(path, context));
    Editor.setVisualization(component_vis);
    Editor.raise("reset");
};
Editor.endEditingComponent = function() {
    var item = Editor.component_stack.pop();
    if(item) {
        Editor.setData(item.data);
        Editor.setVisualization(item.vis);
        Editor.renderer.setConfig(item.render_config);
        Editor.raise("reset");
    }
};

Editor.computePathStatistics = function(path) {
    return Editor.data.computeFullStatistics(path);
};

Editor.bind("reset", function() {
    Editor.raise("selection");
    Editor.raise("objects");

    Editor.set("selected-path", new IV.Path());
    Editor.set("selected-reference", null);

    Editor.set("current-component", null);

    if(Editor.vis)
        Editor.renderer.autoView(Editor.vis);
    Editor.renderer.trigger();
    Editor.renderer.render();
    if(Editor.component_stack.length > 0) {
        $('[data-for="component-view"]').show();
    } else {
        $('[data-for="component-view"]').hide();
    }
});

IV.set("visible-guide", true);
IV.set("visible-grid", false);
IV.set("render-2x", IV.getOptimalRatio() == 2);
IV.set("colormode-black", false);

IV.listen("visible-guide", function(val) {
    Editor.renderer.show_guide = val;
    Editor.renderer.trigger();
    Editor.renderer.render();
});

IV.listen("visible-grid", function(val) {
    Editor.renderer.frame_origin = val;
    Editor.renderer.frame_grid = val;
    Editor.renderer.trigger();
    Editor.renderer.render();
});

IV.listen("colormode-black", function(val) {
    if(val) {
        IV.colors = IV.colors_black;
        $("[data-href-black]").each(function() {
            $(this).attr("href", $(this).attr("data-href-black"));
        });
    } else {
        IV.colors = IV.colors_white;
        $("[data-href-black]").each(function() {
            $(this).attr("href", $(this).attr("data-href-white"));
        });
    }
    Editor.pose_editor.render();
    Editor.renderer.trigger();
    Editor.renderer.render();
});


IV.listen("render-2x", function(val) {
    if(val) {
        Editor.renderer.manager.setResolutionRatio(2);
    } else {
        Editor.renderer.manager.setResolutionRatio(1);
    }
    Editor.renderer.trigger();
    Editor.renderer.render();
});

setInterval(function() {
    if(Editor.vis && Editor.data) {
        Editor.vis.timerTick(Editor.data);
        Editor.vis.triggerRenderer(Editor.renderer);
        Editor.renderer.render();
    }
}, 30);

Editor.exportBitmap = function(scale) {
    if(!scale) scale = 2; // default as 2x

    var vis = Editor.vis;
    var data = Editor.data;

    var manager = new IV.CanvasManager(Math.ceil(vis.artboard.width), Math.ceil(vis.artboard.height));
    var add_canvas = function() {
        var c = document.createElement("canvas");
        return c;
    };

    manager.add("main", add_canvas());
    manager.add("front", add_canvas());
    manager.add("back", add_canvas());
    manager.add("overlay", add_canvas());
    manager.setResolutionRatio(scale);


    var renderer = new IV.Renderer();
    renderer.setCanvasManager(manager);
    renderer.setData(data);
    renderer.setVisualization(vis);

    renderer.frame_grid = false;
    renderer.show_guide = false;
    renderer.autoView(vis);

    renderer.trigger();
    renderer.render();

    var back = manager.get("back");
    var ctx = back.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(manager.get("main"), 0, 0);
    ctx.drawImage(manager.get("front"), 0, 0);
    return back.toDataURL("image/png");
};

IV.on("command:toolkit.export.svg", function() {
    var svg = Editor.renderer.renderSVG();
    IV.downloadFile(svg, "image/svg", "ivisdesigner.svg");
});
IV.on("command:toolkit.export.bitmap", function() {
    var bmp_base64 = Editor.renderer.renderBitmap(2);
    IV.downloadFile(bmp_base64, "image/png", "ivisdesigner.png", "base64");
});

})();

// iVisDesigner - scripts/toolkit.js
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

IV.config = $.extend({
    key: "defualt"
}, IV_Config);

// Data provider

// iVisDesigner - scripts/client/client.js
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

(function() {

// iVisDesigner - scripts/client/utils.js
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

var generate_pagination = function(element, page_index, page_size, data, callback) {
    element.children().remove();
    var page_count = Math.ceil(data.count / page_size);
    if(data.count == 0 || page_count == 1) return;
    if(data.previous) {
        element.append(IV._E("span", "prev").text("«").click(function() {
            callback(page_index - 1);
        }));
    } else {
        element.append(IV._E("span", "prev disabled").text("«"));
    }

    for(var i = 1; i <= page_count; i++) {
        (function(i) {
            var s = IV._E("span", "number").text(i).click(function() {
                callback(i);
            });
            if(i == page_index) {
                s.addClass("active");
            }
            element.append(IV._E("span").text(" "));
            element.append(s);
        })(i);
    }
    element.append(IV._E("span").text(" "));
    if(data.next) {
        element.append(IV._E("span", "next").text("»").click(function() {
            callback(page_index + 1);
        }));
    } else {
        element.append(IV._E("span", "next disabled").text("»"));
    }
};

// iVisDesigner - scripts/client/saveload.js
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

IV.on("command:toolkit.instant", function() {
    var ctx = IV.modals.constructModal({
        html: IV.strings("modal_instant_dataset"),
        title: "Instant Dataset",
        width: $(window).width() * 0.6,
        height: $(window).height() * 0.8
    });
    ctx.i_content.height($(window).height() * 0.8 - 200);
    ctx.i_datasample.append($("<option />").attr("value", "null").text("select sample data"));
    IV_SAMPLE_DATASETS.forEach(function(data) {
        ctx.i_datasample.append($("<option />").attr("value", data.name).text(data.name));
    });
    ctx.i_datasample.on("change", function() {
        IV_SAMPLE_DATASETS.forEach(function(data) {
            if(data.name == ctx.i_datasample.val()) {
                ctx.i_content.val(data.yaml);
                ctx.i_datatype.val("yaml");
            }
        });
    });
    ctx.open.click(function() {
        var data;
        if(ctx.i_datatype.val() == "csv") {
            data = d3.csv.parse(ctx.i_content.val());
            var schema = {
                type: "object",
                fields: {
                    rows: {
                        type: "collection",
                        fields: { }
                    }
                }
            };
            for(var field in data[0]) {
                if(data[0].hasOwnProperty(field)) {
                    var type = "string";
                    var is_number = true;
                    data.forEach(function(d) {
                        var num = d[field];
                        try {
                            var val = parseFloat(num);
                            if(val != val) is_number = false;
                        } catch(e) { is_number = false; }
                    });
                    if(is_number) type = "number";
                    if(type == "number") {
                        data.forEach(function(d) {
                            var num = d[field];
                            d[field] = parseFloat(num);
                        });
                    }
                    schema.fields.rows.fields[field] = { type: type };
                }
            }
            data = { "rows": data };
            console.log(data, schema);

            var ds = new IV.PlainDataset(data, schema);
            IV.loadVisualization();
            IV.data = new IV.DataObject(ds.obj, ds.schema);
            IV.editor.setData(IV.data);
            IV.newVisualization();
            ctx.close();
        }
        if(ctx.i_datatype.val() == "yaml") {
            data = jsyaml.load(ctx.i_content.val());
            var ds = new IV.PlainDataset(data.data, data.schema);
            IV.loadVisualization();
            IV.data = new IV.DataObject(ds.obj, ds.schema);
            IV.editor.setData(IV.data);
            IV.newVisualization();
            ctx.close();
        }
    });
});



})();


IV.loadVisualization = function(vis) {
    if(!vis) {
        IV.editor.unsetVisualization();
        IV.editor.unsetWorkspace();
    } else {
        var workspace = vis;
        if(vis instanceof IV.Visualization) {
            IV.editor.setVisualization(vis);
            workspace = new IV.Workspace();
            var canvas = {
                name: "Canvas1",
                visualization: vis
            };
            workspace.addCanvas(canvas);
            workspace.default_canvas = canvas;
        }
        IV.editor.setWorkspace(workspace);
    }
};

IV.newVisualization = function() {
    // Just construct one for testing.
    var workspace = new IV.Workspace();
    workspace.addCanvas();
    IV.editor.setWorkspace(workspace);
};

// ------------------------------------------------------------------------
// System Initialization
// ------------------------------------------------------------------------
function browserTest() {
    if(!document.createElement("canvas").getContext) return false;
    return true;
}

IV.user = null;

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "Really want to exit iVisDesigner?";
  (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  return confirmationMessage;                                //Webkit, Safari, Chrome etc.
});

$(window).ready(function() {
    if(!browserTest()) return;
    // Remove the loading indicator.
    $("#system-loading").remove();
    IV.raise("initialize:before");
    IV.raise("initialize");
    IV.raise("initialize:after");
});


// iVisDesigner - scripts/test.js
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

RENDER_TIME = function() {
    var t0 = new Date().getTime();
    for(var i = 0; i < 100; i++) {
        IV.editor.renderer.trigger("main");
        IV.editor.renderer.render();
    }
    console.log("Render time: ", (new Date().getTime() - t0) / 100);
};

PERFORMANCE_TEST = function() {
    var track1 = new IV.objects.Track({
        path: new IV.Path("[cars]:mpg"),
        anchor1: new IV.objects.Plain(new IV.Vector(0, 0)),
        anchor2: new IV.objects.Plain(new IV.Vector(0, 200)),
        min: new IV.objects.Plain(8),
        max: new IV.objects.Plain(50)
    });
    track1.tick_style.show_ticks = false;
    IV.editor.doAddObject(track1);
    var track2 = new IV.objects.Track({
        path: new IV.Path("[cars]:displacement"),
        anchor1: new IV.objects.Plain(new IV.Vector(0, 0)),
        anchor2: new IV.objects.Plain(new IV.Vector(200, 0)),
        min: new IV.objects.Plain(60),
        max: new IV.objects.Plain(460)
    });
    track2.tick_style.show_ticks = false;
    IV.editor.doAddObject(track2);
    var scatter = new IV.objects.Scatter({
        track1: track1,
        track2: track2
    });
    IV.editor.doAddObject(scatter);
    var circle = new IV.objects.Circle({
        path: new IV.Path("[cars]"),
        center: scatter,
        radius: new IV.objects.Plain(5)
    });
    IV.editor.doAddObject(circle);
    IV.editor.vis.clearSelection();
    IV.editor.renderer.render();
    var t0 = new Date().getTime();
    for(var i = 0; i < 100; i++) {
        IV.editor.renderer.trigger("main");
        IV.editor.renderer.render();
    }
    console.log("Render time: ", (new Date().getTime() - t0) / 100);

    var ratio = IV.getOptimalRatio();
    var canvas = document.createElement("canvas");
    var w = $(window).width();
    var h = $(window).height();
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    console.log(canvas.width, canvas.height);
    var t0 = new Date().getTime();
    for(var trail = 0; trail < 100; trail++) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, w, h);
        ctx.scale(ratio, ratio);
        ctx.translate(10, 10);
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 200);
        ctx.stroke();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 0);
        ctx.stroke();
        IV.editor.data.root.cars.forEach(function(car) {
            ctx.beginPath();
            var x = (car.mpg - 8) / (50 - 8) * 200;
            var y = (car.displacement - 60) / (460 - 60) * 200;
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "gray";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        });
        ctx.restore();
    }
    console.log("Simple time: ", (new Date().getTime() - t0) / 100);

    for(var trail = 0; trail < 100; trail++) {
        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        svg.selectAll("circle")
           .data(IV.editor.data.root.cars)
           .enter()
           .append("circle")
           .attr("cx", function(car) {
                return (car.mpg - 8) / (50 - 8) * 200;
           })
           .attr("cy", function(car) {
                return (car.displacement - 60) / (460 - 60) * 200;
           })
           .attr("r", 5);
        svg.remove();
    }
    console.log("D3 time: ", (new Date().getTime() - t0) / 100);
};

PERFORMANCE_TEST2 = function() {
    var track1 = new IV.objects.Track({
        path: new IV.Path("[cars]:mpg"),
        anchor1: new IV.objects.Plain(new IV.Vector(0, 0)),
        anchor2: new IV.objects.Plain(new IV.Vector(0, 200)),
        min: new IV.objects.Plain(8),
        max: new IV.objects.Plain(50)
    });
    track1.tick_style.show_ticks = false;
    IV.editor.doAddObject(track1);
    var track2 = new IV.objects.Track({
        path: new IV.Path("[cars]:displacement"),
        anchor1: new IV.objects.Plain(new IV.Vector(0, 0)),
        anchor2: new IV.objects.Plain(new IV.Vector(200, 0)),
        min: new IV.objects.Plain(60),
        max: new IV.objects.Plain(460)
    });
    track2.tick_style.show_ticks = false;
    IV.editor.doAddObject(track2);
    var scatter = new IV.objects.Scatter({
        track1: track1,
        track2: track2
    });
    IV.editor.doAddObject(scatter);
    var circle = new IV.objects.Circle({
        path: new IV.Path("[cars]"),
        center: scatter,
        radius: new IV.objects.NumberLinear(new IV.Path("[cars]:cylinders"), 1, 5, 0, 8)
    });
    IV.editor.doAddObject(circle);
    IV.editor.vis.clearSelection();
    IV.editor.renderer.render();
    var t0 = new Date().getTime();
    for(var i = 0; i < 100; i++) {
        IV.editor.renderer.trigger("main");
        IV.editor.renderer.render();
    }
    console.log("Render time: ", (new Date().getTime() - t0) / 100);

    var ratio = IV.getOptimalRatio();
    var canvas = document.createElement("canvas");
    var w = $(window).width();
    var h = $(window).height();
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    console.log(canvas.width, canvas.height);
    var t0 = new Date().getTime();
    for(var trail = 0; trail < 100; trail++) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, w, h);
        ctx.scale(ratio, ratio);
        ctx.translate(10, 10);
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 200);
        ctx.stroke();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 0);
        ctx.stroke();
        IV.editor.data.root.cars.forEach(function(car) {
            ctx.beginPath();
            var x = (car.mpg - 8) / (50 - 8) * 200;
            var y = (car.displacement - 60) / (460 - 60) * 200;
            ctx.arc(x, y, car.cylinders / 8 * 4 + 1, 0, Math.PI * 2);
            ctx.fillStyle = "gray";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        });
        ctx.restore();
    }
    console.log("Simple time: ", (new Date().getTime() - t0) / 100);

    for(var trail = 0; trail < 100; trail++) {
        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        svg.selectAll("circle")
           .data(IV.editor.data.root.cars)
           .enter()
           .append("circle")
           .attr("cx", function(car) {
                return (car.mpg - 8) / (50 - 8) * 200;
           })
           .attr("cy", function(car) {
                return (car.displacement - 60) / (460 - 60) * 200;
           })
           .attr("r", function(car) {
                return (car.cylinders) / 8 * 4 + 1;
           });
        svg.remove();
    }
    console.log("D3 time: ", (new Date().getTime() - t0) / 100);
};

PERFORMANCE_TEST3 = function() {
    var track1 = new IV.objects.Track({
        path: new IV.Path("[days]:day"),
        anchor1: new IV.objects.Plain(new IV.Vector(0, 0)),
        anchor2: new IV.objects.Plain(new IV.Vector(0, 200)),
        min: new IV.objects.Plain(0),
        max: new IV.objects.Plain(114)
    });
    track1.tick_style.show_ticks = false;
    IV.editor.doAddObject(track1);
    var track2 = new IV.objects.Track({
        path: new IV.Path("[days]:min"),
        anchor1: new IV.objects.Plain(new IV.Vector(0, 0)),
        anchor2: new IV.objects.Plain(new IV.Vector(200, 0)),
        min: new IV.objects.Plain(40),
        max: new IV.objects.Plain(90)
    });
    track2.tick_style.show_ticks = false;
    IV.editor.doAddObject(track2);
    var scatter = new IV.objects.Scatter({
        track1: track1,
        track2: track2
    });
    IV.editor.doAddObject(scatter);
    var line = new IV.objects.LineThrough({
        path: new IV.Path(""),
        points: scatter,
    });
    IV.editor.doAddObject(line);
    IV.editor.vis.clearSelection();
    IV.editor.renderer.render();
    var t0 = new Date().getTime();
    for(var i = 0; i < 1000; i++) {
        IV.editor.renderer.trigger("main");
        IV.editor.renderer.render();
    }
    console.log("Render time: ", (new Date().getTime() - t0) / 1000);

    var ratio = IV.getOptimalRatio();
    var canvas = document.createElement("canvas");
    var w = $(window).width();
    var h = $(window).height();
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    console.log(canvas.width, canvas.height);
    var t0 = new Date().getTime();
    for(var trail = 0; trail < 1000; trail++) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, w, h);
        ctx.scale(ratio, ratio);
        ctx.translate(10, 10);
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 200);
        ctx.stroke();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 0);
        ctx.stroke();
        var first = true;
        ctx.beginPath();
        IV.editor.data.root.days.forEach(function(day) {

            var x = (day.day - 0) / (114 - 0) * 200;
            var y = (day.min - 40) / (90 - 40) * 200;
            if(first) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            first = false;
        });
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    console.log("Simple time: ", (new Date().getTime() - t0) / 1000);
    window.open(canvas.toDataURL());

    for(var trail = 0; trail < 100; trail++) {
        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        var line = d3.svg.line()
            .x(function(day) { return (day.day - 0) / (114 - 0) * 200; })
            .y(function(day) { return (day.min - 40) / (90 - 40) * 200; });
        svg.append("path")
          .datum(IV.editor.data.root.days)
          .attr("class", "line")
          .attr("d", line);
        svg.remove();
    }
    console.log("D3 time: ", (new Date().getTime() - t0) / 100);

};



var IV_SAMPLE_DATASETS = [
  {
    "yaml": "schema:\n  type: object\n  fields:\n    cars:\n      type: collection\n      fields:\n        name: { type: string }\n        mpg: { type: number, min: 0, max: 50 }\n        cylinders: { type: number, min: 3, max: 8 }\n        displacement: { type: number, min: 0, max: 500 }\n        horsepower: { type: number, min: 0, max: 250 }\n        acceleration: { type: number, min: 0, max: 30 }\n        modelyear: { type: number, min: 70, max: 82 }\n        origin: { type: number, min: 1, max: 3 }\ndata:\n  cars:\n      - _id: chevrolet_chevelle_malibu\n        name: chevrolet_chevelle_malibu\n        mpg: 18\n        cylinders: 8\n        displacement: 307\n        horsepower: 130\n        weight: 3504\n        acceleration: 12\n        modelyear: 70\n        origin: 1\n\n      - _id: buick_skylark_320\n        name: buick_skylark_320\n        mpg: 15\n        cylinders: 8\n        displacement: 350\n        horsepower: 165\n        weight: 3693\n        acceleration: 11.5\n        modelyear: 70\n        origin: 1\n\n      - _id: plymouth_satellite\n        name: plymouth_satellite\n        mpg: 18\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 3436\n        acceleration: 11\n        modelyear: 70\n        origin: 1\n\n      - _id: amc_rebel_sst\n        name: amc_rebel_sst\n        mpg: 16\n        cylinders: 8\n        displacement: 304\n        horsepower: 150\n        weight: 3433\n        acceleration: 12\n        modelyear: 70\n        origin: 1\n\n      - _id: ford_torino\n        name: ford_torino\n        mpg: 17\n        cylinders: 8\n        displacement: 302\n        horsepower: 140\n        weight: 3449\n        acceleration: 10.5\n        modelyear: 70\n        origin: 1\n\n      - _id: ford_galaxie_500\n        name: ford_galaxie_500\n        mpg: 15\n        cylinders: 8\n        displacement: 429\n        horsepower: 198\n        weight: 4341\n        acceleration: 10\n        modelyear: 70\n        origin: 1\n\n      - _id: chevrolet_impala\n        name: chevrolet_impala\n        mpg: 14\n        cylinders: 8\n        displacement: 454\n        horsepower: 220\n        weight: 4354\n        acceleration: 9\n        modelyear: 70\n        origin: 1\n\n      - _id: plymouth_fury_iii\n        name: plymouth_fury_iii\n        mpg: 14\n        cylinders: 8\n        displacement: 440\n        horsepower: 215\n        weight: 4312\n        acceleration: 8.5\n        modelyear: 70\n        origin: 1\n\n      - _id: pontiac_catalina\n        name: pontiac_catalina\n        mpg: 14\n        cylinders: 8\n        displacement: 455\n        horsepower: 225\n        weight: 4425\n        acceleration: 10\n        modelyear: 70\n        origin: 1\n\n      - _id: amc_ambassador_dpl\n        name: amc_ambassador_dpl\n        mpg: 15\n        cylinders: 8\n        displacement: 390\n        horsepower: 190\n        weight: 3850\n        acceleration: 8.5\n        modelyear: 70\n        origin: 1\n\n      - _id: citroen_ds21_pallas\n        name: citroen_ds21_pallas\n        mpg: 47\n        cylinders: 4\n        displacement: 133\n        horsepower: 115\n        weight: 3090\n        acceleration: 17.5\n        modelyear: 70\n        origin: 2\n\n      - _id: chevrolet_chevelle_concours_(sw)\n        name: chevrolet_chevelle_concours_(sw)\n        mpg: 47\n        cylinders: 8\n        displacement: 350\n        horsepower: 165\n        weight: 4142\n        acceleration: 11.5\n        modelyear: 70\n        origin: 1\n\n      - _id: ford_torino_(sw)\n        name: ford_torino_(sw)\n        mpg: 47\n        cylinders: 8\n        displacement: 351\n        horsepower: 153\n        weight: 4034\n        acceleration: 11\n        modelyear: 70\n        origin: 1\n\n      - _id: plymouth_satellite_(sw)\n        name: plymouth_satellite_(sw)\n        mpg: 47\n        cylinders: 8\n        displacement: 383\n        horsepower: 175\n        weight: 4166\n        acceleration: 10.5\n        modelyear: 70\n        origin: 1\n\n      - _id: amc_rebel_sst_(sw)\n        name: amc_rebel_sst_(sw)\n        mpg: 47\n        cylinders: 8\n        displacement: 360\n        horsepower: 175\n        weight: 3850\n        acceleration: 11\n        modelyear: 70\n        origin: 1\n\n      - _id: dodge_challenger_se\n        name: dodge_challenger_se\n        mpg: 15\n        cylinders: 8\n        displacement: 383\n        horsepower: 170\n        weight: 3563\n        acceleration: 10\n        modelyear: 70\n        origin: 1\n\n      - _id: plymouth_'cuda_340\n        name: plymouth_'cuda_340\n        mpg: 14\n        cylinders: 8\n        displacement: 340\n        horsepower: 160\n        weight: 3609\n        acceleration: 8\n        modelyear: 70\n        origin: 1\n\n      - _id: ford_mustang_boss_302\n        name: ford_mustang_boss_302\n        mpg: 47\n        cylinders: 8\n        displacement: 302\n        horsepower: 140\n        weight: 3353\n        acceleration: 8\n        modelyear: 70\n        origin: 1\n\n      - _id: chevrolet_monte_carlo\n        name: chevrolet_monte_carlo\n        mpg: 15\n        cylinders: 8\n        displacement: 400\n        horsepower: 150\n        weight: 3761\n        acceleration: 9.5\n        modelyear: 70\n        origin: 1\n\n      - _id: buick_estate_wagon_(sw)\n        name: buick_estate_wagon_(sw)\n        mpg: 14\n        cylinders: 8\n        displacement: 455\n        horsepower: 225\n        weight: 3086\n        acceleration: 10\n        modelyear: 70\n        origin: 1\n\n      - _id: toyota_corona_mark_ii\n        name: toyota_corona_mark_ii\n        mpg: 24\n        cylinders: 4\n        displacement: 113\n        horsepower: 95\n        weight: 2372\n        acceleration: 15\n        modelyear: 70\n        origin: 3\n\n      - _id: plymouth_duster\n        name: plymouth_duster\n        mpg: 22\n        cylinders: 6\n        displacement: 198\n        horsepower: 95\n        weight: 2833\n        acceleration: 15.5\n        modelyear: 70\n        origin: 1\n\n      - _id: amc_hornet\n        name: amc_hornet\n        mpg: 18\n        cylinders: 6\n        displacement: 199\n        horsepower: 97\n        weight: 2774\n        acceleration: 15.5\n        modelyear: 70\n        origin: 1\n\n      - _id: ford_maverick\n        name: ford_maverick\n        mpg: 21\n        cylinders: 6\n        displacement: 200\n        horsepower: 85\n        weight: 2587\n        acceleration: 16\n        modelyear: 70\n        origin: 1\n\n      - _id: datsun_pl510\n        name: datsun_pl510\n        mpg: 27\n        cylinders: 4\n        displacement: 97\n        horsepower: 88\n        weight: 2130\n        acceleration: 14.5\n        modelyear: 70\n        origin: 3\n\n      - _id: volkswagen_1131_deluxe_sedan\n        name: volkswagen_1131_deluxe_sedan\n        mpg: 26\n        cylinders: 4\n        displacement: 97\n        horsepower: 46\n        weight: 1835\n        acceleration: 20.5\n        modelyear: 70\n        origin: 2\n\n      - _id: peugeot_504\n        name: peugeot_504\n        mpg: 25\n        cylinders: 4\n        displacement: 110\n        horsepower: 87\n        weight: 2672\n        acceleration: 17.5\n        modelyear: 70\n        origin: 2\n\n      - _id: audi_100_ls\n        name: audi_100_ls\n        mpg: 24\n        cylinders: 4\n        displacement: 107\n        horsepower: 90\n        weight: 2430\n        acceleration: 14.5\n        modelyear: 70\n        origin: 2\n\n      - _id: saab_99e\n        name: saab_99e\n        mpg: 25\n        cylinders: 4\n        displacement: 104\n        horsepower: 95\n        weight: 2375\n        acceleration: 17.5\n        modelyear: 70\n        origin: 2\n\n      - _id: bmw_2002\n        name: bmw_2002\n        mpg: 26\n        cylinders: 4\n        displacement: 121\n        horsepower: 113\n        weight: 2234\n        acceleration: 12.5\n        modelyear: 70\n        origin: 2\n\n      - _id: amc_gremlin\n        name: amc_gremlin\n        mpg: 21\n        cylinders: 6\n        displacement: 199\n        horsepower: 90\n        weight: 2648\n        acceleration: 15\n        modelyear: 70\n        origin: 1\n\n      - _id: ford_f250\n        name: ford_f250\n        mpg: 10\n        cylinders: 8\n        displacement: 360\n        horsepower: 215\n        weight: 4615\n        acceleration: 14\n        modelyear: 70\n        origin: 1\n\n      - _id: chevy_c20\n        name: chevy_c20\n        mpg: 10\n        cylinders: 8\n        displacement: 307\n        horsepower: 200\n        weight: 4376\n        acceleration: 15\n        modelyear: 70\n        origin: 1\n\n      - _id: dodge_d200\n        name: dodge_d200\n        mpg: 11\n        cylinders: 8\n        displacement: 318\n        horsepower: 210\n        weight: 4382\n        acceleration: 13.5\n        modelyear: 70\n        origin: 1\n\n      - _id: hi_1200d\n        name: hi_1200d\n        mpg: 9\n        cylinders: 8\n        displacement: 304\n        horsepower: 193\n        weight: 4732\n        acceleration: 18.5\n        modelyear: 70\n        origin: 1\n\n      - _id: datsun_pl510\n        name: datsun_pl510\n        mpg: 27\n        cylinders: 4\n        displacement: 97\n        horsepower: 88\n        weight: 2130\n        acceleration: 14.5\n        modelyear: 71\n        origin: 3\n\n      - _id: chevrolet_vega_2300\n        name: chevrolet_vega_2300\n        mpg: 28\n        cylinders: 4\n        displacement: 140\n        horsepower: 90\n        weight: 2264\n        acceleration: 15.5\n        modelyear: 71\n        origin: 1\n\n      - _id: toyota_corona\n        name: toyota_corona\n        mpg: 25\n        cylinders: 4\n        displacement: 113\n        horsepower: 95\n        weight: 2228\n        acceleration: 14\n        modelyear: 71\n        origin: 3\n\n      - _id: ford_pinto\n        name: ford_pinto\n        mpg: 25\n        cylinders: 4\n        displacement: 98\n        horsepower: 40\n        weight: 2046\n        acceleration: 19\n        modelyear: 71\n        origin: 1\n\n      - _id: volkswagen_super_beetle_117\n        name: volkswagen_super_beetle_117\n        mpg: 47\n        cylinders: 4\n        displacement: 97\n        horsepower: 48\n        weight: 1978\n        acceleration: 20\n        modelyear: 71\n        origin: 2\n\n      - _id: amc_gremlin\n        name: amc_gremlin\n        mpg: 19\n        cylinders: 6\n        displacement: 232\n        horsepower: 100\n        weight: 2634\n        acceleration: 13\n        modelyear: 71\n        origin: 1\n\n      - _id: plymouth_satellite_custom\n        name: plymouth_satellite_custom\n        mpg: 16\n        cylinders: 6\n        displacement: 225\n        horsepower: 105\n        weight: 3439\n        acceleration: 15.5\n        modelyear: 71\n        origin: 1\n\n      - _id: chevrolet_chevelle_malibu\n        name: chevrolet_chevelle_malibu\n        mpg: 17\n        cylinders: 6\n        displacement: 250\n        horsepower: 100\n        weight: 3329\n        acceleration: 15.5\n        modelyear: 71\n        origin: 1\n\n      - _id: ford_torino_500\n        name: ford_torino_500\n        mpg: 19\n        cylinders: 6\n        displacement: 250\n        horsepower: 88\n        weight: 3302\n        acceleration: 15.5\n        modelyear: 71\n        origin: 1\n\n      - _id: amc_matador\n        name: amc_matador\n        mpg: 18\n        cylinders: 6\n        displacement: 232\n        horsepower: 100\n        weight: 3288\n        acceleration: 15.5\n        modelyear: 71\n        origin: 1\n\n      - _id: chevrolet_impala\n        name: chevrolet_impala\n        mpg: 14\n        cylinders: 8\n        displacement: 350\n        horsepower: 165\n        weight: 4209\n        acceleration: 12\n        modelyear: 71\n        origin: 1\n\n      - _id: pontiac_catalina_brougham\n        name: pontiac_catalina_brougham\n        mpg: 14\n        cylinders: 8\n        displacement: 400\n        horsepower: 175\n        weight: 4464\n        acceleration: 11.5\n        modelyear: 71\n        origin: 1\n\n      - _id: ford_galaxie_500\n        name: ford_galaxie_500\n        mpg: 14\n        cylinders: 8\n        displacement: 351\n        horsepower: 153\n        weight: 4154\n        acceleration: 13.5\n        modelyear: 71\n        origin: 1\n\n      - _id: plymouth_fury_iii\n        name: plymouth_fury_iii\n        mpg: 14\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4096\n        acceleration: 13\n        modelyear: 71\n        origin: 1\n\n      - _id: dodge_monaco_(sw)\n        name: dodge_monaco_(sw)\n        mpg: 12\n        cylinders: 8\n        displacement: 383\n        horsepower: 180\n        weight: 4955\n        acceleration: 11.5\n        modelyear: 71\n        origin: 1\n\n      - _id: ford_country_squire_(sw)\n        name: ford_country_squire_(sw)\n        mpg: 13\n        cylinders: 8\n        displacement: 400\n        horsepower: 170\n        weight: 4746\n        acceleration: 12\n        modelyear: 71\n        origin: 1\n\n      - _id: pontiac_safari_(sw)\n        name: pontiac_safari_(sw)\n        mpg: 13\n        cylinders: 8\n        displacement: 400\n        horsepower: 175\n        weight: 5140\n        acceleration: 12\n        modelyear: 71\n        origin: 1\n\n      - _id: amc_hornet_sportabout_(sw)\n        name: amc_hornet_sportabout_(sw)\n        mpg: 18\n        cylinders: 6\n        displacement: 258\n        horsepower: 110\n        weight: 2962\n        acceleration: 13.5\n        modelyear: 71\n        origin: 1\n\n      - _id: chevrolet_vega_(sw)\n        name: chevrolet_vega_(sw)\n        mpg: 22\n        cylinders: 4\n        displacement: 140\n        horsepower: 72\n        weight: 2408\n        acceleration: 19\n        modelyear: 71\n        origin: 1\n\n      - _id: pontiac_firebird\n        name: pontiac_firebird\n        mpg: 19\n        cylinders: 6\n        displacement: 250\n        horsepower: 100\n        weight: 3282\n        acceleration: 15\n        modelyear: 71\n        origin: 1\n\n      - _id: ford_mustang\n        name: ford_mustang\n        mpg: 18\n        cylinders: 6\n        displacement: 250\n        horsepower: 88\n        weight: 3139\n        acceleration: 14.5\n        modelyear: 71\n        origin: 1\n\n      - _id: mercury_capri_2000\n        name: mercury_capri_2000\n        mpg: 23\n        cylinders: 4\n        displacement: 122\n        horsepower: 86\n        weight: 2220\n        acceleration: 14\n        modelyear: 71\n        origin: 1\n\n      - _id: opel_1900\n        name: opel_1900\n        mpg: 28\n        cylinders: 4\n        displacement: 116\n        horsepower: 90\n        weight: 2123\n        acceleration: 14\n        modelyear: 71\n        origin: 2\n\n      - _id: peugeot_304\n        name: peugeot_304\n        mpg: 30\n        cylinders: 4\n        displacement: 79\n        horsepower: 70\n        weight: 2074\n        acceleration: 19.5\n        modelyear: 71\n        origin: 2\n\n      - _id: fiat_124b\n        name: fiat_124b\n        mpg: 30\n        cylinders: 4\n        displacement: 88\n        horsepower: 76\n        weight: 2065\n        acceleration: 14.5\n        modelyear: 71\n        origin: 2\n\n      - _id: toyota_corolla_1200\n        name: toyota_corolla_1200\n        mpg: 31\n        cylinders: 4\n        displacement: 71\n        horsepower: 65\n        weight: 1773\n        acceleration: 19\n        modelyear: 71\n        origin: 3\n\n      - _id: datsun_1200\n        name: datsun_1200\n        mpg: 35\n        cylinders: 4\n        displacement: 72\n        horsepower: 69\n        weight: 1613\n        acceleration: 18\n        modelyear: 71\n        origin: 3\n\n      - _id: volkswagen_model_111\n        name: volkswagen_model_111\n        mpg: 27\n        cylinders: 4\n        displacement: 97\n        horsepower: 60\n        weight: 1834\n        acceleration: 19\n        modelyear: 71\n        origin: 2\n\n      - _id: plymouth_cricket\n        name: plymouth_cricket\n        mpg: 26\n        cylinders: 4\n        displacement: 91\n        horsepower: 70\n        weight: 1955\n        acceleration: 20.5\n        modelyear: 71\n        origin: 1\n\n      - _id: toyota_corona_hardtop\n        name: toyota_corona_hardtop\n        mpg: 24\n        cylinders: 4\n        displacement: 113\n        horsepower: 95\n        weight: 2278\n        acceleration: 15.5\n        modelyear: 72\n        origin: 3\n\n      - _id: dodge_colt_hardtop\n        name: dodge_colt_hardtop\n        mpg: 25\n        cylinders: 4\n        displacement: 97.5\n        horsepower: 80\n        weight: 2126\n        acceleration: 17\n        modelyear: 72\n        origin: 1\n\n      - _id: volkswagen_type_3\n        name: volkswagen_type_3\n        mpg: 23\n        cylinders: 4\n        displacement: 97\n        horsepower: 54\n        weight: 2254\n        acceleration: 23.5\n        modelyear: 72\n        origin: 2\n\n      - _id: chevrolet_vega\n        name: chevrolet_vega\n        mpg: 20\n        cylinders: 4\n        displacement: 140\n        horsepower: 90\n        weight: 2408\n        acceleration: 19.5\n        modelyear: 72\n        origin: 1\n\n      - _id: ford_pinto_runabout\n        name: ford_pinto_runabout\n        mpg: 21\n        cylinders: 4\n        displacement: 122\n        horsepower: 86\n        weight: 2226\n        acceleration: 16.5\n        modelyear: 72\n        origin: 1\n\n      - _id: chevrolet_impala\n        name: chevrolet_impala\n        mpg: 13\n        cylinders: 8\n        displacement: 350\n        horsepower: 165\n        weight: 4274\n        acceleration: 12\n        modelyear: 72\n        origin: 1\n\n      - _id: pontiac_catalina\n        name: pontiac_catalina\n        mpg: 14\n        cylinders: 8\n        displacement: 400\n        horsepower: 175\n        weight: 4385\n        acceleration: 12\n        modelyear: 72\n        origin: 1\n\n      - _id: plymouth_fury_iii\n        name: plymouth_fury_iii\n        mpg: 15\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4135\n        acceleration: 13.5\n        modelyear: 72\n        origin: 1\n\n      - _id: ford_galaxie_500\n        name: ford_galaxie_500\n        mpg: 14\n        cylinders: 8\n        displacement: 351\n        horsepower: 153\n        weight: 4129\n        acceleration: 13\n        modelyear: 72\n        origin: 1\n\n      - _id: amc_ambassador_sst\n        name: amc_ambassador_sst\n        mpg: 17\n        cylinders: 8\n        displacement: 304\n        horsepower: 150\n        weight: 3672\n        acceleration: 11.5\n        modelyear: 72\n        origin: 1\n\n      - _id: mercury_marquis\n        name: mercury_marquis\n        mpg: 11\n        cylinders: 8\n        displacement: 429\n        horsepower: 208\n        weight: 4633\n        acceleration: 11\n        modelyear: 72\n        origin: 1\n\n      - _id: buick_lesabre_custom\n        name: buick_lesabre_custom\n        mpg: 13\n        cylinders: 8\n        displacement: 350\n        horsepower: 155\n        weight: 4502\n        acceleration: 13.5\n        modelyear: 72\n        origin: 1\n\n      - _id: oldsmobile_delta_88_royale\n        name: oldsmobile_delta_88_royale\n        mpg: 12\n        cylinders: 8\n        displacement: 350\n        horsepower: 160\n        weight: 4456\n        acceleration: 13.5\n        modelyear: 72\n        origin: 1\n\n      - _id: chrysler_newport_royal\n        name: chrysler_newport_royal\n        mpg: 13\n        cylinders: 8\n        displacement: 400\n        horsepower: 190\n        weight: 4422\n        acceleration: 12.5\n        modelyear: 72\n        origin: 1\n\n      - _id: mazda_rx2_coupe\n        name: mazda_rx2_coupe\n        mpg: 19\n        cylinders: 3\n        displacement: 70\n        horsepower: 97\n        weight: 2330\n        acceleration: 13.5\n        modelyear: 72\n        origin: 3\n\n      - _id: amc_matador_(sw)\n        name: amc_matador_(sw)\n        mpg: 15\n        cylinders: 8\n        displacement: 304\n        horsepower: 150\n        weight: 3892\n        acceleration: 12.5\n        modelyear: 72\n        origin: 1\n\n      - _id: chevrolet_chevelle_concours_(sw)\n        name: chevrolet_chevelle_concours_(sw)\n        mpg: 13\n        cylinders: 8\n        displacement: 307\n        horsepower: 130\n        weight: 4098\n        acceleration: 14\n        modelyear: 72\n        origin: 1\n\n      - _id: ford_gran_torino_(sw)\n        name: ford_gran_torino_(sw)\n        mpg: 13\n        cylinders: 8\n        displacement: 302\n        horsepower: 140\n        weight: 4294\n        acceleration: 16\n        modelyear: 72\n        origin: 1\n\n      - _id: plymouth_satellite_custom_(sw)\n        name: plymouth_satellite_custom_(sw)\n        mpg: 14\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4077\n        acceleration: 14\n        modelyear: 72\n        origin: 1\n\n      - _id: volvo_145e_(sw)\n        name: volvo_145e_(sw)\n        mpg: 18\n        cylinders: 4\n        displacement: 121\n        horsepower: 112\n        weight: 2933\n        acceleration: 14.5\n        modelyear: 72\n        origin: 2\n\n      - _id: volkswagen_411_(sw)\n        name: volkswagen_411_(sw)\n        mpg: 22\n        cylinders: 4\n        displacement: 121\n        horsepower: 76\n        weight: 2511\n        acceleration: 18\n        modelyear: 72\n        origin: 2\n\n      - _id: peugeot_504_(sw)\n        name: peugeot_504_(sw)\n        mpg: 21\n        cylinders: 4\n        displacement: 120\n        horsepower: 87\n        weight: 2979\n        acceleration: 19.5\n        modelyear: 72\n        origin: 2\n\n      - _id: renault_12_(sw)\n        name: renault_12_(sw)\n        mpg: 26\n        cylinders: 4\n        displacement: 96\n        horsepower: 69\n        weight: 2189\n        acceleration: 18\n        modelyear: 72\n        origin: 2\n\n      - _id: ford_pinto_(sw)\n        name: ford_pinto_(sw)\n        mpg: 22\n        cylinders: 4\n        displacement: 122\n        horsepower: 86\n        weight: 2395\n        acceleration: 16\n        modelyear: 72\n        origin: 1\n\n      - _id: datsun_510_(sw)\n        name: datsun_510_(sw)\n        mpg: 28\n        cylinders: 4\n        displacement: 97\n        horsepower: 92\n        weight: 2288\n        acceleration: 17\n        modelyear: 72\n        origin: 3\n\n      - _id: toyouta_corona_mark_ii_(sw)\n        name: toyouta_corona_mark_ii_(sw)\n        mpg: 23\n        cylinders: 4\n        displacement: 120\n        horsepower: 97\n        weight: 2506\n        acceleration: 14.5\n        modelyear: 72\n        origin: 3\n\n      - _id: dodge_colt_(sw)\n        name: dodge_colt_(sw)\n        mpg: 28\n        cylinders: 4\n        displacement: 98\n        horsepower: 80\n        weight: 2164\n        acceleration: 15\n        modelyear: 72\n        origin: 1\n\n      - _id: toyota_corolla_1600_(sw)\n        name: toyota_corolla_1600_(sw)\n        mpg: 27\n        cylinders: 4\n        displacement: 97\n        horsepower: 88\n        weight: 2100\n        acceleration: 16.5\n        modelyear: 72\n        origin: 3\n\n      - _id: buick_century_350\n        name: buick_century_350\n        mpg: 13\n        cylinders: 8\n        displacement: 350\n        horsepower: 175\n        weight: 4100\n        acceleration: 13\n        modelyear: 73\n        origin: 1\n\n      - _id: amc_matador\n        name: amc_matador\n        mpg: 14\n        cylinders: 8\n        displacement: 304\n        horsepower: 150\n        weight: 3672\n        acceleration: 11.5\n        modelyear: 73\n        origin: 1\n\n      - _id: chevrolet_malibu\n        name: chevrolet_malibu\n        mpg: 13\n        cylinders: 8\n        displacement: 350\n        horsepower: 145\n        weight: 3988\n        acceleration: 13\n        modelyear: 73\n        origin: 1\n\n      - _id: ford_gran_torino\n        name: ford_gran_torino\n        mpg: 14\n        cylinders: 8\n        displacement: 302\n        horsepower: 137\n        weight: 4042\n        acceleration: 14.5\n        modelyear: 73\n        origin: 1\n\n      - _id: dodge_coronet_custom\n        name: dodge_coronet_custom\n        mpg: 15\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 3777\n        acceleration: 12.5\n        modelyear: 73\n        origin: 1\n\n      - _id: mercury_marquis_brougham\n        name: mercury_marquis_brougham\n        mpg: 12\n        cylinders: 8\n        displacement: 429\n        horsepower: 198\n        weight: 4952\n        acceleration: 11.5\n        modelyear: 73\n        origin: 1\n\n      - _id: chevrolet_caprice_classic\n        name: chevrolet_caprice_classic\n        mpg: 13\n        cylinders: 8\n        displacement: 400\n        horsepower: 150\n        weight: 4464\n        acceleration: 12\n        modelyear: 73\n        origin: 1\n\n      - _id: ford_ltd\n        name: ford_ltd\n        mpg: 13\n        cylinders: 8\n        displacement: 351\n        horsepower: 158\n        weight: 4363\n        acceleration: 13\n        modelyear: 73\n        origin: 1\n\n      - _id: plymouth_fury_gran_sedan\n        name: plymouth_fury_gran_sedan\n        mpg: 14\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4237\n        acceleration: 14.5\n        modelyear: 73\n        origin: 1\n\n      - _id: chrysler_new_yorker_brougham\n        name: chrysler_new_yorker_brougham\n        mpg: 13\n        cylinders: 8\n        displacement: 440\n        horsepower: 215\n        weight: 4735\n        acceleration: 11\n        modelyear: 73\n        origin: 1\n\n      - _id: buick_electra_225_custom\n        name: buick_electra_225_custom\n        mpg: 12\n        cylinders: 8\n        displacement: 455\n        horsepower: 225\n        weight: 4951\n        acceleration: 11\n        modelyear: 73\n        origin: 1\n\n      - _id: amc_ambassador_brougham\n        name: amc_ambassador_brougham\n        mpg: 13\n        cylinders: 8\n        displacement: 360\n        horsepower: 175\n        weight: 3821\n        acceleration: 11\n        modelyear: 73\n        origin: 1\n\n      - _id: plymouth_valiant\n        name: plymouth_valiant\n        mpg: 18\n        cylinders: 6\n        displacement: 225\n        horsepower: 105\n        weight: 3121\n        acceleration: 16.5\n        modelyear: 73\n        origin: 1\n\n      - _id: chevrolet_nova_custom\n        name: chevrolet_nova_custom\n        mpg: 16\n        cylinders: 6\n        displacement: 250\n        horsepower: 100\n        weight: 3278\n        acceleration: 18\n        modelyear: 73\n        origin: 1\n\n      - _id: amc_hornet\n        name: amc_hornet\n        mpg: 18\n        cylinders: 6\n        displacement: 232\n        horsepower: 100\n        weight: 2945\n        acceleration: 16\n        modelyear: 73\n        origin: 1\n\n      - _id: ford_maverick\n        name: ford_maverick\n        mpg: 18\n        cylinders: 6\n        displacement: 250\n        horsepower: 88\n        weight: 3021\n        acceleration: 16.5\n        modelyear: 73\n        origin: 1\n\n      - _id: plymouth_duster\n        name: plymouth_duster\n        mpg: 23\n        cylinders: 6\n        displacement: 198\n        horsepower: 95\n        weight: 2904\n        acceleration: 16\n        modelyear: 73\n        origin: 1\n\n      - _id: volkswagen_super_beetle\n        name: volkswagen_super_beetle\n        mpg: 26\n        cylinders: 4\n        displacement: 97\n        horsepower: 46\n        weight: 1950\n        acceleration: 21\n        modelyear: 73\n        origin: 2\n\n      - _id: chevrolet_impala\n        name: chevrolet_impala\n        mpg: 11\n        cylinders: 8\n        displacement: 400\n        horsepower: 150\n        weight: 4997\n        acceleration: 14\n        modelyear: 73\n        origin: 1\n\n      - _id: ford_country\n        name: ford_country\n        mpg: 12\n        cylinders: 8\n        displacement: 400\n        horsepower: 167\n        weight: 4906\n        acceleration: 12.5\n        modelyear: 73\n        origin: 1\n\n      - _id: plymouth_custom_suburb\n        name: plymouth_custom_suburb\n        mpg: 13\n        cylinders: 8\n        displacement: 360\n        horsepower: 170\n        weight: 4654\n        acceleration: 13\n        modelyear: 73\n        origin: 1\n\n      - _id: oldsmobile_vista_cruiser\n        name: oldsmobile_vista_cruiser\n        mpg: 12\n        cylinders: 8\n        displacement: 350\n        horsepower: 180\n        weight: 4499\n        acceleration: 12.5\n        modelyear: 73\n        origin: 1\n\n      - _id: amc_gremlin\n        name: amc_gremlin\n        mpg: 18\n        cylinders: 6\n        displacement: 232\n        horsepower: 100\n        weight: 2789\n        acceleration: 15\n        modelyear: 73\n        origin: 1\n\n      - _id: toyota_carina\n        name: toyota_carina\n        mpg: 20\n        cylinders: 4\n        displacement: 97\n        horsepower: 88\n        weight: 2279\n        acceleration: 19\n        modelyear: 73\n        origin: 3\n\n      - _id: chevrolet_vega\n        name: chevrolet_vega\n        mpg: 21\n        cylinders: 4\n        displacement: 140\n        horsepower: 72\n        weight: 2401\n        acceleration: 19.5\n        modelyear: 73\n        origin: 1\n\n      - _id: datsun_610\n        name: datsun_610\n        mpg: 22\n        cylinders: 4\n        displacement: 108\n        horsepower: 94\n        weight: 2379\n        acceleration: 16.5\n        modelyear: 73\n        origin: 3\n\n      - _id: maxda_rx3\n        name: maxda_rx3\n        mpg: 18\n        cylinders: 3\n        displacement: 70\n        horsepower: 90\n        weight: 2124\n        acceleration: 13.5\n        modelyear: 73\n        origin: 3\n\n      - _id: ford_pinto\n        name: ford_pinto\n        mpg: 19\n        cylinders: 4\n        displacement: 122\n        horsepower: 85\n        weight: 2310\n        acceleration: 18.5\n        modelyear: 73\n        origin: 1\n\n      - _id: mercury_capri_v6\n        name: mercury_capri_v6\n        mpg: 21\n        cylinders: 6\n        displacement: 155\n        horsepower: 107\n        weight: 2472\n        acceleration: 14\n        modelyear: 73\n        origin: 1\n\n      - _id: fiat_124_sport_coupe\n        name: fiat_124_sport_coupe\n        mpg: 26\n        cylinders: 4\n        displacement: 98\n        horsepower: 90\n        weight: 2265\n        acceleration: 15.5\n        modelyear: 73\n        origin: 2\n\n      - _id: chevrolet_monte_carlo_s\n        name: chevrolet_monte_carlo_s\n        mpg: 15\n        cylinders: 8\n        displacement: 350\n        horsepower: 145\n        weight: 4082\n        acceleration: 13\n        modelyear: 73\n        origin: 1\n\n      - _id: pontiac_grand_prix\n        name: pontiac_grand_prix\n        mpg: 16\n        cylinders: 8\n        displacement: 400\n        horsepower: 230\n        weight: 4278\n        acceleration: 9.5\n        modelyear: 73\n        origin: 1\n\n      - _id: fiat_128\n        name: fiat_128\n        mpg: 29\n        cylinders: 4\n        displacement: 68\n        horsepower: 49\n        weight: 1867\n        acceleration: 19.5\n        modelyear: 73\n        origin: 2\n\n      - _id: opel_manta\n        name: opel_manta\n        mpg: 24\n        cylinders: 4\n        displacement: 116\n        horsepower: 75\n        weight: 2158\n        acceleration: 15.5\n        modelyear: 73\n        origin: 2\n\n      - _id: audi_100ls\n        name: audi_100ls\n        mpg: 20\n        cylinders: 4\n        displacement: 114\n        horsepower: 91\n        weight: 2582\n        acceleration: 14\n        modelyear: 73\n        origin: 2\n\n      - _id: volvo_144ea\n        name: volvo_144ea\n        mpg: 19\n        cylinders: 4\n        displacement: 121\n        horsepower: 112\n        weight: 2868\n        acceleration: 15.5\n        modelyear: 73\n        origin: 2\n\n      - _id: dodge_dart_custom\n        name: dodge_dart_custom\n        mpg: 15\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 3399\n        acceleration: 11\n        modelyear: 73\n        origin: 1\n\n      - _id: saab_99le\n        name: saab_99le\n        mpg: 24\n        cylinders: 4\n        displacement: 121\n        horsepower: 110\n        weight: 2660\n        acceleration: 14\n        modelyear: 73\n        origin: 2\n\n      - _id: toyota_mark_ii\n        name: toyota_mark_ii\n        mpg: 20\n        cylinders: 6\n        displacement: 156\n        horsepower: 122\n        weight: 2807\n        acceleration: 13.5\n        modelyear: 73\n        origin: 3\n\n      - _id: oldsmobile_omega\n        name: oldsmobile_omega\n        mpg: 11\n        cylinders: 8\n        displacement: 350\n        horsepower: 180\n        weight: 3664\n        acceleration: 11\n        modelyear: 73\n        origin: 1\n\n      - _id: plymouth_duster\n        name: plymouth_duster\n        mpg: 20\n        cylinders: 6\n        displacement: 198\n        horsepower: 95\n        weight: 3102\n        acceleration: 16.5\n        modelyear: 74\n        origin: 1\n\n      - _id: ford_maverick\n        name: ford_maverick\n        mpg: 21\n        cylinders: 6\n        displacement: 200\n        horsepower: 40\n        weight: 2875\n        acceleration: 17\n        modelyear: 74\n        origin: 1\n\n      - _id: amc_hornet\n        name: amc_hornet\n        mpg: 19\n        cylinders: 6\n        displacement: 232\n        horsepower: 100\n        weight: 2901\n        acceleration: 16\n        modelyear: 74\n        origin: 1\n\n      - _id: chevrolet_nova\n        name: chevrolet_nova\n        mpg: 15\n        cylinders: 6\n        displacement: 250\n        horsepower: 100\n        weight: 3336\n        acceleration: 17\n        modelyear: 74\n        origin: 1\n\n      - _id: datsun_b210\n        name: datsun_b210\n        mpg: 31\n        cylinders: 4\n        displacement: 79\n        horsepower: 67\n        weight: 1950\n        acceleration: 19\n        modelyear: 74\n        origin: 3\n\n      - _id: ford_pinto\n        name: ford_pinto\n        mpg: 26\n        cylinders: 4\n        displacement: 122\n        horsepower: 80\n        weight: 2451\n        acceleration: 16.5\n        modelyear: 74\n        origin: 1\n\n      - _id: toyota_corolla_1200\n        name: toyota_corolla_1200\n        mpg: 32\n        cylinders: 4\n        displacement: 71\n        horsepower: 65\n        weight: 1836\n        acceleration: 21\n        modelyear: 74\n        origin: 3\n\n      - _id: chevrolet_vega\n        name: chevrolet_vega\n        mpg: 25\n        cylinders: 4\n        displacement: 140\n        horsepower: 75\n        weight: 2542\n        acceleration: 17\n        modelyear: 74\n        origin: 1\n\n      - _id: chevrolet_chevelle_malibu_classic\n        name: chevrolet_chevelle_malibu_classic\n        mpg: 16\n        cylinders: 6\n        displacement: 250\n        horsepower: 100\n        weight: 3781\n        acceleration: 17\n        modelyear: 74\n        origin: 1\n\n      - _id: amc_matador\n        name: amc_matador\n        mpg: 16\n        cylinders: 6\n        displacement: 258\n        horsepower: 110\n        weight: 3632\n        acceleration: 18\n        modelyear: 74\n        origin: 1\n\n      - _id: plymouth_satellite_sebring\n        name: plymouth_satellite_sebring\n        mpg: 18\n        cylinders: 6\n        displacement: 225\n        horsepower: 105\n        weight: 3613\n        acceleration: 16.5\n        modelyear: 74\n        origin: 1\n\n      - _id: ford_gran_torino\n        name: ford_gran_torino\n        mpg: 16\n        cylinders: 8\n        displacement: 302\n        horsepower: 140\n        weight: 4141\n        acceleration: 14\n        modelyear: 74\n        origin: 1\n\n      - _id: buick_century_luxus_(sw)\n        name: buick_century_luxus_(sw)\n        mpg: 13\n        cylinders: 8\n        displacement: 350\n        horsepower: 150\n        weight: 4699\n        acceleration: 14.5\n        modelyear: 74\n        origin: 1\n\n      - _id: dodge_coronet_custom_(sw)\n        name: dodge_coronet_custom_(sw)\n        mpg: 14\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4457\n        acceleration: 13.5\n        modelyear: 74\n        origin: 1\n\n      - _id: ford_gran_torino_(sw)\n        name: ford_gran_torino_(sw)\n        mpg: 14\n        cylinders: 8\n        displacement: 302\n        horsepower: 140\n        weight: 4638\n        acceleration: 16\n        modelyear: 74\n        origin: 1\n\n      - _id: amc_matador_(sw)\n        name: amc_matador_(sw)\n        mpg: 14\n        cylinders: 8\n        displacement: 304\n        horsepower: 150\n        weight: 4257\n        acceleration: 15.5\n        modelyear: 74\n        origin: 1\n\n      - _id: audi_fox\n        name: audi_fox\n        mpg: 29\n        cylinders: 4\n        displacement: 98\n        horsepower: 83\n        weight: 2219\n        acceleration: 16.5\n        modelyear: 74\n        origin: 2\n\n      - _id: volkswagen_dasher\n        name: volkswagen_dasher\n        mpg: 26\n        cylinders: 4\n        displacement: 79\n        horsepower: 67\n        weight: 1963\n        acceleration: 15.5\n        modelyear: 74\n        origin: 2\n\n      - _id: opel_manta\n        name: opel_manta\n        mpg: 26\n        cylinders: 4\n        displacement: 97\n        horsepower: 78\n        weight: 2300\n        acceleration: 14.5\n        modelyear: 74\n        origin: 2\n\n      - _id: toyota_corona\n        name: toyota_corona\n        mpg: 31\n        cylinders: 4\n        displacement: 76\n        horsepower: 52\n        weight: 1649\n        acceleration: 16.5\n        modelyear: 74\n        origin: 3\n\n      - _id: datsun_710\n        name: datsun_710\n        mpg: 32\n        cylinders: 4\n        displacement: 83\n        horsepower: 61\n        weight: 2003\n        acceleration: 19\n        modelyear: 74\n        origin: 3\n\n      - _id: dodge_colt\n        name: dodge_colt\n        mpg: 28\n        cylinders: 4\n        displacement: 90\n        horsepower: 75\n        weight: 2125\n        acceleration: 14.5\n        modelyear: 74\n        origin: 1\n\n      - _id: fiat_128\n        name: fiat_128\n        mpg: 24\n        cylinders: 4\n        displacement: 90\n        horsepower: 75\n        weight: 2108\n        acceleration: 15.5\n        modelyear: 74\n        origin: 2\n\n      - _id: fiat_124_tc\n        name: fiat_124_tc\n        mpg: 26\n        cylinders: 4\n        displacement: 116\n        horsepower: 75\n        weight: 2246\n        acceleration: 14\n        modelyear: 74\n        origin: 2\n\n      - _id: honda_civic\n        name: honda_civic\n        mpg: 24\n        cylinders: 4\n        displacement: 120\n        horsepower: 97\n        weight: 2489\n        acceleration: 15\n        modelyear: 74\n        origin: 3\n\n      - _id: subaru\n        name: subaru\n        mpg: 26\n        cylinders: 4\n        displacement: 108\n        horsepower: 93\n        weight: 2391\n        acceleration: 15.5\n        modelyear: 74\n        origin: 3\n\n      - _id: fiat_x1.9\n        name: fiat_x1.9\n        mpg: 31\n        cylinders: 4\n        displacement: 79\n        horsepower: 67\n        weight: 2000\n        acceleration: 16\n        modelyear: 74\n        origin: 2\n\n      - _id: plymouth_valiant_custom\n        name: plymouth_valiant_custom\n        mpg: 19\n        cylinders: 6\n        displacement: 225\n        horsepower: 95\n        weight: 3264\n        acceleration: 16\n        modelyear: 75\n        origin: 1\n\n      - _id: chevrolet_nova\n        name: chevrolet_nova\n        mpg: 18\n        cylinders: 6\n        displacement: 250\n        horsepower: 105\n        weight: 3459\n        acceleration: 16\n        modelyear: 75\n        origin: 1\n\n      - _id: mercury_monarch\n        name: mercury_monarch\n        mpg: 15\n        cylinders: 6\n        displacement: 250\n        horsepower: 72\n        weight: 3432\n        acceleration: 21\n        modelyear: 75\n        origin: 1\n\n      - _id: ford_maverick\n        name: ford_maverick\n        mpg: 15\n        cylinders: 6\n        displacement: 250\n        horsepower: 72\n        weight: 3158\n        acceleration: 19.5\n        modelyear: 75\n        origin: 1\n\n      - _id: pontiac_catalina\n        name: pontiac_catalina\n        mpg: 16\n        cylinders: 8\n        displacement: 400\n        horsepower: 170\n        weight: 4668\n        acceleration: 11.5\n        modelyear: 75\n        origin: 1\n\n      - _id: chevrolet_bel_air\n        name: chevrolet_bel_air\n        mpg: 15\n        cylinders: 8\n        displacement: 350\n        horsepower: 145\n        weight: 4440\n        acceleration: 14\n        modelyear: 75\n        origin: 1\n\n      - _id: plymouth_grand_fury\n        name: plymouth_grand_fury\n        mpg: 16\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4498\n        acceleration: 14.5\n        modelyear: 75\n        origin: 1\n\n      - _id: ford_ltd\n        name: ford_ltd\n        mpg: 14\n        cylinders: 8\n        displacement: 351\n        horsepower: 148\n        weight: 4657\n        acceleration: 13.5\n        modelyear: 75\n        origin: 1\n\n      - _id: buick_century\n        name: buick_century\n        mpg: 17\n        cylinders: 6\n        displacement: 231\n        horsepower: 110\n        weight: 3907\n        acceleration: 21\n        modelyear: 75\n        origin: 1\n\n      - _id: chevroelt_chevelle_malibu\n        name: chevroelt_chevelle_malibu\n        mpg: 16\n        cylinders: 6\n        displacement: 250\n        horsepower: 105\n        weight: 3897\n        acceleration: 18.5\n        modelyear: 75\n        origin: 1\n\n      - _id: amc_matador\n        name: amc_matador\n        mpg: 15\n        cylinders: 6\n        displacement: 258\n        horsepower: 110\n        weight: 3730\n        acceleration: 19\n        modelyear: 75\n        origin: 1\n\n      - _id: plymouth_fury\n        name: plymouth_fury\n        mpg: 18\n        cylinders: 6\n        displacement: 225\n        horsepower: 95\n        weight: 3785\n        acceleration: 19\n        modelyear: 75\n        origin: 1\n\n      - _id: buick_skyhawk\n        name: buick_skyhawk\n        mpg: 21\n        cylinders: 6\n        displacement: 231\n        horsepower: 110\n        weight: 3039\n        acceleration: 15\n        modelyear: 75\n        origin: 1\n\n      - _id: chevrolet_monza_2+2\n        name: chevrolet_monza_2+2\n        mpg: 20\n        cylinders: 8\n        displacement: 262\n        horsepower: 110\n        weight: 3221\n        acceleration: 13.5\n        modelyear: 75\n        origin: 1\n\n      - _id: ford_mustang_ii\n        name: ford_mustang_ii\n        mpg: 13\n        cylinders: 8\n        displacement: 302\n        horsepower: 129\n        weight: 3169\n        acceleration: 12\n        modelyear: 75\n        origin: 1\n\n      - _id: toyota_corolla\n        name: toyota_corolla\n        mpg: 29\n        cylinders: 4\n        displacement: 97\n        horsepower: 75\n        weight: 2171\n        acceleration: 16\n        modelyear: 75\n        origin: 3\n\n      - _id: ford_pinto\n        name: ford_pinto\n        mpg: 23\n        cylinders: 4\n        displacement: 140\n        horsepower: 83\n        weight: 2639\n        acceleration: 17\n        modelyear: 75\n        origin: 1\n\n      - _id: amc_gremlin\n        name: amc_gremlin\n        mpg: 20\n        cylinders: 6\n        displacement: 232\n        horsepower: 100\n        weight: 2914\n        acceleration: 16\n        modelyear: 75\n        origin: 1\n\n      - _id: pontiac_astro\n        name: pontiac_astro\n        mpg: 23\n        cylinders: 4\n        displacement: 140\n        horsepower: 78\n        weight: 2592\n        acceleration: 18.5\n        modelyear: 75\n        origin: 1\n\n      - _id: toyota_corona\n        name: toyota_corona\n        mpg: 24\n        cylinders: 4\n        displacement: 134\n        horsepower: 96\n        weight: 2702\n        acceleration: 13.5\n        modelyear: 75\n        origin: 3\n\n      - _id: volkswagen_dasher\n        name: volkswagen_dasher\n        mpg: 25\n        cylinders: 4\n        displacement: 90\n        horsepower: 71\n        weight: 2223\n        acceleration: 16.5\n        modelyear: 75\n        origin: 2\n\n      - _id: datsun_710\n        name: datsun_710\n        mpg: 24\n        cylinders: 4\n        displacement: 119\n        horsepower: 97\n        weight: 2545\n        acceleration: 17\n        modelyear: 75\n        origin: 3\n\n      - _id: ford_pinto\n        name: ford_pinto\n        mpg: 18\n        cylinders: 6\n        displacement: 171\n        horsepower: 97\n        weight: 2984\n        acceleration: 14.5\n        modelyear: 75\n        origin: 1\n\n      - _id: volkswagen_rabbit\n        name: volkswagen_rabbit\n        mpg: 29\n        cylinders: 4\n        displacement: 90\n        horsepower: 70\n        weight: 1937\n        acceleration: 14\n        modelyear: 75\n        origin: 2\n\n      - _id: amc_pacer\n        name: amc_pacer\n        mpg: 19\n        cylinders: 6\n        displacement: 232\n        horsepower: 90\n        weight: 3211\n        acceleration: 17\n        modelyear: 75\n        origin: 1\n\n      - _id: audi_100ls\n        name: audi_100ls\n        mpg: 23\n        cylinders: 4\n        displacement: 115\n        horsepower: 95\n        weight: 2694\n        acceleration: 15\n        modelyear: 75\n        origin: 2\n\n      - _id: peugeot_504\n        name: peugeot_504\n        mpg: 23\n        cylinders: 4\n        displacement: 120\n        horsepower: 88\n        weight: 2957\n        acceleration: 17\n        modelyear: 75\n        origin: 2\n\n      - _id: volvo_244dl\n        name: volvo_244dl\n        mpg: 22\n        cylinders: 4\n        displacement: 121\n        horsepower: 98\n        weight: 2945\n        acceleration: 14.5\n        modelyear: 75\n        origin: 2\n\n      - _id: saab_99le\n        name: saab_99le\n        mpg: 25\n        cylinders: 4\n        displacement: 121\n        horsepower: 115\n        weight: 2671\n        acceleration: 13.5\n        modelyear: 75\n        origin: 2\n\n      - _id: honda_civic_cvcc\n        name: honda_civic_cvcc\n        mpg: 33\n        cylinders: 4\n        displacement: 91\n        horsepower: 53\n        weight: 1795\n        acceleration: 17.5\n        modelyear: 75\n        origin: 3\n\n      - _id: fiat_131\n        name: fiat_131\n        mpg: 28\n        cylinders: 4\n        displacement: 107\n        horsepower: 86\n        weight: 2464\n        acceleration: 15.5\n        modelyear: 76\n        origin: 2\n\n      - _id: opel_1900\n        name: opel_1900\n        mpg: 25\n        cylinders: 4\n        displacement: 116\n        horsepower: 81\n        weight: 2220\n        acceleration: 16.9\n        modelyear: 76\n        origin: 2\n\n      - _id: capri_ii\n        name: capri_ii\n        mpg: 25\n        cylinders: 4\n        displacement: 140\n        horsepower: 92\n        weight: 2572\n        acceleration: 14.9\n        modelyear: 76\n        origin: 1\n\n      - _id: dodge_colt\n        name: dodge_colt\n        mpg: 26\n        cylinders: 4\n        displacement: 98\n        horsepower: 79\n        weight: 2255\n        acceleration: 17.7\n        modelyear: 76\n        origin: 1\n\n      - _id: renault_12tl\n        name: renault_12tl\n        mpg: 27\n        cylinders: 4\n        displacement: 101\n        horsepower: 83\n        weight: 2202\n        acceleration: 15.3\n        modelyear: 76\n        origin: 2\n\n      - _id: chevrolet_chevelle_malibu_classic\n        name: chevrolet_chevelle_malibu_classic\n        mpg: 17.5\n        cylinders: 8\n        displacement: 305\n        horsepower: 140\n        weight: 4215\n        acceleration: 13\n        modelyear: 76\n        origin: 1\n\n      - _id: dodge_coronet_brougham\n        name: dodge_coronet_brougham\n        mpg: 16\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 4190\n        acceleration: 13\n        modelyear: 76\n        origin: 1\n\n      - _id: amc_matador\n        name: amc_matador\n        mpg: 15.5\n        cylinders: 8\n        displacement: 304\n        horsepower: 120\n        weight: 3962\n        acceleration: 13.9\n        modelyear: 76\n        origin: 1\n\n      - _id: ford_gran_torino\n        name: ford_gran_torino\n        mpg: 14.5\n        cylinders: 8\n        displacement: 351\n        horsepower: 152\n        weight: 4215\n        acceleration: 12.8\n        modelyear: 76\n        origin: 1\n\n      - _id: plymouth_valiant\n        name: plymouth_valiant\n        mpg: 22\n        cylinders: 6\n        displacement: 225\n        horsepower: 100\n        weight: 3233\n        acceleration: 15.4\n        modelyear: 76\n        origin: 1\n\n      - _id: chevrolet_nova\n        name: chevrolet_nova\n        mpg: 22\n        cylinders: 6\n        displacement: 250\n        horsepower: 105\n        weight: 3353\n        acceleration: 14.5\n        modelyear: 76\n        origin: 1\n\n      - _id: ford_maverick\n        name: ford_maverick\n        mpg: 24\n        cylinders: 6\n        displacement: 200\n        horsepower: 81\n        weight: 3012\n        acceleration: 17.6\n        modelyear: 76\n        origin: 1\n\n      - _id: amc_hornet\n        name: amc_hornet\n        mpg: 22.5\n        cylinders: 6\n        displacement: 232\n        horsepower: 90\n        weight: 3085\n        acceleration: 17.6\n        modelyear: 76\n        origin: 1\n\n      - _id: chevrolet_chevette\n        name: chevrolet_chevette\n        mpg: 29\n        cylinders: 4\n        displacement: 85\n        horsepower: 52\n        weight: 2035\n        acceleration: 22.2\n        modelyear: 76\n        origin: 1\n\n      - _id: chevrolet_woody\n        name: chevrolet_woody\n        mpg: 24.5\n        cylinders: 4\n        displacement: 98\n        horsepower: 60\n        weight: 2164\n        acceleration: 22.1\n        modelyear: 76\n        origin: 1\n\n      - _id: vw_rabbit\n        name: vw_rabbit\n        mpg: 29\n        cylinders: 4\n        displacement: 90\n        horsepower: 70\n        weight: 1937\n        acceleration: 14.2\n        modelyear: 76\n        origin: 2\n\n      - _id: honda_civic\n        name: honda_civic\n        mpg: 33\n        cylinders: 4\n        displacement: 91\n        horsepower: 53\n        weight: 1795\n        acceleration: 17.4\n        modelyear: 76\n        origin: 3\n\n      - _id: dodge_aspen_se\n        name: dodge_aspen_se\n        mpg: 20\n        cylinders: 6\n        displacement: 225\n        horsepower: 100\n        weight: 3651\n        acceleration: 17.7\n        modelyear: 76\n        origin: 1\n\n      - _id: ford_granada_ghia\n        name: ford_granada_ghia\n        mpg: 18\n        cylinders: 6\n        displacement: 250\n        horsepower: 78\n        weight: 3574\n        acceleration: 21\n        modelyear: 76\n        origin: 1\n\n      - _id: pontiac_ventura_sj\n        name: pontiac_ventura_sj\n        mpg: 18.5\n        cylinders: 6\n        displacement: 250\n        horsepower: 110\n        weight: 3645\n        acceleration: 16.2\n        modelyear: 76\n        origin: 1\n\n      - _id: amc_pacer_d/l\n        name: amc_pacer_d/l\n        mpg: 17.5\n        cylinders: 6\n        displacement: 258\n        horsepower: 95\n        weight: 3193\n        acceleration: 17.8\n        modelyear: 76\n        origin: 1\n\n      - _id: volkswagen_rabbit\n        name: volkswagen_rabbit\n        mpg: 29.5\n        cylinders: 4\n        displacement: 97\n        horsepower: 71\n        weight: 1825\n        acceleration: 12.2\n        modelyear: 76\n        origin: 2\n\n      - _id: datsun_b210\n        name: datsun_b210\n        mpg: 32\n        cylinders: 4\n        displacement: 85\n        horsepower: 70\n        weight: 1990\n        acceleration: 17\n        modelyear: 76\n        origin: 3\n\n      - _id: toyota_corolla\n        name: toyota_corolla\n        mpg: 28\n        cylinders: 4\n        displacement: 97\n        horsepower: 75\n        weight: 2155\n        acceleration: 16.4\n        modelyear: 76\n        origin: 3\n\n      - _id: ford_pinto\n        name: ford_pinto\n        mpg: 26.5\n        cylinders: 4\n        displacement: 140\n        horsepower: 72\n        weight: 2565\n        acceleration: 13.6\n        modelyear: 76\n        origin: 1\n\n      - _id: volvo_245\n        name: volvo_245\n        mpg: 20\n        cylinders: 4\n        displacement: 130\n        horsepower: 102\n        weight: 3150\n        acceleration: 15.7\n        modelyear: 76\n        origin: 2\n\n      - _id: plymouth_volare_premier_v8\n        name: plymouth_volare_premier_v8\n        mpg: 13\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 3940\n        acceleration: 13.2\n        modelyear: 76\n        origin: 1\n\n      - _id: peugeot_504\n        name: peugeot_504\n        mpg: 19\n        cylinders: 4\n        displacement: 120\n        horsepower: 88\n        weight: 3270\n        acceleration: 21.9\n        modelyear: 76\n        origin: 2\n\n      - _id: toyota_mark_ii\n        name: toyota_mark_ii\n        mpg: 19\n        cylinders: 6\n        displacement: 156\n        horsepower: 108\n        weight: 2930\n        acceleration: 15.5\n        modelyear: 76\n        origin: 3\n\n      - _id: mercedesbenz_280s\n        name: mercedesbenz_280s\n        mpg: 16.5\n        cylinders: 6\n        displacement: 168\n        horsepower: 120\n        weight: 3820\n        acceleration: 16.7\n        modelyear: 76\n        origin: 2\n\n      - _id: cadillac_seville\n        name: cadillac_seville\n        mpg: 16.5\n        cylinders: 8\n        displacement: 350\n        horsepower: 180\n        weight: 4380\n        acceleration: 12.1\n        modelyear: 76\n        origin: 1\n\n      - _id: chevy_c10\n        name: chevy_c10\n        mpg: 13\n        cylinders: 8\n        displacement: 350\n        horsepower: 145\n        weight: 4055\n        acceleration: 12\n        modelyear: 76\n        origin: 1\n\n      - _id: ford_f108\n        name: ford_f108\n        mpg: 13\n        cylinders: 8\n        displacement: 302\n        horsepower: 130\n        weight: 3870\n        acceleration: 15\n        modelyear: 76\n        origin: 1\n\n      - _id: dodge_d100\n        name: dodge_d100\n        mpg: 13\n        cylinders: 8\n        displacement: 318\n        horsepower: 150\n        weight: 3755\n        acceleration: 14\n        modelyear: 76\n        origin: 1\n\n      - _id: honda_accord_cvcc\n        name: honda_accord_cvcc\n        mpg: 31.5\n        cylinders: 4\n        displacement: 98\n        horsepower: 68\n        weight: 2045\n        acceleration: 18.5\n        modelyear: 77\n        origin: 3\n\n      - _id: buick_opel_isuzu_deluxe\n        name: buick_opel_isuzu_deluxe\n        mpg: 30\n        cylinders: 4\n        displacement: 111\n        horsepower: 80\n        weight: 2155\n        acceleration: 14.8\n        modelyear: 77\n        origin: 1\n\n      - _id: renault_5_gtl\n        name: renault_5_gtl\n        mpg: 36\n        cylinders: 4\n        displacement: 79\n        horsepower: 58\n        weight: 1825\n        acceleration: 18.6\n        modelyear: 77\n        origin: 2\n\n      - _id: plymouth_arrow_gs\n        name: plymouth_arrow_gs\n        mpg: 25.5\n        cylinders: 4\n        displacement: 122\n        horsepower: 96\n        weight: 2300\n        acceleration: 15.5\n        modelyear: 77\n        origin: 1\n\n      - _id: datsun_f10_hatchback\n        name: datsun_f10_hatchback\n        mpg: 33.5\n        cylinders: 4\n        displacement: 85\n        horsepower: 70\n        weight: 1945\n        acceleration: 16.8\n        modelyear: 77\n        origin: 3\n\n      - _id: chevrolet_caprice_classic\n        name: chevrolet_caprice_classic\n        mpg: 17.5\n        cylinders: 8\n        displacement: 305\n        horsepower: 145\n        weight: 3880\n        acceleration: 12.5\n        modelyear: 77\n        origin: 1\n\n      - _id: oldsmobile_cutlass_supreme\n        name: oldsmobile_cutlass_supreme\n        mpg: 17\n        cylinders: 8\n        displacement: 260\n        horsepower: 110\n        weight: 4060\n        acceleration: 19\n        modelyear: 77\n        origin: 1\n\n      - _id: dodge_monaco_brougham\n        name: dodge_monaco_brougham\n        mpg: 15.5\n        cylinders: 8\n        displacement: 318\n        horsepower: 145\n        weight: 4140\n        acceleration: 13.7\n        modelyear: 77\n        origin: 1\n\n      - _id: mercury_cougar_brougham\n        name: mercury_cougar_brougham\n        mpg: 15\n        cylinders: 8\n        displacement: 302\n        horsepower: 130\n        weight: 4295\n        acceleration: 14.9\n        modelyear: 77\n        origin: 1\n\n      - _id: chevrolet_concours\n        name: chevrolet_concours\n        mpg: 17.5\n        cylinders: 6\n        displacement: 250\n        horsepower: 110\n        weight: 3520\n        acceleration: 16.4\n        modelyear: 77\n        origin: 1\n\n      - _id: buick_skylark\n        name: buick_skylark\n        mpg: 20.5\n        cylinders: 6\n        displacement: 231\n        horsepower: 105\n        weight: 3425\n        acceleration: 16.9\n        modelyear: 77\n        origin: 1\n\n      - _id: plymouth_volare_custom\n        name: plymouth_volare_custom\n        mpg: 19\n        cylinders: 6\n        displacement: 225\n        horsepower: 100\n        weight: 3630\n        acceleration: 17.7\n        modelyear: 77\n        origin: 1\n\n      - _id: ford_granada\n        name: ford_granada\n        mpg: 18.5\n        cylinders: 6\n        displacement: 250\n        horsepower: 98\n        weight: 3525\n        acceleration: 19\n        modelyear: 77\n        origin: 1\n\n      - _id: pontiac_grand_prix_lj\n        name: pontiac_grand_prix_lj\n        mpg: 16\n        cylinders: 8\n        displacement: 400\n        horsepower: 180\n        weight: 4220\n        acceleration: 11.1\n        modelyear: 77\n        origin: 1\n\n      - _id: chevrolet_monte_carlo_landau\n        name: chevrolet_monte_carlo_landau\n        mpg: 15.5\n        cylinders: 8\n        displacement: 350\n        horsepower: 170\n        weight: 4165\n        acceleration: 11.4\n        modelyear: 77\n        origin: 1\n\n      - _id: chrysler_cordoba\n        name: chrysler_cordoba\n        mpg: 15.5\n        cylinders: 8\n        displacement: 400\n        horsepower: 190\n        weight: 4325\n        acceleration: 12.2\n        modelyear: 77\n        origin: 1\n\n      - _id: ford_thunderbird\n        name: ford_thunderbird\n        mpg: 16\n        cylinders: 8\n        displacement: 351\n        horsepower: 149\n        weight: 4335\n        acceleration: 14.5\n        modelyear: 77\n        origin: 1\n\n      - _id: volkswagen_rabbit_custom\n        name: volkswagen_rabbit_custom\n        mpg: 29\n        cylinders: 4\n        displacement: 97\n        horsepower: 78\n        weight: 1940\n        acceleration: 14.5\n        modelyear: 77\n        origin: 2\n\n      - _id: pontiac_sunbird_coupe\n        name: pontiac_sunbird_coupe\n        mpg: 24.5\n        cylinders: 4\n        displacement: 151\n        horsepower: 88\n        weight: 2740\n        acceleration: 16\n        modelyear: 77\n        origin: 1\n\n      - _id: toyota_corolla_liftback\n        name: toyota_corolla_liftback\n        mpg: 26\n        cylinders: 4\n        displacement: 97\n        horsepower: 75\n        weight: 2265\n        acceleration: 18.2\n        modelyear: 77\n        origin: 3\n\n      - _id: ford_mustang_ii_2+2\n        name: ford_mustang_ii_2+2\n        mpg: 25.5\n        cylinders: 4\n        displacement: 140\n        horsepower: 89\n        weight: 2755\n        acceleration: 15.8\n        modelyear: 77\n        origin: 1\n\n      - _id: chevrolet_chevette\n        name: chevrolet_chevette\n        mpg: 30.5\n        cylinders: 4\n        displacement: 98\n        horsepower: 63\n        weight: 2051\n        acceleration: 17\n        modelyear: 77\n        origin: 1\n\n      - _id: dodge_colt_m/m\n        name: dodge_colt_m/m\n        mpg: 33.5\n        cylinders: 4\n        displacement: 98\n        horsepower: 83\n        weight: 2075\n        acceleration: 15.9\n        modelyear: 77\n        origin: 1\n\n      - _id: subaru_dl\n        name: subaru_dl\n        mpg: 30\n        cylinders: 4\n        displacement: 97\n        horsepower: 67\n        weight: 1985\n        acceleration: 16.4\n        modelyear: 77\n        origin: 3\n\n      - _id: volkswagen_dasher\n        name: volkswagen_dasher\n        mpg: 30.5\n        cylinders: 4\n        displacement: 97\n        horsepower: 78\n        weight: 2190\n        acceleration: 14.1\n        modelyear: 77\n        origin: 2\n\n      - _id: datsun_810\n        name: datsun_810\n        mpg: 22\n        cylinders: 6\n        displacement: 146\n        horsepower: 97\n        weight: 2815\n        acceleration: 14.5\n        modelyear: 77\n        origin: 3\n\n      - _id: bmw_320i\n        name: bmw_320i\n        mpg: 21.5\n        cylinders: 4\n        displacement: 121\n        horsepower: 110\n        weight: 2600\n        acceleration: 12.8\n        modelyear: 77\n        origin: 2\n\n      - _id: mazda_rx4\n        name: mazda_rx4\n        mpg: 21.5\n        cylinders: 3\n        displacement: 80\n        horsepower: 110\n        weight: 2720\n        acceleration: 13.5\n        modelyear: 77\n        origin: 3\n\n      - _id: volkswagen_rabbit_custom_diesel\n        name: volkswagen_rabbit_custom_diesel\n        mpg: 43.1\n        cylinders: 4\n        displacement: 90\n        horsepower: 48\n        weight: 1985\n        acceleration: 21.5\n        modelyear: 78\n        origin: 2\n\n      - _id: ford_fiesta\n        name: ford_fiesta\n        mpg: 36.1\n        cylinders: 4\n        displacement: 98\n        horsepower: 66\n        weight: 1800\n        acceleration: 14.4\n        modelyear: 78\n        origin: 1\n\n      - _id: mazda_glc_deluxe\n        name: mazda_glc_deluxe\n        mpg: 32.8\n        cylinders: 4\n        displacement: 78\n        horsepower: 52\n        weight: 1985\n        acceleration: 19.4\n        modelyear: 78\n        origin: 3\n\n      - _id: datsun_b210_gx\n        name: datsun_b210_gx\n        mpg: 39.4\n        cylinders: 4\n        displacement: 85\n        horsepower: 70\n        weight: 2070\n        acceleration: 18.6\n        modelyear: 78\n        origin: 3\n\n      - _id: honda_civic_cvcc\n        name: honda_civic_cvcc\n        mpg: 36.1\n        cylinders: 4\n        displacement: 91\n        horsepower: 60\n        weight: 1800\n        acceleration: 16.4\n        modelyear: 78\n        origin: 3\n\n      - _id: oldsmobile_cutlass_salon_brougham\n        name: oldsmobile_cutlass_salon_brougham\n        mpg: 19.9\n        cylinders: 8\n        displacement: 260\n        horsepower: 110\n        weight: 3365\n        acceleration: 15.5\n        modelyear: 78\n        origin: 1\n\n      - _id: dodge_diplomat\n        name: dodge_diplomat\n        mpg: 19.4\n        cylinders: 8\n        displacement: 318\n        horsepower: 140\n        weight: 3735\n        acceleration: 13.2\n        modelyear: 78\n        origin: 1\n\n      - _id: mercury_monarch_ghia\n        name: mercury_monarch_ghia\n        mpg: 20.2\n        cylinders: 8\n        displacement: 302\n        horsepower: 139\n        weight: 3570\n        acceleration: 12.8\n        modelyear: 78\n        origin: 1\n\n      - _id: pontiac_phoenix_lj\n        name: pontiac_phoenix_lj\n        mpg: 19.2\n        cylinders: 6\n        displacement: 231\n        horsepower: 105\n        weight: 3535\n        acceleration: 19.2\n        modelyear: 78\n        origin: 1\n\n      - _id: chevrolet_malibu\n        name: chevrolet_malibu\n        mpg: 20.5\n        cylinders: 6\n        displacement: 200\n        horsepower: 95\n        weight: 3155\n        acceleration: 18.2\n        modelyear: 78\n        origin: 1\n\n      - _id: ford_fairmont_(auto)\n        name: ford_fairmont_(auto)\n        mpg: 20.2\n        cylinders: 6\n        displacement: 200\n        horsepower: 85\n        weight: 2965\n        acceleration: 15.8\n        modelyear: 78\n        origin: 1\n\n      - _id: ford_fairmont_(man)\n        name: ford_fairmont_(man)\n        mpg: 25.1\n        cylinders: 4\n        displacement: 140\n        horsepower: 88\n        weight: 2720\n        acceleration: 15.4\n        modelyear: 78\n        origin: 1\n\n      - _id: plymouth_volare\n        name: plymouth_volare\n        mpg: 20.5\n        cylinders: 6\n        displacement: 225\n        horsepower: 100\n        weight: 3430\n        acceleration: 17.2\n        modelyear: 78\n        origin: 1\n\n      - _id: amc_concord\n        name: amc_concord\n        mpg: 19.4\n        cylinders: 6\n        displacement: 232\n        horsepower: 90\n        weight: 3210\n        acceleration: 17.2\n        modelyear: 78\n        origin: 1\n\n      - _id: buick_century_special\n        name: buick_century_special\n        mpg: 20.6\n        cylinders: 6\n        displacement: 231\n        horsepower: 105\n        weight: 3380\n        acceleration: 15.8\n        modelyear: 78\n        origin: 1\n\n      - _id: mercury_zephyr\n        name: mercury_zephyr\n        mpg: 20.8\n        cylinders: 6\n        displacement: 200\n        horsepower: 85\n        weight: 3070\n        acceleration: 16.7\n        modelyear: 78\n        origin: 1\n\n      - _id: dodge_aspen\n        name: dodge_aspen\n        mpg: 18.6\n        cylinders: 6\n        displacement: 225\n        horsepower: 110\n        weight: 3620\n        acceleration: 18.7\n        modelyear: 78\n        origin: 1\n\n      - _id: amc_concord_d/l\n        name: amc_concord_d/l\n        mpg: 18.1\n        cylinders: 6\n        displacement: 258\n        horsepower: 120\n        weight: 3410\n        acceleration: 15.1\n        modelyear: 78\n        origin: 1\n\n      - _id: chevrolet_monte_carlo_landau\n        name: chevrolet_monte_carlo_landau\n        mpg: 19.2\n        cylinders: 8\n        displacement: 305\n        horsepower: 145\n        weight: 3425\n        acceleration: 13.2\n        modelyear: 78\n        origin: 1\n\n      - _id: buick_regal_sport_coupe_(turbo)\n        name: buick_regal_sport_coupe_(turbo)\n        mpg: 17.7\n        cylinders: 6\n        displacement: 231\n        horsepower: 165\n        weight: 3445\n        acceleration: 13.4\n        modelyear: 78\n        origin: 1\n\n      - _id: ford_futura\n        name: ford_futura\n        mpg: 18.1\n        cylinders: 8\n        displacement: 302\n        horsepower: 139\n        weight: 3205\n        acceleration: 11.2\n        modelyear: 78\n        origin: 1\n\n      - _id: dodge_magnum_xe\n        name: dodge_magnum_xe\n        mpg: 17.5\n        cylinders: 8\n        displacement: 318\n        horsepower: 140\n        weight: 4080\n        acceleration: 13.7\n        modelyear: 78\n        origin: 1\n\n      - _id: chevrolet_chevette\n        name: chevrolet_chevette\n        mpg: 30\n        cylinders: 4\n        displacement: 98\n        horsepower: 68\n        weight: 2155\n        acceleration: 16.5\n        modelyear: 78\n        origin: 1\n\n      - _id: toyota_corona\n        name: toyota_corona\n        mpg: 27.5\n        cylinders: 4\n        displacement: 134\n        horsepower: 95\n        weight: 2560\n        acceleration: 14.2\n        modelyear: 78\n        origin: 3\n\n      - _id: datsun_510\n        name: datsun_510\n        mpg: 27.2\n        cylinders: 4\n        displacement: 119\n        horsepower: 97\n        weight: 2300\n        acceleration: 14.7\n        modelyear: 78\n        origin: 3\n\n      - _id: dodge_omni\n        name: dodge_omni\n        mpg: 30.9\n        cylinders: 4\n        displacement: 105\n        horsepower: 75\n        weight: 2230\n        acceleration: 14.5\n        modelyear: 78\n        origin: 1\n\n      - _id: toyota_celica_gt_liftback\n        name: toyota_celica_gt_liftback\n        mpg: 21.1\n        cylinders: 4\n        displacement: 134\n        horsepower: 95\n        weight: 2515\n        acceleration: 14.8\n        modelyear: 78\n        origin: 3\n\n      - _id: plymouth_sapporo\n        name: plymouth_sapporo\n        mpg: 23.2\n        cylinders: 4\n        displacement: 156\n        horsepower: 105\n        weight: 2745\n        acceleration: 16.7\n        modelyear: 78\n        origin: 1\n\n      - _id: oldsmobile_starfire_sx\n        name: oldsmobile_starfire_sx\n        mpg: 23.8\n        cylinders: 4\n        displacement: 151\n        horsepower: 85\n        weight: 2855\n        acceleration: 17.6\n        modelyear: 78\n        origin: 1\n\n      - _id: datsun_200sx\n        name: datsun_200sx\n        mpg: 23.9\n        cylinders: 4\n        displacement: 119\n        horsepower: 97\n        weight: 2405\n        acceleration: 14.9\n        modelyear: 78\n        origin: 3\n\n      - _id: audi_5000\n        name: audi_5000\n        mpg: 20.3\n        cylinders: 5\n        displacement: 131\n        horsepower: 103\n        weight: 2830\n        acceleration: 15.9\n        modelyear: 78\n        origin: 2\n\n      - _id: volvo_264gl\n        name: volvo_264gl\n        mpg: 17\n        cylinders: 6\n        displacement: 163\n        horsepower: 125\n        weight: 3140\n        acceleration: 13.6\n        modelyear: 78\n        origin: 2\n\n      - _id: saab_99gle\n        name: saab_99gle\n        mpg: 21.6\n        cylinders: 4\n        displacement: 121\n        horsepower: 115\n        weight: 2795\n        acceleration: 15.7\n        modelyear: 78\n        origin: 2\n\n      - _id: peugeot_604sl\n        name: peugeot_604sl\n        mpg: 16.2\n        cylinders: 6\n        displacement: 163\n        horsepower: 133\n        weight: 3410\n        acceleration: 15.8\n        modelyear: 78\n        origin: 2\n\n      - _id: volkswagen_scirocco\n        name: volkswagen_scirocco\n        mpg: 31.5\n        cylinders: 4\n        displacement: 89\n        horsepower: 71\n        weight: 1990\n        acceleration: 14.9\n        modelyear: 78\n        origin: 2\n\n      - _id: honda_accord_lx\n        name: honda_accord_lx\n        mpg: 29.5\n        cylinders: 4\n        displacement: 98\n        horsepower: 68\n        weight: 2135\n        acceleration: 16.6\n        modelyear: 78\n        origin: 3\n\n      - _id: pontiac_lemans_v6\n        name: pontiac_lemans_v6\n        mpg: 21.5\n        cylinders: 6\n        displacement: 231\n        horsepower: 115\n        weight: 3245\n        acceleration: 15.4\n        modelyear: 79\n        origin: 1\n\n      - _id: mercury_zephyr_6\n        name: mercury_zephyr_6\n        mpg: 19.8\n        cylinders: 6\n        displacement: 200\n        horsepower: 85\n        weight: 2990\n        acceleration: 18.2\n        modelyear: 79\n        origin: 1\n\n      - _id: ford_fairmont_4\n        name: ford_fairmont_4\n        mpg: 22.3\n        cylinders: 4\n        displacement: 140\n        horsepower: 88\n        weight: 2890\n        acceleration: 17.3\n        modelyear: 79\n        origin: 1\n\n      - _id: amc_concord_dl_6\n        name: amc_concord_dl_6\n        mpg: 20.2\n        cylinders: 6\n        displacement: 232\n        horsepower: 90\n        weight: 3265\n        acceleration: 18.2\n        modelyear: 79\n        origin: 1\n\n      - _id: dodge_aspen_6\n        name: dodge_aspen_6\n        mpg: 20.6\n        cylinders: 6\n        displacement: 225\n        horsepower: 110\n        weight: 3360\n        acceleration: 16.6\n        modelyear: 79\n        origin: 1\n\n      - _id: chevrolet_caprice_classic\n        name: chevrolet_caprice_classic\n        mpg: 17\n        cylinders: 8\n        displacement: 305\n        horsepower: 130\n        weight: 3840\n        acceleration: 15.4\n        modelyear: 79\n        origin: 1\n\n      - _id: ford_ltd_landau\n        name: ford_ltd_landau\n        mpg: 17.6\n        cylinders: 8\n        displacement: 302\n        horsepower: 129\n        weight: 3725\n        acceleration: 13.4\n        modelyear: 79\n        origin: 1\n\n      - _id: mercury_grand_marquis\n        name: mercury_grand_marquis\n        mpg: 16.5\n        cylinders: 8\n        displacement: 351\n        horsepower: 138\n        weight: 3955\n        acceleration: 13.2\n        modelyear: 79\n        origin: 1\n\n      - _id: dodge_st._regis\n        name: dodge_st._regis\n        mpg: 18.2\n        cylinders: 8\n        displacement: 318\n        horsepower: 135\n        weight: 3830\n        acceleration: 15.2\n        modelyear: 79\n        origin: 1\n\n      - _id: buick_estate_wagon_(sw)\n        name: buick_estate_wagon_(sw)\n        mpg: 16.9\n        cylinders: 8\n        displacement: 350\n        horsepower: 155\n        weight: 4360\n        acceleration: 14.9\n        modelyear: 79\n        origin: 1\n\n      - _id: ford_country_squire_(sw)\n        name: ford_country_squire_(sw)\n        mpg: 15.5\n        cylinders: 8\n        displacement: 351\n        horsepower: 142\n        weight: 4054\n        acceleration: 14.3\n        modelyear: 79\n        origin: 1\n\n      - _id: chevrolet_malibu_classic_(sw)\n        name: chevrolet_malibu_classic_(sw)\n        mpg: 19.2\n        cylinders: 8\n        displacement: 267\n        horsepower: 125\n        weight: 3605\n        acceleration: 15\n        modelyear: 79\n        origin: 1\n\n      - _id: chrysler_lebaron_town_@_country_(sw)\n        name: chrysler_lebaron_town_@_country_(sw)\n        mpg: 18.5\n        cylinders: 8\n        displacement: 360\n        horsepower: 150\n        weight: 3940\n        acceleration: 13\n        modelyear: 79\n        origin: 1\n\n      - _id: vw_rabbit_custom\n        name: vw_rabbit_custom\n        mpg: 31.9\n        cylinders: 4\n        displacement: 89\n        horsepower: 71\n        weight: 1925\n        acceleration: 14\n        modelyear: 79\n        origin: 2\n\n      - _id: maxda_glc_deluxe\n        name: maxda_glc_deluxe\n        mpg: 34.1\n        cylinders: 4\n        displacement: 86\n        horsepower: 65\n        weight: 1975\n        acceleration: 15.2\n        modelyear: 79\n        origin: 3\n\n      - _id: dodge_colt_hatchback_custom\n        name: dodge_colt_hatchback_custom\n        mpg: 35.7\n        cylinders: 4\n        displacement: 98\n        horsepower: 80\n        weight: 1915\n        acceleration: 14.4\n        modelyear: 79\n        origin: 1\n\n      - _id: amc_spirit_dl\n        name: amc_spirit_dl\n        mpg: 27.4\n        cylinders: 4\n        displacement: 121\n        horsepower: 80\n        weight: 2670\n        acceleration: 15\n        modelyear: 79\n        origin: 1\n\n      - _id: mercedes_benz_300d\n        name: mercedes_benz_300d\n        mpg: 25.4\n        cylinders: 5\n        displacement: 183\n        horsepower: 77\n        weight: 3530\n        acceleration: 20.1\n        modelyear: 79\n        origin: 2\n\n      - _id: cadillac_eldorado\n        name: cadillac_eldorado\n        mpg: 23\n        cylinders: 8\n        displacement: 350\n        horsepower: 125\n        weight: 3900\n        acceleration: 17.4\n        modelyear: 79\n        origin: 1\n\n      - _id: peugeot_504\n        name: peugeot_504\n        mpg: 27.2\n        cylinders: 4\n        displacement: 141\n        horsepower: 71\n        weight: 3190\n        acceleration: 24.8\n        modelyear: 79\n        origin: 2\n\n      - _id: oldsmobile_cutlass_salon_brougham\n        name: oldsmobile_cutlass_salon_brougham\n        mpg: 23.9\n        cylinders: 8\n        displacement: 260\n        horsepower: 90\n        weight: 3420\n        acceleration: 22.2\n        modelyear: 79\n        origin: 1\n\n      - _id: plymouth_horizon\n        name: plymouth_horizon\n        mpg: 34.2\n        cylinders: 4\n        displacement: 105\n        horsepower: 70\n        weight: 2200\n        acceleration: 13.2\n        modelyear: 79\n        origin: 1\n\n      - _id: plymouth_horizon_tc3\n        name: plymouth_horizon_tc3\n        mpg: 34.5\n        cylinders: 4\n        displacement: 105\n        horsepower: 70\n        weight: 2150\n        acceleration: 14.9\n        modelyear: 79\n        origin: 1\n\n      - _id: datsun_210\n        name: datsun_210\n        mpg: 31.8\n        cylinders: 4\n        displacement: 85\n        horsepower: 65\n        weight: 2020\n        acceleration: 19.2\n        modelyear: 79\n        origin: 3\n\n      - _id: fiat_strada_custom\n        name: fiat_strada_custom\n        mpg: 37.3\n        cylinders: 4\n        displacement: 91\n        horsepower: 69\n        weight: 2130\n        acceleration: 14.7\n        modelyear: 79\n        origin: 2\n\n      - _id: buick_skylark_limited\n        name: buick_skylark_limited\n        mpg: 28.4\n        cylinders: 4\n        displacement: 151\n        horsepower: 90\n        weight: 2670\n        acceleration: 16\n        modelyear: 79\n        origin: 1\n\n      - _id: chevrolet_citation\n        name: chevrolet_citation\n        mpg: 28.8\n        cylinders: 6\n        displacement: 173\n        horsepower: 115\n        weight: 2595\n        acceleration: 11.3\n        modelyear: 79\n        origin: 1\n\n      - _id: oldsmobile_omega_brougham\n        name: oldsmobile_omega_brougham\n        mpg: 26.8\n        cylinders: 6\n        displacement: 173\n        horsepower: 115\n        weight: 2700\n        acceleration: 12.9\n        modelyear: 79\n        origin: 1\n\n      - _id: pontiac_phoenix\n        name: pontiac_phoenix\n        mpg: 33.5\n        cylinders: 4\n        displacement: 151\n        horsepower: 90\n        weight: 2556\n        acceleration: 13.2\n        modelyear: 79\n        origin: 1\n\n      - _id: vw_rabbit\n        name: vw_rabbit\n        mpg: 41.5\n        cylinders: 4\n        displacement: 98\n        horsepower: 76\n        weight: 2144\n        acceleration: 14.7\n        modelyear: 80\n        origin: 2\n\n      - _id: toyota_corolla_tercel\n        name: toyota_corolla_tercel\n        mpg: 38.1\n        cylinders: 4\n        displacement: 89\n        horsepower: 60\n        weight: 1968\n        acceleration: 18.8\n        modelyear: 80\n        origin: 3\n\n      - _id: chevrolet_chevette\n        name: chevrolet_chevette\n        mpg: 32.1\n        cylinders: 4\n        displacement: 98\n        horsepower: 70\n        weight: 2120\n        acceleration: 15.5\n        modelyear: 80\n        origin: 1\n\n      - _id: datsun_310\n        name: datsun_310\n        mpg: 37.2\n        cylinders: 4\n        displacement: 86\n        horsepower: 65\n        weight: 2019\n        acceleration: 16.4\n        modelyear: 80\n        origin: 3\n\n      - _id: chevrolet_citation\n        name: chevrolet_citation\n        mpg: 28\n        cylinders: 4\n        displacement: 151\n        horsepower: 90\n        weight: 2678\n        acceleration: 16.5\n        modelyear: 80\n        origin: 1\n\n      - _id: ford_fairmont\n        name: ford_fairmont\n        mpg: 26.4\n        cylinders: 4\n        displacement: 140\n        horsepower: 88\n        weight: 2870\n        acceleration: 18.1\n        modelyear: 80\n        origin: 1\n\n      - _id: amc_concord\n        name: amc_concord\n        mpg: 24.3\n        cylinders: 4\n        displacement: 151\n        horsepower: 90\n        weight: 3003\n        acceleration: 20.1\n        modelyear: 80\n        origin: 1\n\n      - _id: dodge_aspen\n        name: dodge_aspen\n        mpg: 19.1\n        cylinders: 6\n        displacement: 225\n        horsepower: 90\n        weight: 3381\n        acceleration: 18.7\n        modelyear: 80\n        origin: 1\n\n      - _id: audi_4000\n        name: audi_4000\n        mpg: 34.3\n        cylinders: 4\n        displacement: 97\n        horsepower: 78\n        weight: 2188\n        acceleration: 15.8\n        modelyear: 80\n        origin: 2\n\n      - _id: toyota_corona_liftback\n        name: toyota_corona_liftback\n        mpg: 29.8\n        cylinders: 4\n        displacement: 134\n        horsepower: 90\n        weight: 2711\n        acceleration: 15.5\n        modelyear: 80\n        origin: 3\n\n      - _id: mazda_626\n        name: mazda_626\n        mpg: 31.3\n        cylinders: 4\n        displacement: 120\n        horsepower: 75\n        weight: 2542\n        acceleration: 17.5\n        modelyear: 80\n        origin: 3\n\n      - _id: datsun_510_hatchback\n        name: datsun_510_hatchback\n        mpg: 37\n        cylinders: 4\n        displacement: 119\n        horsepower: 92\n        weight: 2434\n        acceleration: 15\n        modelyear: 80\n        origin: 3\n\n      - _id: toyota_corolla\n        name: toyota_corolla\n        mpg: 32.2\n        cylinders: 4\n        displacement: 108\n        horsepower: 75\n        weight: 2265\n        acceleration: 15.2\n        modelyear: 80\n        origin: 3\n\n      - _id: mazda_glc\n        name: mazda_glc\n        mpg: 46.6\n        cylinders: 4\n        displacement: 86\n        horsepower: 65\n        weight: 2110\n        acceleration: 17.9\n        modelyear: 80\n        origin: 3\n\n      - _id: dodge_colt\n        name: dodge_colt\n        mpg: 27.9\n        cylinders: 4\n        displacement: 156\n        horsepower: 105\n        weight: 2800\n        acceleration: 14.4\n        modelyear: 80\n        origin: 1\n\n      - _id: datsun_210\n        name: datsun_210\n        mpg: 40.8\n        cylinders: 4\n        displacement: 85\n        horsepower: 65\n        weight: 2110\n        acceleration: 19.2\n        modelyear: 80\n        origin: 3\n\n      - _id: vw_rabbit_c_(diesel)\n        name: vw_rabbit_c_(diesel)\n        mpg: 44.3\n        cylinders: 4\n        displacement: 90\n        horsepower: 48\n        weight: 2085\n        acceleration: 21.7\n        modelyear: 80\n        origin: 2\n\n      - _id: vw_dasher_(diesel)\n        name: vw_dasher_(diesel)\n        mpg: 43.4\n        cylinders: 4\n        displacement: 90\n        horsepower: 48\n        weight: 2335\n        acceleration: 23.7\n        modelyear: 80\n        origin: 2\n\n      - _id: audi_5000s_(diesel)\n        name: audi_5000s_(diesel)\n        mpg: 36.4\n        cylinders: 5\n        displacement: 121\n        horsepower: 67\n        weight: 2950\n        acceleration: 19.9\n        modelyear: 80\n        origin: 2\n\n      - _id: mercedesbenz_240d\n        name: mercedesbenz_240d\n        mpg: 30\n        cylinders: 4\n        displacement: 146\n        horsepower: 67\n        weight: 3250\n        acceleration: 21.8\n        modelyear: 80\n        origin: 2\n\n      - _id: honda_civic_1500_gl\n        name: honda_civic_1500_gl\n        mpg: 44.6\n        cylinders: 4\n        displacement: 91\n        horsepower: 67\n        weight: 1850\n        acceleration: 13.8\n        modelyear: 80\n        origin: 3\n\n      - _id: renault_lecar_deluxe\n        name: renault_lecar_deluxe\n        mpg: 40.9\n        cylinders: 4\n        displacement: 85\n        horsepower: 40\n        weight: 1835\n        acceleration: 17.3\n        modelyear: 80\n        origin: 2\n\n      - _id: subaru_dl\n        name: subaru_dl\n        mpg: 33.8\n        cylinders: 4\n        displacement: 97\n        horsepower: 67\n        weight: 2145\n        acceleration: 18\n        modelyear: 80\n        origin: 3\n\n      - _id: vokswagen_rabbit\n        name: vokswagen_rabbit\n        mpg: 29.8\n        cylinders: 4\n        displacement: 89\n        horsepower: 62\n        weight: 1845\n        acceleration: 15.3\n        modelyear: 80\n        origin: 2\n\n      - _id: datsun_280zx\n        name: datsun_280zx\n        mpg: 32.7\n        cylinders: 6\n        displacement: 168\n        horsepower: 132\n        weight: 2910\n        acceleration: 11.4\n        modelyear: 80\n        origin: 3\n\n      - _id: mazda_rx7_gs\n        name: mazda_rx7_gs\n        mpg: 23.7\n        cylinders: 3\n        displacement: 70\n        horsepower: 100\n        weight: 2420\n        acceleration: 12.5\n        modelyear: 80\n        origin: 3\n\n      - _id: triumph_tr7_coupe\n        name: triumph_tr7_coupe\n        mpg: 35\n        cylinders: 4\n        displacement: 122\n        horsepower: 88\n        weight: 2500\n        acceleration: 15.1\n        modelyear: 80\n        origin: 2\n\n      - _id: ford_mustang_cobra\n        name: ford_mustang_cobra\n        mpg: 23.6\n        cylinders: 4\n        displacement: 140\n        horsepower: 40\n        weight: 2905\n        acceleration: 14.3\n        modelyear: 80\n        origin: 1\n\n      - _id: honda_accord\n        name: honda_accord\n        mpg: 32.4\n        cylinders: 4\n        displacement: 107\n        horsepower: 72\n        weight: 2290\n        acceleration: 17\n        modelyear: 80\n        origin: 3\n\n      - _id: plymouth_reliant\n        name: plymouth_reliant\n        mpg: 27.2\n        cylinders: 4\n        displacement: 135\n        horsepower: 84\n        weight: 2490\n        acceleration: 15.7\n        modelyear: 81\n        origin: 1\n\n      - _id: buick_skylark\n        name: buick_skylark\n        mpg: 26.6\n        cylinders: 4\n        displacement: 151\n        horsepower: 84\n        weight: 2635\n        acceleration: 16.4\n        modelyear: 81\n        origin: 1\n\n      - _id: dodge_aries_wagon_(sw)\n        name: dodge_aries_wagon_(sw)\n        mpg: 25.8\n        cylinders: 4\n        displacement: 156\n        horsepower: 92\n        weight: 2620\n        acceleration: 14.4\n        modelyear: 81\n        origin: 1\n\n      - _id: chevrolet_citation\n        name: chevrolet_citation\n        mpg: 23.5\n        cylinders: 6\n        displacement: 173\n        horsepower: 110\n        weight: 2725\n        acceleration: 12.6\n        modelyear: 81\n        origin: 1\n\n      - _id: plymouth_reliant\n        name: plymouth_reliant\n        mpg: 30\n        cylinders: 4\n        displacement: 135\n        horsepower: 84\n        weight: 2385\n        acceleration: 12.9\n        modelyear: 81\n        origin: 1\n\n      - _id: toyota_starlet\n        name: toyota_starlet\n        mpg: 39.1\n        cylinders: 4\n        displacement: 79\n        horsepower: 58\n        weight: 1755\n        acceleration: 16.9\n        modelyear: 81\n        origin: 3\n\n      - _id: plymouth_champ\n        name: plymouth_champ\n        mpg: 39\n        cylinders: 4\n        displacement: 86\n        horsepower: 64\n        weight: 1875\n        acceleration: 16.4\n        modelyear: 81\n        origin: 1\n\n      - _id: honda_civic_1300\n        name: honda_civic_1300\n        mpg: 35.1\n        cylinders: 4\n        displacement: 81\n        horsepower: 60\n        weight: 1760\n        acceleration: 16.1\n        modelyear: 81\n        origin: 3\n\n      - _id: subaru\n        name: subaru\n        mpg: 32.3\n        cylinders: 4\n        displacement: 97\n        horsepower: 67\n        weight: 2065\n        acceleration: 17.8\n        modelyear: 81\n        origin: 3\n\n      - _id: datsun_210_mpg\n        name: datsun_210_mpg\n        mpg: 37\n        cylinders: 4\n        displacement: 85\n        horsepower: 65\n        weight: 1975\n        acceleration: 19.4\n        modelyear: 81\n        origin: 3\n\n      - _id: toyota_tercel\n        name: toyota_tercel\n        mpg: 37.7\n        cylinders: 4\n        displacement: 89\n        horsepower: 62\n        weight: 2050\n        acceleration: 17.3\n        modelyear: 81\n        origin: 3\n\n      - _id: mazda_glc_4\n        name: mazda_glc_4\n        mpg: 34.1\n        cylinders: 4\n        displacement: 91\n        horsepower: 68\n        weight: 1985\n        acceleration: 16\n        modelyear: 81\n        origin: 3\n\n      - _id: plymouth_horizon_4\n        name: plymouth_horizon_4\n        mpg: 34.7\n        cylinders: 4\n        displacement: 105\n        horsepower: 63\n        weight: 2215\n        acceleration: 14.9\n        modelyear: 81\n        origin: 1\n\n      - _id: ford_escort_4w\n        name: ford_escort_4w\n        mpg: 34.4\n        cylinders: 4\n        displacement: 98\n        horsepower: 65\n        weight: 2045\n        acceleration: 16.2\n        modelyear: 81\n        origin: 1\n\n      - _id: ford_escort_2h\n        name: ford_escort_2h\n        mpg: 29.9\n        cylinders: 4\n        displacement: 98\n        horsepower: 65\n        weight: 2380\n        acceleration: 20.7\n        modelyear: 81\n        origin: 1\n\n      - _id: volkswagen_jetta\n        name: volkswagen_jetta\n        mpg: 33\n        cylinders: 4\n        displacement: 105\n        horsepower: 74\n        weight: 2190\n        acceleration: 14.2\n        modelyear: 81\n        origin: 2\n\n      - _id: renault_18i\n        name: renault_18i\n        mpg: 34.5\n        cylinders: 4\n        displacement: 100\n        horsepower: 40\n        weight: 2320\n        acceleration: 15.8\n        modelyear: 81\n        origin: 2\n\n      - _id: honda_prelude\n        name: honda_prelude\n        mpg: 33.7\n        cylinders: 4\n        displacement: 107\n        horsepower: 75\n        weight: 2210\n        acceleration: 14.4\n        modelyear: 81\n        origin: 3\n\n      - _id: toyota_corolla\n        name: toyota_corolla\n        mpg: 32.4\n        cylinders: 4\n        displacement: 108\n        horsepower: 75\n        weight: 2350\n        acceleration: 16.8\n        modelyear: 81\n        origin: 3\n\n      - _id: datsun_200sx\n        name: datsun_200sx\n        mpg: 32.9\n        cylinders: 4\n        displacement: 119\n        horsepower: 100\n        weight: 2615\n        acceleration: 14.8\n        modelyear: 81\n        origin: 3\n\n      - _id: mazda_626\n        name: mazda_626\n        mpg: 31.6\n        cylinders: 4\n        displacement: 120\n        horsepower: 74\n        weight: 2635\n        acceleration: 18.3\n        modelyear: 81\n        origin: 3\n\n      - _id: peugeot_505s_turbo_diesel\n        name: peugeot_505s_turbo_diesel\n        mpg: 28.1\n        cylinders: 4\n        displacement: 141\n        horsepower: 80\n        weight: 3230\n        acceleration: 20.4\n        modelyear: 81\n        origin: 2\n\n      - _id: saab_900s\n        name: saab_900s\n        mpg: 47\n        cylinders: 4\n        displacement: 121\n        horsepower: 110\n        weight: 2800\n        acceleration: 15.4\n        modelyear: 81\n        origin: 2\n\n      - _id: volvo_diesel\n        name: volvo_diesel\n        mpg: 30.7\n        cylinders: 6\n        displacement: 145\n        horsepower: 76\n        weight: 3160\n        acceleration: 19.6\n        modelyear: 81\n        origin: 2\n\n      - _id: toyota_cressida\n        name: toyota_cressida\n        mpg: 25.4\n        cylinders: 6\n        displacement: 168\n        horsepower: 116\n        weight: 2900\n        acceleration: 12.6\n        modelyear: 81\n        origin: 3\n\n      - _id: datsun_810_maxima\n        name: datsun_810_maxima\n        mpg: 24.2\n        cylinders: 6\n        displacement: 146\n        horsepower: 120\n        weight: 2930\n        acceleration: 13.8\n        modelyear: 81\n        origin: 3\n\n      - _id: buick_century\n        name: buick_century\n        mpg: 22.4\n        cylinders: 6\n        displacement: 231\n        horsepower: 110\n        weight: 3415\n        acceleration: 15.8\n        modelyear: 81\n        origin: 1\n\n      - _id: oldsmobile_cutlass_ls\n        name: oldsmobile_cutlass_ls\n        mpg: 26.6\n        cylinders: 8\n        displacement: 350\n        horsepower: 105\n        weight: 3725\n        acceleration: 19\n        modelyear: 81\n        origin: 1\n\n      - _id: ford_granada_gl\n        name: ford_granada_gl\n        mpg: 20.2\n        cylinders: 6\n        displacement: 200\n        horsepower: 88\n        weight: 3060\n        acceleration: 17.1\n        modelyear: 81\n        origin: 1\n\n      - _id: chrysler_lebaron_salon\n        name: chrysler_lebaron_salon\n        mpg: 17.6\n        cylinders: 6\n        displacement: 225\n        horsepower: 85\n        weight: 3465\n        acceleration: 16.6\n        modelyear: 81\n        origin: 1\n\n      - _id: chevrolet_cavalier\n        name: chevrolet_cavalier\n        mpg: 28\n        cylinders: 4\n        displacement: 112\n        horsepower: 88\n        weight: 2605\n        acceleration: 19.6\n        modelyear: 82\n        origin: 1\n\n      - _id: chevrolet_cavalier_wagon\n        name: chevrolet_cavalier_wagon\n        mpg: 27\n        cylinders: 4\n        displacement: 112\n        horsepower: 88\n        weight: 2640\n        acceleration: 18.6\n        modelyear: 82\n        origin: 1\n\n      - _id: chevrolet_cavalier_2door\n        name: chevrolet_cavalier_2door\n        mpg: 34\n        cylinders: 4\n        displacement: 112\n        horsepower: 88\n        weight: 2395\n        acceleration: 18\n        modelyear: 82\n        origin: 1\n\n      - _id: pontiac_j2000_se_hatchback\n        name: pontiac_j2000_se_hatchback\n        mpg: 31\n        cylinders: 4\n        displacement: 112\n        horsepower: 85\n        weight: 2575\n        acceleration: 16.2\n        modelyear: 82\n        origin: 1\n\n      - _id: dodge_aries_se\n        name: dodge_aries_se\n        mpg: 29\n        cylinders: 4\n        displacement: 135\n        horsepower: 84\n        weight: 2525\n        acceleration: 16\n        modelyear: 82\n        origin: 1\n\n      - _id: pontiac_phoenix\n        name: pontiac_phoenix\n        mpg: 27\n        cylinders: 4\n        displacement: 151\n        horsepower: 90\n        weight: 2735\n        acceleration: 18\n        modelyear: 82\n        origin: 1\n\n      - _id: ford_fairmont_futura\n        name: ford_fairmont_futura\n        mpg: 24\n        cylinders: 4\n        displacement: 140\n        horsepower: 92\n        weight: 2865\n        acceleration: 16.4\n        modelyear: 82\n        origin: 1\n\n      - _id: amc_concord_dl\n        name: amc_concord_dl\n        mpg: 23\n        cylinders: 4\n        displacement: 151\n        horsepower: 40\n        weight: 3035\n        acceleration: 20.5\n        modelyear: 82\n        origin: 1\n\n      - _id: volkswagen_rabbit_l\n        name: volkswagen_rabbit_l\n        mpg: 36\n        cylinders: 4\n        displacement: 105\n        horsepower: 74\n        weight: 1980\n        acceleration: 15.3\n        modelyear: 82\n        origin: 2\n\n      - _id: mazda_glc_custom_l\n        name: mazda_glc_custom_l\n        mpg: 37\n        cylinders: 4\n        displacement: 91\n        horsepower: 68\n        weight: 2025\n        acceleration: 18.2\n        modelyear: 82\n        origin: 3\n\n      - _id: mazda_glc_custom\n        name: mazda_glc_custom\n        mpg: 31\n        cylinders: 4\n        displacement: 91\n        horsepower: 68\n        weight: 1970\n        acceleration: 17.6\n        modelyear: 82\n        origin: 3\n\n      - _id: plymouth_horizon_miser\n        name: plymouth_horizon_miser\n        mpg: 38\n        cylinders: 4\n        displacement: 105\n        horsepower: 63\n        weight: 2125\n        acceleration: 14.7\n        modelyear: 82\n        origin: 1\n\n      - _id: mercury_lynx_l\n        name: mercury_lynx_l\n        mpg: 36\n        cylinders: 4\n        displacement: 98\n        horsepower: 70\n        weight: 2125\n        acceleration: 17.3\n        modelyear: 82\n        origin: 1\n\n      - _id: nissan_stanza_xe\n        name: nissan_stanza_xe\n        mpg: 36\n        cylinders: 4\n        displacement: 120\n        horsepower: 88\n        weight: 2160\n        acceleration: 14.5\n        modelyear: 82\n        origin: 3\n\n      - _id: honda_accord\n        name: honda_accord\n        mpg: 36\n        cylinders: 4\n        displacement: 107\n        horsepower: 75\n        weight: 2205\n        acceleration: 14.5\n        modelyear: 82\n        origin: 3\n\n      - _id: toyota_corolla\n        name: toyota_corolla\n        mpg: 34\n        cylinders: 4\n        displacement: 108\n        horsepower: 70\n        weight: 2245\n        acceleration: 16.9\n        modelyear: 82\n        origin: 3\n\n      - _id: honda_civic\n        name: honda_civic\n        mpg: 38\n        cylinders: 4\n        displacement: 91\n        horsepower: 67\n        weight: 1965\n        acceleration: 15\n        modelyear: 82\n        origin: 3\n\n      - _id: honda_civic_(auto)\n        name: honda_civic_(auto)\n        mpg: 32\n        cylinders: 4\n        displacement: 91\n        horsepower: 67\n        weight: 1965\n        acceleration: 15.7\n        modelyear: 82\n        origin: 3\n\n      - _id: datsun_310_gx\n        name: datsun_310_gx\n        mpg: 38\n        cylinders: 4\n        displacement: 91\n        horsepower: 67\n        weight: 1995\n        acceleration: 16.2\n        modelyear: 82\n        origin: 3\n\n      - _id: buick_century_limited\n        name: buick_century_limited\n        mpg: 25\n        cylinders: 6\n        displacement: 181\n        horsepower: 110\n        weight: 2945\n        acceleration: 16.4\n        modelyear: 82\n        origin: 1\n\n      - _id: oldsmobile_cutlass_ciera_(diesel)\n        name: oldsmobile_cutlass_ciera_(diesel)\n        mpg: 38\n        cylinders: 6\n        displacement: 262\n        horsepower: 85\n        weight: 3015\n        acceleration: 17\n        modelyear: 82\n        origin: 1\n\n      - _id: chrysler_lebaron_medallion\n        name: chrysler_lebaron_medallion\n        mpg: 26\n        cylinders: 4\n        displacement: 156\n        horsepower: 92\n        weight: 2585\n        acceleration: 14.5\n        modelyear: 82\n        origin: 1\n\n      - _id: ford_granada_l\n        name: ford_granada_l\n        mpg: 22\n        cylinders: 6\n        displacement: 232\n        horsepower: 112\n        weight: 2835\n        acceleration: 14.7\n        modelyear: 82\n        origin: 1\n\n      - _id: toyota_celica_gt\n        name: toyota_celica_gt\n        mpg: 32\n        cylinders: 4\n        displacement: 144\n        horsepower: 96\n        weight: 2665\n        acceleration: 13.9\n        modelyear: 82\n        origin: 3\n\n      - _id: dodge_charger_2.2\n        name: dodge_charger_2.2\n        mpg: 36\n        cylinders: 4\n        displacement: 135\n        horsepower: 84\n        weight: 2370\n        acceleration: 13\n        modelyear: 82\n        origin: 1\n\n      - _id: chevrolet_camaro\n        name: chevrolet_camaro\n        mpg: 27\n        cylinders: 4\n        displacement: 151\n        horsepower: 90\n        weight: 2950\n        acceleration: 17.3\n        modelyear: 82\n        origin: 1\n\n      - _id: ford_mustang_gl\n        name: ford_mustang_gl\n        mpg: 27\n        cylinders: 4\n        displacement: 140\n        horsepower: 86\n        weight: 2790\n        acceleration: 15.6\n        modelyear: 82\n        origin: 1\n\n      - _id: vw_pickup\n        name: vw_pickup\n        mpg: 44\n        cylinders: 4\n        displacement: 97\n        horsepower: 52\n        weight: 2130\n        acceleration: 24.6\n        modelyear: 82\n        origin: 2\n\n      - _id: dodge_rampage\n        name: dodge_rampage\n        mpg: 32\n        cylinders: 4\n        displacement: 135\n        horsepower: 84\n        weight: 2295\n        acceleration: 11.6\n        modelyear: 82\n        origin: 1\n\n      - _id: ford_ranger\n        name: ford_ranger\n        mpg: 28\n        cylinders: 4\n        displacement: 120\n        horsepower: 79\n        weight: 2625\n        acceleration: 18.6\n        modelyear: 82\n        origin: 1\n\n      - _id: chevy_s10\n        name: chevy_s10\n        mpg: 31\n        cylinders: 4\n        displacement: 119\n        horsepower: 82\n        weight: 2720\n        acceleration: 19.4\n        modelyear: 82\n        origin: 1\n", 
    "name": "Car Data"
  }, 
  {
    "yaml": "schema:\n  type: object\n  fields:\n    nodes:\n      type: collection\n      fields:\n        name: { type: string }\n        group: { type: number, min: 0, max: 10 }\n    links:\n      type: collection\n      fields:\n        source:\n          type: reference\n          of: \"[nodes]\"\n        target:\n          type: reference\n          of: \"[nodes]\"\n        value: { type: number, min: 0, max: 10 }\n\ndata:\n  nodes:\n    - name: Myriel\n      group: 1\n      _id: \"0\"\n    - name: Napoleon\n      group: 1\n      _id: \"1\"\n    - name: Mlle.Baptistine\n      group: 1\n      _id: \"2\"\n    - name: Mme.Magloire\n      group: 1\n      _id: \"3\"\n    - name: CountessdeLo\n      group: 1\n      _id: \"4\"\n    - name: Geborand\n      group: 1\n      _id: \"5\"\n    - name: Champtercier\n      group: 1\n      _id: \"6\"\n    - name: Cravatte\n      group: 1\n      _id: \"7\"\n    - name: Count\n      group: 1\n      _id: \"8\"\n    - name: OldMan\n      group: 1\n      _id: \"9\"\n    - name: Labarre\n      group: 2\n      _id: \"10\"\n    - name: Valjean\n      group: 2\n      _id: \"11\"\n    - name: Marguerite\n      group: 3\n      _id: \"12\"\n    - name: Mme.deR\n      group: 2\n      _id: \"13\"\n    - name: Isabeau\n      group: 2\n      _id: \"14\"\n    - name: Gervais\n      group: 2\n      _id: \"15\"\n    - name: Tholomyes\n      group: 3\n      _id: \"16\"\n    - name: Listolier\n      group: 3\n      _id: \"17\"\n    - name: Fameuil\n      group: 3\n      _id: \"18\"\n    - name: Blacheville\n      group: 3\n      _id: \"19\"\n    - name: Favourite\n      group: 3\n      _id: \"20\"\n    - name: Dahlia\n      group: 3\n      _id: \"21\"\n    - name: Zephine\n      group: 3\n      _id: \"22\"\n    - name: Fantine\n      group: 3\n      _id: \"23\"\n    - name: Mme.Thenardier\n      group: 4\n      _id: \"24\"\n    - name: Thenardier\n      group: 4\n      _id: \"25\"\n    - name: Cosette\n      group: 5\n      _id: \"26\"\n    - name: Javert\n      group: 4\n      _id: \"27\"\n    - name: Fauchelevent\n      group: 0\n      _id: \"28\"\n    - name: Bamatabois\n      group: 2\n      _id: \"29\"\n    - name: Perpetue\n      group: 3\n      _id: \"30\"\n    - name: Simplice\n      group: 2\n      _id: \"31\"\n    - name: Scaufflaire\n      group: 2\n      _id: \"32\"\n    - name: Woman1\n      group: 2\n      _id: \"33\"\n    - name: Judge\n      group: 2\n      _id: \"34\"\n    - name: Champmathieu\n      group: 2\n      _id: \"35\"\n    - name: Brevet\n      group: 2\n      _id: \"36\"\n    - name: Chenildieu\n      group: 2\n      _id: \"37\"\n    - name: Cochepaille\n      group: 2\n      _id: \"38\"\n    - name: Pontmercy\n      group: 4\n      _id: \"39\"\n    - name: Boulatruelle\n      group: 6\n      _id: \"40\"\n    - name: Eponine\n      group: 4\n      _id: \"41\"\n    - name: Anzelma\n      group: 4\n      _id: \"42\"\n    - name: Woman2\n      group: 5\n      _id: \"43\"\n    - name: MotherInnocent\n      group: 0\n      _id: \"44\"\n    - name: Gribier\n      group: 0\n      _id: \"45\"\n    - name: Jondrette\n      group: 7\n      _id: \"46\"\n    - name: Mme.Burgon\n      group: 7\n      _id: \"47\"\n    - name: Gavroche\n      group: 8\n      _id: \"48\"\n    - name: Gillenormand\n      group: 5\n      _id: \"49\"\n    - name: Magnon\n      group: 5\n      _id: \"50\"\n    - name: Mlle.Gillenormand\n      group: 5\n      _id: \"51\"\n    - name: Mme.Pontmercy\n      group: 5\n      _id: \"52\"\n    - name: Mlle.Vaubois\n      group: 5\n      _id: \"53\"\n    - name: Lt.Gillenormand\n      group: 5\n      _id: \"54\"\n    - name: Marius\n      group: 8\n      _id: \"55\"\n    - name: BaronessT\n      group: 5\n      _id: \"56\"\n    - name: Mabeuf\n      group: 8\n      _id: \"57\"\n    - name: Enjolras\n      group: 8\n      _id: \"58\"\n    - name: Combeferre\n      group: 8\n      _id: \"59\"\n    - name: Prouvaire\n      group: 8\n      _id: \"60\"\n    - name: Feuilly\n      group: 8\n      _id: \"61\"\n    - name: Courfeyrac\n      group: 8\n      _id: \"62\"\n    - name: Bahorel\n      group: 8\n      _id: \"63\"\n    - name: Bossuet\n      group: 8\n      _id: \"64\"\n    - name: Joly\n      group: 8\n      _id: \"65\"\n    - name: Grantaire\n      group: 8\n      _id: \"66\"\n    - name: MotherPlutarch\n      group: 9\n      _id: \"67\"\n    - name: Gueulemer\n      group: 4\n      _id: \"68\"\n    - name: Babet\n      group: 4\n      _id: \"69\"\n    - name: Claquesous\n      group: 4\n      _id: \"70\"\n    - name: Montparnasse\n      group: 4\n      _id: \"71\"\n    - name: Toussaint\n      group: 5\n      _id: \"72\"\n    - name: Child1\n      group: 10\n      _id: \"73\"\n    - name: Child2\n      group: 10\n      _id: \"74\"\n    - name: Brujon\n      group: 4\n      _id: \"75\"\n    - name: Mme.Hucheloup\n      group: 8\n      _id: \"76\"\n  links:\n    - source:\n        ref_id: \"1\"\n      target:\n        ref_id: \"0\"\n      value: 1\n    - source:\n        ref_id: \"2\"\n      target:\n        ref_id: \"0\"\n      value: 8\n    - source:\n        ref_id: \"3\"\n      target:\n        ref_id: \"0\"\n      value: 10\n    - source:\n        ref_id: \"3\"\n      target:\n        ref_id: \"2\"\n      value: 6\n    - source:\n        ref_id: \"4\"\n      target:\n        ref_id: \"0\"\n      value: 1\n    - source:\n        ref_id: \"5\"\n      target:\n        ref_id: \"0\"\n      value: 1\n    - source:\n        ref_id: \"6\"\n      target:\n        ref_id: \"0\"\n      value: 1\n    - source:\n        ref_id: \"7\"\n      target:\n        ref_id: \"0\"\n      value: 1\n    - source:\n        ref_id: \"8\"\n      target:\n        ref_id: \"0\"\n      value: 2\n    - source:\n        ref_id: \"9\"\n      target:\n        ref_id: \"0\"\n      value: 1\n    - source:\n        ref_id: \"11\"\n      target:\n        ref_id: \"10\"\n      value: 1\n    - source:\n        ref_id: \"11\"\n      target:\n        ref_id: \"3\"\n      value: 3\n    - source:\n        ref_id: \"11\"\n      target:\n        ref_id: \"2\"\n      value: 3\n    - source:\n        ref_id: \"11\"\n      target:\n        ref_id: \"0\"\n      value: 5\n    - source:\n        ref_id: \"12\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"13\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"14\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"15\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"17\"\n      target:\n        ref_id: \"16\"\n      value: 4\n    - source:\n        ref_id: \"18\"\n      target:\n        ref_id: \"16\"\n      value: 4\n    - source:\n        ref_id: \"18\"\n      target:\n        ref_id: \"17\"\n      value: 4\n    - source:\n        ref_id: \"19\"\n      target:\n        ref_id: \"16\"\n      value: 4\n    - source:\n        ref_id: \"19\"\n      target:\n        ref_id: \"17\"\n      value: 4\n    - source:\n        ref_id: \"19\"\n      target:\n        ref_id: \"18\"\n      value: 4\n    - source:\n        ref_id: \"20\"\n      target:\n        ref_id: \"16\"\n      value: 3\n    - source:\n        ref_id: \"20\"\n      target:\n        ref_id: \"17\"\n      value: 3\n    - source:\n        ref_id: \"20\"\n      target:\n        ref_id: \"18\"\n      value: 3\n    - source:\n        ref_id: \"20\"\n      target:\n        ref_id: \"19\"\n      value: 4\n    - source:\n        ref_id: \"21\"\n      target:\n        ref_id: \"16\"\n      value: 3\n    - source:\n        ref_id: \"21\"\n      target:\n        ref_id: \"17\"\n      value: 3\n    - source:\n        ref_id: \"21\"\n      target:\n        ref_id: \"18\"\n      value: 3\n    - source:\n        ref_id: \"21\"\n      target:\n        ref_id: \"19\"\n      value: 3\n    - source:\n        ref_id: \"21\"\n      target:\n        ref_id: \"20\"\n      value: 5\n    - source:\n        ref_id: \"22\"\n      target:\n        ref_id: \"16\"\n      value: 3\n    - source:\n        ref_id: \"22\"\n      target:\n        ref_id: \"17\"\n      value: 3\n    - source:\n        ref_id: \"22\"\n      target:\n        ref_id: \"18\"\n      value: 3\n    - source:\n        ref_id: \"22\"\n      target:\n        ref_id: \"19\"\n      value: 3\n    - source:\n        ref_id: \"22\"\n      target:\n        ref_id: \"20\"\n      value: 4\n    - source:\n        ref_id: \"22\"\n      target:\n        ref_id: \"21\"\n      value: 4\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"16\"\n      value: 3\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"17\"\n      value: 3\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"18\"\n      value: 3\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"19\"\n      value: 3\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"20\"\n      value: 4\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"21\"\n      value: 4\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"22\"\n      value: 4\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"12\"\n      value: 2\n    - source:\n        ref_id: \"23\"\n      target:\n        ref_id: \"11\"\n      value: 9\n    - source:\n        ref_id: \"24\"\n      target:\n        ref_id: \"23\"\n      value: 2\n    - source:\n        ref_id: \"24\"\n      target:\n        ref_id: \"11\"\n      value: 7\n    - source:\n        ref_id: \"25\"\n      target:\n        ref_id: \"24\"\n      value: 13\n    - source:\n        ref_id: \"25\"\n      target:\n        ref_id: \"23\"\n      value: 1\n    - source:\n        ref_id: \"25\"\n      target:\n        ref_id: \"11\"\n      value: 12\n    - source:\n        ref_id: \"26\"\n      target:\n        ref_id: \"24\"\n      value: 4\n    - source:\n        ref_id: \"26\"\n      target:\n        ref_id: \"11\"\n      value: 31\n    - source:\n        ref_id: \"26\"\n      target:\n        ref_id: \"16\"\n      value: 1\n    - source:\n        ref_id: \"26\"\n      target:\n        ref_id: \"25\"\n      value: 1\n    - source:\n        ref_id: \"27\"\n      target:\n        ref_id: \"11\"\n      value: 17\n    - source:\n        ref_id: \"27\"\n      target:\n        ref_id: \"23\"\n      value: 5\n    - source:\n        ref_id: \"27\"\n      target:\n        ref_id: \"25\"\n      value: 5\n    - source:\n        ref_id: \"27\"\n      target:\n        ref_id: \"24\"\n      value: 1\n    - source:\n        ref_id: \"27\"\n      target:\n        ref_id: \"26\"\n      value: 1\n    - source:\n        ref_id: \"28\"\n      target:\n        ref_id: \"11\"\n      value: 8\n    - source:\n        ref_id: \"28\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"29\"\n      target:\n        ref_id: \"23\"\n      value: 1\n    - source:\n        ref_id: \"29\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"29\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"30\"\n      target:\n        ref_id: \"23\"\n      value: 1\n    - source:\n        ref_id: \"31\"\n      target:\n        ref_id: \"30\"\n      value: 2\n    - source:\n        ref_id: \"31\"\n      target:\n        ref_id: \"11\"\n      value: 3\n    - source:\n        ref_id: \"31\"\n      target:\n        ref_id: \"23\"\n      value: 2\n    - source:\n        ref_id: \"31\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"32\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"33\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"33\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"34\"\n      target:\n        ref_id: \"11\"\n      value: 3\n    - source:\n        ref_id: \"34\"\n      target:\n        ref_id: \"29\"\n      value: 2\n    - source:\n        ref_id: \"35\"\n      target:\n        ref_id: \"11\"\n      value: 3\n    - source:\n        ref_id: \"35\"\n      target:\n        ref_id: \"34\"\n      value: 3\n    - source:\n        ref_id: \"35\"\n      target:\n        ref_id: \"29\"\n      value: 2\n    - source:\n        ref_id: \"36\"\n      target:\n        ref_id: \"34\"\n      value: 2\n    - source:\n        ref_id: \"36\"\n      target:\n        ref_id: \"35\"\n      value: 2\n    - source:\n        ref_id: \"36\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"36\"\n      target:\n        ref_id: \"29\"\n      value: 1\n    - source:\n        ref_id: \"37\"\n      target:\n        ref_id: \"34\"\n      value: 2\n    - source:\n        ref_id: \"37\"\n      target:\n        ref_id: \"35\"\n      value: 2\n    - source:\n        ref_id: \"37\"\n      target:\n        ref_id: \"36\"\n      value: 2\n    - source:\n        ref_id: \"37\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"37\"\n      target:\n        ref_id: \"29\"\n      value: 1\n    - source:\n        ref_id: \"38\"\n      target:\n        ref_id: \"34\"\n      value: 2\n    - source:\n        ref_id: \"38\"\n      target:\n        ref_id: \"35\"\n      value: 2\n    - source:\n        ref_id: \"38\"\n      target:\n        ref_id: \"36\"\n      value: 2\n    - source:\n        ref_id: \"38\"\n      target:\n        ref_id: \"37\"\n      value: 2\n    - source:\n        ref_id: \"38\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"38\"\n      target:\n        ref_id: \"29\"\n      value: 1\n    - source:\n        ref_id: \"39\"\n      target:\n        ref_id: \"25\"\n      value: 1\n    - source:\n        ref_id: \"40\"\n      target:\n        ref_id: \"25\"\n      value: 1\n    - source:\n        ref_id: \"41\"\n      target:\n        ref_id: \"24\"\n      value: 2\n    - source:\n        ref_id: \"41\"\n      target:\n        ref_id: \"25\"\n      value: 3\n    - source:\n        ref_id: \"42\"\n      target:\n        ref_id: \"41\"\n      value: 2\n    - source:\n        ref_id: \"42\"\n      target:\n        ref_id: \"25\"\n      value: 2\n    - source:\n        ref_id: \"42\"\n      target:\n        ref_id: \"24\"\n      value: 1\n    - source:\n        ref_id: \"43\"\n      target:\n        ref_id: \"11\"\n      value: 3\n    - source:\n        ref_id: \"43\"\n      target:\n        ref_id: \"26\"\n      value: 1\n    - source:\n        ref_id: \"43\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"44\"\n      target:\n        ref_id: \"28\"\n      value: 3\n    - source:\n        ref_id: \"44\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"45\"\n      target:\n        ref_id: \"28\"\n      value: 2\n    - source:\n        ref_id: \"47\"\n      target:\n        ref_id: \"46\"\n      value: 1\n    - source:\n        ref_id: \"48\"\n      target:\n        ref_id: \"47\"\n      value: 2\n    - source:\n        ref_id: \"48\"\n      target:\n        ref_id: \"25\"\n      value: 1\n    - source:\n        ref_id: \"48\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"48\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"49\"\n      target:\n        ref_id: \"26\"\n      value: 3\n    - source:\n        ref_id: \"49\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"50\"\n      target:\n        ref_id: \"49\"\n      value: 1\n    - source:\n        ref_id: \"50\"\n      target:\n        ref_id: \"24\"\n      value: 1\n    - source:\n        ref_id: \"51\"\n      target:\n        ref_id: \"49\"\n      value: 9\n    - source:\n        ref_id: \"51\"\n      target:\n        ref_id: \"26\"\n      value: 2\n    - source:\n        ref_id: \"51\"\n      target:\n        ref_id: \"11\"\n      value: 2\n    - source:\n        ref_id: \"52\"\n      target:\n        ref_id: \"51\"\n      value: 1\n    - source:\n        ref_id: \"52\"\n      target:\n        ref_id: \"39\"\n      value: 1\n    - source:\n        ref_id: \"53\"\n      target:\n        ref_id: \"51\"\n      value: 1\n    - source:\n        ref_id: \"54\"\n      target:\n        ref_id: \"51\"\n      value: 2\n    - source:\n        ref_id: \"54\"\n      target:\n        ref_id: \"49\"\n      value: 1\n    - source:\n        ref_id: \"54\"\n      target:\n        ref_id: \"26\"\n      value: 1\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"51\"\n      value: 6\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"49\"\n      value: 12\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"39\"\n      value: 1\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"54\"\n      value: 1\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"26\"\n      value: 21\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"11\"\n      value: 19\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"16\"\n      value: 1\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"25\"\n      value: 2\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"41\"\n      value: 5\n    - source:\n        ref_id: \"55\"\n      target:\n        ref_id: \"48\"\n      value: 4\n    - source:\n        ref_id: \"56\"\n      target:\n        ref_id: \"49\"\n      value: 1\n    - source:\n        ref_id: \"56\"\n      target:\n        ref_id: \"55\"\n      value: 1\n    - source:\n        ref_id: \"57\"\n      target:\n        ref_id: \"55\"\n      value: 1\n    - source:\n        ref_id: \"57\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"57\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"58\"\n      target:\n        ref_id: \"55\"\n      value: 7\n    - source:\n        ref_id: \"58\"\n      target:\n        ref_id: \"48\"\n      value: 7\n    - source:\n        ref_id: \"58\"\n      target:\n        ref_id: \"27\"\n      value: 6\n    - source:\n        ref_id: \"58\"\n      target:\n        ref_id: \"57\"\n      value: 1\n    - source:\n        ref_id: \"58\"\n      target:\n        ref_id: \"11\"\n      value: 4\n    - source:\n        ref_id: \"59\"\n      target:\n        ref_id: \"58\"\n      value: 15\n    - source:\n        ref_id: \"59\"\n      target:\n        ref_id: \"55\"\n      value: 5\n    - source:\n        ref_id: \"59\"\n      target:\n        ref_id: \"48\"\n      value: 6\n    - source:\n        ref_id: \"59\"\n      target:\n        ref_id: \"57\"\n      value: 2\n    - source:\n        ref_id: \"60\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"60\"\n      target:\n        ref_id: \"58\"\n      value: 4\n    - source:\n        ref_id: \"60\"\n      target:\n        ref_id: \"59\"\n      value: 2\n    - source:\n        ref_id: \"61\"\n      target:\n        ref_id: \"48\"\n      value: 2\n    - source:\n        ref_id: \"61\"\n      target:\n        ref_id: \"58\"\n      value: 6\n    - source:\n        ref_id: \"61\"\n      target:\n        ref_id: \"60\"\n      value: 2\n    - source:\n        ref_id: \"61\"\n      target:\n        ref_id: \"59\"\n      value: 5\n    - source:\n        ref_id: \"61\"\n      target:\n        ref_id: \"57\"\n      value: 1\n    - source:\n        ref_id: \"61\"\n      target:\n        ref_id: \"55\"\n      value: 1\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"55\"\n      value: 9\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"58\"\n      value: 17\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"59\"\n      value: 13\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"48\"\n      value: 7\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"57\"\n      value: 2\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"61\"\n      value: 6\n    - source:\n        ref_id: \"62\"\n      target:\n        ref_id: \"60\"\n      value: 3\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"59\"\n      value: 5\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"48\"\n      value: 5\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"62\"\n      value: 6\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"57\"\n      value: 2\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"58\"\n      value: 4\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"61\"\n      value: 3\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"60\"\n      value: 2\n    - source:\n        ref_id: \"63\"\n      target:\n        ref_id: \"55\"\n      value: 1\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"55\"\n      value: 5\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"62\"\n      value: 12\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"48\"\n      value: 5\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"63\"\n      value: 4\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"58\"\n      value: 10\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"61\"\n      value: 6\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"60\"\n      value: 2\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"59\"\n      value: 9\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"57\"\n      value: 1\n    - source:\n        ref_id: \"64\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"63\"\n      value: 5\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"64\"\n      value: 7\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"48\"\n      value: 3\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"62\"\n      value: 5\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"58\"\n      value: 5\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"61\"\n      value: 5\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"60\"\n      value: 2\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"59\"\n      value: 5\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"57\"\n      value: 1\n    - source:\n        ref_id: \"65\"\n      target:\n        ref_id: \"55\"\n      value: 2\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"64\"\n      value: 3\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"58\"\n      value: 3\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"59\"\n      value: 1\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"62\"\n      value: 2\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"65\"\n      value: 2\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"63\"\n      value: 1\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"61\"\n      value: 1\n    - source:\n        ref_id: \"66\"\n      target:\n        ref_id: \"60\"\n      value: 1\n    - source:\n        ref_id: \"67\"\n      target:\n        ref_id: \"57\"\n      value: 3\n    - source:\n        ref_id: \"68\"\n      target:\n        ref_id: \"25\"\n      value: 5\n    - source:\n        ref_id: \"68\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"68\"\n      target:\n        ref_id: \"24\"\n      value: 1\n    - source:\n        ref_id: \"68\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"68\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"68\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"25\"\n      value: 6\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"68\"\n      value: 6\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"24\"\n      value: 1\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"27\"\n      value: 2\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"69\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"25\"\n      value: 4\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"69\"\n      value: 4\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"68\"\n      value: 4\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"24\"\n      value: 1\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"70\"\n      target:\n        ref_id: \"58\"\n      value: 1\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"69\"\n      value: 2\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"68\"\n      value: 2\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"70\"\n      value: 2\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"71\"\n      target:\n        ref_id: \"25\"\n      value: 1\n    - source:\n        ref_id: \"72\"\n      target:\n        ref_id: \"26\"\n      value: 2\n    - source:\n        ref_id: \"72\"\n      target:\n        ref_id: \"27\"\n      value: 1\n    - source:\n        ref_id: \"72\"\n      target:\n        ref_id: \"11\"\n      value: 1\n    - source:\n        ref_id: \"73\"\n      target:\n        ref_id: \"48\"\n      value: 2\n    - source:\n        ref_id: \"74\"\n      target:\n        ref_id: \"48\"\n      value: 2\n    - source:\n        ref_id: \"74\"\n      target:\n        ref_id: \"73\"\n      value: 3\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"69\"\n      value: 3\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"68\"\n      value: 3\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"25\"\n      value: 3\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"41\"\n      value: 1\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"70\"\n      value: 1\n    - source:\n        ref_id: \"75\"\n      target:\n        ref_id: \"71\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"64\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"65\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"66\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"63\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"62\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"48\"\n      value: 1\n    - source:\n        ref_id: \"76\"\n      target:\n        ref_id: \"58\"\n      value: 1", 
    "name": "Character Co-occurrence"
  }, 
  {
    "name": "Combination"
  }
];
