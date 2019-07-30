"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash = require("object-hash");
function Cache() {
    var memory = new Map();
    return function (target, propertyKey, descriptor) {
        var origin = descriptor.value;
        descriptor.value = function () {
            var id = hash(__assign({}, arguments));
            var inMemory = memory.has(id);
            if (inMemory) {
                return memory.get(id);
            }
            var res = origin.apply(this, arguments);
            memory.set(id, res);
            return res;
        };
        return descriptor;
    };
}
exports.Cache = Cache;
