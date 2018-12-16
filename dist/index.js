"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _comlinkjs = require("comlinkjs");

var _axios = _interopRequireDefault(require("./axios.worker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = (0, _comlinkjs.proxy)(new _axios.default());
var _default = axios;
exports.default = _default;