"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxy = proxy;
exports.proxyValue = proxyValue;
exports.expose = expose;
exports.transferHandlers = void 0;

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(iterateAllProperties);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Failed to minify the file using UglifyJS v3.4.4. Serving the original version.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TRANSFERABLE_TYPES = ["ArrayBuffer", "MessagePort", "OffscreenCanvas"].filter(function (f) {
  return f in self;
}).map(function (f) {
  return self[f];
});
var uid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
var proxyValueSymbol = Symbol("proxyValue");
var throwSymbol = Symbol("throw");
var proxyTransferHandler = {
  canHandle: function canHandle(obj) {
    return obj && obj[proxyValueSymbol];
  },
  serialize: function serialize(obj) {
    var _ref = new MessageChannel(),
        port1 = _ref.port1,
        port2 = _ref.port2;

    expose(obj, port1);
    return port2;
  },
  deserialize: function deserialize(obj) {
    return proxy(obj);
  }
};
var throwTransferHandler = {
  canHandle: function canHandle(obj) {
    return obj && obj[throwSymbol];
  },
  serialize: function serialize(obj) {
    var message = obj && obj.message;
    var stack = obj && obj.stack;
    return Object.assign({}, obj, {
      message: message,
      stack: stack
    });
  },
  deserialize: function deserialize(obj) {
    throw Object.assign(Error(), obj);
  }
};
var transferHandlers = new Map([["PROXY", proxyTransferHandler], ["THROW", throwTransferHandler]]);
exports.transferHandlers = transferHandlers;
var pingPongMessageCounter = 0;

function proxy(endpoint, target) {
  if (isWindow(endpoint)) endpoint = windowEndpoint(endpoint);
  if (!isEndpoint(endpoint)) throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
  activateEndpoint(endpoint);
  return cbProxy(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(irequest) {
      var args, response, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = [];
              if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT") args = irequest.argumentsList.map(wrapValue);
              _context.next = 4;
              return pingPongMessage(endpoint, Object.assign({}, irequest, {
                argumentsList: args
              }), transferableProperties(args));

            case 4:
              response = _context.sent;
              result = response.data;
              return _context.abrupt("return", unwrapValue(result.value));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [], target);
}

function proxyValue(obj) {
  obj[proxyValueSymbol] = true;
  return obj;
}

function expose(rootObj, endpoint) {
  if (isWindow(endpoint)) endpoint = windowEndpoint(endpoint);
  if (!isEndpoint(endpoint)) throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
  activateEndpoint(endpoint);
  attachMessageHandler(endpoint,
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(event) {
      var irequest, that, obj, iresult, args;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!event.data.id || !event.data.callPath)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              irequest = event.data;
              _context2.next = 5;
              return irequest.callPath.slice(0, -1).reduce(function (obj, propName) {
                return obj[propName];
              }, rootObj);

            case 5:
              that = _context2.sent;
              _context2.next = 8;
              return irequest.callPath.reduce(function (obj, propName) {
                return obj[propName];
              }, rootObj);

            case 8:
              obj = _context2.sent;
              iresult = obj;
              args = [];
              if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT") args = irequest.argumentsList.map(unwrapValue);

              if (!(irequest.type === "APPLY")) {
                _context2.next = 23;
                break;
              }

              _context2.prev = 13;
              _context2.next = 16;
              return obj.apply(that, args);

            case 16:
              iresult = _context2.sent;
              _context2.next = 23;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](13);
              iresult = _context2.t0;
              iresult[throwSymbol] = true;

            case 23:
              if (irequest.type === "CONSTRUCT") {
                try {
                  iresult = _construct(obj, _toConsumableArray(args)); // eslint-disable-line new-cap

                  iresult = proxyValue(iresult);
                } catch (e) {
                  iresult = e;
                  iresult[throwSymbol] = true;
                }
              }

              if (irequest.type === "SET") {
                obj[irequest.property] = irequest.value; // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
                // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯

                iresult = true;
              }

              iresult = makeInvocationResult(iresult);
              iresult.id = irequest.id;
              return _context2.abrupt("return", endpoint.postMessage(iresult, transferableProperties([iresult])));

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[13, 19]]);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}

function wrapValue(arg) {
  // Is arg itself handled by a TransferHandler?
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = transferHandlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          transferHandler = _step$value[1];

      if (transferHandler.canHandle(arg)) {
        return {
          type: key,
          value: transferHandler.serialize(arg)
        };
      }
    } // If not, traverse the entire object and find handled values.

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var wrappedChildren = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = iterateAllProperties(arg)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = transferHandlers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              key = _step3$value[0],
              transferHandler = _step3$value[1];

          if (transferHandler.canHandle(item.value)) {
            wrappedChildren.push({
              path: item.path,
              wrappedValue: {
                type: key,
                value: transferHandler.serialize(item.value)
              }
            });
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  for (var _i = 0; _i < wrappedChildren.length; _i++) {
    var wrappedChild = wrappedChildren[_i];
    var container = wrappedChild.path.slice(0, -1).reduce(function (obj, key) {
      return obj[key];
    }, arg);
    container[wrappedChild.path[wrappedChild.path.length - 1]] = null;
  }

  return {
    type: "RAW",
    value: arg,
    wrappedChildren: wrappedChildren
  };
}

function unwrapValue(arg) {
  if (transferHandlers.has(arg.type)) {
    var transferHandler = transferHandlers.get(arg.type);
    return transferHandler.deserialize(arg.value);
  } else if (isRawWrappedValue(arg)) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (arg.wrappedChildren || [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var wrappedChildValue = _step4.value;
        if (!transferHandlers.has(wrappedChildValue.wrappedValue.type)) throw Error("Unknown value type \"".concat(arg.type, "\" at ").concat(wrappedChildValue.path.join(".")));

        var _transferHandler = transferHandlers.get(wrappedChildValue.wrappedValue.type);

        var newValue = _transferHandler.deserialize(wrappedChildValue.wrappedValue.value);

        replaceValueInObjectAtPath(arg.value, wrappedChildValue.path, newValue);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return arg.value;
  } else {
    throw Error("Unknown value type \"".concat(arg.type, "\""));
  }
}

function replaceValueInObjectAtPath(obj, path, newVal) {
  var lastKey = path.slice(-1)[0];
  var lastObj = path.slice(0, -1).reduce(function (obj, key) {
    return obj[key];
  }, obj);
  lastObj[lastKey] = newVal;
}

function isRawWrappedValue(arg) {
  return arg.type === "RAW";
}

function windowEndpoint(w) {
  if (self.constructor.name !== "Window") throw Error("self is not a window");
  return {
    addEventListener: self.addEventListener.bind(self),
    removeEventListener: self.removeEventListener.bind(self),
    postMessage: function postMessage(msg, transfer) {
      return w.postMessage(msg, "*", transfer);
    }
  };
}

function isEndpoint(endpoint) {
  return "addEventListener" in endpoint && "removeEventListener" in endpoint && "postMessage" in endpoint;
}

function activateEndpoint(endpoint) {
  if (isMessagePort(endpoint)) endpoint.start();
}

function attachMessageHandler(endpoint, f) {
  // Checking all possible types of `endpoint` manually satisfies TypeScript’s
  // type checker. Not sure why the inference is failing here. Since it’s
  // unnecessary code I’m going to resort to `any` for now.
  // if(isWorker(endpoint))
  //   endpoint.addEventListener('message', f);
  // if(isMessagePort(endpoint))
  //   endpoint.addEventListener('message', f);
  // if(isOtherWindow(endpoint))
  //   endpoint.addEventListener('message', f);
  endpoint.addEventListener("message", f);
}

function detachMessageHandler(endpoint, f) {
  // Same as above.
  endpoint.removeEventListener("message", f);
}

function isMessagePort(endpoint) {
  return endpoint.constructor.name === "MessagePort";
}

function isWindow(endpoint) {
  // TODO: This doesn’t work on cross-origin iframes.
  // return endpoint.constructor.name === 'Window';
  return ["window", "length", "location", "parent", "opener"].every(function (prop) {
    return prop in endpoint;
  });
}
/**
 * `pingPongMessage` sends a `postMessage` and waits for a reply. Replies are
 * identified by a unique id that is attached to the payload.
 */


function pingPongMessage(endpoint, msg, transferables) {
  var id = "".concat(uid, "-").concat(pingPongMessageCounter++);
  return new Promise(function (resolve) {
    attachMessageHandler(endpoint, function handler(event) {
      if (event.data.id !== id) return;
      detachMessageHandler(endpoint, handler);
      resolve(event);
    }); // Copy msg and add `id` property

    msg = Object.assign({}, msg, {
      id: id
    });
    endpoint.postMessage(msg, transferables);
  });
}

function cbProxy(cb) {
  var callPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return new Proxy(target, {
    construct: function construct(_target, argumentsList, proxy) {
      return cb({
        type: "CONSTRUCT",
        callPath: callPath,
        argumentsList: argumentsList
      });
    },
    apply: function apply(_target, _thisArg, argumentsList) {
      // We use `bind` as an indicator to have a remote function bound locally.
      // The actual target for `bind()` is currently ignored.
      if (callPath[callPath.length - 1] === "bind") return cbProxy(cb, callPath.slice(0, -1));
      return cb({
        type: "APPLY",
        callPath: callPath,
        argumentsList: argumentsList
      });
    },
    get: function get(_target, property, proxy) {
      if (property === "then" && callPath.length === 0) {
        return {
          then: function then() {
            return proxy;
          }
        };
      } else if (property === "then") {
        var r = cb({
          type: "GET",
          callPath: callPath
        });
        return Promise.resolve(r).then.bind(r);
      } else {
        return cbProxy(cb, callPath.concat(property), _target[property]);
      }
    },
    set: function set(_target, property, value, _proxy) {
      return cb({
        type: "SET",
        callPath: callPath,
        property: property,
        value: value
      });
    }
  });
}

function isTransferable(thing) {
  return TRANSFERABLE_TYPES.some(function (type) {
    return thing instanceof type;
  });
}

function iterateAllProperties(value) {
  var path,
      visited,
      keys,
      _i2,
      key,
      _args3 = arguments;

  return regeneratorRuntime.wrap(function iterateAllProperties$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          path = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : [];
          visited = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;

          if (value) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return");

        case 4:
          if (!visited) visited = new WeakSet();

          if (!visited.has(value)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return");

        case 7:
          if (!(typeof value === "string")) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return");

        case 9:
          if (_typeof(value) === "object") visited.add(value);

          if (!ArrayBuffer.isView(value)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return");

        case 12:
          _context3.next = 14;
          return {
            value: value,
            path: path
          };

        case 14:
          keys = Object.keys(value);
          _i2 = 0;

        case 16:
          if (!(_i2 < keys.length)) {
            _context3.next = 22;
            break;
          }

          key = keys[_i2];
          return _context3.delegateYield(iterateAllProperties(value[key], [].concat(_toConsumableArray(path), [key]), visited), "t0", 19);

        case 19:
          _i2++;
          _context3.next = 16;
          break;

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked, this);
}

function transferableProperties(obj) {
  var r = [];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = iterateAllProperties(obj)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var prop = _step5.value;
      if (isTransferable(prop.value)) r.push(prop.value);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return r;
}

function makeInvocationResult(obj) {
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = transferHandlers[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _step6$value = _slicedToArray(_step6.value, 2),
          type = _step6$value[0],
          transferHandler = _step6$value[1];

      if (transferHandler.canHandle(obj)) {
        var value = transferHandler.serialize(obj);
        return {
          value: {
            type: type,
            value: value
          }
        };
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return {
    value: {
      type: "RAW",
      value: obj
    }
  };
}