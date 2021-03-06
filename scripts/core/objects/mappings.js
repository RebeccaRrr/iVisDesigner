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
