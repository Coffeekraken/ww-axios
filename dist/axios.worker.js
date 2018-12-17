"use strict";

require("@babel/polyfill");

var _comlinkjs = require("./comlinkjs");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var a = function a() {
  _axios.default.apply(this, arguments).then(function (response) {
    return JSON.parse(JSON.stringify(response));
  }).catch(function (err) {
    return JSON.parse(JSON.stringify(err));
  });
}; // map each methods available on axios


var methods = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch'];
methods.forEach(function (method) {
  a[method] =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _axios.default[method].apply(this, _args).then(function (response) {
              return JSON.parse(JSON.stringify(response));
            }).catch(function (err) {
              return JSON.parse(JSON.stringify(err));
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}); // map "defaults"

a.defaults = _axios.default.defaults; // create method

a.create = function () {
  var instance = _axios.default.create.apply(this, arguments);

  var methods = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'getUri'];
  var returnApi = {};
  methods.forEach(function (method) {
    returnApi[method] =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", instance[method].apply(this, _args2).then(function (response) {
                return JSON.parse(JSON.stringify(response));
              }).catch(function (err) {
                return JSON.parse(JSON.stringify(err));
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })).bind(instance);
  }); // map "defaults"

  returnApi.defaults = instance.defaults;
  return (0, _comlinkjs.proxyValue)(returnApi);
};

(0, _comlinkjs.expose)(a, self);