'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');
var dotenv = require('dotenv');
var fs = require('fs');
var axios = require('axios');
var ethers = require('ethers');
var L1GatewayRouter__factory = require('@arbitrum/sdk/dist/lib/abi/factories/L1GatewayRouter__factory');
var Web3 = require('web3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return n;
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var Web3__default = /*#__PURE__*/_interopDefaultLegacy(Web3);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
}(runtime));

var _regeneratorRuntime = runtime.exports;

var ChainId;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["RINKEBY"] = 4] = "RINKEBY";
  ChainId[ChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
  ChainId[ChainId["ARBITRUM_RINKEBY"] = 421611] = "ARBITRUM_RINKEBY";
  ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
  ChainId[ChainId["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
  ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
  ChainId[ChainId["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
  ChainId[ChainId["CELO"] = 42220] = "CELO";
  ChainId[ChainId["CELO_ALFAJORES"] = 44787] = "CELO_ALFAJORES";
  ChainId[ChainId["BNB"] = 56] = "BNB";
  ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
  ChainId[ChainId["BASE"] = 8453] = "BASE";
  ChainId[ChainId["BASE_GOERLI"] = 84531] = "BASE_GOERLI";
})(ChainId || (ChainId = {}));

function compareTokenInfos(t1, t2) {
  if (t1.chainId === t2.chainId) {
    return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
  }

  return t1.chainId < t2.chainId ? -1 : 1;
} // ref: https://github.com/OffchainLabs/arb-token-lists/blob/master/src/lib/utils.ts

function getTokenList(_x) {
  return _getTokenList.apply(this, arguments);
}

function _getTokenList() {
  _getTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(l1TokenListOrPathOrUrl) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(typeof l1TokenListOrPathOrUrl === 'string')) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", getTokenListObj(l1TokenListOrPathOrUrl));

          case 4:
            return _context5.abrupt("return", l1TokenListOrPathOrUrl);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getTokenList.apply(this, arguments);
}

var getTokenListObjFromUrl = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios__default["default"].get(url);

          case 2:
            return _context.abrupt("return", _context.sent.data);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTokenListObjFromUrl(_x2) {
    return _ref.apply(this, arguments);
  };
}();
var getTokenListObjFromLocalPath = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(path) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", JSON.parse(fs.readFileSync(path).toString()));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTokenListObjFromLocalPath(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getTokenListObj = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(pathOrUrl) {
    var tokenList;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(pathOrUrl) {
                var localFileExists, looksLikeUrl;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        localFileExists = fs.existsSync(pathOrUrl);
                        looksLikeUrl = isValidHttpUrl(pathOrUrl);

                        if (!localFileExists) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt("return", getTokenListObjFromLocalPath(pathOrUrl));

                      case 6:
                        if (!looksLikeUrl) {
                          _context3.next = 12;
                          break;
                        }

                        _context3.next = 9;
                        return getTokenListObjFromUrl(pathOrUrl);

                      case 9:
                        return _context3.abrupt("return", _context3.sent);

                      case 12:
                        throw new Error('Could not find token list');

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }()(pathOrUrl);

          case 2:
            tokenList = _context4.sent;
            isTokenList(tokenList);
            return _context4.abrupt("return", tokenList);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getTokenListObj(_x4) {
    return _ref3.apply(this, arguments);
  };
}(); // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

function isValidHttpUrl(urlString) {
  var url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
} // typeguard:


var isTokenList = function isTokenList(obj) {
  var expectedListKeys = ['name', 'timestamp', 'version', 'tokens'];
  var actualListKeys = new Set(Object.keys(obj));

  if (!expectedListKeys.every(function (key) {
    return actualListKeys.has(key);
  })) {
    throw new Error('tokenlist typeguard error: required list key not included');
  }

  var version = obj.version,
      tokens = obj.tokens;

  if (!['major', 'minor', 'patch'].every(function (key) {
    return typeof version[key] === 'number';
  })) {
    throw new Error('tokenlist typeguard error: invalid version');
  }

  if (!tokens.every(function (token) {
    var tokenKeys = new Set(Object.keys(token));
    return ['chainId', 'address', 'name', 'decimals', 'symbol'].every(function (key) {
      return tokenKeys.has(key);
    });
  })) {
    throw new Error('tokenlist typeguard error: token missing required key');
  }
};
function getRpcUrl(chainId) {
  switch (chainId) {
    case ChainId.MAINNET:
      return 'https://rpc.ankr.com/eth';

    case ChainId.OPTIMISM:
      return 'https://rpc.ankr.com/optimism';
    // seems to have higher rate limit than https://mainnet.optimism.io/

    case ChainId.OPTIMISTIC_KOVAN:
      return 'https://kovan.optimism.io';

    case ChainId.ARBITRUM_ONE:
      return 'https://arb1.arbitrum.io/rpc';

    case ChainId.ARBITRUM_RINKEBY:
      return 'https://rinkeby.arbitrum.io/rpc';

    case ChainId.POLYGON:
      return 'https://polygon-rpc.com/';

    case ChainId.POLYGON_MUMBAI:
      return 'https://rpc-endpoints.superfluid.dev/mumbai';

    case ChainId.BNB:
      return 'https://bsc-dataseed1.binance.org';

    case ChainId.AVALANCHE:
      return 'https://api.avax.network/ext/bc/C/rpc';

    case ChainId.CELO:
      return 'https://forno.celo.org/';

    case ChainId.CELO_ALFAJORES:
      return 'https://alfajores-forno.celo-testnet.org/';

    case ChainId.BASE:
      return 'https://mainnet.base.org';

    case ChainId.BASE_GOERLI:
      return 'https://goerli.base.org';
  }

  throw new Error('Unsupported ChainId');
}
function getTokenSymbolFromContract(_x6) {
  return _getTokenSymbolFromContract.apply(this, arguments);
}

function _getTokenSymbolFromContract() {
  _getTokenSymbolFromContract = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(tokenContract) {
    var symbol;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Promise.all([tokenContract.methods.symbol().call()]);

          case 2:
            symbol = _context6.sent;
            return _context6.abrupt("return", symbol);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getTokenSymbolFromContract.apply(this, arguments);
}

var _process$env, _process$env$MAINNET_;

dotenv.config();
(_process$env$MAINNET_ = (_process$env = process.env).MAINNET_RPC) != null ? _process$env$MAINNET_ : _process$env.MAINNET_RPC = /*#__PURE__*/getRpcUrl(ChainId.MAINNET);

var networkID = 42161;

var l2Rpc = function l2Rpc(chainId) {
  if (chainId === 42161) return 'https://arb1.arbitrum.io/rpc';else if (chainId === 421611) return 'https://rinkeby.arbitrum.io/rpc';else if (chainId === 42170) return 'https://nova.arbitrum.io/rpc';else if (chainId === 421613) return 'https://goerli-rollup.arbitrum.io/rpc';
  throw new Error('No L2 RPC detected');
}; // ref: https://github.com/OffchainLabs/arb-token-lists/blob/master/src/lib/instantiate_bridge.ts


var getNetworkConfig = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _yield$import, getL1Network, getL2Network, MultiCaller, l2Network, l1Network, arbProvider, ethProvider, l1MultiCaller, l2MultiCaller;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@arbitrum/sdk')); });

          case 2:
            _yield$import = _context.sent;
            getL1Network = _yield$import.getL1Network;
            getL2Network = _yield$import.getL2Network;
            MultiCaller = _yield$import.MultiCaller;
            _context.next = 8;
            return getL2Network(networkID);

          case 8:
            l2Network = _context.sent;
            _context.next = 11;
            return getL1Network(l2Network.partnerChainID);

          case 11:
            l1Network = _context.sent;
            arbProvider = new ethers.providers.JsonRpcProvider(l2Rpc(l2Network.chainID));
            ethProvider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_RPC);
            _context.next = 16;
            return MultiCaller.fromProvider(ethProvider);

          case 16:
            l1MultiCaller = _context.sent;
            _context.next = 19;
            return MultiCaller.fromProvider(arbProvider);

          case 19:
            l2MultiCaller = _context.sent;
            return _context.abrupt("return", {
              l1: {
                network: l1Network,
                provider: ethProvider,
                multiCaller: l1MultiCaller
              },
              l2: {
                network: l2Network,
                provider: arbProvider,
                multiCaller: l2MultiCaller
              }
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getNetworkConfig() {
    return _ref.apply(this, arguments);
  };
}();

var getL2TokenAddressesFromL1 = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(l1TokenAddresses, multiCaller, l1GatewayRouterAddress) {
    var iFace;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            iFace = L1GatewayRouter__factory.L1GatewayRouter__factory.createInterface();
            _context.next = 3;
            return multiCaller.multiCall(l1TokenAddresses.map(function (addr) {
              return {
                encoder: function encoder() {
                  return iFace.encodeFunctionData('calculateL2TokenAddress', [addr]);
                },
                decoder: function decoder(returnData) {
                  return iFace.decodeFunctionResult('calculateL2TokenAddress', returnData)[0];
                },
                targetAddr: l1GatewayRouterAddress
              };
            }));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getL2TokenAddressesFromL1(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * This provider provides the l1->l2(Arbitrum) address mappings using the arbitrum SDK.
 */

var ArbitrumMappingProvider = /*#__PURE__*/function () {
  function ArbitrumMappingProvider(l1TokenList) {
    this.l1TokenList = void 0;
    this.l1TokenList = l1TokenList;
  }

  var _proto = ArbitrumMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens, _yield$getNetworkConf, l1, l2, tokenAddresses, l2AddressesFromL1;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = {};
              _context.next = 3;
              return getNetworkConfig();

            case 3:
              _yield$getNetworkConf = _context.sent;
              l1 = _yield$getNetworkConf.l1;
              l2 = _yield$getNetworkConf.l2;
              tokenAddresses = this.l1TokenList.tokens.map(function (token) {
                return token.address.toLowerCase();
              });
              _context.next = 9;
              return getL2TokenAddressesFromL1(tokenAddresses, l1.multiCaller, l2.network.tokenBridge.l1GatewayRouter);

            case 9:
              l2AddressesFromL1 = _context.sent;
              tokens = tokenAddresses.reduce(function (obj, key, index) {
                var _extends2;

                return _extends({}, obj, (_extends2 = {}, _extends2[key] = l2AddressesFromL1[index], _extends2));
              }, {});
              return _context.abrupt("return", tokens);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return ArbitrumMappingProvider;
}();

var optimismTokenListURL = 'https://raw.githubusercontent.com/' + 'ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json';
/**
 * The Optimism L2 mapping (linked above) is manually maintained by the Optimism team.
 *
 * This provider provides the l1->l2(Optimism) token mappings.
 */

var OptimismMappingProvider = /*#__PURE__*/function () {
  function OptimismMappingProvider() {}

  var _proto = OptimismMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens, allTokens, opTokenId_baseAddressMap;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = {};
              _context.next = 3;
              return getTokenList(optimismTokenListURL);

            case 3:
              allTokens = _context.sent;
              opTokenId_baseAddressMap = {};
              allTokens.tokens.forEach(function (token) {
                if (token.chainId === ChainId.OPTIMISM) {
                  var _token$extensions;

                  if (typeof ((_token$extensions = token.extensions) == null ? void 0 : _token$extensions.opTokenId) === 'string') {
                    opTokenId_baseAddressMap[token.extensions.opTokenId] = token.address;
                  }
                }
              });
              allTokens.tokens.forEach(function (token) {
                var _token$extensions2;

                if (token.chainId === ChainId.MAINNET && typeof ((_token$extensions2 = token.extensions) == null ? void 0 : _token$extensions2.opTokenId) === 'string' && token.extensions.opTokenId in opTokenId_baseAddressMap) {
                  tokens[token.address.toLowerCase()] = opTokenId_baseAddressMap[token.extensions.opTokenId];
                }
              });
              return _context.abrupt("return", tokens);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return OptimismMappingProvider;
}();

var url = 'https://api-polygon-tokens.polygon.technology/api/v1/info/all-mappings';
var access_token = '504afd90-3228-4df9-9d88-9b4d70646101';
/**
 * The Polygon team manually maintains the mapping via user submissions at
 * https://mapper.polygon.technology.
 *
 * This provider provides the l1->l2(Polygon) token mappings.
 */

var PolygonMappingProvider = /*#__PURE__*/function () {
  function PolygonMappingProvider() {}

  var _proto = PolygonMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var response, tokens, _iterator, _step, token;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axios__default["default"].get(url, {
                headers: {
                  'x-access-token': access_token
                }
              });

            case 2:
              response = _context.sent;
              tokens = {};

              for (_iterator = _createForOfIteratorHelperLoose(response.data); !(_step = _iterator()).done;) {
                token = _step.value;

                if (token.isPos) {
                  tokens[token.rootToken.toLowerCase()] = token;
                }
              }

              return _context.abrupt("return", tokens);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return PolygonMappingProvider;
}();

var bnbMappings = {
	"0xdef1da03061ddd2a5ef6c59220c135dec623116d": {
	childToken: "0xdef1da03061ddd2a5ef6c59220c135dec623116d",
	decimals: 18
},
	"0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d": {
	childToken: "0xde69c05e8121ef0db29c3d9ceceda6ef6b606d0c",
	decimals: 18
},
	"0x69fa8e7f6bf1ca1fb0de61e1366f7412b827cc51": {
	childToken: "0x69fa8e7f6bf1ca1fb0de61e1366f7412b827cc51",
	decimals: 9
},
	"0xa4cf2afd3b165975afffbf7e487cdd40c894ab6b": {
	childToken: "0xa0cb0ce7c6d93a7ebd72952feb4407dddee8a194",
	decimals: 0
},
	"0x8167d3b1024cb51a2dd1b4d889ddf7023420796a": {
	childToken: "0xfb4d42bed5618fb1a377ddb64eb56b92a6d117f2",
	decimals: 18
},
	"0x06a87f6afec4a739c367bef69eefe383d27106bd": {
	childToken: "0x16dfeff64c532370e8faa73a7e94e2ccda9342ef",
	decimals: 18
},
	"0xf3eb8b90c763b8b2b53e7819ac27eca8f94c8ec2": {
	childToken: "0xf3eb8b90c763b8b2b53e7819ac27eca8f94c8ec2",
	decimals: 18
},
	"0x7dac25b1a665e1c70f25f1fc37d88c99274984ed": {
	childToken: "0x7dac25b1a665e1c70f25f1fc37d88c99274984ed",
	decimals: 9
},
	"0xcda4e840411c00a614ad9205caec807c7458a0e3": {
	childToken: "0xe2a59d5e33c6540e18aaa46bf98917ac3158db0d",
	decimals: 18
},
	"0x0ae8b74cd2d566853715800c9927f879d6b76a37": {
	childToken: "0x1b9a8c4f2df5dc7b8744b1a170d8d727360c67ee",
	decimals: 9
},
	"0xf3ae5d769e153ef72b4e3591ac004e89f48107a1": {
	childToken: "0xa0a2ee912caf7921eaabc866c6ef6fec8f7e90a4",
	decimals: 18
},
	"0xdac17f958d2ee523a2206206994597c13d831ec7": {
	childToken: "0x55d398326f99059ff775485246999027b3197955",
	decimals: 18
},
	"0xf0bc1ae4ef7ffb126a8347d06ac6f8add770e1ce": {
	childToken: "0x8d67448d4f6231abc070a42a8905084b79e09136",
	decimals: 7
},
	"0x979aca85ba37c675e78322ed5d97fa980b9bdf00": {
	childToken: "0xfa4fa764f15d0f6e20aaec8e0d696870e5b77c6e",
	decimals: 18
},
	"0x24e89bdf2f65326b94e36978a7edeac63623dafa": {
	childToken: "0x9b4bdddaeb68d85b0848bab7774e6855439fd94e",
	decimals: 18
},
	"0xade00c28244d5ce17d72e40330b1c318cd12b7c3": {
	childToken: "0x6bff4fb161347ad7de4a625ae5aa3a1ca7077819",
	decimals: 18
},
	"0x89bd2e7e388fab44ae88bef4e1ad12b4f1e0911c": {
	childToken: "0x6d8734002fbffe1c86495e32c95f732fc77f6f2a",
	decimals: 18
},
	"0xbc19712feb3a26080ebf6f2f7849b417fdd792ca": {
	childToken: "0xffeecbf8d7267757c2dc3d13d730e97e15bfdf7f",
	decimals: 18
},
	"0x5d285f735998f36631f678ff41fb56a10a4d0429": {
	childToken: "0x398f7827dccbefe6990478876bbf3612d93baf05",
	decimals: 18
},
	"0x0e5c8c387c5eba2ecbc137ad012aed5fe729e251": {
	childToken: "0xc2098a8938119a52b1f7661893c0153a6cb116d5",
	decimals: 18
},
	"0xb056c38f6b7dc4064367403e26424cd2c60655e1": {
	childToken: "0xe0f94ac5462997d2bc57287ac3a3ae4c31345d66",
	decimals: 18
},
	"0x3d658390460295fb963f54dc0899cfb1c30776df": {
	childToken: "0xd15cee1deafbad6c0b3fd7489677cc102b141464",
	decimals: 8
},
	"0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0": {
	childToken: "0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
	decimals: 18
},
	"0x80d55c03180349fff4a229102f62328220a96444": {
	childToken: "0x686318000d982bc8dcc1cdcf8ffd22322f0960ed",
	decimals: 18
},
	"0xf16e81dce15b08f326220742020379b855b87df9": {
	childToken: "0xf16e81dce15b08f326220742020379b855b87df9",
	decimals: 18
},
	"0xc4c75f2a0cb1a9acc33929512dc9733ea1fd6fde": {
	childToken: "0xe05d1c28b3f8127b5b058f101198ede30fe3961d",
	decimals: 18
},
	"0xe55d97a97ae6a17706ee281486e98a84095d8aaf": {
	childToken: "0xe55d97a97ae6a17706ee281486e98a84095d8aaf",
	decimals: 18
},
	"0x721a1b990699ee9d90b6327faad0a3e840ae8335": {
	childToken: "0x14a9a94e555fdd54c21d7f7e328e61d7ebece54b",
	decimals: 18
},
	"0x2edf094db69d6dcd487f1b3db9febe2eec0dd4c5": {
	childToken: "0x44754455564474a89358b2c2265883df993b12f0",
	decimals: 18
},
	"0xf0d33beda4d734c72684b5f9abbebf715d0a7935": {
	childToken: "0x5c4bcc4dbaeabc7659f6435bce4e659314ebad87",
	decimals: 6
},
	"0x1045f5ccb01daea4f8eab055f5fcbb7c0e7c89f0": {
	childToken: "0xf64ed9ad397a1ae657f31131d4b189220a7f1cc7",
	decimals: 18
},
	"0x5d30ad9c6374bf925d0a75454fa327aacf778492": {
	childToken: "0xb49b7e0742ecb4240ffe91661d2a580677460b6a",
	decimals: 18
},
	"0x8db253a1943dddf1af9bcf8706ac9a0ce939d922": {
	childToken: "0x301af3eff0c904dc5ddd06faa808f653474f7fcc",
	decimals: 18
},
	"0x09a3ecafa817268f77be1283176b946c4ff2e608": {
	childToken: "0x5b6dcf557e2abe2323c48445e8cc948910d8c2c9",
	decimals: 18
},
	"0x3b7f247f21bf3a07088c2d3423f64233d4b069f7": {
	childToken: "0xb1ce906c610004e27e74415aa9bcc90e46366f90",
	decimals: 2
},
	"0x33e07f5055173cf8febede8b21b12d1e2b523205": {
	childToken: "0x708cb02ad77e1b245b1640cee51b3cc844bcaef4",
	decimals: 18
},
	"0xf55a93b613d172b86c2ba3981a849dae2aecde2f": {
	childToken: "0xf55a93b613d172b86c2ba3981a849dae2aecde2f",
	decimals: 18
},
	"0xa2881f7f441267042f9778ffa0d4f834693426be": {
	childToken: "0x284ac5af363bde6ef5296036af8fb0e9cc347b41",
	decimals: 18
},
	"0x58fad9e3c3ae54c9ba98c3f0e4bf88ab3e8cf3c5": {
	childToken: "0x13a637026df26f846d55acc52775377717345c06",
	decimals: 18
},
	"0xfa14fa6958401314851a17d6c5360ca29f74b57b": {
	childToken: "0x3c6dad0475d3a1696b359dc04c99fd401be134da",
	decimals: 18
},
	"0x948c70dc6169bfb10028fdbe96cbc72e9562b2ac": {
	childToken: "0x180cfbe9843d79bcafcbcdf23590247793dfc95b",
	decimals: 18
},
	"0x514910771af9ca656af840dff83e8264ecf986ca": {
	childToken: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
	decimals: 18
},
	"0x5af28eb9dec75e86cdfbd2e41a474b54b211c1c2": {
	childToken: "0xd17584633bc8d190e5a14502976dad9640456d6d",
	decimals: 9
},
	"0x8c6fa66c21ae3fc435790e451946a9ea82e6e523": {
	childToken: "0x73ff5dd853cb87c144f463a555dce0e43954220d",
	decimals: 18
},
	"0xc2a81eb482cb4677136d8812cc6db6e0cb580883": {
	childToken: "0xf4bea2c219eb95c6745983b68185c7340c319d9e",
	decimals: 18
},
	"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9": {
	childToken: "0xfb6115445bff7b52feb98650c87f44907e58f802",
	decimals: 18
},
	"0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0": {
	childToken: "0xd882739fca9cbae00f3821c4c65189e2d7e26147",
	decimals: 18
},
	"0x53263d9ef74db583b15fbc6d5d4e8b83833fa134": {
	childToken: "0x6eed9140f80f9e989cb23aecbd20b97a29ffc80f",
	decimals: 18
},
	"0xac3211a5025414af2866ff09c23fc18bc97e79b1": {
	childToken: "0xc9457161320210d22f0d0d5fc1309acb383d4609",
	decimals: 18
},
	"0x3593d125a4f7849a1b059e64f4517a86dd60c95d": {
	childToken: "0xf78d2e7936f5fe18308a3b2951a93b6c4a41f5e2",
	decimals: 18
},
	"0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202": {
	childToken: "0xfe56d5892bdffc7bf58f2e84be1b2c32d21c308b",
	decimals: 18
},
	"0xbe1a001fe942f96eea22ba08783140b9dcc09d28": {
	childToken: "0xbe1a001fe942f96eea22ba08783140b9dcc09d28",
	decimals: 18
},
	"0x9c2dc0c3cc2badde84b0025cf4df1c5af288d835": {
	childToken: "0xa4b6573c9ae09d81e4d1360e6402b81f52557098",
	decimals: 18
},
	"0x394a16744dcd805bb0ca7252e70691f0dcac56aa": {
	childToken: "0x52fe7b439753092f584917e3efea86a1cfd210f9",
	decimals: 18
},
	"0x853d955acef822db058eb8505911ed77f175b99e": {
	childToken: "0x90c97f71e18723b0cf0dfa30ee176ab653e89f40",
	decimals: 18
},
	"0x436da116249044e8b4464f0cf21dd93311d88190": {
	childToken: "0x482e6bd0a178f985818c5dfb9ac77918e8412fba",
	decimals: 18
},
	"0x038a68ff68c393373ec894015816e33ad41bd564": {
	childToken: "0xf0902eb0049a4003793bab33f3566a22d2834442",
	decimals: 18
},
	"0x949d48eca67b17269629c7194f4b727d4ef9e5d6": {
	childToken: "0x949d48eca67b17269629c7194f4b727d4ef9e5d6",
	decimals: 18
},
	"0x2f141ce366a2462f02cea3d12cf93e4dca49e4fd": {
	childToken: "0x12e34cdf6a031a10fe241864c32fb03a4fdad739",
	decimals: 18
},
	"0x0f2d719407fdbeff09d87557abb7232601fd9f29": {
	childToken: "0xa4080f1778e69467e905b8d6f72f6e441f9e9484",
	decimals: 18
},
	"0x485d17a6f1b8780392d53d64751824253011a260": {
	childToken: "0x3b198e26e473b8fab2085b37978e36c9de5d7f68",
	decimals: 8
},
	"0x111111111117dc0aa78b770fa6a738034120c302": {
	childToken: "0x111111111117dc0aa78b770fa6a738034120c302",
	decimals: 18
},
	"0x3fa400483487a489ec9b1db29c4129063eec4654": {
	childToken: "0x627524d78b4fc840c887ffec90563c7a42b671fd",
	decimals: 18
},
	"0xa130e3a33a4d84b04c3918c4e5762223ae252f80": {
	childToken: "0x41065e3428188ba6eb27fbdde8526ae3af8e3830",
	decimals: 18
},
	"0xfad45e47083e4607302aa43c65fb3106f1cd7607": {
	childToken: "0xa4fffc757e8c4f24e7b209c033c123d20983ad40",
	decimals: 9
},
	"0xe6f143a0e0a8f24f6294ce3432ea10fad0206920": {
	childToken: "0x68edf56289134b41c6583c0e8fc29fbd7828aca4",
	decimals: 18
},
	"0x035df12e0f3ac6671126525f1015e47d79dfeddf": {
	childToken: "0x22a213852cee93eb6d41601133414d180c5684c2",
	decimals: 18
},
	"0x865377367054516e17014ccded1e7d814edc9ce4": {
	childToken: "0x2f29bc0ffaf9bff337b31cbe6cb5fb3bf12e5840",
	decimals: 18
},
	"0x5c872500c00565505f3624ab435c222e558e9ff8": {
	childToken: "0x304fc73e86601a61a6c6db5b0eafea587622acdc",
	decimals: 18
},
	"0x01e0e2e61f554ecaaec0cc933e739ad90f24a86d": {
	childToken: "0x64d5baf5ac030e2b7c435add967f787ae94d0205",
	decimals: 18
},
	"0x36ed7baad9a571b5dad55d096c0ed902188d6d3c": {
	childToken: "0xf07dfc2ad28ab5b09e8602418d2873fcb95e1744",
	decimals: 18
},
	"0xb64fde8f199f073f41c132b9ec7ad5b61de0b1b7": {
	childToken: "0xb64fde8f199f073f41c132b9ec7ad5b61de0b1b7",
	decimals: 9
},
	"0x20c36f062a31865bed8a5b1e512d9a1a20aa333a": {
	childToken: "0x9899a98b222fcb2f3dbee7df45d943093a4ff9ff",
	decimals: 18
},
	"0x0f17bc9a994b87b5225cfb6a2cd4d667adb4f20b": {
	childToken: "0x23b8683ff98f9e4781552dfe6f12aa32814924e8",
	decimals: 18
},
	"0x7815bda662050d84718b988735218cffd32f75ea": {
	childToken: "0xd3b71117e6c1558c1553305b44988cd944e97300",
	decimals: 18
},
	"0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0": {
	childToken: "0xe48a3d7d0bc88d552f730b62c006bc925eadb9ee",
	decimals: 18
},
	"0x5fa54fddf1870c344dbfabb37dfab8700ec0def1": {
	childToken: "0x93ab30c08421750d5c7993fb621c6ff32fe3f89e",
	decimals: 9
},
	"0x16cda4028e9e872a38acb903176719299beaed87": {
	childToken: "0x9cd9c5a44cb8fab39b2ee3556f5c439e65e4fddd",
	decimals: 18
},
	"0xd47bdf574b4f76210ed503e0efe81b58aa061f3d": {
	childToken: "0x6a8fd46f88dbd7bdc2d536c604f811c63052ce0f",
	decimals: 18
},
	"0x327673ae6b33bd3d90f0096870059994f30dc8af": {
	childToken: "0x9617857e191354dbea0b714d78bc59e57c411087",
	decimals: 18
},
	"0x8a2279d4a90b6fe1c4b30fa660cc9f926797baa2": {
	childToken: "0xf9cec8d50f6c8ad3fb6dccec577e05aa32b224fe",
	decimals: 6
},
	"0xd0cd466b34a24fcb2f87676278af2005ca8a78c4": {
	childToken: "0xe8647ea19496e87c061bbad79f457928b2f52b5a",
	decimals: 18
},
	"0xdd2e93924bdd4e20c3cf4a8736e5955224fa450e": {
	childToken: "0xbb9f216bac27046c6b8bdaae660b761b851ab068",
	decimals: 8
},
	"0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4": {
	childToken: "0x314593fa9a2fa16432913dbccc96104541d32d11",
	decimals: 18
},
	"0x26c8afbbfe1ebaca03c2bb082e69d0476bffe099": {
	childToken: "0xd98438889ae7364c7e2a3540547fad042fb24642",
	decimals: 18
},
	"0xa31b1767e09f842ecfd4bc471fe44f830e3891aa": {
	childToken: "0xf77351d8f4ee853135961a936bb8d2e4ffa75f9d",
	decimals: 18
},
	"0xe5caef4af8780e59df925470b050fb23c43ca68c": {
	childToken: "0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc",
	decimals: 18
},
	"0x095cf7f3e82a1dcadbf0fbc59023f419883ea296": {
	childToken: "0x1b6609830c695f1c0692123bd2fd6d01f6794b98",
	decimals: 18
},
	"0x53dfea0a8cc2a2a2e425e1c174bc162999723ea0": {
	childToken: "0x7c869b5a294b1314e985283d01c702b62224a05f",
	decimals: 18
},
	"0x8e0fe2947752be0d5acf73aae77362daf79cb379": {
	childToken: "0xac83271abb4ec95386f08ad2b904a46c61777cef",
	decimals: 18
},
	"0x70401dfd142a16dc7031c56e862fc88cb9537ce0": {
	childToken: "0x8780fea4c6b242677d4a397fe1110ac09ce99ad2",
	decimals: 18
},
	"0xe1d7c7a4596b038ced2a84bf65b8647271c53208": {
	childToken: "0x5774b2fc3e91af89f89141eacf76545e74265982",
	decimals: 18
},
	"0x668dbf100635f593a3847c0bdaf21f0a09380188": {
	childToken: "0xc1165227519ffd22fdc77ceb1037b9b284eef068",
	decimals: 18
},
	"0x1ca02dd95f3f1e33da7f5afe15ea866dab07af04": {
	childToken: "0x071f3a63549af1b82466ace48fa742d7e8ad6edf",
	decimals: 18
},
	"0x9506d37f70eb4c3d79c398d326c871abbf10521d": {
	childToken: "0x4518231a8fdf6ac553b9bbd51bbb86825b583263",
	decimals: 18
},
	"0x0c9b3ab1bd0cf0745625381f5c3aa1cd9bbc7abb": {
	childToken: "0x0c9b3ab1bd0cf0745625381f5c3aa1cd9bbc7abb",
	decimals: 18
},
	"0x2d80f5f5328fdcb6eceb7cacf5dd8aedaec94e20": {
	childToken: "0x976e33b07565b0c05b08b2e13affd3113e3d178d",
	decimals: 4
},
	"0xc146b7cdbaff065090077151d391f4c96aa09e0c": {
	childToken: "0xc146b7cdbaff065090077151d391f4c96aa09e0c",
	decimals: 9
},
	"0x362bc847a3a9637d3af6624eec853618a43ed7d2": {
	childToken: "0xd21d29b38374528675c34936bf7d5dd693d2a577",
	decimals: 18
},
	"0xb4371da53140417cbb3362055374b10d97e420bb": {
	childToken: "0xc0ecb8499d8da2771abcbf4091db7f65158f1468",
	decimals: 8
},
	"0xee573a945b01b788b9287ce062a0cfc15be9fd86": {
	childToken: "0x5621b5a3f4a8008c4ccdd1b942b121c8b1944f1f",
	decimals: 18
},
	"0x0f71b8de197a1c84d31de0f1fa7926c365f052b3": {
	childToken: "0x8fc4532be3003fb5a3a2f9afc7e95b3bfbd5faab",
	decimals: 18
},
	"0x77777feddddffc19ff86db637967013e6c6a116c": {
	childToken: "0x1ba8d3c4c219b124d351f603060663bd1bcd9bbf",
	decimals: 18
},
	"0x29c56e7cb9c840d2b2371b17e28bab44ad3c3ead": {
	childToken: "0x5304adfd82e5a24b70fe7ac1f45fe50b1ab4cb1d",
	decimals: 18
},
	"0xf063fe1ab7a291c5d06a86e14730b00bf24cb589": {
	childToken: "0x04f73a09e2eb410205be256054794fb452f0d245",
	decimals: 18
},
	"0x284b59cf2539544559c6efa11e2795e06d535345": {
	childToken: "0xab6b429c73c22ecabc763635dace7efac524993c",
	decimals: 18
},
	"0x6f620ec89b8479e97a6985792d0c64f237566746": {
	childToken: "0x6f620ec89b8479e97a6985792d0c64f237566746",
	decimals: 18
},
	"0x441761326490cacf7af299725b6292597ee822c2": {
	childToken: "0x728c5bac3c3e370e372fc4671f9ef6916b814d8b",
	decimals: 18
},
	"0xadb2437e6f65682b85f814fbc12fec0508a7b1d0": {
	childToken: "0x09a6c44c3947b69e2b45f4d51b67e6a39acfb506",
	decimals: 18
},
	"0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361": {
	childToken: "0x2ff0b946a6782190c4fe5d4971cfe79f0b6e4df2",
	decimals: 18
},
	"0x0000000de40dfa9b17854cbc7869d80f9f98d823": {
	childToken: "0x3a06212763caf64bf101daa4b0cebb0cd393fa1a",
	decimals: 18
},
	"0xe74be071f3b62f6a4ac23ca68e5e2a39797a3c30": {
	childToken: "0x2d94172436d869c1e3c094bead272508fab0d9e3",
	decimals: 18
},
	"0x095797fd4297fb79883cc912a5ba6313b15c445d": {
	childToken: "0xeb52620b04e8eacfd795353f2827673887f292e0",
	decimals: 18
},
	"0x7237c0b30b1355f1b76355582f182f6f04b08740": {
	childToken: "0x6125adcab2f171bc70cfe2caecfec5509273a86a",
	decimals: 18
},
	"0x491604c0fdf08347dd1fa4ee062a822a5dd06b5d": {
	childToken: "0x8da443f84fea710266c8eb6bc34b71702d033ef2",
	decimals: 18
},
	"0x364fcd7325c035cc4f2cde8b6c8d7df5e7db6589": {
	childToken: "0xf9c762822781d2a55501dfafba00417b74c8587a",
	decimals: 18
},
	"0xe4cfe9eaa8cdb0942a80b7bc68fd8ab0f6d44903": {
	childToken: "0x4a080377f83d669d7bb83b3184a8a5e61b500608",
	decimals: 18
},
	"0xa1d6df714f91debf4e0802a542e13067f31b8262": {
	childToken: "0x0a3a21356793b49154fd3bbe91cbc2a16c0457f5",
	decimals: 18
},
	"0x9d0b65a76274645b29e4cc41b8f23081fa09f4a3": {
	childToken: "0x7bc75e291e656e8658d66be1cc8154a3769a35dd",
	decimals: 18
},
	"0x9b39a0b97319a9bd5fed217c1db7b030453bac91": {
	childToken: "0x5ecc4b299e23f526980c33fe35eff531a54aedb1",
	decimals: 18
},
	"0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd": {
	childToken: "0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2",
	decimals: 18
},
	"0x8f081eb884fd47b79536d28e2dd9d4886773f783": {
	childToken: "0x8f081eb884fd47b79536d28e2dd9d4886773f783",
	decimals: 6
},
	"0xb893a8049f250b57efa8c62d51527a22404d7c9a": {
	childToken: "0x01e04c6e0b2c93bb4f8ee4b71072b861f9352660",
	decimals: 18
},
	"0xd9016a907dc0ecfa3ca425ab20b6b785b42f2373": {
	childToken: "0x84e9a6f9d240fdd33801f7135908bfa16866939a",
	decimals: 18
},
	"0xa143ac515dca260a46c742c7251ef3b268639593": {
	childToken: "0xa143ac515dca260a46c742c7251ef3b268639593",
	decimals: 18
},
	"0x96610186f3ab8d73ebee1cf950c750f3b1fb79c2": {
	childToken: "0x09f423ac3c9babbff6f94d372b16e4206e71439f",
	decimals: 18
},
	"0x3b9be07d622accaed78f479bc0edabfd6397e320": {
	childToken: "0xf7686f43591302cd9b4b9c4fe1291473fae7d9c9",
	decimals: 18
},
	"0xcd2828fc4d8e8a0ede91bb38cf64b1a81de65bf6": {
	childToken: "0xcd40f2670cf58720b694968698a5514e924f742d",
	decimals: 18
},
	"0x38d9eb07a7b8df7d86f440a4a5c4a4c1a27e1a08": {
	childToken: "0x40e51e0ec04283e300f12f6bb98da157bb22036e",
	decimals: 18
},
	"0xea1ea0972fa092dd463f2968f9bb51cc4c981d71": {
	childToken: "0xd4fbc57b6233f268e7fba3b66e62719d74deecbc",
	decimals: 18
},
	"0xbf6ff49ffd3d104302ef0ab0f10f5a84324c091c": {
	childToken: "0xbf6ff49ffd3d104302ef0ab0f10f5a84324c091c",
	decimals: 18
},
	"0x1fcdce58959f536621d76f5b7ffb955baa5a672f": {
	childToken: "0x658a109c5900bc6d2357c87549b651670e5b0539",
	decimals: 18
},
	"0x16594930d16f3970e1a4317c6016555cb2e7b7fc": {
	childToken: "0x5655592badf214bbd520187de0a766cd7bd7c712",
	decimals: 18
},
	"0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419": {
	childToken: "0x99956d38059cf7beda96ec91aa7bb2477e0901dd",
	decimals: 18
},
	"0x0af55d5ff28a3269d69b98680fd034f115dd53ac": {
	childToken: "0x0af55d5ff28a3269d69b98680fd034f115dd53ac",
	decimals: 8
},
	"0x657b83a0336561c8f64389a6f5ade675c04b0c3b": {
	childToken: "0xe9b9c1c38dab5eab3b7e2ad295425e89bd8db066",
	decimals: 18
},
	"0xd567b5f02b9073ad3a982a099a23bf019ff11d1c": {
	childToken: "0x66109633715d2110dda791e64a7b2afadb517abb",
	decimals: 5
},
	"0x27702a26126e0b3702af63ee09ac4d1a084ef628": {
	childToken: "0x82d2f8e02afb160dd5a480a617692e62de9038c4",
	decimals: 18
},
	"0xd31a59c85ae9d8edefec411d448f90841571b89c": {
	childToken: "0xfa54ff1a158b5189ebba6ae130ced6bbd3aea76e",
	decimals: 9
},
	"0x3c9d6c1c73b31c837832c72e04d3152f051fc1a9": {
	childToken: "0x92d7756c60dcfd4c689290e8a9f4d263b3b32241",
	decimals: 18
},
	"0xdfdd3459d4f87234751696840092ee20c970fb07": {
	childToken: "0x4ef06d1a55962f29d362c53c864a4f0c791dcb9e",
	decimals: 9
},
	"0x86d1d12523b65203851c571fcc029bf90903fb6d": {
	childToken: "0x0ec04ece89609e545b8768e303986421ffc32eaf",
	decimals: 18
},
	"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": {
	childToken: "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
	decimals: 18
},
	"0xa0bed124a09ac2bd941b10349d8d224fe3c955eb": {
	childToken: "0xa0bed124a09ac2bd941b10349d8d224fe3c955eb",
	decimals: 18
},
	"0xd49efa7bc0d339d74f487959c573d518ba3f8437": {
	childToken: "0x3470c81026c8085b7b743695f851353043ff0d0d",
	decimals: 18
},
	"0xbc396689893d065f41bc2c6ecbee5e0085233447": {
	childToken: "0x4e7f408be2d4e9d60f49a64b89bb619c84c7c6f5",
	decimals: 18
},
	"0x8e57c27761ebbd381b0f9d09bb92ceb51a358abb": {
	childToken: "0x80dba9c32b7ab5445e482387a5522e24c0ba4c24",
	decimals: 18
},
	"0xb3ed706b564bba9cab64042f4e1b391be7bebce5": {
	childToken: "0x114597f4260caf4cde1eeb0b9d9865b0b7b9a46a",
	decimals: 18
},
	"0x0b5326da634f9270fb84481dd6f94d3dc2ca7096": {
	childToken: "0x48b19b7605429acaa8ea734117f39726a9aab1f9",
	decimals: 18
},
	"0x173e552bf97bbd50b455514ac52991ef639ba703": {
	childToken: "0x733af324146dcfe743515d8d77dc25140a07f9e0",
	decimals: 9
},
	"0x00a8b738e453ffd858a7edf03bccfe20412f0eb0": {
	childToken: "0x42f3008f6945f052c31e7680f7f78c512099b904",
	decimals: 18
},
	"0x7fbec0bb6a7152e77c30d005b5d49cbc08a602c3": {
	childToken: "0x7fbec0bb6a7152e77c30d005b5d49cbc08a602c3",
	decimals: 18
},
	"0x644192291cc835a93d6330b24ea5f5fedd0eef9e": {
	childToken: "0x644192291cc835a93d6330b24ea5f5fedd0eef9e",
	decimals: 18
},
	"0x358aa737e033f34df7c54306960a38d09aabd523": {
	childToken: "0xf9752a6e8a5e5f5e6eb3ab4e7d8492460fb319f0",
	decimals: 18
},
	"0x58f7345b5295e43aa454911571f13be186655be9": {
	childToken: "0x7283dfa2d8d7e277b148cc263b5d8ae02f1076d3",
	decimals: 8
},
	"0xcfa0885131f602d11d4da248d2c65a62063567a9": {
	childToken: "0xcea59dce6a6d73a24e6d6944cfabc330814c098a",
	decimals: 18
},
	"0x8eef5a82e6aa222a60f009ac18c24ee12dbf4b41": {
	childToken: "0x1ffd0b47127fdd4097e54521c9e2c7f0d66aafc5",
	decimals: 18
},
	"0x3b544e6fcf6c8dce9d8b45a4fdf21c9b02f9fda9": {
	childToken: "0xfdfd27ae39cebefdbaac8615f18aa68ddd0f15f5",
	decimals: 18
},
	"0x03d1e72765545729a035e909edd9371a405f77fb": {
	childToken: "0x755f34709e369d37c6fa52808ae84a32007d1155",
	decimals: 18
},
	"0x3496b523e5c00a4b4150d6721320cddb234c3079": {
	childToken: "0xeceb87cf00dcbf2d4e2880223743ff087a995ad9",
	decimals: 18
},
	"0x256f2d67e52fe834726d2ddcd8413654f5eb8b53": {
	childToken: "0xfed93e410a6a45bc045bc91deaae1fd642e4af7a",
	decimals: 18
},
	"0x47c1178f49140ecdbfbdf0ae2935cdb640d579f9": {
	childToken: "0x855ea8048e1852996429a50abda60f583909d298",
	decimals: 10
},
	"0xee9e5eff401ee921b138490d00ca8d1f13f67a72": {
	childToken: "0xb955b4cab9aa3b49e23aeb5204ebc5ff6678e86d",
	decimals: 18
},
	"0x1f19f83fc9a25f3c861260143e36c17706257986": {
	childToken: "0x873801ae2ff12d816db9a7b082f5796bec64c82c",
	decimals: 18
},
	"0x4e352cf164e64adcbad318c3a1e222e9eba4ce42": {
	childToken: "0x5fe80d2cd054645b9419657d3d10d26391780a7b",
	decimals: 18
},
	"0x734c90044a0ba31b3f2e640c10dc5d3540499bfd": {
	childToken: "0x270388e0ca29cfd7c7e73903d9d933a23d1bab39",
	decimals: 18
},
	"0xe1747a23c44f445062078e3c528c9f4c28c50a51": {
	childToken: "0xe1747a23c44f445062078e3c528c9f4c28c50a51",
	decimals: 18
},
	"0xb8647e90c0645152fccf4d9abb6b59eb4aa99052": {
	childToken: "0x4b6000f9163de2e3f0a01ec37e06e1469dbbce9d",
	decimals: 18
},
	"0x31ea0de8119307aa264bb4b38727aab4e36b074f": {
	childToken: "0x65d9033cff96782394dab5dbef17fa771bbe1732",
	decimals: 18
},
	"0x005d1123878fc55fbd56b54c73963b234a64af3c": {
	childToken: "0xc3afde95b6eb9ba8553cdaea6645d45fb3a7faf5",
	decimals: 18
},
	"0x10f44a834097469ac340592d28c479c442e99bfe": {
	childToken: "0x353d0d1b4feb416faaabd5b314d99ef148d56dff",
	decimals: 18
},
	"0xfeb2d480019bc605a2ce20903a90db3f554f1e1c": {
	childToken: "0xfeb2d480019bc605a2ce20903a90db3f554f1e1c",
	decimals: 9
},
	"0xff44b937788215eca197baaf9af69dbdc214aa04": {
	childToken: "0xa01000c52b234a92563ba61e5649b7c76e1ba0f3",
	decimals: 18
},
	"0xb1e9157c2fdcc5a856c8da8b2d89b6c32b3c1229": {
	childToken: "0x23ec58e45ac5313bcb6681f4f7827b8a8453ac45",
	decimals: 18
},
	"0x20e7125677311fca903a8897042b9983f22ea295": {
	childToken: "0x90a1e4bbade88366dc44436535f1571d95e666c7",
	decimals: 18
},
	"0x7db5af2b9624e1b3b4bb69d6debd9ad1016a58ac": {
	childToken: "0x7db5af2b9624e1b3b4bb69d6debd9ad1016a58ac",
	decimals: 9
},
	"0x40821cd074dfecb1524286923bc69315075b5c89": {
	childToken: "0x3dc2d7434bdbb4ca1a8a6bcc8a8075aeae2d2179",
	decimals: 18
},
	"0x4c2e59d098df7b6cbae0848d66de2f8a4889b9c3": {
	childToken: "0x43f5b29d63cedc5a7c1724dbb1d698fde05ada21",
	decimals: 18
},
	"0x8290333cef9e6d528dd5618fb97a76f268f3edd4": {
	childToken: "0xf307910a4c7bbc79691fd374889b36d8531b08e3",
	decimals: 18
},
	"0x0000000000085d4780b73119b644ae5ecd22b376": {
	childToken: "0x14016e85a25aeb13065688cafb43044c2ef86784",
	decimals: 18
},
	"0x75387e1287dd85482ab66102da9f6577e027f609": {
	childToken: "0xe985e923b6c52b420dd33549a0ebc2cdeb0ae173",
	decimals: 18
},
	"0x155040625d7ae3e9cada9a73e3e44f76d3ed1409": {
	childToken: "0x155040625d7ae3e9cada9a73e3e44f76d3ed1409",
	decimals: 18
},
	"0xcd6adc6b8bd396e2d53ccd7d7257b4de55be4fbe": {
	childToken: "0xc1e0510a0df7646817b6632d32caa681a425a5e6",
	decimals: 18
},
	"0x24ec2ca132abf8f6f8a6e24a1b97943e31f256a7": {
	childToken: "0x0ebd9537a25f56713e34c45b38f421a1e7191469",
	decimals: 18
},
	"0x147faf8de9d8d8daae129b187f0d02d819126750": {
	childToken: "0xc342774492b54ce5f8ac662113ed702fc1b34972",
	decimals: 18
},
	"0x2e85ae1c47602f7927bcabc2ff99c40aa222ae15": {
	childToken: "0x6d6ba21e4c4b29ca7bfa1c344ba1e35b8dae7205",
	decimals: 18
},
	"0xf5717f5df41ea67ef67dfd3c1d02f9940bcf5d08": {
	childToken: "0xa997e5aaae60987eb0b59a336dce6b158b113100",
	decimals: 3
},
	"0x1341a2257fa7b770420ef70616f888056f90926c": {
	childToken: "0xb3d691125514db7a5be3326af86a72ecdc2cde16",
	decimals: 9
},
	"0xf33121a2209609cadc7349acc9c40e41ce21c730": {
	childToken: "0x7c650f39d777f40120345314ab8009d11f70c972",
	decimals: 18
},
	"0x3da932456d082cba208feb0b096d49b202bf89c8": {
	childToken: "0x3da932456d082cba208feb0b096d49b202bf89c8",
	decimals: 18
},
	"0xdd2a36ae937bc134ea694d77fc7e2e36f5d86de0": {
	childToken: "0x5b6ebb33eea2d12eefd4a9b2aeaf733231169684",
	decimals: 18
},
	"0x29ceddcf0da3c1d8068a7dfbd0fb06c2e438ff70": {
	childToken: "0xfd5af95c12446b60d23e16a4ea95690ce942e5dc",
	decimals: 18
},
	"0x635d081fd8f6670135d8a3640e2cf78220787d56": {
	childToken: "0xcd7e445175ff67475f0079b13aa6bed8a4e01809",
	decimals: 18
},
	"0x675bbc7514013e2073db7a919f6e4cbef576de37": {
	childToken: "0x668048e70284107a6afab1711f28d88df3e72948",
	decimals: 18
},
	"0x3e9bc21c9b189c09df3ef1b824798658d5011937": {
	childToken: "0x762539b45a1dcce3d36d080f74d1aed37844b878",
	decimals: 18
},
	"0x2a039b1d9bbdccbb91be28691b730ca893e5e743": {
	childToken: "0xadec335a2e3881303a9b0203eb99de12202280df",
	decimals: 18
},
	"0xd6bd97a26232ba02172ff86b055d5d7be789335b": {
	childToken: "0x5d2f9a9df1ba3c8c00303d0b4c431897ebc6626a",
	decimals: 18
},
	"0x4161725d019690a3e0de50f6be67b07a86a9fae1": {
	childToken: "0xeca41281c24451168a37211f0bc2b8645af45092",
	decimals: 4
},
	"0x21bfbda47a0b4b5b1248c767ee49f7caa9b23697": {
	childToken: "0x7e35d0e9180bf3a1fc47b0d110be7a21a10b41fe",
	decimals: 18
},
	"0x4a621d9f1b19296d1c0f87637b3a8d4978e9bf82": {
	childToken: "0x9001fd53504f7bf253296cffadf5b6030cd61abb",
	decimals: 18
},
	"0x467719ad09025fcc6cf6f8311755809d45a5e5f3": {
	childToken: "0x8b1f4432f943c465a973fedc6d7aa50fc96f1f65",
	decimals: 6
},
	"0x75858677e27c930fb622759feaffee2b754af07f": {
	childToken: "0x298eff8af1ecebbb2c034eaa3b9a5d0cc56c59cd",
	decimals: 8
},
	"0x88a9a52f944315d5b4e917b9689e65445c401e83": {
	childToken: "0x9ba6a67a6f3b21705a46b380a1b97373a33da311",
	decimals: 18
},
	"0xe3818504c1b32bf1557b16c238b2e01fd3149c17": {
	childToken: "0x790cfdc6ab2e0ee45a433aac5434f183be1f6a20",
	decimals: 18
},
	"0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d": {
	childToken: "0x5857c96dae9cf8511b08cb07f85753c472d36ea3",
	decimals: 18
},
	"0x139cec55d1ec47493dfa25ca77c9208aba4d3c68": {
	childToken: "0x591aaadbc85e19065c88a1b0c2ed3f58295f47df",
	decimals: 18
},
	"0xa0f0546eb5e3ee7e8cfc5da12e5949f3ae622675": {
	childToken: "0x45f7967926e95fd161e56ed66b663c9114c5226f",
	decimals: 18
},
	"0xdc8af07a7861bedd104b8093ae3e9376fc8596d2": {
	childToken: "0x872a34ebb2d54af86827810eebc7b9dc6b2144aa",
	decimals: 18
},
	"0x44709a920fccf795fbc57baa433cc3dd53c44dbe": {
	childToken: "0x489580eb70a50515296ef31e8179ff3e77e24965",
	decimals: 18
},
	"0x6149c26cd2f7b5ccdb32029af817123f6e37df5b": {
	childToken: "0xcfb24d3c3767364391340a2e6d99c64f1cbd7a3d",
	decimals: 18
},
	"0x34f797e7190c131cf630524655a618b5bd8738e7": {
	childToken: "0x0615dbba33fe61a31c7ed131bda6655ed76748b1",
	decimals: 18
},
	"0xd98f75b1a3261dab9eed4956c93f33749027a964": {
	childToken: "0x5fb4968fc85868df3ad2d6e59883a10570f01d18",
	decimals: 18
},
	"0xeb986da994e4a118d5956b02d8b7c3c7ce373674": {
	childToken: "0xeb986da994e4a118d5956b02d8b7c3c7ce373674",
	decimals: 18
},
	"0x64a77277e37d44957fe5815d6ff442ab8b16cc29": {
	childToken: "0x222cf80a8514f8ce551c06d1b8d01db3678688ad",
	decimals: 9
},
	"0xaea46a60368a7bd060eec7df8cba43b7ef41ad85": {
	childToken: "0x031b41e504677879370e9dbcf937283a8691fa7f",
	decimals: 18
},
	"0x6c936d4ae98e6d2172db18c16c4b601c99918ee6": {
	childToken: "0x82190d28e710ea9c029d009fad951c6f1d803bb3",
	decimals: 18
},
	"0x28a06c02287e657ec3f8e151a13c36a1d43814b0": {
	childToken: "0x1ad0132d8b5ef3cebda1a9692f36ac30be871b6b",
	decimals: 18
},
	"0x13572851103bed49ff743af4c4bb5ace88b22e2f": {
	childToken: "0x4f55ab914ce8a633c7eb5d8b4d190a96e9ed7f90",
	decimals: 9
},
	"0x5732046a883704404f284ce41ffadd5b007fd668": {
	childToken: "0x935a544bf5816e3a7c13db2efe3009ffda0acda2",
	decimals: 18
},
	"0x5faa989af96af85384b8a938c2ede4a7378d9875": {
	childToken: "0xe4cc45bb5dbda06db6183e8bf016569f40497aa5",
	decimals: 18
},
	"0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": {
	childToken: "0xfb5b838b6cfeedc2873ab27866079ac55363d37e",
	decimals: 9
},
	"0x4ee438be38f8682abb089f2bfea48851c5e71eaf": {
	childToken: "0x4ee438be38f8682abb089f2bfea48851c5e71eaf",
	decimals: 18
},
	"0xb49fa25978abf9a248b8212ab4b87277682301c0": {
	childToken: "0x1a28ed8472f644e8898a169a644503b779748d6e",
	decimals: 18
},
	"0x553539d40ae81fd0d9c4b991b0b77be6f6bc030e": {
	childToken: "0x553539d40ae81fd0d9c4b991b0b77be6f6bc030e",
	decimals: 18
},
	"0x0407b4c4eaed35ce3c5b852bdfa1640b09eeedf4": {
	childToken: "0x948b7b39e665a8add9e128b0c378f99152172274",
	decimals: 4
},
	"0x09970aec766b6f3223aca9111555e99dc50ff13a": {
	childToken: "0x1cdee2f21c066848a8a135e19f5f302ca29f1f69",
	decimals: 18
},
	"0x4691937a7508860f876c9c0a2a617e7d9e945d4b": {
	childToken: "0x4691937a7508860f876c9c0a2a617e7d9e945d4b",
	decimals: 18
},
	"0xd7efb00d12c2c13131fd319336fdf952525da2af": {
	childToken: "0x5de3939b2f811a61d830e6f52d13b066881412ab",
	decimals: 4
},
	"0xcafe001067cdef266afb7eb5a286dcfd277f3de5": {
	childToken: "0xcafe001067cdef266afb7eb5a286dcfd277f3de5",
	decimals: 18
},
	"0x3c6ff50c9ec362efa359317009428d52115fe643": {
	childToken: "0xcb6409696c58aa777317dbdfaa8bab4ac8e39eea",
	decimals: 18
},
	"0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2": {
	childToken: "0xffba7529ac181c2ee1844548e6d7061c9a597df4",
	decimals: 18
},
	"0x996dc5dfc819408dd98cd92c9a76f64b0738dc3d": {
	childToken: "0x7f692c05058f1c77c87413a0591c7a237090da00",
	decimals: 18
},
	"0xc4c2614e694cf534d407ee49f8e44d125e4681c4": {
	childToken: "0x35de111558f691f77f791fb0c08b2d6b931a9d47",
	decimals: 18
},
	"0x591127253e40d4f63bf29ccf3d81fd062a149c8c": {
	childToken: "0x9aab0a9b3a2f7cf669f1385c48e0a063b93834bb",
	decimals: 18
},
	"0x0bb217e40f8a5cb79adf04e1aab60e5abd0dfc1e": {
	childToken: "0xe64e30276c2f826febd3784958d6da7b55dfbad3",
	decimals: 18
},
	"0x94804dc4948184ffd7355f62ccbb221c9765886f": {
	childToken: "0xd38c1b7b95d359978996e01b8a85286f65b3c011",
	decimals: 18
},
	"0xfb5c6815ca3ac72ce9f5006869ae67f18bf77006": {
	childToken: "0x4c882ec256823ee773b25b414d36f92ef58a7c0c",
	decimals: 18
},
	"0xeca82185adce47f39c684352b0439f030f860318": {
	childToken: "0x0f9e4d49f25de22c2202af916b681fbb3790497b",
	decimals: 18
},
	"0x5f474906637bdcda05f29c74653f6962bb0f8eda": {
	childToken: "0xbe4cb2c354480042a39350a0c6c26bf54786539f",
	decimals: 18
},
	"0xcbe7142f5c16755d8683ba329efa1abf7b54482d": {
	childToken: "0x23316e6b09e8f4f67b95d53b4f1e59d1fb518f29",
	decimals: 8
},
	"0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787": {
	childToken: "0xad86d0e9764ba90ddd68747d64bffbd79879a238",
	decimals: 18
},
	"0x8e9a29e7ed21db7c5b2e1cd75e676da0236dfb45": {
	childToken: "0x8ac0a467f878f3561d309cf9b0994b0530b0a9d2",
	decimals: 18
},
	"0xadd5e881984783dd432f80381fb52f45b53f3e70": {
	childToken: "0x2794dad4077602ed25a88d03781528d1637898b4",
	decimals: 18
},
	"0x9ac5c63ddcb93612e316ab31dfc8192bc8961988": {
	childToken: "0xa9243aeb1e1038273d479436d4f4dece656c62f3",
	decimals: 18
},
	"0x846c66cf71c43f80403b51fe3906b3599d63336f": {
	childToken: "0x43a167b15a6f24913a8b4d35488b36ac15d39200",
	decimals: 18
},
	"0x405ce8b2eaeea7d4ba5fc160848cb2a6569e03f0": {
	childToken: "0x405ce8b2eaeea7d4ba5fc160848cb2a6569e03f0",
	decimals: 18
},
	"0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6": {
	childToken: "0xb0d502e938ed5f4df2e681fe6e419ff29631d62b",
	decimals: 18
},
	"0xee1ae38be4ce0074c4a4a8dc821cc784778f378c": {
	childToken: "0xee1ae38be4ce0074c4a4a8dc821cc784778f378c",
	decimals: 4
},
	"0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b": {
	childToken: "0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b",
	decimals: 18
},
	"0x4c11249814f11b9346808179cf06e71ac328c1b5": {
	childToken: "0xa325ad6d9c92b55a3fc5ad7e412b1518f96441c0",
	decimals: 18
},
	"0x630d98424efe0ea27fb1b3ab7741907dffeaad78": {
	childToken: "0x630d98424efe0ea27fb1b3ab7741907dffeaad78",
	decimals: 8
},
	"0xe28b3b32b6c345a34ff64674606124dd5aceca30": {
	childToken: "0xa2b726b1145a4773f68593cf171187d8ebe4d495",
	decimals: 18
},
	"0x944eee930933be5e23b690c8589021ec8619a301": {
	childToken: "0xc70636a779118e57e1c6fdafdd1f919fae912d2f",
	decimals: 9
},
	"0x8a7adc1b690e81c758f1bd0f72dfe27ae6ec56a5": {
	childToken: "0x766afcf83fd5eaf884b3d529b432ca27a6d84617",
	decimals: 18
},
	"0x8a0cdfab62ed35b836dc0633482798421c81b3ec": {
	childToken: "0x8ea93d00cc6252e2bd02a34782487eed65738152",
	decimals: 18
},
	"0x5a666c7d92e5fa7edcb6390e4efd6d0cdd69cf37": {
	childToken: "0x2fa5daf6fe0708fbd63b1a7d1592577284f52256",
	decimals: 18
},
	"0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f": {
	childToken: "0x8519ea49c997f50ceffa444d240fb655e89248aa",
	decimals: 18
},
	"0xd794dd1cada4cf79c9eebaab8327a1b0507ef7d4": {
	childToken: "0xf6565a97dc832d93dc83b75ee9aa5c7e8ecb0f9d",
	decimals: 18
},
	"0x9f9913853f749b3fe6d6d4e16a1cc3c1656b6d51": {
	childToken: "0x518445f0db93863e5e93a7f70617c05afa8048f1",
	decimals: 18
},
	"0x55a290f08bb4cae8dcf1ea5635a3fcfd4da60456": {
	childToken: "0x816e9e589f8c07149da4e2496c547952338b27e2",
	decimals: 18
},
	"0xc50ef449171a51fbeafd7c562b064b6471c36caa": {
	childToken: "0x21f9b5b2626603e3f40bfc13d01afb8c431d382f",
	decimals: 9
},
	"0xdb262c7d67fe7336574f005db47b7c8e1df41852": {
	childToken: "0xe888c5cfe7cb2aae68808d47276e5ba19e76d725",
	decimals: 18
},
	"0xf56b164efd3cfc02ba739b719b6526a6fa1ca32a": {
	childToken: "0x3d04edc843e74935c09f54cc4b2fe1870e347ac9",
	decimals: 18
},
	"0x5228a22e72ccc52d415ecfd199f99d0665e7733b": {
	childToken: "0xed28a457a5a76596ac48d87c0f577020f6ea1c4c",
	decimals: 18
},
	"0xd31695a1d35e489252ce57b129fd4b1b05e6acac": {
	childToken: "0x7849ed1447250d0b896f89b58f3075b127ca29b3",
	decimals: 18
},
	"0x2f109021afe75b949429fe30523ee7c0d5b27207": {
	childToken: "0x2a4dffa1fa0f86ce7f0982f88aecc199fb3476bc",
	decimals: 18
},
	"0x6e9730ecffbed43fd876a264c982e254ef05a0de": {
	childToken: "0x6e9730ecffbed43fd876a264c982e254ef05a0de",
	decimals: 18
},
	"0xaecc217a749c2405b5ebc9857a16d58bdc1c367f": {
	childToken: "0x409e215738e31d8ab252016369c2dd9c2008fee0",
	decimals: 9
},
	"0xd01409314acb3b245cea9500ece3f6fd4d70ea30": {
	childToken: "0x857b222fc79e1cbbf8ca5f78cb133d1b7cf34bbd",
	decimals: 18
},
	"0x04abeda201850ac0124161f037efd70c74ddc74c": {
	childToken: "0x98f8669f6481ebb341b522fcd3663f79a3d1a6a7",
	decimals: 18
},
	"0x7a73839bd0e5cded853cb01aa9773f8989381065": {
	childToken: "0xc822bb8f72c212f0f9477ab064f3bdf116c193e6",
	decimals: 18
},
	"0x957891c11616d3e0b0a76a76fb42724c382e0ef3": {
	childToken: "0xa4cb040b85e94f5c0c32ea1151b20d3ab40b3493",
	decimals: 18
},
	"0xf009f5531de69067435e32c4b9d36077f4c4a673": {
	childToken: "0xf915fdda4c882731c0456a4214548cd13a822886",
	decimals: 18
},
	"0x9e32b13ce7f2e80a01932b42553652e053d6ed8e": {
	childToken: "0xe552fb52a4f19e44ef5a967632dbc320b0820639",
	decimals: 18
},
	"0xedadeb5faa413e6c8623461849dfd0b7c3790c32": {
	childToken: "0xb5be8d87fce6ce87a24b90abdb019458a8ec31f9",
	decimals: 18
},
	"0xb32ac3c79a94ac1eb258f3c830bbdbc676483c93": {
	childToken: "0xb32ac3c79a94ac1eb258f3c830bbdbc676483c93",
	decimals: 18
},
	"0xceb286c9604c542d3cc08b41aa6c9675b078a832": {
	childToken: "0x070625d5a14706c30b8e2264753b2f5d035bc1b4",
	decimals: 18
},
	"0x878cf148ccbb50426043a9affe54ba408221c7fa": {
	childToken: "0x29e0a541c368528009715c03558c1ec4b8d0aeee",
	decimals: 8
},
	"0xc00e94cb662c3520282e6f5717214004a7f26888": {
	childToken: "0x52ce071bd9b1c4b00a0b92d298c512478cad67e8",
	decimals: 18
},
	"0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611": {
	childToken: "0xbf05279f9bf1ce69bbfed670813b7e431142afa4",
	decimals: 18
},
	"0xb453f1f2ee776daf2586501361c457db70e1ca0f": {
	childToken: "0x4ec16da4c9007462de151c0da9f5426c69978a7b",
	decimals: 8
},
	"0x320d31183100280ccdf69366cd56180ea442a3e8": {
	childToken: "0x320d31183100280ccdf69366cd56180ea442a3e8",
	decimals: 8
},
	"0xaaa9214f675316182eaa21c85f0ca99160cc3aaa": {
	childToken: "0xaaa9214f675316182eaa21c85f0ca99160cc3aaa",
	decimals: 18
},
	"0x7e80e4d7d5725499791cf8b17a4586f1f0672a0c": {
	childToken: "0x41080ca7be4b3f0cacbd95164e9a56b582382caa",
	decimals: 18
},
	"0x159a1dfae19057de57dfffcbb3da1ae784678965": {
	childToken: "0xb44c63a09adf51f5e62cc7b63628b1b789941fa0",
	decimals: 9
},
	"0x7ddc52c4de30e94be3a6a0a2b259b2850f421989": {
	childToken: "0x7ddc52c4de30e94be3a6a0a2b259b2850f421989",
	decimals: 18
},
	"0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3": {
	childToken: "0xfe19f0b51438fd612f6fd59c1dbb3ea319f433ba",
	decimals: 18
},
	"0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe": {
	childToken: "0x1861c9058577c3b48e73d91d6f25c18b17fbffe0",
	decimals: 18
},
	"0x727f064a78dc734d33eec18d5370aef32ffd46e4": {
	childToken: "0x3dcb18569425930954feb191122e574b87f66abd",
	decimals: 18
},
	"0x7728cd70b3dd86210e2bd321437f448231b81733": {
	childToken: "0x7728cd70b3dd86210e2bd321437f448231b81733",
	decimals: 18
},
	"0xf1b8762a7fa8c244e36f7234edf40cfae24394e3": {
	childToken: "0xd0f653ad03ca32a792abfa6d6711cdf1311e5d9d",
	decimals: 18
},
	"0x33840024177a7daca3468912363bed8b425015c5": {
	childToken: "0x33840024177a7daca3468912363bed8b425015c5",
	decimals: 18
},
	"0x888888888889c00c67689029d7856aac1065ec11": {
	childToken: "0x566cedd201f67e542a6851a2959c1a449a041945",
	decimals: 18
},
	"0x6f87d756daf0503d08eb8993686c7fc01dc44fb1": {
	childToken: "0x7af173f350d916358af3e218bdf2178494beb748",
	decimals: 18
},
	"0x8db1d28ee0d822367af8d220c0dc7cb6fe9dc442": {
	childToken: "0x8db1d28ee0d822367af8d220c0dc7cb6fe9dc442",
	decimals: 18
},
	"0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9": {
	childToken: "0x47bead2563dcbf3bf2c9407fea4dc236faba485a",
	decimals: 18
},
	"0xc0f1728d9513efc316d0e93a0758c992f88b0809": {
	childToken: "0x82e7eb8f4c307f2dcf522fdca7b7038296584f29",
	decimals: 18
},
	"0x6e8908cfa881c9f6f2c64d3436e7b80b1bf0093f": {
	childToken: "0xbd525e51384905c6c0936a431bc7efb6c4903ea0",
	decimals: 18
},
	"0x5d858bcd53e085920620549214a8b27ce2f04670": {
	childToken: "0x1bb76a939d6b7f5be6b95c4f9f822b02b4d62ced",
	decimals: 18
},
	"0x4a615bb7166210cce20e6642a6f8fb5d4d044496": {
	childToken: "0x758d08864fb6cce3062667225ca10b8f00496cc2",
	decimals: 18
},
	"0x4674a4f24c5f63d53f22490fb3a08eaaad739ff8": {
	childToken: "0x66cafcf6c32315623c7ffd3f2ff690aa36ebed38",
	decimals: 18
},
	"0x5319e86f0e41a06e49eb37046b8c11d78bcad68c": {
	childToken: "0x5dd1e31e1a0e2e077ac98d2a4b781f418ca50387",
	decimals: 18
},
	"0xc1f976b91217e240885536af8b63bc8b5269a9be": {
	childToken: "0x3b79a28264fc52c7b4cea90558aa0b162f7faf57",
	decimals: 18
},
	"0xf54b304e2e4b28c7e46619d1a340f9b2b72383d7": {
	childToken: "0xf54b304e2e4b28c7e46619d1a340f9b2b72383d7",
	decimals: 18
},
	"0xc96df921009b790dffca412375251ed1a2b75c60": {
	childToken: "0x7e2afe446a30fa67600a5174df7f4002b8e15b03",
	decimals: 18
},
	"0x6d0f5149c502faf215c89ab306ec3e50b15e2892": {
	childToken: "0xaf00aac2431b04ef6afd904d19b08d5146e3a9a0",
	decimals: 18
},
	"0x8cb924583681cbfe487a62140a994a49f833c244": {
	childToken: "0x0efe961c733ff46ce34c56a73eba0c6a0e18e0f5",
	decimals: 18
},
	"0x3ecb96039340630c8b82e5a7732bc88b2aeade82": {
	childToken: "0x939d5a13cf0074586a2dcf17bc692b2d3ccdd517",
	decimals: 18
},
	"0xa0ed3c520dc0632657ad2eaaf19e26c4fd431a84": {
	childToken: "0xa0ed3c520dc0632657ad2eaaf19e26c4fd431a84",
	decimals: 18
},
	"0x9fa69536d1cda4a04cfb50688294de75b505a9ae": {
	childToken: "0x373e768f79c820aa441540d254dca6d045c6d25b",
	decimals: 18
},
	"0x2ba8349123de45e931a8c8264c332e6e9cf593f9": {
	childToken: "0xc10358f062663448a3489fc258139944534592ac",
	decimals: 18
},
	"0x4da0c48376c277cdbd7fc6fdc6936dee3e4adf75": {
	childToken: "0x368ce786ea190f32439074e8d22e12ecb718b44c",
	decimals: 18
},
	"0x06450dee7fd2fb8e39061434babcfc05599a6fb8": {
	childToken: "0x2ab0e9e4ee70fff1fb9d67031e44f6410170d00e",
	decimals: 18
},
	"0xba6b0dbb2ba8daa8f5d6817946393aef8d3a4487": {
	childToken: "0xda8929a6338f408cc78c1845fb4f71bffd2cfcfb",
	decimals: 18
},
	"0x946551dd05c5abd7cc808927480225ce36d8c475": {
	childToken: "0x04baf95fd4c52fd09a56d840baee0ab8d7357bf0",
	decimals: 18
},
	"0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3": {
	childToken: "0x7bd6fabd64813c48545c9c0e312a0099d9be2540",
	decimals: 18
},
	"0x6006fc2a849fedaba8330ce36f5133de01f96189": {
	childToken: "0xba8a6ef5f15ed18e7184f44a775060a6bf91d8d0",
	decimals: 18
},
	"0x7121d00b4fa18f13da6c2e30d19c04844e6afdc8": {
	childToken: "0x3f6b2d68980db7371d3d0470117393c9262621ea",
	decimals: 9
},
	"0xcfeb09c3c5f0f78ad72166d55f9e6e9a60e96eec": {
	childToken: "0xedf3ce4dd6725650a8e9398e5c6398d061fa7955",
	decimals: 18
},
	"0x3a0b022f32b3191d44e5847da12dc0b63fb07c91": {
	childToken: "0xd6f28f15a5cafc8d29556393c08177124b88de0d",
	decimals: 18
},
	"0x8642a849d0dcb7a15a974794668adcfbe4794b56": {
	childToken: "0xed8c8aa8299c10f067496bb66f8cc7fb338a3405",
	decimals: 18
},
	"0x474021845c4643113458ea4414bdb7fb74a01a77": {
	childToken: "0x474021845c4643113458ea4414bdb7fb74a01a77",
	decimals: 18
},
	"0x6b3595068778dd592e39a122f4f5a5cf09c90fe2": {
	childToken: "0x947950bcc74888a40ffa2593c5798f11fc9124c4",
	decimals: 18
},
	"0x92868a5255c628da08f550a858a802f5351c5223": {
	childToken: "0x92868a5255c628da08f550a858a802f5351c5223",
	decimals: 18
},
	"0xe831f96a7a1dce1aa2eb760b1e296c6a74caa9d5": {
	childToken: "0xfa37e513e6cd506c4694b992825a8b614c035581",
	decimals: 8
},
	"0xcaa9ed6d7502595b555113d4517668ae24038c8a": {
	childToken: "0x71ab195498b6dc1656abb4d9233f83ae5f19495b",
	decimals: 18
},
	"0xf720e38f678b29b243f7d53b56acbf5de98f2385": {
	childToken: "0xf720e38f678b29b243f7d53b56acbf5de98f2385",
	decimals: 18
},
	"0xc741f06082aa47f93729070ad0dd95e223bda091": {
	childToken: "0x887d9c01fff04022da9c6d64a65a481a9e5d1fca",
	decimals: 8
},
	"0x62dc4817588d53a056cbbd18231d91ffccd34b2a": {
	childToken: "0x58759dd469ae5631c42cf8a473992335575b58d7",
	decimals: 18
},
	"0xe0bceef36f3a6efdd5eebfacd591423f8549b9d5": {
	childToken: "0xdefac16715671b7b6aeefe012125f1e19ee4b7d7",
	decimals: 18
},
	"0xa487bf43cf3b10dffc97a9a744cbb7036965d3b9": {
	childToken: "0xe60eaf5a997dfae83739e035b005a33afdcc6df5",
	decimals: 18
},
	"0xa9639160481b625ba43677be753e0a70bf58c647": {
	childToken: "0x11dbf6e897804fbed56cff8ac54fc7bdae50e86a",
	decimals: 18
},
	"0x2f4eb47a1b1f4488c71fc10e39a4aa56af33dd49": {
	childToken: "0x0e8d5504bf54d9e44260f8d153ecd5412130cabb",
	decimals: 18
},
	"0x420412e765bfa6d85aaac94b4f7b708c89be2e2b": {
	childToken: "0x71be881e9c5d4465b3fff61e89c6f3651e69b5bb",
	decimals: 4
},
	"0xf519381791c03dd7666c142d4e49fd94d3536011": {
	childToken: "0xebaffc2d2ea7c66fb848c48124b753f93a0a90ec",
	decimals: 18
},
	"0x1ef6a7e2c966fb7c5403efefde38338b1a95a084": {
	childToken: "0x1ef6a7e2c966fb7c5403efefde38338b1a95a084",
	decimals: 18
},
	"0x58f9102bf53cf186682bd9a281d3cd3c616eec41": {
	childToken: "0xe2eb47954e821dc94e19013677004cd59be0b17f",
	decimals: 18
},
	"0x8c543aed163909142695f2d2acd0d55791a9edb9": {
	childToken: "0xe9c803f48dffe50180bd5b01dc04da939e3445fc",
	decimals: 18
},
	"0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14": {
	childToken: "0x8443f091997f06a61670b735ed92734f5628692f",
	decimals: 18
},
	"0x2f7b618993cc3848d6c7ed9cdd5e835e4fe22b98": {
	childToken: "0x42fa9f0a91cd338f5ad277aa0bebd5f2ccd50643",
	decimals: 18
},
	"0x60f63b76e2fc1649e57a3489162732a90acf59fe": {
	childToken: "0x47c9bcef4fe2dbcdf3abf508f147f1bbe8d4fef2",
	decimals: 18
},
	"0xda9fdab21bc4a5811134a6e0ba6ca06624e67c07": {
	childToken: "0x7961ade0a767c0e5b67dd1a1f78ba44f727642ed",
	decimals: 18
},
	"0xa0246c9032bc3a600820415ae600c6388619a14d": {
	childToken: "0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743",
	decimals: 18
},
	"0xf4b5470523ccd314c6b9da041076e7d79e0df267": {
	childToken: "0xf4b5470523ccd314c6b9da041076e7d79e0df267",
	decimals: 18
},
	"0x65ef703f5594d2573eb71aaf55bc0cb548492df4": {
	childToken: "0x9fb9a33956351cf4fa040f65a13b835a3c8764e3",
	decimals: 18
},
	"0xa5ef74068d04ba0809b7379dd76af5ce34ab7c57": {
	childToken: "0xe4e8e6878718bfe533702d4a6571eb74d79b0915",
	decimals: 18
},
	"0x8eedefe828a0f16c8fc80e46a87bc0f1de2d960c": {
	childToken: "0xe336a772532650bc82828e9620dd0d5a3b78bfe8",
	decimals: 18
},
	"0xa11bd36801d8fa4448f0ac4ea7a62e3634ce8c7c": {
	childToken: "0x68784ffaa6ff05e3e04575df77960dc1d9f42b4a",
	decimals: 18
},
	"0x8a3d77e9d6968b780564936d15b09805827c21fa": {
	childToken: "0xb001f1e7c8bda414ac7cf7ecba5469fe8d24b6de",
	decimals: 18
},
	"0x1c9922314ed1415c95b9fd453c3818fd41867d0b": {
	childToken: "0xe7c9c6bc87b86f9e5b57072f907ee6460b593924",
	decimals: 18
},
	"0x805ea9c07b49dd23ce11ec66dc6d8a2957385035": {
	childToken: "0xeeed90aa795c0e7d90fcec0fcfaa7bf6fc13c20a",
	decimals: 18
},
	"0xbd3de9a069648c84d27d74d701c9fa3253098b15": {
	childToken: "0x436c52a8cee41d5e9c5e6f4cb146e66d552fb700",
	decimals: 18
},
	"0x5eaa69b29f99c84fe5de8200340b4e9b4ab38eac": {
	childToken: "0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a",
	decimals: 18
},
	"0x433fce7dfbec729a79999eaf056cb073b2153eba": {
	childToken: "0x433fce7dfbec729a79999eaf056cb073b2153eba",
	decimals: 6
},
	"0xbd1848e1491d4308ad18287a745dd4db2a4bd55b": {
	childToken: "0xb72842d6f5fedf91d22d56202802bb9a79c6322e",
	decimals: 18
},
	"0x0f51bb10119727a7e5ea3538074fb341f56b09ad": {
	childToken: "0x4d2d32d8652058bf98c772953e1df5c5c85d9f45",
	decimals: 18
},
	"0xd46ba6d942050d489dbd938a2c909a5d5039a161": {
	childToken: "0xdb021b1b247fe2f1fa57e0a87c748cc1e321f07f",
	decimals: 9
},
	"0x6fc5af63990aa9e5c5543f5cd8ed148bfa6d9d19": {
	childToken: "0xa3cedaa3b1f73ce7c95c01caadbcc72f17fb62c5",
	decimals: 9
},
	"0x6fb1e018f107d3352506c23777e4cd62e063584a": {
	childToken: "0x6fb1e018f107d3352506c23777e4cd62e063584a",
	decimals: 18
},
	"0x32e6c34cd57087abbd59b5a4aecc4cb495924356": {
	childToken: "0x6fefd97f328342a8a840546a55fdcfee7542f9a8",
	decimals: 18
},
	"0xfc82bb4ba86045af6f327323a46e80412b91b27d": {
	childToken: "0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5",
	decimals: 18
},
	"0x0e2ef8aecb3c01ad5d596f1b67134e178199984d": {
	childToken: "0x557f20ce25b41640ade4a3085d42d7e626d7965a",
	decimals: 18
},
	"0x7409856cae628f5d578b285b45669b36e7005283": {
	childToken: "0x048e9b1ddf9ebbb224812372280e94ccac443f9e",
	decimals: 18
},
	"0x4f640f2529ee0cf119a2881485845fa8e61a782a": {
	childToken: "0x4ef285c8cbe52267c022c39da98b97ca4b7e2ff9",
	decimals: 18
},
	"0x1da4858ad385cc377165a298cc2ce3fce0c5fd31": {
	childToken: "0x3e3b357061103dc040759ac7dceeaba9901043ad",
	decimals: 0
},
	"0x8cc0f052fff7ead7f2edcccac895502e884a8a71": {
	childToken: "0x85dab10c3ba20148ca60c2eb955e1f8ffe9eaa79",
	decimals: 18
},
	"0x5b685863494c33f344081f75e5430c260c224a32": {
	childToken: "0xb2343143f814639c9b1f42961c698247171df34a",
	decimals: 18
},
	"0x3e8ffc8c3cb0db3081df85dec91b63abbbe99f71": {
	childToken: "0xc039c13470be809bed1c2cd42339ccb22e0970f2",
	decimals: 18
},
	"0x0a8b16b27d5219c8c6b57d5442ce31d81573eee4": {
	childToken: "0xef7c2b756149c4f5a4f6eae1f3613fdbb6bbc568",
	decimals: 8
},
	"0xaec65404ddc3af3c897ad89571d5772c1a695f22": {
	childToken: "0xac86e5f9ba48d680516df50c72928c2ec50f3025",
	decimals: 18
},
	"0xaa2ded323944b25c0b6f1f891bc96f010b65622c": {
	childToken: "0xaa2ded323944b25c0b6f1f891bc96f010b65622c",
	decimals: 18
},
	"0xcae72a7a0fd9046cf6b165ca54c9e3a3872109e0": {
	childToken: "0xe2e7329499e8ddb1f2b04ee4b35a8d7f6881e4ea",
	decimals: 18
},
	"0x4da34f8264cb33a5c9f17081b9ef5ff6091116f4": {
	childToken: "0x6c619006043eab742355395690c7b42d3411e8c0",
	decimals: 18
},
	"0xa849eaae994fb86afa73382e9bd88c2b6b18dc71": {
	childToken: "0x5f588efaf8eb57e3837486e834fc5a4e07768d98",
	decimals: 18
},
	"0x07f9702ce093db82dfdc92c2c6e578d6ea8d5e22": {
	childToken: "0x07f9702ce093db82dfdc92c2c6e578d6ea8d5e22",
	decimals: 18
},
	"0x740623d2c797b7d8d1ecb98e9b4afcf99ec31e14": {
	childToken: "0x740623d2c797b7d8d1ecb98e9b4afcf99ec31e14",
	decimals: 18
},
	"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
	childToken: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
	decimals: 18
},
	"0x91dfbee3965baaee32784c2d546b7a0c62f268c9": {
	childToken: "0x5d0158a5c3ddf47d4ea4517d8db0d76aa2e87563",
	decimals: 18
},
	"0x678e840c640f619e17848045d23072844224dd37": {
	childToken: "0x678e840c640f619e17848045d23072844224dd37",
	decimals: 18
},
	"0x4740735aa98dc8aa232bd049f8f0210458e7fca3": {
	childToken: "0xe9c64384deb0c2bf06d991a8d708c77eb545e3d5",
	decimals: 18
},
	"0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0": {
	childToken: "0x4a9a2b2b04549c3927dd2c9668a5ef3fca473623",
	decimals: 18
},
	"0x6911f552842236bd9e8ea8ddbb3fb414e2c5fa9d": {
	childToken: "0x6911f552842236bd9e8ea8ddbb3fb414e2c5fa9d",
	decimals: 18
},
	"0x99c6e435ec259a7e8d65e1955c9423db624ba54c": {
	childToken: "0x99c6e435ec259a7e8d65e1955c9423db624ba54c",
	decimals: 18
},
	"0x728f30fa2f100742c7949d1961804fa8e0b1387d": {
	childToken: "0xbd7b8e4de08d9b01938f7ff2058f110ee1e0e8d4",
	decimals: 18
},
	"0x4c25bdf026ea05f32713f00f73ca55857fbf6342": {
	childToken: "0x3053ad3b31600074e9a90440770f78d5e8fc5a54",
	decimals: 18
},
	"0x3a856d4effa670c54585a5d523e96513e148e95d": {
	childToken: "0xa4838122c683f732289805fc3c207febd55babdd",
	decimals: 18
},
	"0x5eeaa2dcb23056f4e8654a349e57ebe5e76b5e6e": {
	childToken: "0xe069af87450fb51fc0d0e044617f1c134163e591",
	decimals: 18
},
	"0xa6422e3e219ee6d4c1b18895275fe43556fd50ed": {
	childToken: "0xb0c4080a8fa7afa11a09473f3be14d44af3f8743",
	decimals: 18
},
	"0xccb4dfdb4f95697ab5c389185f0ba9042a78576f": {
	childToken: "0xa8f42a57d638fea0286a28d75d7b10a6fdedb41d",
	decimals: 18
},
	"0xc8807f0f5ba3fa45ffbdc66928d71c5289249014": {
	childToken: "0xd2e7b964770fcf51df088a5f0bb2d33a3c60cccf",
	decimals: 18
},
	"0x08ba718f288c3b12b01146816bef9fa03cc635bc": {
	childToken: "0xb9b41da7fa895b093b95340a3379383bba36735e",
	decimals: 18
},
	"0x544c42fbb96b39b21df61cf322b5edc285ee7429": {
	childToken: "0x3192ccddf1cdce4ff055ebc80f3f0231b86a7e30",
	decimals: 18
},
	"0x69a95185ee2a045cdc4bcd1b1df10710395e4e23": {
	childToken: "0x77018282fd033daf370337a5367e62d8811bc885",
	decimals: 18
},
	"0x7eaf9c89037e4814dc0d9952ac7f888c784548db": {
	childToken: "0x99415856b37be9e75c0153615c7954f9ddb97a6e",
	decimals: 18
},
	"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
	childToken: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
	decimals: 18
},
	"0xed04915c23f00a313a544955524eb7dbd823143d": {
	childToken: "0xbc7d6b50616989655afd682fb42743507003056d",
	decimals: 8
},
	"0xa1faa113cbe53436df28ff0aee54275c13b40975": {
	childToken: "0xa1faa113cbe53436df28ff0aee54275c13b40975",
	decimals: 18
},
	"0xf8c3527cc04340b208c854e985240c02f7b7793f": {
	childToken: "0x928e55dab735aa8260af3cedada18b5f70c72f1b",
	decimals: 18
},
	"0xfd957f21bd95e723645c07c48a2d8acb8ffb3794": {
	childToken: "0x0b33542240d6fa323c796749f6d6869fdb7f13ca",
	decimals: 18
},
	"0x14da230d6726c50f759bc1838717f8ce6373509c": {
	childToken: "0x3a9eed92422abdd7566fba8c34bb74b3f656dbb3",
	decimals: 18
},
	"0xaa8330fb2b4d5d07abfe7a72262752a8505c6b37": {
	childToken: "0x6ae9701b9c423f40d54556c9a443409d79ce170a",
	decimals: 18
},
	"0x9e5bd9d9fad182ff0a93ba8085b664bcab00fa68": {
	childToken: "0x0d3843f92d622468ba67df5a6a4149b484a75af3",
	decimals: 9
},
	"0x43a96962254855f16b925556f9e97be436a43448": {
	childToken: "0x39d4549908e7adcee9b439429294eeb4c65c2c9e",
	decimals: 18
},
	"0xcc4304a31d09258b0029ea7fe63d032f52e44efe": {
	childToken: "0x82443a77684a7da92fdcb639c8d2bd068a596245",
	decimals: 18
},
	"0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa": {
	childToken: "0x7e624fa0e1c4abfd309cc15719b7e2580887f570",
	decimals: 18
},
	"0x993864e43caa7f7f12953ad6feb1d1ca635b875f": {
	childToken: "0x90ed8f1dc86388f14b64ba8fb4bbd23099f18240",
	decimals: 18
},
	"0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f": {
	childToken: "0x5d186e28934c6b0ff5fc2fece15d1f34f78cbd87",
	decimals: 18
},
	"0x69af81e73a73b40adf4f3d4223cd9b1ece623074": {
	childToken: "0x2ed9a5c8c13b93955103b9a7c167b67ef4d568a3",
	decimals: 18
},
	"0x6876eba317272fe221c67405c5e8eb3b24535547": {
	childToken: "0x8038b1f3eb4f70436569618530ac96b439d67bae",
	decimals: 18
},
	"0xacbd826394189cf2623c6df98a18b41fc8ffc16d": {
	childToken: "0x5989d72a559eb0192f2d20170a43a4bd28a1b174",
	decimals: 18
},
	"0xcd1faff6e578fa5cac469d2418c95671ba1a62fe": {
	childToken: "0xcd1faff6e578fa5cac469d2418c95671ba1a62fe",
	decimals: 18
},
	"0x30d20208d987713f46dfd34ef128bb16c404d10f": {
	childToken: "0x3bc5ac0dfdc871b365d159f728dd1b9a0b5481e8",
	decimals: 18
},
	"0x4f5fa8f2d12e5eb780f6082dd656c565c48e0f24": {
	childToken: "0xc53708664b99df348dd27c3ac0759d2da9c40462",
	decimals: 18
},
	"0x8530b66ca3ddf50e0447eae8ad7ea7d5e62762ed": {
	childToken: "0x8530b66ca3ddf50e0447eae8ad7ea7d5e62762ed",
	decimals: 18
},
	"0x4fabb145d64652a948d72533023f6e7a623c7c53": {
	childToken: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
	decimals: 18
},
	"0xe51b8ab09008285a0380dd2680cd9dd5e13924d3": {
	childToken: "0x011734f6ed20e8d011d85cf7894814b897420acf",
	decimals: 18
},
	"0x6e765d26388a17a6e86c49a8e41df3f58abcd337": {
	childToken: "0xd632bd021a07af70592ce1e18717ab9aa126decb",
	decimals: 18
},
	"0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54": {
	childToken: "0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54",
	decimals: 18
},
	"0x70d2b7c19352bb76e4409858ff5746e500f2b67c": {
	childToken: "0x0d35a2b85c5a63188d566d104bebf7c694334ee4",
	decimals: 18
},
	"0xbebdab6da046bc49ffbb61fbd7b33157eb270d05": {
	childToken: "0xd8a1734945b9ba38eb19a291b475e31f49e59877",
	decimals: 18
},
	"0x626e8036deb333b408be468f951bdb42433cbf18": {
	childToken: "0x33d08d8c7a168333a85285a68c0042b39fc3741d",
	decimals: 18
},
	"0xb1a30851e3f7d841b231b086479608e17198363a": {
	childToken: "0x32d12029f62260e239b5b5c8f0bea9cb382cfdd6",
	decimals: 18
},
	"0x8f693ca8d21b157107184d29d398a8d082b38b76": {
	childToken: "0x0864c156b3c5f69824564dec60c629ae6401bf2a",
	decimals: 18
},
	"0x582d872a1b094fc48f5de31d3b73f2d9be47def1": {
	childToken: "0x76a797a59ba2c17726896976b7b3747bfd1d220f",
	decimals: 9
},
	"0x2c537e5624e4af88a7ae4060c022609376c8d0eb": {
	childToken: "0xc1fdbed7dac39cae2ccc0748f7a80dc446f6a594",
	decimals: 6
},
	"0x0ab39ac604f992aaec3c36de337c3cd3917a7d26": {
	childToken: "0xbe5166e8e8a5cb801f09a6a0a46c42b7c27be755",
	decimals: 18
},
	"0xa14c04dea16798aa8f25b1da583cd5fbbfd6579e": {
	childToken: "0xa14c04dea16798aa8f25b1da583cd5fbbfd6579e",
	decimals: 18
},
	"0x35156b404c3f9bdaf45ab65ba315419bcde3775c": {
	childToken: "0x35156b404c3f9bdaf45ab65ba315419bcde3775c",
	decimals: 9
},
	"0x66e7ce35578a37209d01f99f3d2ff271f981f581": {
	childToken: "0x66e7ce35578a37209d01f99f3d2ff271f981f581",
	decimals: 18
},
	"0x08037036451c768465369431da5c671ad9b37dbc": {
	childToken: "0x08037036451c768465369431da5c671ad9b37dbc",
	decimals: 18
},
	"0x6d1dc3928604b00180bb570bdae94b9698d33b79": {
	childToken: "0x6d1dc3928604b00180bb570bdae94b9698d33b79",
	decimals: 18
},
	"0xee06a81a695750e71a662b51066f2c74cf4478a0": {
	childToken: "0x9fdc3ae5c814b79dca2556564047c5e7e5449c19",
	decimals: 18
},
	"0xbc194e6f748a222754c3e8b9946922c09e7d4e91": {
	childToken: "0xbc194e6f748a222754c3e8b9946922c09e7d4e91",
	decimals: 18
},
	"0xf6832ea221ebfdc2363729721a146e6745354b14": {
	childToken: "0x8523518001ad5d24b2a04e8729743c0643a316c0",
	decimals: 18
},
	"0x69e8b9528cabda89fe846c67675b5d73d463a916": {
	childToken: "0xabae871b7e3b67aeec6b46ae9fe1a91660aadac5",
	decimals: 18
},
	"0xfbe878ced08132bd8396988671b450793c44bc12": {
	childToken: "0x50ea9c9f88aeab9f554b8ffb4d7a1017957e866a",
	decimals: 18
},
	"0xae6e307c3fe9e922e5674dbd7f830ed49c014c6b": {
	childToken: "0x2235e79086dd23135119366da45851c741874e5b",
	decimals: 18
},
	"0xb3999f658c0391d94a37f7ff328f3fec942bcadc": {
	childToken: "0x44ec807ce2f4a6f2737a92e985f318d035883e47",
	decimals: 18
},
	"0x354e514c135c8603f840ffadb4c33cde6d2a37e0": {
	childToken: "0x01da2a0af42a382c0d17134acbdfc2fd6c92c306",
	decimals: 18
},
	"0xe0b9a2c3e9f40cf74b2c7f591b2b0cca055c3112": {
	childToken: "0x9ba4c78b048eeed69f4ed3cfddeda7b51baf7ca8",
	decimals: 18
},
	"0x04e0af0af1b7f0023c6b12af5a94df59b0e8cf59": {
	childToken: "0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284",
	decimals: 18
},
	"0x26ff6d16549a00ba8b36ce3159b5277e6e798d18": {
	childToken: "0x26ff6d16549a00ba8b36ce3159b5277e6e798d18",
	decimals: 18
},
	"0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17": {
	childToken: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
	decimals: 18
},
	"0x298d492e8c1d909d3f63bc4a36c66c64acb3d695": {
	childToken: "0x1d1cb8997570e73949930c01fe5796c88d7336c6",
	decimals: 18
},
	"0x6e5970dbd6fc7eb1f29c6d2edf2bc4c36124c0c1": {
	childToken: "0x6ba7a8f9063c712c1c8cabc776b1da7126805f3b",
	decimals: 18
},
	"0xbbcd3e4eb43aa7f3f57286da31333d53b24d0d6a": {
	childToken: "0x77ccbbca68958ee7a1786090c1dcdd45b80dfdf0",
	decimals: 2
},
	"0x9196e18bc349b1f64bc08784eae259525329a1ad": {
	childToken: "0xd9e8d20bde081600fac0d94b88eafaddce55aa43",
	decimals: 18
},
	"0x0dde6f6e345bfd23f3f419f0dfe04e93143b44fb": {
	childToken: "0x0742b62efb5f2eabbc14567dfc0860ce0565bcf4",
	decimals: 18
},
	"0x513c3200f227ebb62e3b3d00b7a83779643a71cf": {
	childToken: "0x513c3200f227ebb62e3b3d00b7a83779643a71cf",
	decimals: 18
},
	"0x7ca4408137eb639570f8e647d9bd7b7e8717514a": {
	childToken: "0xc5e6689c9c8b02be7c49912ef19e79cf24977f03",
	decimals: 18
},
	"0xf56842af3b56fd72d17cb103f92d027bba912e89": {
	childToken: "0x198abb2d13faa2e52e577d59209b5c23c20cd6b3",
	decimals: 18
},
	"0xc55c2175e90a46602fd42e931f62b3acc1a013ca": {
	childToken: "0xbd83010eb60f12112908774998f65761cf9f6f9a",
	decimals: 18
},
	"0xe87e15b9c7d989474cb6d8c56b3db4efad5b21e8": {
	childToken: "0xe87e15b9c7d989474cb6d8c56b3db4efad5b21e8",
	decimals: 18
},
	"0x607c794cda77efb21f8848b7910ecf27451ae842": {
	childToken: "0xc4b35d3a24e3e8941c5d87fd21d0725642f50308",
	decimals: 18
},
	"0x1beef31946fbbb40b877a72e4ae04a8d1a5cee06": {
	childToken: "0x19c91764a976ac6c1e2c2e4c5856f2939342a814",
	decimals: 18
},
	"0x217ddead61a42369a266f1fb754eb5d3ebadc88a": {
	childToken: "0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255",
	decimals: 18
},
	"0x1fe24f25b1cf609b9c4e7e12d802e3640dfa5e43": {
	childToken: "0x1613957159e9b0ac6c80e824f7eea748a32a0ae2",
	decimals: 18
},
	"0x7475c42f8bf2c19f4eaf12feaababa859fdc8914": {
	childToken: "0x2cace984dab08bd192a7fd044276060cb955dd9c",
	decimals: 18
},
	"0xe7f72bc0252ca7b16dbb72eeee1afcdb2429f2dd": {
	childToken: "0xe7f72bc0252ca7b16dbb72eeee1afcdb2429f2dd",
	decimals: 18
},
	"0xcb86c6a22cb56b6cf40cafedb06ba0df188a416e": {
	childToken: "0x9b17baadf0f21f03e35249e0e59723f34994f806",
	decimals: 18
},
	"0x491e136ff7ff03e6ab097e54734697bb5802fc1c": {
	childToken: "0xdae6c2a48bfaa66b43815c5548b10800919c993e",
	decimals: 18
},
	"0x2162f572b25f7358db9376ab58a947a4e45cede1": {
	childToken: "0x77edfae59a7948d66e9911a30cc787d2172343d4",
	decimals: 18
},
	"0xe796d6ca1ceb1b022ece5296226bf784110031cd": {
	childToken: "0x393d87e44c7b1f5ba521b351532c24ece253b849",
	decimals: 18
},
	"0x3e5d9d8a63cc8a88748f229999cf59487e90721e": {
	childToken: "0x582c12b30f85162fa393e5dbe2573f9f601f9d91",
	decimals: 18
},
	"0x923b83c26b3809d960ff80332ed00aa46d7ed375": {
	childToken: "0xd6cce248263ea1e2b8cb765178c944fc16ed0727",
	decimals: 18
},
	"0xa58a4f5c4bb043d2cc1e170613b74e767c94189b": {
	childToken: "0xed4bb33f20f32e989af975196e86019773a7cff0",
	decimals: 18
},
	"0xb1f871ae9462f1b2c6826e88a7827e76f86751d4": {
	childToken: "0xe4a4ad6e0b773f47d28f548742a23efd73798332",
	decimals: 18
},
	"0xeadc218ac4cb7895a5a56e6484646b48f841c45a": {
	childToken: "0x808f1350dff684c099f4837a01d863fc61a86bc6",
	decimals: 18
},
	"0x37941b3fdb2bd332e667d452a58be01bcacb923e": {
	childToken: "0x37941b3fdb2bd332e667d452a58be01bcacb923e",
	decimals: 9
},
	"0xfbeea1c75e4c4465cb2fccc9c6d6afe984558e20": {
	childToken: "0xc9132c76060f6b319764ea075973a650a1a53bc9",
	decimals: 18
},
	"0x8052327f1baf94a9dc8b26b9100f211ee3774f54": {
	childToken: "0x1ce440d1a64eea6aa1db2a5aa51c9b326930957c",
	decimals: 18
},
	"0xbf776e4fca664d791c4ee3a71e2722990e003283": {
	childToken: "0xbf776e4fca664d791c4ee3a71e2722990e003283",
	decimals: 18
},
	"0x44f262622248027f8e2a8fb1090c4cf85072392c": {
	childToken: "0x00518f36d2e0e514e8eb94d34124fc18ee756f10",
	decimals: 18
},
	"0xfe3e6a25e6b192a42a44ecddcd13796471735acf": {
	childToken: "0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e",
	decimals: 18
},
	"0x103c3a209da59d3e7c4a89307e66521e081cfdf0": {
	childToken: "0xf25868b9e9c62f12192650ac668a2aa69f965f44",
	decimals: 18
},
	"0xfe459828c90c0ba4bc8b42f5c5d44f316700b430": {
	childToken: "0xa477a79a118a84a0d371a53c8f46f8ce883ec1dd",
	decimals: 18
},
	"0x0913ddae242839f8995c0375493f9a1a3bddc977": {
	childToken: "0xaf63d8032311fef82c111c060420020f35e78111",
	decimals: 18
},
	"0x80ce3027a70e0a928d9268994e9b85d03bd4cdcf": {
	childToken: "0xa5ff48e326958e0ce6fdf9518de561f2b5f57da3",
	decimals: 18
},
	"0x1796ae0b0fa4862485106a0de9b654efe301d0b2": {
	childToken: "0x1796ae0b0fa4862485106a0de9b654efe301d0b2",
	decimals: 18
},
	"0xf0acf8949e705e0ebb6cb42c2164b0b986454223": {
	childToken: "0x5e57f24415f37c7d304e85df9b4c36bc08789794",
	decimals: 8
},
	"0x5d843fa9495d23de997c394296ac7b4d721e841c": {
	childToken: "0xe338d4250a4d959f88ff8789eaae8c32700bd175",
	decimals: 18
},
	"0xa41f142b6eb2b164f8164cae0716892ce02f311f": {
	childToken: "0xa41f142b6eb2b164f8164cae0716892ce02f311f",
	decimals: 18
},
	"0x309c1b3282c49e4dc6796644417f8c76b7c8233c": {
	childToken: "0x716cbd4293ab1f7ab9c8d39e51b2685f74d18891",
	decimals: 18
},
	"0x00aba6fe5557de1a1d565658cbddddf7c710a1eb": {
	childToken: "0x5512014efa6cd57764fa743756f7a6ce3358cc83",
	decimals: 18
},
	"0x191557728e4d8caa4ac94f86af842148c0fa8f7e": {
	childToken: "0xede2f059545e8cde832d8da3985caacf795b8765",
	decimals: 18
},
	"0x40986a85b4cfcdb054a6cbfb1210194fee51af88": {
	childToken: "0x0a356f512f6fce740111ee04ab1699017a908680",
	decimals: 18
},
	"0x56a86d648c435dc707c8405b78e2ae8eb4e60ba4": {
	childToken: "0x6855f7bb6287f94ddcc8915e37e73a3c9fee5cf3",
	decimals: 18
},
	"0x444444444444c1a66f394025ac839a535246fcc8": {
	childToken: "0x444444444444c1a66f394025ac839a535246fcc8",
	decimals: 9
},
	"0xa67b8e40111a0edd30c3210b77aadb86ad234c43": {
	childToken: "0xa67b8e40111a0edd30c3210b77aadb86ad234c43",
	decimals: 9
},
	"0x167e2a574669b0eeb552aaf3da47c728cb348a41": {
	childToken: "0x3c462e6fe7043f076af33640c5e24388e2ee9ebc",
	decimals: 7
},
	"0xd85ad783cc94bd04196a13dc042a3054a9b52210": {
	childToken: "0xd85ad783cc94bd04196a13dc042a3054a9b52210",
	decimals: 18
},
	"0xde4ee8057785a7e8e800db58f9784845a5c2cbd6": {
	childToken: "0x039cb485212f996a9dbb85a9a75d898f94d38da6",
	decimals: 18
},
	"0x92cfbec26c206c90aee3b7c66a9ae673754fab7e": {
	childToken: "0xa865197a84e780957422237b5d152772654341f3",
	decimals: 18
},
	"0xada86b1b313d1d5267e3fc0bb303f0a2b66d0ea7": {
	childToken: "0x0f237db17aa4e6de062e6f052bd9c805789b01c3",
	decimals: 18
},
	"0x85ffb35957203dfd12061eaecd708db623bd567c": {
	childToken: "0x0cbe5c4f318035b866aacfaf7d018fb4c5f920f3",
	decimals: 18
},
	"0x5f0bc16d50f72d10b719dbf6845de2e599eb5624": {
	childToken: "0x872d068c25511be88c1f5990c53eeffcdf46c9b4",
	decimals: 18
},
	"0x0202be363b8a4820f3f4de7faf5224ff05943ab1": {
	childToken: "0x2645d5f59d952ef2317c8e0aaa5a61c392ccd44d",
	decimals: 18
},
	"0x634239cfa331df0291653139d1a6083b9cf705e3": {
	childToken: "0xb38b3c34e4bb6144c1e5283af720e046ee833a2a",
	decimals: 18
},
	"0x46e98ffe40e408ba6412beb670507e083c8b95ff": {
	childToken: "0xa19863e302fd1b41276fce5a48d9c511dbeef34c",
	decimals: 18
},
	"0x0a58153a0cd1cfaea94ce1f7fdc5d7e679eca936": {
	childToken: "0xac5d23ce5e4a5eb11a5407a5fbee201a75e8c8ad",
	decimals: 18
},
	"0x06a00715e6f92210af9d7680b584931faf71a833": {
	childToken: "0x5f26fa0c2ee5d3c0323d861d0c503f31ac212662",
	decimals: 18
},
	"0x85f6eb2bd5a062f5f8560be93fb7147e16c81472": {
	childToken: "0x681fd3e49a6188fc526784ee70aa1c269ee2b887",
	decimals: 4
},
	"0xd7f0cc50ad69408ae58be033f4f85d2367c2e468": {
	childToken: "0x4a0a3902e091cdb3aec4279a6bfac50297f0a79e",
	decimals: 18
},
	"0x8b3870df408ff4d7c3a26df852d41034eda11d81": {
	childToken: "0x959229d94c9060552daea25ac17193bca65d7884",
	decimals: 6
},
	"0x65ad6a2288b2dd23e466226397c8f5d1794e58fc": {
	childToken: "0x65ad6a2288b2dd23e466226397c8f5d1794e58fc",
	decimals: 18
},
	"0xe1c7e30c42c24582888c758984f6e382096786bd": {
	childToken: "0xd52669712f253cd6b2fe8a8638f66ed726cb770c",
	decimals: 8
},
	"0x77777777772cf0455fb38ee0e75f38034dfa50de": {
	childToken: "0x666666661f9b6d8c581602aaa2f76cbead06c401",
	decimals: 18
},
	"0xb622400807765e73107b7196f444866d7edf6f62": {
	childToken: "0xd1673c00ac7010bf2c376ebea43633dd61a81016",
	decimals: 9
},
	"0xf5b1fd29d23e98db2d9ebb8435e1082e3b38fb65": {
	childToken: "0xcab599d699f818e6cefd07cf54f448dab9367b05",
	decimals: 9
},
	"0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515": {
	childToken: "0x7837fd820ba38f95c54d6dac4ca3751b81511357",
	decimals: 18
},
	"0x579cea1889991f68acc35ff5c3dd0621ff29b0c9": {
	childToken: "0x0e37d70b51ffa2b98b4d34a5712c5291115464e3",
	decimals: 18
},
	"0x3a8d5bc8a8948b68dfc0ce9c14ac4150e083518c": {
	childToken: "0x076ddce096c93dcf5d51fe346062bf0ba9523493",
	decimals: 18
},
	"0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed": {
	childToken: "0xdaacb0ab6fb34d24e8a67bfa14bf4d95d4c7af92",
	decimals: 18
},
	"0x7659ce147d0e714454073a5dd7003544234b6aa0": {
	childToken: "0x431e0cd023a32532bf3969cddfc002c00e98429d",
	decimals: 18
},
	"0xef53462838000184f35f7d991452e5f25110b207": {
	childToken: "0x1b41a1ba7722e6431b1a782327dbe466fe1ee9f9",
	decimals: 18
},
	"0xa6f7645ed967faf708a614a2fca8d4790138586f": {
	childToken: "0xa6f7645ed967faf708a614a2fca8d4790138586f",
	decimals: 18
},
	"0x8254e26e453eb5abd29b3c37ac9e8da32e5d3299": {
	childToken: "0xace3574b8b054e074473a9bd002e5dc6dd3dff1b",
	decimals: 18
},
	"0x28b5e12cce51f15594b0b91d5b5adaa70f684a02": {
	childToken: "0xd8cb4c2369db13c94c90c7fd3bebc9757900ee6b",
	decimals: 18
},
	"0xc237868a9c5729bdf3173dddacaa336a0a5bb6e0": {
	childToken: "0xdbf8265b1d5244a13424f13977723acf5395eab2",
	decimals: 18
},
	"0xcbe771323587ea16dacb6016e269d7f08a7acc4e": {
	childToken: "0x8357c604c5533fa0053beaaa1494da552cea38f7",
	decimals: 18
},
	"0x9aeb50f542050172359a0e1a25a9933bc8c01259": {
	childToken: "0x658e64ffcf40d240a43d52ca9342140316ae44fa",
	decimals: 8
},
	"0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4": {
	childToken: "0x6a545f9c64d8f7b957d8d2e6410b52095a9e6c29",
	decimals: 18
},
	"0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9": {
	childToken: "0xf98b660adf2ed7d9d9d9daacc2fb0cace4f21835",
	decimals: 18
},
	"0x36e43065e977bc72cb86dbd8405fae7057cdc7fd": {
	childToken: "0xb0ff8188f374902bb180bd186d17967b5b1188f2",
	decimals: 9
},
	"0xe1bda0c3bfa2be7f740f0119b6a34f057bd58eba": {
	childToken: "0xb160a5f19ebccd8e0549549327e43ddd1d023526",
	decimals: 18
},
	"0x5d259e3fbcadef1abfea5582e456bc7f0aebc2a1": {
	childToken: "0xa991fa7fa94dfe2e59d58954bce0f0a8e082710f",
	decimals: 18
},
	"0x97a9bac06f90940bce9caec2b880ff17707519e4": {
	childToken: "0x854a63b35b70a7becbed508ff0b6ff5038d0c917",
	decimals: 18
},
	"0xc4f6e93aeddc11dc22268488465babcaf09399ac": {
	childToken: "0x77087ab5df23cfb52449a188e80e9096201c2097",
	decimals: 18
},
	"0x73b708e84837ffccde2933e3a1531fe61d5e80ef": {
	childToken: "0x7faaf8d4c411218415d9d3f82d56214658349dbb",
	decimals: 18
},
	"0x3330bfb7332ca23cd071631837dc289b09c33333": {
	childToken: "0x8e3bcc334657560253b83f08331d85267316e08a",
	decimals: 18
},
	"0x3ebb4a4e91ad83be51f8d596533818b246f4bee1": {
	childToken: "0x6b1c8765c7eff0b60706b0ae489eb9bb9667465a",
	decimals: 18
},
	"0xf974b5f9ac9c6632fee8b76c61b0242ce69c839d": {
	childToken: "0x377c6e37633e390aef9afb4f5e0b16689351eed4",
	decimals: 18
},
	"0xdfc3829b127761a3218bfcee7fc92e1232c9d116": {
	childToken: "0xdfc3829b127761a3218bfcee7fc92e1232c9d116",
	decimals: 8
},
	"0x20a8cec5fffea65be7122bcab2ffe32ed4ebf03a": {
	childToken: "0x3c1748d647e6a56b37b66fcd2b5626d0461d3aa0",
	decimals: 18
},
	"0x4abb9cc67bd3da9eb966d1159a71a0e68bd15432": {
	childToken: "0x4e1b16ef22935a575a6811d4616f98c4077e4408",
	decimals: 18
},
	"0x0ff6ffcfda92c53f615a4a75d982f399c989366b": {
	childToken: "0xc2c23a86def9e9f5972a633b3d25f7ecbfa5e575",
	decimals: 18
},
	"0xc8ef1460277ea47d179dec66d1c5f8b7f7ae5a28": {
	childToken: "0xe17fbdf671f3cce0f354cacbd27e03f4245a3ffe",
	decimals: 18
},
	"0x72e5390edb7727e3d4e3436451dadaff675dbcc0": {
	childToken: "0xdae4f1dca49408288b55250022f67195eff2445a",
	decimals: 12
},
	"0x8578530205cecbe5db83f7f29ecfeec860c297c2": {
	childToken: "0xb32d4817908f001c2a53c15bff8c14d8813109be",
	decimals: 18
},
	"0x6781a0f84c7e9e846dcb84a9a5bd49333067b104": {
	childToken: "0xc5326b32e8baef125acd68f8bc646fd646104f1c",
	decimals: 18
},
	"0x998ffe1e43facffb941dc337dd0468d52ba5b48a": {
	childToken: "0x66207e39bb77e6b99aab56795c7c340c08520d83",
	decimals: 2
},
	"0xa8b61cff52564758a204f841e636265bebc8db9b": {
	childToken: "0xf9d906a8dd25c4a4966bc075cdc946702219e62c",
	decimals: 18
},
	"0x426fc8be95573230f6e6bc4af91873f0c67b21b4": {
	childToken: "0x65c8743a5a266c3512eabd34e65ade42d4355ef1",
	decimals: 18
},
	"0x2653891204f463fb2a2f4f412564b19e955166ae": {
	childToken: "0x0f5d8cd195a4539bcf2ec6118c6da50287c6d5f5",
	decimals: 18
},
	"0x50de6856358cc35f3a9a57eaaa34bd4cb707d2cd": {
	childToken: "0x50de6856358cc35f3a9a57eaaa34bd4cb707d2cd",
	decimals: 18
},
	"0x26a604dffe3ddab3bee816097f81d3c4a2a4cf97": {
	childToken: "0x141383cdb8158982fb3469c3e49cc82f8026d968",
	decimals: 18
},
	"0x12d102f06da35cc0111eb58017fd2cd28537d0e1": {
	childToken: "0xc227f8eecc481a8e8baa30a4754b109b81c4dfa4",
	decimals: 18
},
	"0x71dc40668682a124231301414167e4cf7f55383c": {
	childToken: "0x336f5a68fd46a25056a6c1d9c06072c691486acc",
	decimals: 18
},
	"0xc5fdf3569af74f3b3e97e46a187a626352d2d508": {
	childToken: "0x80640a39cfc2b1b7c792821c462376aa7083f5a8",
	decimals: 9
},
	"0x21381e026ad6d8266244f2a583b35f9e4413fa2a": {
	childToken: "0x25a528af62e56512a19ce8c3cab427807c28cc19",
	decimals: 18
},
	"0x4297394c20800e8a38a619a243e9bbe7681ff24e": {
	childToken: "0x4fa7163e153419e0e1064e418dd7a99314ed27b6",
	decimals: 18
},
	"0x9ce84f6a69986a83d92c324df10bc8e64771030f": {
	childToken: "0x9ce84f6a69986a83d92c324df10bc8e64771030f",
	decimals: 18
},
	"0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14": {
	childToken: "0x5921dee8556c4593eefcfad3ca5e2f618606483b",
	decimals: 18
},
	"0xae36155a55f04a696b8362777620027882b31db5": {
	childToken: "0xae36155a55f04a696b8362777620027882b31db5",
	decimals: 9
},
	"0x9b31bb425d8263fa1b8b9d090b83cf0c31665355": {
	childToken: "0x2406dce4da5ab125a18295f4fb9fd36a0f7879a2",
	decimals: 18
},
	"0x71ab77b7dbb4fa7e017bc15090b2163221420282": {
	childToken: "0x5f4bde007dc06b867f86ebfe4802e34a1ffeed63",
	decimals: 18
},
	"0x80c62fe4487e1351b47ba49809ebd60ed085bf52": {
	childToken: "0x09e889bb4d5b474f561db0491c38702f367a4e4d",
	decimals: 18
},
	"0x0fd67b4ceb9b607ef206904ec73459c4880132c9": {
	childToken: "0xc0f42b31d154234a0a3ebe7ec52c662101c1d9bc",
	decimals: 18
},
	"0x2c9c19ce3b15ae77c6d80aec3c1194cfd6f7f3fa": {
	childToken: "0x3a6e8b36645d6c252714daddd28ec0673535a109",
	decimals: 18
},
	"0x066798d9ef0833ccc719076dab77199ecbd178b0": {
	childToken: "0x8bd778b12b15416359a227f0533ce2d91844e1ed",
	decimals: 18
},
	"0x794baab6b878467f93ef17e2f2851ce04e3e34c8": {
	childToken: "0x794baab6b878467f93ef17e2f2851ce04e3e34c8",
	decimals: 18
},
	"0x9cc83d580180f0d37d00e5d86ce868f73b6e3d0a": {
	childToken: "0x9cc83d580180f0d37d00e5d86ce868f73b6e3d0a",
	decimals: 18
},
	"0x71fc1f555a39e0b698653ab0b475488ec3c34d57": {
	childToken: "0x6bcd897d4ba5675f860c7418ddc034f6c5610114",
	decimals: 18
},
	"0xc12d099be31567add4e4e4d0d45691c3f58f5663": {
	childToken: "0x3028b4395f98777123c7da327010c40f3c7cc4ef",
	decimals: 18
},
	"0x46943113ae84e732bb510b5f7686d8b76ff56774": {
	childToken: "0x46943113ae84e732bb510b5f7686d8b76ff56774",
	decimals: 18
},
	"0xf6650117017ffd48b725b4ec5a00b414097108a7": {
	childToken: "0x3764bc0de9b6a68c67929130aaec16b6060cab8c",
	decimals: 18
},
	"0x8cb1d155a5a1d5d667611b7710920fd9d1cd727f": {
	childToken: "0x6fb05b156788e88c8ad1e057e729362ff8c39d93",
	decimals: 8
},
	"0xebd9d99a3982d547c5bb4db7e3b1f9f14b67eb83": {
	childToken: "0x8ea2526c2373ba3fe1d0987f5db8ac770a42dd51",
	decimals: 18
},
	"0x001a8ffcb0f03e99141652ebcdecdb0384e3bd6c": {
	childToken: "0xc49dde62b4a0810074721faca54aab52369f486a",
	decimals: 18
},
	"0x054d64b73d3d8a21af3d764efd76bcaa774f3bb2": {
	childToken: "0xfb288d60d3b66f9c3e231a9a39ed3f158a4269aa",
	decimals: 18
},
	"0x2863916c6ebdbbf0c6f02f87b7eb478509299868": {
	childToken: "0x25e0c222f687510e90b7a93650483db59418c41a",
	decimals: 18
},
	"0xbbab3bdb291b0f22bc9881895ff488a5db67bec8": {
	childToken: "0x9b08f10d8c250714f6485212300a7b72f973f1fd",
	decimals: 18
},
	"0x841fb148863454a3b3570f515414759be9091465": {
	childToken: "0x1e8150ea46e2a7fbb795459198fbb4b35715196c",
	decimals: 18
},
	"0xcdeee767bed58c5325f68500115d4b722b3724ee": {
	childToken: "0x5a4fb10e7c4cbb9a2b9d9a942f9a875ebd3489ea",
	decimals: 18
},
	"0x925f2c11b99c1a4c46606898ee91ed3d450cfeda": {
	childToken: "0x925f2c11b99c1a4c46606898ee91ed3d450cfeda",
	decimals: 9
},
	"0x1dd80016e3d4ae146ee2ebb484e8edd92dacc4ce": {
	childToken: "0x2ed9e96edd11a1ff5163599a66fb6f1c77fa9c66",
	decimals: 18
},
	"0xd7c302fc3ac829c7e896a32c4bd126f3e8bd0a1f": {
	childToken: "0x6e2a5ea25b161befa6a8444c71ae3a89c39933c6",
	decimals: 18
},
	"0xbc17729fdf562723f0267f79ff25ade441056d87": {
	childToken: "0x772722b55cdc2a086abd064267a17855eb15e8b3",
	decimals: 18
},
	"0xaf9f549774ecedbd0966c52f250acc548d3f36e5": {
	childToken: "0x69a1913d334b524ea1632461c78797c837ca9fa6",
	decimals: 18
},
	"0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8": {
	childToken: "0x0231f91e02debd20345ae8ab7d71a41f8e140ce7",
	decimals: 18
},
	"0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18": {
	childToken: "0x7324c7c0d95cebc73eea7e85cbaac0dbdf88a05b",
	decimals: 18
},
	"0xb1191f691a355b43542bea9b8847bc73e7abb137": {
	childToken: "0xf83c0f6d3a5665bd7cfdd5831a856d85942bc060",
	decimals: 18
},
	"0xad996a45fd2373ed0b10efa4a8ecb9de445a4302": {
	childToken: "0x7269d98af4aa705e0b1a5d8512fadb4d45817d5a",
	decimals: 18
},
	"0xab37e1358b639fd877f015027bb62d3ddaa7557e": {
	childToken: "0x5d684adaf3fcfe9cfb5cede3abf02f0cdd1012e3",
	decimals: 8
},
	"0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de": {
	childToken: "0x4a5a34212404f30c5ab7eb61b078fa4a55adc5a5",
	decimals: 18
},
	"0x0def8d8adde14c9ef7c2a986df3ea4bd65826767": {
	childToken: "0xe795347731bc547f4e4643f7945738ce2bc18529",
	decimals: 18
},
	"0x8185bc4757572da2a610f887561c32298f1a5748": {
	childToken: "0xf44fb887334fa17d2c5c0f970b5d320ab53ed557",
	decimals: 18
},
	"0x6faa826af0568d1866fca570da79b318ef114dab": {
	childToken: "0x70512c7f3d3009be997559d279b991461c451d70",
	decimals: 18
},
	"0x3757232b55e60da4a8793183ac030cfce4c3865d": {
	childToken: "0x3757232b55e60da4a8793183ac030cfce4c3865d",
	decimals: 18
},
	"0x1da87b114f35e1dc91f72bf57fc07a768ad40bb0": {
	childToken: "0x1da87b114f35e1dc91f72bf57fc07a768ad40bb0",
	decimals: 18
},
	"0x612e1726435fe38dd49a0b35b4065b56f49c8f11": {
	childToken: "0x612e1726435fe38dd49a0b35b4065b56f49c8f11",
	decimals: 18
},
	"0x3f7aff0ef20aa2e646290dfa4e67611b2220c597": {
	childToken: "0x07ec61ae90860641972e9b41a706325a1e928bf8",
	decimals: 9
},
	"0x661ab0ed68000491d98c796146bcf28c20d7c559": {
	childToken: "0xfb7400707df3d76084fbeae0109f41b178f71c02",
	decimals: 18
},
	"0x8c6bf16c273636523c29db7db04396143770f6a0": {
	childToken: "0xa39bf0446268d99c5c0a85ecf92970611912d386",
	decimals: 18
},
	"0x5f944b0c4315cb7c3a846b025ab4045da44abf6c": {
	childToken: "0x61d5822dd7b3ed495108733e6550d4529480c8f6",
	decimals: 18
},
	"0x3f5294df68f871241c4b18fcf78ebd8ac18ab654": {
	childToken: "0x7fe378c5e0b5c32af2ecc8829bedf02245a0e4ef",
	decimals: 18
},
	"0x1a3496c18d558bd9c6c8f609e1b129f67ab08163": {
	childToken: "0xcaf5191fc480f43e4df80106c7695eca56e48b18",
	decimals: 18
},
	"0xeb4c2781e4eba804ce9a9803c67d0893436bb27d": {
	childToken: "0xfce146bf3146100cfe5db4129cf6c82b0ef4ad8c",
	decimals: 8
},
	"0x888888848b652b3e3a0f34c96e00eec0f3a23f72": {
	childToken: "0x2222227e22102fe3322098e4cbfe18cfebd57c95",
	decimals: 4
},
	"0xff75ced57419bcaebe5f05254983b013b0646ef5": {
	childToken: "0x965b0df5bda0e7a0649324d78f03d5f7f2de086a",
	decimals: 18
},
	"0x16980b3b4a3f9d89e33311b5aa8f80303e5ca4f8": {
	childToken: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
	decimals: 6
},
	"0x3ab6ed69ef663bd986ee59205ccad8a20f98b4c2": {
	childToken: "0xec583f25a049cc145da9a256cdbe9b6201a705ff",
	decimals: 18
},
	"0x4674672bcddda2ea5300f5207e1158185c944bc0": {
	childToken: "0x3107c0a1126268ca303f8d99c712392fa596e6d7",
	decimals: 18
},
	"0xbaac2b4491727d78d2b78815144570b9f2fe8899": {
	childToken: "0xaa88c603d142c371ea0eac8756123c5805edee03",
	decimals: 18
},
	"0x5224f552f110ec78e6e0468138950ae5f3040942": {
	childToken: "0x5224f552f110ec78e6e0468138950ae5f3040942",
	decimals: 18
},
	"0x45080a6531d671ddff20db42f93792a489685e32": {
	childToken: "0x0a232cb2005bda62d3de7ab5deb3ffe4c456165a",
	decimals: 18
},
	"0x29d578cec46b50fa5c88a99c6a4b70184c062953": {
	childToken: "0x0a7e7d210c45c4abba183c1d0551b53ad1756eca",
	decimals: 9
},
	"0xf0939011a9bb95c3b791f0cb546377ed2693a574": {
	childToken: "0x1f534d2b1ee2933f1fdf8e4b63a44b2249d77eaf",
	decimals: 18
},
	"0x6226e00bcac68b0fe55583b90a1d727c14fab77f": {
	childToken: "0x8aa688ab789d1848d131c65d98ceaa8875d97ef1",
	decimals: 18
},
	"0x4fabf135bcf8111671870d4399af739683198f96": {
	childToken: "0xffe2a166a3ea6dd7bb11b2c48f08f1e4202d4e78",
	decimals: 18
},
	"0x76c5449f4950f6338a393f53cda8b53b0cd3ca3a": {
	childToken: "0x5478a575ece4fb4768d1d43edf5826cfe1c6225a",
	decimals: 18
},
	"0x4af5ff1a60a6ef6c7c8f9c4e304cd9051fca3ec0": {
	childToken: "0xfa262f303aa244f9cc66f312f0755d89c3793192",
	decimals: 18
},
	"0xa20f77b7ad5a88badc48800c56507b7274c06fdc": {
	childToken: "0x8f36cc333f55b09bb71091409a3d7ade399e3b1c",
	decimals: 18
},
	"0x6fc13eace26590b80cccab1ba5d51890577d83b2": {
	childToken: "0x846f52020749715f02aef25b5d1d65e48945649d",
	decimals: 18
},
	"0x3f9bec82c776c47405bcb38070d2395fd18f89d3": {
	childToken: "0x4399ae7538c33ca24edd4c28c5dd7ce9a80acf81",
	decimals: 18
},
	"0xa2120b9e674d3fc3875f415a7df52e382f141225": {
	childToken: "0xa2120b9e674d3fc3875f415a7df52e382f141225",
	decimals: 18
},
	"0xd9b312d77bc7bed9b9cecb56636300bed4fe5ce9": {
	childToken: "0xd9ea58350bf120e2169a35fa1afc31975b07de01",
	decimals: 18
},
	"0x220b71671b649c03714da9c621285943f3cbcdc6": {
	childToken: "0x57effde2759b68d86c544e88f7977e3314144859",
	decimals: 18
},
	"0xe0b9bcd54bf8a730ea5d3f1ffce0885e911a502c": {
	childToken: "0x54c2c07b3af037567269ad6a168d5bd527867b58",
	decimals: 9
},
	"0xf9fbe825bfb2bf3e387af0dc18cac8d87f29dea8": {
	childToken: "0xf03a2dc374d494fbe894563fe22ee544d826aa50",
	decimals: 18
},
	"0x1460a58096d80a50a2f1f956dda497611fa4f165": {
	childToken: "0xd883d21af976ec9fa409c9f2944a1e7d03d21946",
	decimals: 7
},
	"0x6d6554939d646f274d0fc3cecb7dab5d76bc908f": {
	childToken: "0x6d6554939d646f274d0fc3cecb7dab5d76bc908f",
	decimals: 18
},
	"0x06677dc4fe12d3ba3c7ccfd0df8cd45e4d4095bf": {
	childToken: "0xe89508d74579a06a65b907c91f697cf4f8d9fac7",
	decimals: 18
},
	"0xac51066d7bec65dc4589368da368b212745d63e8": {
	childToken: "0xac51066d7bec65dc4589368da368b212745d63e8",
	decimals: 6
},
	"0x9fc8f0ca1668e87294941b7f627e9c15ea06b459": {
	childToken: "0xb346c52874c7023df183068c39478c3b7b2515bc",
	decimals: 18
},
	"0x83e9f223e1edb3486f876ee888d76bfba26c475a": {
	childToken: "0x0565805ca3a4105faee51983b0bd8ffb5ce1455c",
	decimals: 18
},
	"0x73374ea518de7addd4c2b624c0e8b113955ee041": {
	childToken: "0xc13b7a43223bb9bf4b69bd68ab20ca1b79d81c75",
	decimals: 18
},
	"0x08d967bb0134f2d07f7cfb6e246680c53927dd30": {
	childToken: "0xf218184af829cf2b0019f8e6f0b2423498a36983",
	decimals: 18
},
	"0xdacd69347de42babfaecd09dc88958378780fb62": {
	childToken: "0xc0c6e4c6e70c6231b20979bda581a66f062a7967",
	decimals: 0
},
	"0xfb7b4564402e5500db5bb6d63ae671302777c75a": {
	childToken: "0xe91a8d2c584ca93c7405f15c22cdfe53c29896e3",
	decimals: 18
},
	"0x464fdb8affc9bac185a7393fd4298137866dcfb8": {
	childToken: "0x464fdb8affc9bac185a7393fd4298137866dcfb8",
	decimals: 18
},
	"0xa803778ab953d3ffe4fbd20cfa0042ecefe8319d": {
	childToken: "0xa803778ab953d3ffe4fbd20cfa0042ecefe8319d",
	decimals: 18
},
	"0x5aa158404fed6b4730c13f49d3a7f820e14a636f": {
	childToken: "0xd983ab71a284d6371908420d8ac6407ca943f810",
	decimals: 18
},
	"0xea3983fc6d0fbbc41fb6f6091f68f3e08894dc06": {
	childToken: "0x70802af0ba10dd5bb33276b5b37574b6451db3d9",
	decimals: 18
},
	"0xb5be7557fe8f69a2b5707d25fa0aee80dfda512e": {
	childToken: "0x6451c6484d23889003c20be51819d6aa7dbd2b35",
	decimals: 18
},
	"0x0239d3a3485ec54511bee9d77d92695e443bf060": {
	childToken: "0xa873e87c2c935fa11c72003231a2eee7d391ce5f",
	decimals: 18
},
	"0xaee433adebe0fbb88daa47ef0c1a513caa52ef02": {
	childToken: "0xaee433adebe0fbb88daa47ef0c1a513caa52ef02",
	decimals: 18
},
	"0x6ff1bfa14a57594a5874b37ff6ac5efbd9f9599a": {
	childToken: "0x6ff1bfa14a57594a5874b37ff6ac5efbd9f9599a",
	decimals: 18
},
	"0xd2be3722b17b616c51ed9b8944a227d1ce579c24": {
	childToken: "0xd3cceb42b544e91eee02eb585cc9a7b47247bfde",
	decimals: 2
},
	"0x40897c872214303b6f479a37e549ee1516b264a2": {
	childToken: "0xff8152f09e0fddd1ce1577ef6eba72f3a7c2e7db",
	decimals: 18
},
	"0x428dca9537116148616a5a3e44035af17238fe9d": {
	childToken: "0xff2f5e8e796b6739ac9d73b8fe916568abb871b5",
	decimals: 18
},
	"0xac0104cca91d167873b8601d2e71eb3d4d8c33e0": {
	childToken: "0xbcf39f0edda668c58371e519af37ca705f2bfcbd",
	decimals: 18
},
	"0x89d3c0249307ae570a316030764d12f53bb191fd": {
	childToken: "0xd37ef7df703b6f8eec56cd4e082bb3e899e41f2b",
	decimals: 14
},
	"0xe803178b48a0e560c2b19f3b3d4e504f79d229ce": {
	childToken: "0xce6bd1833bd077f62b2c1f9a777bb829801d6811",
	decimals: 18
},
	"0xaec7d1069e3a914a3eb50f0bfb1796751f2ce48a": {
	childToken: "0x788d2780992222360f674cc12c36478870b8e6ed",
	decimals: 18
},
	"0xc626e0619ac79afea9281c8eb9b1a9f9d3fab532": {
	childToken: "0xbea7086c99a85d4b5e6a0494c18b037fdd8ee932",
	decimals: 18
},
	"0x65d9bc970aa9b2413027fa339f7f179b3f3f2604": {
	childToken: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
	decimals: 18
},
	"0xf1d1a5306daae314af6c5d027a492b313e07e1a0": {
	childToken: "0x4d6b129db8a502b85fedc3443fa4f58b50327238",
	decimals: 18
},
	"0xba50933c268f567bdc86e1ac131be072c6b0b71a": {
	childToken: "0x6f769e65c14ebd1f68817f5f1dcdb61cfa2d6f7e",
	decimals: 18
},
	"0x1de5e000c41c8d35b9f1f4985c23988f05831057": {
	childToken: "0xca14caf9e8dd2793e7010fc48dfe6c6af8445136",
	decimals: 18
},
	"0x7603de2ea4cbceb0250118de03fcb70fe1e8e935": {
	childToken: "0x1496fb27d8cf1887d21cac161987821859ca56ba",
	decimals: 18
},
	"0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a": {
	childToken: "0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a",
	decimals: 11
},
	"0xc8d3dcb63c38607cb0c9d3f55e8ecce628a01c36": {
	childToken: "0xc32bb619966b9a56cf2472528a36fd099ce979e0",
	decimals: 18
},
	"0xaaca86b876ca011844b5798eca7a67591a9743c8": {
	childToken: "0xcf87d3d50a98a7832f5cfdf99ae1b88c7cfba4a7",
	decimals: 18
},
	"0xeb953eda0dc65e3246f43dc8fa13f35623bdd5ed": {
	childToken: "0xeb953eda0dc65e3246f43dc8fa13f35623bdd5ed",
	decimals: 18
},
	"0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa": {
	childToken: "0xebd49b26169e1b52c04cfd19fcf289405df55f80",
	decimals: 18
},
	"0x7ae1d57b58fa6411f32948314badd83583ee0e8c": {
	childToken: "0xc28ea768221f67b6a1fd33e6aa903d4e42f6b177",
	decimals: 18
},
	"0xcb8fb2438a805664cd8c3e640b85ac473da5be87": {
	childToken: "0x7c3b67b30efbacc8f787f7ebd3bdc65234299f4c",
	decimals: 18
},
	"0x557b933a7c2c45672b610f8954a3deb39a51a8ca": {
	childToken: "0x833f307ac507d47309fd8cdd1f835bef8d702a93",
	decimals: 18
},
	"0xfc979087305a826c2b2a0056cfaba50aad3e6439": {
	childToken: "0x4e0fe270b856eebb91fb4b4364312be59f499a3f",
	decimals: 18
},
	"0xbb0e17ef65f82ab018d8edd776e8dd940327b28b": {
	childToken: "0x715d400f88c167884bbcc41c5fea407ed4d2f8a0",
	decimals: 18
},
	"0x1cdd2eab61112697626f7b4bb0e23da4febf7b7c": {
	childToken: "0x49d5cc521f75e13fa8eb4e89e9d381352c897c96",
	decimals: 6
},
	"0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55": {
	childToken: "0x51ba0b044d96c3abfca52b64d733603ccc4f0d4d",
	decimals: 18
},
	"0x6b175474e89094c44da98b954eedeac495271d0f": {
	childToken: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
	decimals: 18
},
	"0x490e3f4af13e1616ec97a8c6600c1061a8d0253e": {
	childToken: "0xbb95cc1c662d89822bda29d2e147b124406e6e42",
	decimals: 18
},
	"0x849a226f327b89e3133d9930d927f9eb9346f8c9": {
	childToken: "0x747d74db20cc422f39ab54edb2a3ce21f3c98af1",
	decimals: 8
},
	"0xf68d4d917592f3a62417ace42592f15296cc33a0": {
	childToken: "0xf68d4d917592f3a62417ace42592f15296cc33a0",
	decimals: 8
},
	"0x772722b55cdc2a086abd064267a17855eb15e8b3": {
	childToken: "0x138218c8e064ed2a011c9ff203759a8a1e23e6c8",
	decimals: 18
},
	"0xe20b9e246db5a0d21bf9209e4858bc9a3ff7a034": {
	childToken: "0xe20b9e246db5a0d21bf9209e4858bc9a3ff7a034",
	decimals: 18
},
	"0x37613d64258c0fe09d5e53eecb091da5b8fa8707": {
	childToken: "0x25c30340e6f9f6e521827cf03282943da00c0ece",
	decimals: 18
},
	"0xd3ac016b1b8c80eeadde4d186a9138c9324e4189": {
	childToken: "0x523821d20a283d955f6205b4c9252779cd0f964b",
	decimals: 18
},
	"0xdd13dedecebda566322195bc4451d672a148752c": {
	childToken: "0xcb5327ed4649548e0d73e70b633cdfd99af6da87",
	decimals: 18
},
	"0xc7026a20a640bc71b9074f7aed52a00cd9147091": {
	childToken: "0xd9780513292477c4039dfda1cfcd89ff111e9da5",
	decimals: 18
},
	"0xb990d93c308a31c737aa91839e8ba8eaf4017d7a": {
	childToken: "0x35f3ffffcb622bc9f64fa561d74e983fd488d90c",
	decimals: 8
},
	"0x706f280cdb92260fe2d50eda545f834ff1fbfd35": {
	childToken: "0x7791d80425cb542937fa499afe835d26ee7284fb",
	decimals: 9
},
	"0xb2cabf797bc907b049e4ccb5b84d13be3a8cfc21": {
	childToken: "0xebd949aacfc681787d3d091fa2929e4413e0e4e1",
	decimals: 18
},
	"0x4e15361fd6b4bb609fa63c81a2be19d873717870": {
	childToken: "0xad29abb318791d579433d831ed122afeaf29dcfe",
	decimals: 18
},
	"0x388d819724dd6d71760a38f00dc01d310d879771": {
	childToken: "0x388d819724dd6d71760a38f00dc01d310d879771",
	decimals: 8
},
	"0x4b19c70da4c6fa4baa0660825e889d2f7eabc279": {
	childToken: "0x5b6bf0c7f989de824677cfbd507d9635965e9cd3",
	decimals: 18
},
	"0x7cfea0dd176651e7b5a1ced9c4faf8ee295315fd": {
	childToken: "0x9f402f44684574f3535ea6f1bb5cfbffef42ee28",
	decimals: 18
},
	"0xf33893de6eb6ae9a67442e066ae9abd228f5290c": {
	childToken: "0xf33893de6eb6ae9a67442e066ae9abd228f5290c",
	decimals: 8
},
	"0x6f9c26fa731c7ea4139fa669962cf8f1ce6c8b0b": {
	childToken: "0xd3c6ceedd1cc7bd4304f72b011d53441d631e662",
	decimals: 18
},
	"0xcc503242b574bc01145da7e2a743b43fb395ec91": {
	childToken: "0xd02d45df2d9e8ee28a15d199689aefb1b4a74043",
	decimals: 18
},
	"0x1f3f677ecc58f6a1f9e2cf410df4776a8546b5de": {
	childToken: "0xdde5b33a56f3f1c22e5a6bd8429e6ad508bff24e",
	decimals: 0
},
	"0xa64c3a85ddc4cd351eeb7aecebc6a44a64a76392": {
	childToken: "0xcf909ef9a61dc5b05d46b5490a9f00d51c40bb28",
	decimals: 18
},
	"0x837d904a3799c0769079be9ecbaddf1abd4ccd6e": {
	childToken: "0xa8cd6e4bf45724d3ac27f9e31e47ba4e399a7b52",
	decimals: 18
},
	"0xcdb37a4fbc2da5b78aa4e41a432792f9533e85cc": {
	childToken: "0x0cbd6fadcf8096cc9a43d90b45f65826102e3ece",
	decimals: 18
},
	"0x0a5e677a6a24b2f1a2bf4f3bffc443231d2fdec8": {
	childToken: "0xb5102cee1528ce2c760893034a4603663495fd72",
	decimals: 18
},
	"0x4184aa04215e5d716dd4c213fed519acadc68f92": {
	childToken: "0x1851ccd370c444ff494d7505e6103959bce9f9d9",
	decimals: 18
},
	"0xd3c325848d7c6e29b574cb0789998b2ff901f17e": {
	childToken: "0xd3c325848d7c6e29b574cb0789998b2ff901f17e",
	decimals: 18
},
	"0x0ff534801e98a4976246d1f418e441783fc9aa15": {
	childToken: "0x0ff534801e98a4976246d1f418e441783fc9aa15",
	decimals: 18
},
	"0x01b443495834d667b42f54d2b77eed6951ed94a4": {
	childToken: "0x3764be118a1e09257851a3bd636d48dfeab5cafe",
	decimals: 18
},
	"0x8f006d1e1d9dc6c98996f50a4c810f17a47fbf19": {
	childToken: "0xaa076b62efc6f357882e07665157a271ab46a063",
	decimals: 18
},
	"0xd5a14081a34d256711b02bbef17e567da48e80b5": {
	childToken: "0x2952beb1326accbb5243725bd4da2fc937bca087",
	decimals: 9
},
	"0x06fce0dab5b26e503e1c4db48aa165dcaaaa6e11": {
	childToken: "0xcec747d9f32fc8f7270a79263f7b10eaa6263bd3",
	decimals: 9
},
	"0xc5a927ad2d1a92dc5f9662ce03f7140a8b738b19": {
	childToken: "0x309d43cb7bb1e07371eee4947103aa019121a973",
	decimals: 18
},
	"0x888888888888f195e27a2e0f98d712952ab9348e": {
	childToken: "0x888888888888f195e27a2e0f98d712952ab9348e",
	decimals: 18
},
	"0xc7b89491bb148551547837ea6ccb4bb5144d8e47": {
	childToken: "0x5546600f77eda1dcf2e8817ef4d617382e7f71f5",
	decimals: 9
},
	"0x9b25889c493ae6df34ceef1ecb10d77c1ba73318": {
	childToken: "0x6c9297be2e3ce9c10c480a25b7157a43fd992942",
	decimals: 6
},
	"0x9f826324bb9bdcf7e7eb274bedc417bd45d74f39": {
	childToken: "0x1d8e589379cf74a276952b56856033ad0d489fb3",
	decimals: 18
},
	"0x5b52bfb8062ce664d74bbcd4cd6dc7df53fd7233": {
	childToken: "0x5b52bfb8062ce664d74bbcd4cd6dc7df53fd7233",
	decimals: 18
},
	"0xbccd27062ae1a2bea5731c904b96edfb163aba21": {
	childToken: "0xbccd27062ae1a2bea5731c904b96edfb163aba21",
	decimals: 9
},
	"0xf124ed9ec309907808b1fbc6bedb2a76927b3665": {
	childToken: "0xf124ed9ec309907808b1fbc6bedb2a76927b3665",
	decimals: 18
},
	"0x703d8574e19428d662a73c301d106dc236aa9bfc": {
	childToken: "0x5f99acf13caff815dd9cb4a415c0fb34e9f4545b",
	decimals: 18
},
	"0x499568c250ab2a42292261d6121525d70691894b": {
	childToken: "0x1446f3cedf4d86a9399e49f7937766e6de2a3aab",
	decimals: 18
},
	"0x36b679bd64ed73dbfd88909cdcb892cb66bd4cbb": {
	childToken: "0x26a5dfab467d4f58fb266648cae769503cec9580",
	decimals: 9
},
	"0xfeea0bdd3d07eb6fe305938878c0cadbfa169042": {
	childToken: "0xfeea0bdd3d07eb6fe305938878c0cadbfa169042",
	decimals: 18
},
	"0x6dc02164d75651758ac74435806093e421b64605": {
	childToken: "0x22648c12acd87912ea1710357b1302c6a4154ebc",
	decimals: 8
},
	"0x71ba91dc68c6a206db0a6a92b4b1de3f9271432d": {
	childToken: "0x064c8e55aa484adbd58ca2d43343ef50137473b7",
	decimals: 18
},
	"0x5a4623f305a8d7904ed68638af3b4328678eddbf": {
	childToken: "0x5a4623f305a8d7904ed68638af3b4328678eddbf",
	decimals: 18
},
	"0xfb62ae373aca027177d1c18ee0862817f9080d08": {
	childToken: "0xfb62ae373aca027177d1c18ee0862817f9080d08",
	decimals: 18
},
	"0x92a42db88ed0f02c71d439e55962ca7cab0168b5": {
	childToken: "0x92a42db88ed0f02c71d439e55962ca7cab0168b5",
	decimals: 9
},
	"0x3079f61704e9efa2bcf1db412f735d8d4cfa26f4": {
	childToken: "0xf5d8a096cccb31b9d7bce5afe812be23e3d4690d",
	decimals: 18
},
	"0x946112efab61c3636cbd52de2e1392d7a75a6f01": {
	childToken: "0xf3dbb49999b25c9d6641a9423c7ad84168d00071",
	decimals: 18
},
	"0x05fb86775fd5c16290f1e838f5caaa7342bd9a63": {
	childToken: "0xaa9e582e5751d703f85912903bacaddfed26484c",
	decimals: 8
},
	"0x5f6c5c2fb289db2228d159c69621215e354218d7": {
	childToken: "0x002d8563759f5e1eaf8784181f3973288f6856e4",
	decimals: 18
},
	"0xc944273b805debd35c63011943abc5ab9eddb8e3": {
	childToken: "0xc944273b805debd35c63011943abc5ab9eddb8e3",
	decimals: 18
},
	"0x8bcd06492416a749c9369009b3429861b7f27f6e": {
	childToken: "0x8626264b6a1b4e920905efd381002aba52ea0eea",
	decimals: 8
},
	"0x7778360f035c589fce2f4ea5786cbd8b36e5396b": {
	childToken: "0x9029fdfae9a03135846381c7ce16595c3554e10a",
	decimals: 18
},
	"0x4e9a46ea6a22f3894abee2302ad42fd3b69e21e2": {
	childToken: "0x5c6fb802f173dba15e2caada433032b1368af59f",
	decimals: 8
},
	"0xae12c5930881c53715b369cec7606b70d8eb229f": {
	childToken: "0xaec945e04baf28b135fa7c640f624f8d90f1c3a6",
	decimals: 18
},
	"0x396ec402b42066864c406d1ac3bc86b575003ed8": {
	childToken: "0x40225c6277b29bf9056b4acb7ee1512cbff11671",
	decimals: 18
},
	"0x180dae91d6d56235453a892d2e56a3e40ba81df8": {
	childToken: "0x180dae91d6d56235453a892d2e56a3e40ba81df8",
	decimals: 18
},
	"0x8287c7b963b405b7b8d467db9d79eec40625b13a": {
	childToken: "0x71de20e0c4616e7fcbfdd3f875d568492cbe4739",
	decimals: 18
},
	"0x1d7ca62f6af49ec66f6680b8606e634e55ef22c1": {
	childToken: "0x31d0a7ada4d4c131eb612db48861211f63e57610",
	decimals: 18
},
	"0x31f69de127c8a0ff10819c0955490a4ae46fcc2a": {
	childToken: "0xeb34de0c4b2955ce0ff1526cdf735c9e6d249d09",
	decimals: 18
},
	"0x8848812bd31aeee33313c10a840ffc3169078c5b": {
	childToken: "0xae20bc46300bab5d85612c6bc6ea87ea0f186035",
	decimals: 18
},
	"0x667fd83e24ca1d935d36717d305d54fa0cac991c": {
	childToken: "0x73ffdf2d2afb3def5b10bf967da743f2306a51db",
	decimals: 18
},
	"0x9393fdc77090f31c7db989390d43f454b1a6e7f3": {
	childToken: "0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a",
	decimals: 3
},
	"0x1951ab088141e69a3713a351b0d55ba3acda192c": {
	childToken: "0x86cbbedca621ae78a421a40365081caafda24296",
	decimals: 8
},
	"0x2aad9dbc82611485a52325923e1187734e951b78": {
	childToken: "0x586fc153cf7e9c029d8c30842c4cb6a86f03b816",
	decimals: 8
},
	"0x8861cff2366c1128fd699b68304ad99a0764ef9a": {
	childToken: "0x810ee35443639348adbbc467b33310d2ab43c168",
	decimals: 18
},
	"0x026e62dded1a6ad07d93d39f96b9eabd59665e0d": {
	childToken: "0xc9c7c6a590e82c576de7553142d47a5fb63f9e90",
	decimals: 18
},
	"0x34965f73cfa05bf8d8af37cb4af64fa950605ea8": {
	childToken: "0x422e3af98bc1de5a1838be31a56f75db4ad43730",
	decimals: 18
},
	"0x7645ddfeeceda57e41f92679c4acd83c56a81d14": {
	childToken: "0x1ab6478b47270ff05af11a012ac17b098758e193",
	decimals: 18
},
	"0xf99d58e463a2e07e5692127302c20a191861b4d6": {
	childToken: "0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa",
	decimals: 18
},
	"0xe0b0c16038845bed3fcf70304d3e167df81ce225": {
	childToken: "0xe0b0c16038845bed3fcf70304d3e167df81ce225",
	decimals: 18
},
	"0x62d693fe5c13b5a5b24c9ec3f423e51c35f5624f": {
	childToken: "0x380624a4a7e69db1ca07deecf764025fc224d056",
	decimals: 9
},
	"0xdb0170e2d0c1cc1b2e7a90313d9b9afa4f250289": {
	childToken: "0xdb0170e2d0c1cc1b2e7a90313d9b9afa4f250289",
	decimals: 18
},
	"0xc2708a3a4ba7f64bddc1a49f92f941bc77cad23a": {
	childToken: "0x889efce29fa0bb9b26be9fda17a8003f4e8da4de",
	decimals: 18
},
	"0xb8e3bb633f7276cc17735d86154e0ad5ec9928c0": {
	childToken: "0xb8e3bb633f7276cc17735d86154e0ad5ec9928c0",
	decimals: 18
},
	"0x9798df2f5d213a872c787bd03b2b91f54d0d04a1": {
	childToken: "0x9798df2f5d213a872c787bd03b2b91f54d0d04a1",
	decimals: 18
},
	"0x3405a1bd46b85c5c029483fbecf2f3e611026e45": {
	childToken: "0x4da996c5fe84755c80e108cf96fe705174c5e36a",
	decimals: 18
},
	"0x12bb890508c125661e03b09ec06e404bc9289040": {
	childToken: "0x12bb890508c125661e03b09ec06e404bc9289040",
	decimals: 18
},
	"0xca1262e77fb25c0a4112cfc9bad3ff54f617f2e6": {
	childToken: "0xca1262e77fb25c0a4112cfc9bad3ff54f617f2e6",
	decimals: 0
},
	"0x968f6f898a6df937fc1859b323ac2f14643e3fed": {
	childToken: "0x968f6f898a6df937fc1859b323ac2f14643e3fed",
	decimals: 18
},
	"0x39ae6d231d831756079ec23589d2d37a739f2e89": {
	childToken: "0x39ae6d231d831756079ec23589d2d37a739f2e89",
	decimals: 4
},
	"0x5dbb9f64cd96e2dbbca58d14863d615b67b42f2e": {
	childToken: "0x55e8b37a3c43b049dedf56c77f462db095108651",
	decimals: 9
},
	"0x8a65b987d9813f0a97446eda0de918b2573ae406": {
	childToken: "0x8a65b987d9813f0a97446eda0de918b2573ae406",
	decimals: 9
},
	"0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341": {
	childToken: "0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341",
	decimals: 18
},
	"0xf32122561d51e891b823dec2b42f644884c1cd91": {
	childToken: "0x199f788ddb566b7ebb59bf35b36914f2acdb33de",
	decimals: 9
},
	"0xf268fe3d6909508dda90dccf2bf69050d19f4cdd": {
	childToken: "0x081a4d4e4a0cc74d6a7a61578f86b8c93cc950a0",
	decimals: 18
},
	"0x2fd8bc03d9e827f77fac20b5130ee98b7f80149d": {
	childToken: "0x518afa06aeca8dd0946b89a565e51f5a91d81176",
	decimals: 8
},
	"0xd373576a9e738f37dc6882328358ff69c4caf4c6": {
	childToken: "0xbbcf57177d8752b21d080bf30a06ce20ad6333f8",
	decimals: 18
},
	"0x0106a1122fe94a9cf151097c1fe17229ec78ffad": {
	childToken: "0x96a16178edaff58736567cfcaff570c06617f0fd",
	decimals: 18
},
	"0x773258b03c730f84af10dfcb1bfaa7487558b8ac": {
	childToken: "0xcd95350c69f229e72e57a44e8c05c436e65e4beb",
	decimals: 6
},
	"0x5f0366c9962193fa774cdce9602195593b49f23c": {
	childToken: "0x5f0366c9962193fa774cdce9602195593b49f23c",
	decimals: 18
},
	"0x65e6b60ea01668634d68d0513fe814679f925bad": {
	childToken: "0x47db24e17c0c4622523449a239b3de746e2b0b23",
	decimals: 18
},
	"0x081131434f93063751813c619ecca9c4dc7862a3": {
	childToken: "0x23ce9e926048273ef83be0a3a8ba9cb6d45cd978",
	decimals: 6
},
	"0x0c75dd36af9a59ba1d248a98fe91b2384cfea9be": {
	childToken: "0x963fac6d71cddbd717d8d0c2fd06aae5dd6072fc",
	decimals: 18
},
	"0xac57de9c1a09fec648e93eb98875b212db0d460b": {
	childToken: "0xc748673057861a797275cd8a068abb95a902e8de",
	decimals: 9
},
	"0x9a257c90fa239fba07771ef7da2d554d148c2e89": {
	childToken: "0x9a257c90fa239fba07771ef7da2d554d148c2e89",
	decimals: 18
},
	"0x9fb83c0635de2e815fd1c21b3a292277540c2e8d": {
	childToken: "0x82030cdbd9e4b7c5bb0b811a61da6360d69449cc",
	decimals: 18
},
	"0xe0bcd056b6a8c7fd4983cb56c162799e498e85d3": {
	childToken: "0x2c3ffa02d582a08e27289a3fe67d79c1834a87ef",
	decimals: 9
},
	"0x0343131c0257ac21ea5a8dc83841f071efd9285c": {
	childToken: "0x57c81885faad67fc4de892102f6fead3b9215f6b",
	decimals: 18
},
	"0x747c4ce9622ea750ea8048423b38a746b096c8e8": {
	childToken: "0xe24f6bc7635501d5684a963f7e75c8062b9c0ea4",
	decimals: 9
},
	"0xb6dd77fd132dcaa10f1858734e838a0fa7431580": {
	childToken: "0x155e8a74dac3d8560ddabbc26aa064b764535193",
	decimals: 18
},
	"0x81c159f7abaa9139227aff62959b86b4141f6eb2": {
	childToken: "0x54017fda0ff8f380ccef600147a66d2e262d6b17",
	decimals: 9
},
	"0x93e32efafd24973d45f363a76d73ccb9edf59986": {
	childToken: "0x51e7b598c9155b9dccb04eb42519f6eec9c841e9",
	decimals: 6
},
	"0x42baf1f659d765c65ade5bb7e08eb2c680360d9d": {
	childToken: "0xfea292e5ea4510881bdb840e3cec63abd43f936f",
	decimals: 18
},
	"0xe1590a6fa0cff9c960181cb77d8a873601772f64": {
	childToken: "0x22168882276e5d5e1da694343b41dd7726eeb288",
	decimals: 18
},
	"0xdf09a216fac5adc3e640db418c0b956076509503": {
	childToken: "0x4b5decb9327b4d511a58137a1ade61434aacdd43",
	decimals: 18
},
	"0x45c2f8c9b4c0bdc76200448cc26c48ab6ffef83f": {
	childToken: "0xbbca42c60b5290f2c48871a596492f93ff0ddc82",
	decimals: 18
},
	"0xa87135285ae208e22068acdbff64b11ec73eaa5a": {
	childToken: "0x37807d4fbeb84124347b8899dd99616090d3e304",
	decimals: 4
},
	"0x965b85d4674f64422c4898c8f8083187f02b32c0": {
	childToken: "0x965b85d4674f64422c4898c8f8083187f02b32c0",
	decimals: 8
},
	"0xa47c8bf37f92abed4a126bda807a7b7498661acd": {
	childToken: "0x23396cf899ca06c4472205fc903bdb4de249d6fc",
	decimals: 18
},
	"0x57cd5a91c18d21dedd72d3bcf255b60aef290f53": {
	childToken: "0x57cd5a91c18d21dedd72d3bcf255b60aef290f53",
	decimals: 18
},
	"0x2f25d402829ca4085b8ea4d3bc68bf203f5a9fab": {
	childToken: "0x2f25d402829ca4085b8ea4d3bc68bf203f5a9fab",
	decimals: 18
},
	"0xaad483f97f13c6a20b9d05d07c397ce85c42c393": {
	childToken: "0x8b303d5bbfbbf46f1a4d9741e491e06986894e18",
	decimals: 18
},
	"0xaf9db9e362e306688af48c4acb9618c06db38ac3": {
	childToken: "0xc94595b56e301f3ffedb8ccc2d672882d623e53a",
	decimals: 18
},
	"0xbd100d061e120b2c67a24453cf6368e63f1be056": {
	childToken: "0xbd100d061e120b2c67a24453cf6368e63f1be056",
	decimals: 18
},
	"0x77a1f4e744d810239f465043e35d067ca33de259": {
	childToken: "0xacf34edcc424128cccc730bf85cdaceebcb3eece",
	decimals: 18
},
	"0x507bde03a87a6aa134d16634545e3d79c11c137d": {
	childToken: "0x5608d5159ab98881bc116ae7761c74ad2ebb0448",
	decimals: 12
},
	"0xe57425f1598f9b0d6219706b77f4b3da573a3695": {
	childToken: "0x0cf8e180350253271f4b917ccfb0accc4862f262",
	decimals: 18
},
	"0x7118057ff0f4fd0994fb9d2d94de8231d5cca79e": {
	childToken: "0xea136fc555e695ba96d22e10b7e2151c4c6b2a20",
	decimals: 18
},
	"0x9ab70e92319f0b9127df78868fd3655fb9f1e322": {
	childToken: "0x9ab70e92319f0b9127df78868fd3655fb9f1e322",
	decimals: 18
},
	"0x86d49fbd3b6f989d641e700a15599d3b165002ab": {
	childToken: "0xc15e89f2149bcc0cbd5fb204c9e77fe878f1e9b2",
	decimals: 9
},
	"0x25b24b3c47918b7962b3e49c4f468367f73cc0e0": {
	childToken: "0x25b24b3c47918b7962b3e49c4f468367f73cc0e0",
	decimals: 18
},
	"0xbba6c7c7d673c48d90069ad2e9d2fe587fcb6bc3": {
	childToken: "0xa4050aa9b76ccdae1a6a8b2f3e8627cdc1546d86",
	decimals: 18
},
	"0xac8cc32fab2368a1a095722aaf760c45f578e17b": {
	childToken: "0xdfe6891ce8e5a5c7cf54ffde406a6c2c54145f71",
	decimals: 9
},
	"0xa693b19d2931d498c5b318df961919bb4aee87a5": {
	childToken: "0x3d4350cd54aef9f9b2c29435e0fa809957b3f30a",
	decimals: 6
},
	"0x845e2e8b42dced7dedcdba9bde32c9e338224f97": {
	childToken: "0xf4341fa52669cea0c1836095529a7e9b04b8b88d",
	decimals: 8
},
	"0x2f75113b13d136f861d212fa9b572f2c79ac81c4": {
	childToken: "0x45808ce43eb2d7685ff0242631f0feb6f3d8701a",
	decimals: 18
},
	"0x4734baf528766ec4c420a6c13f8dba7bb1920181": {
	childToken: "0xe942c48044fb1c7f4c9eb456f6097fa4a1a17b8f",
	decimals: 18
},
	"0xc4bb7277a74678f053259cb1f96140347efbfd46": {
	childToken: "0xbdc3b3639f7aa19e623a4d603a3fb7ab20115a91",
	decimals: 18
},
	"0x9b17baadf0f21f03e35249e0e59723f34994f806": {
	childToken: "0xbac1df744df160877cdc45e13d0394c06bc388ff",
	decimals: 18
},
	"0xee9801669c6138e84bd50deb500827b776777d28": {
	childToken: "0xee9801669c6138e84bd50deb500827b776777d28",
	decimals: 18
},
	"0x7825e833d495f3d1c28872415a4aee339d26ac88": {
	childToken: "0xb6c53431608e626ac81a9776ac3e999c5556717c",
	decimals: 18
},
	"0x2217e5921b7edfb4bb193a6228459974010d2198": {
	childToken: "0x07e551e31a793e20dc18494ff6b03095a8f8ee36",
	decimals: 18
},
	"0xd3c51de3e6dd9b53d7f37699afb3ee3bf9b9b3f4": {
	childToken: "0x799e1cf88a236e42b4a87c544a22a94ae95a6910",
	decimals: 6
},
	"0x1f36fb2d91d9951cf58ae4c1956c0b77e224f1e9": {
	childToken: "0x1f36fb2d91d9951cf58ae4c1956c0b77e224f1e9",
	decimals: 18
},
	"0xe580074a10360404af3abfe2d524d5806d993ea3": {
	childToken: "0xe580074a10360404af3abfe2d524d5806d993ea3",
	decimals: 18
},
	"0x723bd1f87a327e94ceabf68d8f022e0f54b9cc1a": {
	childToken: "0x68dd887d012abdf99d3492621e4d576a3f75019d",
	decimals: 18
},
	"0xc17fbe1d709ddf6c0b6665dd0591046815ac7554": {
	childToken: "0x273a4ffceb31b8473d51051ad2a2edbb7ac8ce02",
	decimals: 18
},
	"0x22c5543d1a35178cb03b33f929a959145e538532": {
	childToken: "0xd306c124282880858a634e7396383ae58d37c79c",
	decimals: 18
},
	"0x20d60c6eb195868d4643f2c9b0809e4de6cc003d": {
	childToken: "0x5f39dd1bb6db20f3e792c4489f514794cac6392c",
	decimals: 6
},
	"0xae1107fc7cef1294f09185ac475c9886527dcd8a": {
	childToken: "0xae1107fc7cef1294f09185ac475c9886527dcd8a",
	decimals: 18
},
	"0x19193f450086d0442157b852081976d41657ad56": {
	childToken: "0x3a2927e68749dd6ad0a568d7c05b587863c0bc10",
	decimals: 18
},
	"0xc17c30e98541188614df99239cabd40280810ca3": {
	childToken: "0xc17c30e98541188614df99239cabd40280810ca3",
	decimals: 18
},
	"0x32462ba310e447ef34ff0d15bce8613aa8c4a244": {
	childToken: "0xff8bbc599ea030aa69d0298035dfe263740a95bc",
	decimals: 18
},
	"0x198d14f2ad9ce69e76ea330b374de4957c3f850a": {
	childToken: "0x20ee7b720f4e4c4ffcb00c4065cdae55271aecca",
	decimals: 6
},
	"0x16b3e050e9e2f0ac4f1bea1b3e4fdc43d7f062dd": {
	childToken: "0x8ad8e9b85787ddd0d31b32ecf655e93bfc0747ef",
	decimals: 9
},
	"0xb14784b2a56945aed7b8cd41661d68f8b6ccec8b": {
	childToken: "0xb14784b2a56945aed7b8cd41661d68f8b6ccec8b",
	decimals: 18
},
	"0x446f2a8a39cc730ef378be759a3c57f1a3fe824c": {
	childToken: "0x1d3437e570e93581bd94b2fd8fbf202d4a65654a",
	decimals: 18
},
	"0xc84d8d03aa41ef941721a4d77b24bb44d7c7ac55": {
	childToken: "0xc84d8d03aa41ef941721a4d77b24bb44d7c7ac55",
	decimals: 9
},
	"0x420a24c9c65bd44c48bfb1cc8d6cd1ea8b1ac840": {
	childToken: "0x88d7e9b65dc24cf54f5edef929225fc3e1580c25",
	decimals: 18
},
	"0x4550003152f12014558e5ce025707e4dd841100f": {
	childToken: "0x4550003152f12014558e5ce025707e4dd841100f",
	decimals: 18
},
	"0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6": {
	childToken: "0xd17479997f34dd9156deef8f95a52d81d265be9c",
	decimals: 18
},
	"0xfceb206e1a80527908521121358b5e26caabaa75": {
	childToken: "0xa5f249f401ba8931899a364d8e2699b5fa1d87a9",
	decimals: 18
},
	"0x614d7f40701132e25fe6fc17801fbd34212d2eda": {
	childToken: "0xddc0dbd7dc799ae53a98a60b54999cb6ebb3abf0",
	decimals: 9
},
	"0x8fc8f8269ebca376d046ce292dc7eac40c8d358a": {
	childToken: "0x361c60b7c2828fcab80988d00d1d542c83387b50",
	decimals: 18
},
	"0x9767203e89dcd34851240b3919d4900d3e5069f1": {
	childToken: "0x9767203e89dcd34851240b3919d4900d3e5069f1",
	decimals: 6
},
	"0xd35c06a2781f648c75290976ecf71e71582188b7": {
	childToken: "0xfd0fd32a20532ad690731c2685d77c351015ebba",
	decimals: 18
},
	"0x7a5d3a9dcd33cb8d527f7b5f96eb4fef43d55636": {
	childToken: "0x30807d3b851a31d62415b8bb7af7dca59390434a",
	decimals: 18
},
	"0x26dcfbfa8bc267b250432c01c982eaf81cc5480c": {
	childToken: "0x738d96caf7096659db4c1afbf1e1bdfd281f388c",
	decimals: 18
},
	"0xafcdd4f666c84fed1d8bd825aa762e3714f652c9": {
	childToken: "0xfebe8c1ed424dbf688551d4e2267e7a53698f0aa",
	decimals: 18
},
	"0x9e6b19874e97fe8e8cad77f2c0ab5e7a693e5dbf": {
	childToken: "0x1cc1aca0dae2d6c4a0e8ae7b4f2d01eabbc435ee",
	decimals: 18
},
	"0x5f018e73c185ab23647c82bd039e762813877f0e": {
	childToken: "0xe79a1163a95734ccfbd006cbaaba954f3e846beb",
	decimals: 18
},
	"0x40fed5691e547885cabd7a2990de719dcc8497fc": {
	childToken: "0x40fed5691e547885cabd7a2990de719dcc8497fc",
	decimals: 18
},
	"0xcafe34bae6f1b23a6b575303edcc0578d2188131": {
	childToken: "0xf2ba89a6f9670459ed5aeefbd8db52be912228b8",
	decimals: 18
},
	"0x57d579f483854c62fef850b8a5332b0d8424b7e2": {
	childToken: "0x9929b92f4c743d014c68dfe022d04c8c8fcfa37a",
	decimals: 18
},
	"0x80cd73badb406ea36b9a7cdeb8df06aefa7e12d9": {
	childToken: "0x80cd73badb406ea36b9a7cdeb8df06aefa7e12d9",
	decimals: 18
},
	"0x4c3a8eceb656ec63eae80a4ebd565e4887db6160": {
	childToken: "0x0e4b5ea0259eb3d66e6fcb7cc8785817f8490a53",
	decimals: 18
},
	"0x88536c9b2c4701b8db824e6a16829d5b5eb84440": {
	childToken: "0xaf6162dc717cfc8818efc8d6f46a41cf7042fcba",
	decimals: 9
},
	"0xeeeeeb57642040be42185f49c52f7e9b38f8eeee": {
	childToken: "0xeeeeeb57642040be42185f49c52f7e9b38f8eeee",
	decimals: 18
},
	"0x7162469321ae5880f077d250b626f3271b21b903": {
	childToken: "0x270178366a592ba598c2e9d2971da65f7baa7c86",
	decimals: 18
},
	"0x92df60c51c710a1b1c20e42d85e221f3a1bfc7f2": {
	childToken: "0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95",
	decimals: 18
},
	"0x1cd2528522a17b6be63012fb63ae81f3e3e29d97": {
	childToken: "0x1cd2528522a17b6be63012fb63ae81f3e3e29d97",
	decimals: 9
},
	"0xc72633f995e98ac3bb8a89e6a9c4af335c3d6e44": {
	childToken: "0x7b610012bdc4d6deba2c2d91684e408f40863429",
	decimals: 18
},
	"0x2b867efd2de4ad2b583ca0cb3df9c4040ef4d329": {
	childToken: "0x2cd96e8c3ff6b5e01169f6e3b61d28204e7810bb",
	decimals: 9
},
	"0xe3c408bd53c31c085a1746af401a4042954ff740": {
	childToken: "0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1",
	decimals: 8
},
	"0x35609dc59e15d03c5c865507e1348fa5abb319a8": {
	childToken: "0x0b53b5da7d0f275c31a6a182622bdf02474af253",
	decimals: 8
},
	"0x34d31446a522252270b89b09016296ec4c98e23d": {
	childToken: "0x2d6f3dc5b202ccd91db114b592872bca32a7e292",
	decimals: 8
},
	"0x37129b96896891e56bc099540fe7d1841005a367": {
	childToken: "0xe5bbb701302322acb3504d4a260eec8dc4a36263",
	decimals: 18
},
	"0xc87f0a3f3671f7d01278625561dc6e284b62dae9": {
	childToken: "0x6458df5d764284346c19d88a104fd3d692471499",
	decimals: 18
},
	"0x57b59f981730c6257df57cf6f0d98283749a9eeb": {
	childToken: "0x83b27de2fca046fa63a11c7ce7743de33ec58822",
	decimals: 18
},
	"0xde16ce60804a881e9f8c4ebb3824646edecd478d": {
	childToken: "0x4b8285ab433d8f69cb48d5ad62b415ed1a221e4f",
	decimals: 9
},
	"0xbfc43a35b3ae8f7463c5ac88a0c46107cfce6f67": {
	childToken: "0xbfc43a35b3ae8f7463c5ac88a0c46107cfce6f67",
	decimals: 18
},
	"0x256d1fce1b1221e8398f65f9b36033ce50b2d497": {
	childToken: "0x256d1fce1b1221e8398f65f9b36033ce50b2d497",
	decimals: 18
},
	"0x6cd13e1856286de773a435c8ba93a7c73a04f82d": {
	childToken: "0x1104918312cc9ad88eadabe07b5110cae99583f6",
	decimals: 18
},
	"0xc285b7e09a4584d027e5bc36571785b515898246": {
	childToken: "0xfa4ba88cf97e282c505bea095297786c16070129",
	decimals: 18
},
	"0xd6e460f70e1cf60e55b770f66e568b44bf3657d0": {
	childToken: "0xa07c39f8df11ca675f77efc19501e3dddacd03ed",
	decimals: 18
},
	"0x8d6cebd76f18e1558d4db88138e2defb3909fad6": {
	childToken: "0x3f56e0c36d275367b8c502090edf38289b3dea0d",
	decimals: 18
},
	"0x7252d57ae4ec9af61db3b82a6eedab74eec5d1dc": {
	childToken: "0x407836435a30c7fa62db326d4f2d87bc1a87cc1a",
	decimals: 18
},
	"0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b": {
	childToken: "0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b",
	decimals: 18
},
	"0x967fb0d760ed3ce53afe2f0a071674cccae73550": {
	childToken: "0xbc7370641ddcf16a27eea11230af4a9f247b61f9",
	decimals: 18
},
	"0xcb3c5438dae9fe30b18ea53da3dab0e7dcaa0e4b": {
	childToken: "0x8163100460d2186de4e700c479d5e87283426d27",
	decimals: 9
},
	"0x76bc677d444f1e9d57daf5187ee2b7dc852745ae": {
	childToken: "0xe138c66982fd5c890c60b94fdba1747faf092c20",
	decimals: 18
},
	"0x9b0b23b35ad8136e6181f22b346134ce5f426090": {
	childToken: "0x78a9b17a3162533004eb7110b3f1f344a3ff851d",
	decimals: 18
}
};

var BnbMappingProvider = /*#__PURE__*/function () {
  function BnbMappingProvider() {}

  var _proto = BnbMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = bnbMappings;
              return _context.abrupt("return", tokens);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return BnbMappingProvider;
}();

var abi = [{
  constant: true,
  inputs: [],
  name: 'name',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'decimals',
  outputs: [{
    name: '',
    type: 'uint8'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    name: 'spender',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    name: 'to',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}];

var avaxMappings = {
	"0x65ef703f5594d2573eb71aaf55bc0cb548492df4": {
	childToken: "0x9fb9a33956351cf4fa040f65a13b835a3c8764e3",
	decimals: 18
},
	"0x644192291cc835a93d6330b24ea5f5fedd0eef9e": {
	childToken: "0x644192291cc835a93d6330b24ea5f5fedd0eef9e",
	decimals: 18
},
	"0x73374ea518de7addd4c2b624c0e8b113955ee041": {
	childToken: "0x4e3642603a75528489c2d94f86e9507260d3c5a1",
	decimals: 18
},
	"0x028171bca77440897b824ca71d1c56cac55b68a3": {
	childToken: "0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee",
	decimals: 18
},
	"0x3ed3b47dd13ec9a98b44e6204a523e766b225811": {
	childToken: "0x6ab707aca953edaefbc4fd23ba73294241490620",
	decimals: 6
},
	"0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656": {
	childToken: "0x078f358208685046a11c85e8ad32895ded33a249",
	decimals: 8
},
	"0xe692c8d72bd4ac7764090d54842a305546dd1de5": {
	childToken: "0xc931f61b1534eb21d8c11b24f3f5ab2471d4ab50",
	decimals: 8
},
	"0x6b3595068778dd592e39a122f4f5a5cf09c90fe2": {
	childToken: "0x37b608519f91f70f2eeb0e5ed9af4061722e4f76",
	decimals: 18
},
	"0x820802fa8a99901f52e39acd21177b0be6ee2974": {
	childToken: "0x820802fa8a99901f52e39acd21177b0be6ee2974",
	decimals: 6
},
	"0x8290333cef9e6d528dd5618fb97a76f268f3edd4": {
	childToken: "0x20cf1b6e9d856321ed4686877cf4538f2c84b4de",
	decimals: 18
},
	"0x0f2d719407fdbeff09d87557abb7232601fd9f29": {
	childToken: "0x1f1e7c893855525b303f99bdf5c3c05be09ca251",
	decimals: 18
},
	"0x444444444444c1a66f394025ac839a535246fcc8": {
	childToken: "0x444444444444c1a66f394025ac839a535246fcc8",
	decimals: 9
},
	"0x06450dee7fd2fb8e39061434babcfc05599a6fb8": {
	childToken: "0xc0c5aa69dbe4d6dddfbc89c0957686ec60f24389",
	decimals: 18
},
	"0x4fb721ef3bf99e0f2c193847afa296b9257d3c30": {
	childToken: "0xae9d2385ff2e2951dd4fa061e74c4d3dedd24347",
	decimals: 8
},
	"0x0d8775f648430679a709e98d2b0cb6250d2887ef": {
	childToken: "0x98443b96ea4b0858fdf3219cd13e98c7a4690588",
	decimals: 18
},
	"0xe41d2489571d322189246dafa5ebde1f4699f498": {
	childToken: "0x596fa47043f99a4e0f122243b841e55375cde0d2",
	decimals: 18
},
	"0xf88baf18fab7e330fa0c4f83949e23f52fececce": {
	childToken: "0x9df4ac62f9e435dbcd85e06c990a7f0ea32739a9",
	decimals: 18
},
	"0x47b9f01b16e9c9cb99191dca68c9cc5bf6403957": {
	childToken: "0x72bc9d71dd9ad563f52270c6ce5fb30f617c7a1d",
	decimals: 18
},
	"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9": {
	childToken: "0x63a72806098bd3d9520cc43356dd78afe5d386d9",
	decimals: 18
},
	"0x40986a85b4cfcdb054a6cbfb1210194fee51af88": {
	childToken: "0xd60effed653f3f1b69047f2d2dc4e808a548767b",
	decimals: 18
},
	"0xaa4e3edb11afa93c41db59842b29de64b72e355b": {
	childToken: "0x9fda7ceec4c18008096c2fe2b85f05dc300f94d0",
	decimals: 18
},
	"0x5d843fa9495d23de997c394296ac7b4d721e841c": {
	childToken: "0x78c42324016cd91d1827924711563fb66e33a83a",
	decimals: 18
},
	"0x92868a5255c628da08f550a858a802f5351c5223": {
	childToken: "0xc0367f9b1f84ca8de127226ac2a994ea4bf1e41b",
	decimals: 18
},
	"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": {
	childToken: "0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580",
	decimals: 18
},
	"0x418d75f65a02b3d53b2418fb8e1fe493759c7605": {
	childToken: "0x442f7f22b1ee2c842beaff52880d4573e9201158",
	decimals: 18
},
	"0x467719ad09025fcc6cf6f8311755809d45a5e5f3": {
	childToken: "0x44c784266cf024a60e8acf2427b9857ace194c5d",
	decimals: 6
},
	"0x030ba81f1c18d280636f32af80b9aad02cf0854e": {
	childToken: "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8",
	decimals: 18
},
	"0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f": {
	childToken: "0xbec243c995409e6520d7c41e404da5deba4b209b",
	decimals: 18
},
	"0x809826cceab68c387726af962713b64cb5cb3cca": {
	childToken: "0xc69eba65e87889f0805db717af06797055a0ba07",
	decimals: 18
},
	"0x4fabb145d64652a948d72533023f6e7a623c7c53": {
	childToken: "0x9c9e5fd8bbc25984b178fdce6117defa39d2db39",
	decimals: 18
},
	"0xe5caef4af8780e59df925470b050fb23c43ca68c": {
	childToken: "0xe5caef4af8780e59df925470b050fb23c43ca68c",
	decimals: 18
},
	"0x00a8b738e453ffd858a7edf03bccfe20412f0eb0": {
	childToken: "0x9e037de681cafa6e661e6108ed9c2bd1aa567ecd",
	decimals: 18
},
	"0x04fa0d235c4abf4bcf4787af4cf447de572ef828": {
	childToken: "0x3bd2b1c7ed8d396dbb98ded3aebb41350a5b2339",
	decimals: 18
},
	"0x8254e26e453eb5abd29b3c37ac9e8da32e5d3299": {
	childToken: "0x94960952876e3ed6a7760b198354fcc5319a406a",
	decimals: 18
},
	"0x1045f5ccb01daea4f8eab055f5fcbb7c0e7c89f0": {
	childToken: "0xafe3d2a31231230875dee1fa1eef14a412443d22",
	decimals: 18
},
	"0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0": {
	childToken: "0x191c10aa4af7c30e871e70c95db0e4eb77237530",
	decimals: 18
},
	"0x6006fc2a849fedaba8330ce36f5133de01f96189": {
	childToken: "0xc1d02e488a9ce2481bfdcd797d5373dd2e70a9c2",
	decimals: 18
},
	"0x6b175474e89094c44da98b954eedeac495271d0f": {
	childToken: "0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
	decimals: 18
},
	"0x111111111117dc0aa78b770fa6a738034120c302": {
	childToken: "0xd501281565bf7789224523144fe5d98e8b28f267",
	decimals: 18
},
	"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
	childToken: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
	decimals: 6
},
	"0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe": {
	childToken: "0xd7c295e399ca928a3a14b01d760e794f1adf8990",
	decimals: 18
},
	"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb": {
	childToken: "0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
	decimals: 18
},
	"0x514910771af9ca656af840dff83e8264ecf986ca": {
	childToken: "0x5947bb275c521040051d82396192181b413227a3",
	decimals: 18
},
	"0x29127fe04ffa4c32acac0ffe17280abd74eac313": {
	childToken: "0x237917e8a998b37759c8ee2faa529d60c66c2927",
	decimals: 18
},
	"0x0ab87046fbb341d058f17cbc4c1133f25a20a52f": {
	childToken: "0x321e7092a180bb43555132ec53aaa65a5bf84251",
	decimals: 18
},
	"0xa1faa113cbe53436df28ff0aee54275c13b40975": {
	childToken: "0x2147efff675e4a4ee1c2f918d181cdbd7a8e208f",
	decimals: 18
},
	"0xdac17f958d2ee523a2206206994597c13d831ec7": {
	childToken: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
	decimals: 6
},
	"0xd31a59c85ae9d8edefec411d448f90841571b89c": {
	childToken: "0xfe6b19286885a4f7f55adad09c3cd1f906d2478f",
	decimals: 9
},
	"0xd52aae39a2b5cc7812f7b9450ebb61dfef702b15": {
	childToken: "0x921f99719eb6c01b4b8f0ba7973a7c24891e740a",
	decimals: 18
},
	"0x69570f3e84f51ea70b7b68055c8d667e77735a25": {
	childToken: "0x63682bdc5f875e9bf69e201550658492c9763f89",
	decimals: 18
},
	"0x491604c0fdf08347dd1fa4ee062a822a5dd06b5d": {
	childToken: "0x6b289cceaa8639e3831095d75a3e43520fabf552",
	decimals: 18
},
	"0xa31b1767e09f842ecfd4bc471fe44f830e3891aa": {
	childToken: "0x4036f3d9c45a20f44f0b8b85dd6ca33005ff9654",
	decimals: 18
},
	"0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202": {
	childToken: "0x39fc9e94caeacb435842fadedecb783589f50f5f",
	decimals: 18
},
	"0x84d821f7fbdd595c4c4a50842913e6b1e07d7a53": {
	childToken: "0x1263fea931b86f3e8ce8afbf29f66631b7be9347",
	decimals: 18
},
	"0x420412e765bfa6d85aaac94b4f7b708c89be2e2b": {
	childToken: "0x491a4eb4f1fc3bff8e1d2fc856a6a46663ad556f",
	decimals: 4
},
	"0xc944e90c64b2c07662a292be6244bdf05cda44a7": {
	childToken: "0x8a0cac13c7da965a312f08ea4229c37869e85cb9",
	decimals: 18
},
	"0x98585dfc8d9e7d48f0b1ae47ce33332cf4237d96": {
	childToken: "0x4bfc90322dd638f81f034517359bd447f8e0235a",
	decimals: 18
},
	"0xe5097d9baeafb89f9bcb78c9290d545db5f9e9cb": {
	childToken: "0x38dcf0532699b880e6a125f7d918380524cd60a6",
	decimals: 18
},
	"0x8a0cdfab62ed35b836dc0633482798421c81b3ec": {
	childToken: "0x2fd4d793c1905d82018d75e3b09d3035856890a1",
	decimals: 18
},
	"0x3757232b55e60da4a8793183ac030cfce4c3865d": {
	childToken: "0xf03dccaec9a28200a6708c686cf0b8bf26ddc356",
	decimals: 18
},
	"0xd46ba6d942050d489dbd938a2c909a5d5039a161": {
	childToken: "0x027dbca046ca156de9622cd1e2d907d375e53aa7",
	decimals: 9
},
	"0xb3ed706b564bba9cab64042f4e1b391be7bebce5": {
	childToken: "0xb67a9374da03d4114a6fb8f0e7f2b82b5cb34ee3",
	decimals: 18
},
	"0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3": {
	childToken: "0x130966628846bfd36ff31a822705796e8cb8c18d",
	decimals: 18
},
	"0xe95a203b1a91a908f9b9ce46459d101078c2c3cb": {
	childToken: "0x12d8ce035c5de3ce39b1fdd4c1d5a745eaba3b8c",
	decimals: 18
},
	"0xf0939011a9bb95c3b791f0cb546377ed2693a574": {
	childToken: "0x008e26068b3eb40b443d3ea88c1ff99b789c10f7",
	decimals: 18
},
	"0xa11bd36801d8fa4448f0ac4ea7a62e3634ce8c7c": {
	childToken: "0xafc43610c7840b20b90caaf93759be5b54b291c9",
	decimals: 18
},
	"0xcb86c6a22cb56b6cf40cafedb06ba0df188a416e": {
	childToken: "0x5fc17416925789e0852fbfcd81c490ca4abc51f9",
	decimals: 18
},
	"0x0f7f961648ae6db43c75663ac7e5414eb79b5704": {
	childToken: "0x2cf51e73c3516f3d86e9c0b4de0971dbf0766fd4",
	decimals: 18
},
	"0x8e0fe2947752be0d5acf73aae77362daf79cb379": {
	childToken: "0x9e3ca00f2d4a9e5d4f0add0900de5f15050812cf",
	decimals: 18
},
	"0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0": {
	childToken: "0x03e8d118a1864c7dc53bf91e007ab7d91f5a06fa",
	decimals: 18
},
	"0x2edf094db69d6dcd487f1b3db9febe2eec0dd4c5": {
	childToken: "0x44754455564474a89358b2c2265883df993b12f0",
	decimals: 18
},
	"0x4297394c20800e8a38a619a243e9bbe7681ff24e": {
	childToken: "0x2f86508f41310d8d974b76deb3d246c0caa71cf5",
	decimals: 18
},
	"0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17": {
	childToken: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
	decimals: 18
},
	"0xbcca60bb61934080951369a648fb03df4f96263c": {
	childToken: "0x625e7708f30ca75bfd92586e17077590c60eb4cd",
	decimals: 6
},
	"0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de": {
	childToken: "0x721c299e6bf7d6a430d9bea3364ea197314bce09",
	decimals: 18
},
	"0x1a3496c18d558bd9c6c8f609e1b129f67ab08163": {
	childToken: "0xd4d026322c88c2d49942a75dff920fcfbc5614c1",
	decimals: 18
},
	"0x1735db6ab5baa19ea55d0adceed7bcdc008b3136": {
	childToken: "0xbd3936ec8d83a5d4e73eca625ecfa006da8c8f52",
	decimals: 18
},
	"0xff75ced57419bcaebe5f05254983b013b0646ef5": {
	childToken: "0x637afeff75ca669ff92e4570b14d6399a658902f",
	decimals: 18
},
	"0xcd2828fc4d8e8a0ede91bb38cf64b1a81de65bf6": {
	childToken: "0xb0a6e056b587d0a85640b39b1cb44086f7a26a1e",
	decimals: 18
},
	"0xbe1a001fe942f96eea22ba08783140b9dcc09d28": {
	childToken: "0x511d35c52a3c244e7b8bd92c0c297755fbd89212",
	decimals: 18
},
	"0xa02120696c7b8fe16c09c749e4598819b2b0e915": {
	childToken: "0xfcde4a87b8b6fa58326bb462882f1778158b02f1",
	decimals: 18
},
	"0xaaca86b876ca011844b5798eca7a67591a9743c8": {
	childToken: "0xd7783a275e53fc6746dedfbad4a06059937502a4",
	decimals: 18
},
	"0x1cdd2eab61112697626f7b4bb0e23da4febf7b7c": {
	childToken: "0xf0ff231e3f1a50f83136717f287adab862f89431",
	decimals: 6
},
	"0x6c3f90f043a72fa612cbac8115ee7e52bde6e490": {
	childToken: "0x1337bedc9d22ecbe766df105c9623922a27963ec",
	decimals: 18
},
	"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
	childToken: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
	decimals: 18
},
	"0x544c42fbb96b39b21df61cf322b5edc285ee7429": {
	childToken: "0x544c42fbb96b39b21df61cf322b5edc285ee7429",
	decimals: 18
},
	"0x2c537e5624e4af88a7ae4060c022609376c8d0eb": {
	childToken: "0x564a341df6c126f90cf3ecb92120fd7190acb401",
	decimals: 6
},
	"0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e": {
	childToken: "0x9eaac1b23d935365bd7b542fe22ceee2922f52dc",
	decimals: 18
},
	"0x808507121b80c02388fad14726482e061b8da827": {
	childToken: "0xfb98b335551a418cd0737375a2ea0ded62ea213b",
	decimals: 18
},
	"0x03ab458634910aad20ef5f1c8ee96f1d6ac54919": {
	childToken: "0x97cd1cfe2ed5712660bb6c14053c0ecb031bff7d",
	decimals: 18
},
	"0x853d955acef822db058eb8505911ed77f175b99e": {
	childToken: "0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64",
	decimals: 18
},
	"0xe803178b48a0e560c2b19f3b3d4e504f79d229ce": {
	childToken: "0x590eb2920486486c2d9bb3eb651f73b81df87bcf",
	decimals: 18
},
	"0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0": {
	childToken: "0x214db107654ff987ad859f34125307783fc8e387",
	decimals: 18
},
	"0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6": {
	childToken: "0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
	decimals: 18
},
	"0xe0ad1806fd3e7edf6ff52fdb822432e847411033": {
	childToken: "0x3d8f74620857dd8ed6d0da02ceb13fd0ed8ba678",
	decimals: 18
},
	"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
	childToken: "0x50b7545627a5162f82a992c33b87adc75187b218",
	decimals: 8
},
	"0x3301ee63fb29f863f2333bd4466acb46cd8323e6": {
	childToken: "0xcaf5191fc480f43e4df80106c7695eca56e48b18",
	decimals: 18
},
	"0x5aa158404fed6b4730c13f49d3a7f820e14a636f": {
	childToken: "0xc685e8eddc9f078666794cbfcd8d8351bac404ef",
	decimals: 18
},
	"0x0000000000085d4780b73119b644ae5ecd22b376": {
	childToken: "0x1c20e891bab6b1727d14da358fae2984ed9b59eb",
	decimals: 18
},
	"0x4691937a7508860f876c9c0a2a617e7d9e945d4b": {
	childToken: "0xabc9547b534519ff73921b1fba6e672b5f58d083",
	decimals: 18
},
	"0xc00e94cb662c3520282e6f5717214004a7f26888": {
	childToken: "0xc3048e19e76cb9a3aa9d77d8c03c29fc906e2437",
	decimals: 18
},
	"0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2": {
	childToken: "0x88128fd4b259552a9a1d457f435a6527aab72d42",
	decimals: 18
},
	"0x090185f2135308bad17527004364ebcc2d37e5f6": {
	childToken: "0xce1bffbd5374dac86a2893119683f4911a2f7814",
	decimals: 18
},
	"0xcc4304a31d09258b0029ea7fe63d032f52e44efe": {
	childToken: "0xc7b5d72c836e718cda8888eaf03707faef675079",
	decimals: 18
},
	"0xd3ac016b1b8c80eeadde4d186a9138c9324e4189": {
	childToken: "0xd3ac016b1b8c80eeadde4d186a9138c9324e4189",
	decimals: 18
},
	"0xb2cabf797bc907b049e4ccb5b84d13be3a8cfc21": {
	childToken: "0x00ee200df31b869a321b10400da10b561f3ee60d",
	decimals: 18
},
	"0x6f9c26fa731c7ea4139fa669962cf8f1ce6c8b0b": {
	childToken: "0x2c69095d81305f1e3c6ed372336d407231624cea",
	decimals: 18
},
	"0xcdb37a4fbc2da5b78aa4e41a432792f9533e85cc": {
	childToken: "0x0cbd6fadcf8096cc9a43d90b45f65826102e3ece",
	decimals: 18
},
	"0xa64d5d1eb67748226d84812b45711453f1118c32": {
	childToken: "0xc11bf915db4b43714bc8d32bf83bf5ea53d40981",
	decimals: 9
},
	"0x9ed7e4b1bff939ad473da5e7a218c771d1569456": {
	childToken: "0x9ed7e4b1bff939ad473da5e7a218c771d1569456",
	decimals: 6
},
	"0x188fb5f5ae5bbe4154d5778f2bbb2fb985c94d25": {
	childToken: "0xccf719c44e2c36e919335692e89d22cf13d6aaeb",
	decimals: 18
},
	"0x499568c250ab2a42292261d6121525d70691894b": {
	childToken: "0xa5acfeca5270bc9768633fbc86caa959b85ec8b7",
	decimals: 18
},
	"0x45fdb1b92a649fb6a64ef1511d3ba5bf60044838": {
	childToken: "0xab05b04743e0aeaf9d2ca81e5d3b8385e4bf961e",
	decimals: 18
},
	"0x7778360f035c589fce2f4ea5786cbd8b36e5396b": {
	childToken: "0x0ebd9537a25f56713e34c45b38f421a1e7191469",
	decimals: 18
},
	"0x1d7ca62f6af49ec66f6680b8606e634e55ef22c1": {
	childToken: "0xf44fb887334fa17d2c5c0f970b5d320ab53ed557",
	decimals: 18
},
	"0xf99d58e463a2e07e5692127302c20a191861b4d6": {
	childToken: "0xb44a9b6905af7c801311e8f4e76932ee959c663c",
	decimals: 18
},
	"0x9fda7ceec4c18008096c2fe2b85f05dc300f94d0": {
	childToken: "0x595c8481c48894771ce8fade54ac6bf59093f9e8",
	decimals: 18
},
	"0x8bbf1dccbedd5c70d8e793d432fb56b848dd1698": {
	childToken: "0x938fe3788222a74924e062120e7bfac829c719fb",
	decimals: 18
},
	"0x3405a1bd46b85c5c029483fbecf2f3e611026e45": {
	childToken: "0xa384bc7cdc0a93e686da9e7b8c0807cd040f4e0b",
	decimals: 18
},
	"0x16ba8efe847ebdfef99d399902ec29397d403c30": {
	childToken: "0x937e077abaea52d3abf879c9b9d3f2ebd15baa21",
	decimals: 18
},
	"0x55af5865807b196bd0197e0902746f31fbccfa58": {
	childToken: "0xbd83010eb60f12112908774998f65761cf9f6f9a",
	decimals: 18
},
	"0x9fb83c0635de2e815fd1c21b3a292277540c2e8d": {
	childToken: "0x73178fceb736a9d6c1a9ef1fe413f09cba2d4a68",
	decimals: 18
},
	"0x45c2f8c9b4c0bdc76200448cc26c48ab6ffef83f": {
	childToken: "0xfc6da929c031162841370af240dec19099861d3b",
	decimals: 18
},
	"0xbd100d061e120b2c67a24453cf6368e63f1be056": {
	childToken: "0xbd100d061e120b2c67a24453cf6368e63f1be056",
	decimals: 18
},
	"0xe57425f1598f9b0d6219706b77f4b3da573a3695": {
	childToken: "0xb355f4f4cc84a9429a59d5c2b98d77016f7ec482",
	decimals: 18
},
	"0xa693b19d2931d498c5b318df961919bb4aee87a5": {
	childToken: "0xb599c3590f42f8f995ecfa0f85d2980b76862fc1",
	decimals: 6
},
	"0x9b17baadf0f21f03e35249e0e59723f34994f806": {
	childToken: "0xdebb1d6a2196f2335ad51fbde7ca587205889360",
	decimals: 18
},
	"0xee9801669c6138e84bd50deb500827b776777d28": {
	childToken: "0xee9801669c6138e84bd50deb500827b776777d28",
	decimals: 18
},
	"0xf655c8567e0f213e6c634cd2a68d992152161dc6": {
	childToken: "0x089d3daf549f99553c2182db24bc4336a4f0c824",
	decimals: 18
},
	"0x19193f450086d0442157b852081976d41657ad56": {
	childToken: "0x771c01e1917b5ab5b791f7b96f0cd69e22f6dbcf",
	decimals: 18
},
	"0xc17c30e98541188614df99239cabd40280810ca3": {
	childToken: "0xc17c30e98541188614df99239cabd40280810ca3",
	decimals: 18
},
	"0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6": {
	childToken: "0xb514cabd09ef5b169ed3fe0fa8dbd590741e81c2",
	decimals: 18
},
	"0x9767203e89dcd34851240b3919d4900d3e5069f1": {
	childToken: "0x9767203e89dcd34851240b3919d4900d3e5069f1",
	decimals: 6
},
	"0x7a5d3a9dcd33cb8d527f7b5f96eb4fef43d55636": {
	childToken: "0x02bfd11499847003de5f0f5aa081c43854d48815",
	decimals: 18
},
	"0x5f018e73c185ab23647c82bd039e762813877f0e": {
	childToken: "0x9ad274e20a153451775ff29d546949a254c4a1bc",
	decimals: 18
},
	"0x18a1ea69a50a85752b7bc204a2c45a95ce6e429d": {
	childToken: "0xf30c5083a1479865c9a8916dec6ddadd82e8907b",
	decimals: 18
},
	"0x88536c9b2c4701b8db824e6a16829d5b5eb84440": {
	childToken: "0xb0a8e082e5f8d2a04e74372c1be47737d85a0e73",
	decimals: 9
},
	"0xeeeeeb57642040be42185f49c52f7e9b38f8eeee": {
	childToken: "0xeeeeeb57642040be42185f49c52f7e9b38f8eeee",
	decimals: 18
},
	"0x35609dc59e15d03c5c865507e1348fa5abb319a8": {
	childToken: "0x0b53b5da7d0f275c31a6a182622bdf02474af253",
	decimals: 8
},
	"0x57b59f981730c6257df57cf6f0d98283749a9eeb": {
	childToken: "0x5f018e73c185ab23647c82bd039e762813877f0e",
	decimals: 18
},
	"0x8d6cebd76f18e1558d4db88138e2defb3909fad6": {
	childToken: "0x3b55e45fd6bd7d4724f5c47e0d1bcaedd059263e",
	decimals: 18
},
	"0x3b79a28264fc52c7b4cea90558aa0b162f7faf57": {
	childToken: "0x0da67235dd5787d67955420c84ca1cecd4e5bb3b",
	decimals: 18
},
	"0x967fb0d760ed3ce53afe2f0a071674cccae73550": {
	childToken: "0x31c994ac062c1970c086260bc61babb708643fac",
	decimals: 18
}
};

var AvalancheMappingProvider = /*#__PURE__*/function () {
  function AvalancheMappingProvider() {}

  var _proto = AvalancheMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = avaxMappings;
              return _context.abrupt("return", tokens);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return AvalancheMappingProvider;
}();

var baseGoerliTokenListURL$1 = 'https://raw.githubusercontent.com/' + 'ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json';
/**
 * The Base Goerli mapping (linked above) is manually maintained by the Coinbase team
 * in this repository: https://github.com/ethereum-optimism/ethereum-optimism.github.io.
 */

var BaseGoerliMappingProvider = /*#__PURE__*/function () {
  function BaseGoerliMappingProvider() {}

  var _proto = BaseGoerliMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens, allTokens, opTokenId_baseGoerliAddressMap;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = {};
              _context.next = 3;
              return getTokenList(baseGoerliTokenListURL$1);

            case 3:
              allTokens = _context.sent;
              opTokenId_baseGoerliAddressMap = {};
              allTokens.tokens.forEach(function (token) {
                if (token.chainId === ChainId.BASE_GOERLI) {
                  var _token$extensions;

                  if (typeof ((_token$extensions = token.extensions) == null ? void 0 : _token$extensions.opTokenId) === 'string') {
                    opTokenId_baseGoerliAddressMap[token.extensions.opTokenId] = token.address;
                  }
                }
              });
              allTokens.tokens.forEach(function (token) {
                var _token$extensions2;

                if (token.chainId === ChainId.MAINNET && typeof ((_token$extensions2 = token.extensions) == null ? void 0 : _token$extensions2.opTokenId) === 'string' && token.extensions.opTokenId in opTokenId_baseGoerliAddressMap) {
                  tokens[token.address.toLowerCase()] = opTokenId_baseGoerliAddressMap[token.extensions.opTokenId];
                }
              });
              return _context.abrupt("return", tokens);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return BaseGoerliMappingProvider;
}();

var baseGoerliTokenListURL = 'https://raw.githubusercontent.com/' + 'ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json';
/**
 * The Base mapping (linked above) is manually maintained by the Coinbase team
 * in this repository: https://github.com/ethereum-optimism/ethereum-optimism.github.io.
 */

var BaseMappingProvider = /*#__PURE__*/function () {
  function BaseMappingProvider() {}

  var _proto = BaseMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens, allTokens, opTokenId_baseAddressMap;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = {};
              _context.next = 3;
              return getTokenList(baseGoerliTokenListURL);

            case 3:
              allTokens = _context.sent;
              opTokenId_baseAddressMap = {};
              allTokens.tokens.forEach(function (token) {
                if (token.chainId === ChainId.BASE) {
                  var _token$extensions;

                  if (typeof ((_token$extensions = token.extensions) == null ? void 0 : _token$extensions.opTokenId) === 'string') {
                    opTokenId_baseAddressMap[token.extensions.opTokenId] = token.address;
                  }
                }
              });
              allTokens.tokens.forEach(function (token) {
                var _token$extensions2;

                if (token.chainId === ChainId.MAINNET && typeof ((_token$extensions2 = token.extensions) == null ? void 0 : _token$extensions2.opTokenId) === 'string' && token.extensions.opTokenId in opTokenId_baseAddressMap) {
                  tokens[token.address.toLowerCase()] = opTokenId_baseAddressMap[token.extensions.opTokenId];
                }
              });
              return _context.abrupt("return", tokens);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return BaseMappingProvider;
}();

var celoMappings = {
	"0xdac17f958d2ee523a2206206994597c13d831ec7": {
	childToken: "0x617f3112bf5397D0467D315cC709EF968D9ba546",
	decimals: 18
},
	"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": {
	childToken: "0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF",
	decimals: 18
},
	"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": {
	childToken: "0xb829b68f57CC546dA7E5806A929e53bE32a4625D",
	decimals: 18
},
	"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
	childToken: "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd",
	decimals: 6
}
};

var CeloMappingProvider = /*#__PURE__*/function () {
  function CeloMappingProvider() {}

  var _proto = CeloMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", celoMappings);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return CeloMappingProvider;
}();

var web3 = /*#__PURE__*/new Web3__default["default"](); // chains we support fetching mappings for (can be different than the l2ChainIds arg for buildList)

var CHAINS_WITH_MAPPING_PROVIDERS = [ChainId.ARBITRUM_ONE, ChainId.POLYGON, ChainId.OPTIMISM, ChainId.BNB, ChainId.AVALANCHE, ChainId.CELO, ChainId.BASE, ChainId.BASE_GOERLI];
function buildList(_x, _x2) {
  return _buildList.apply(this, arguments);
} // using a symbol lookup contract call to check whether the token exists on the L2

function _buildList() {
  _buildList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(l2ChainIds, l1TokenList) {
    var multiChainedTokens, chainIdToMappingsMap, _loop, _iterator, _step, tokenList;

    return _regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            multiChainedTokens = [];
            _context3.next = 3;
            return generateTokenMappings(l2ChainIds, l1TokenList);

          case 3:
            chainIdToMappingsMap = _context3.sent;
            _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
              var l1Token, chainIdToChildTokenDetailsMap, l2MappingExtension;
              return _regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      l1Token = _step.value;

                      if (!(l1Token.chainId === ChainId.MAINNET)) {
                        _context2.next = 7;
                        break;
                      }

                      chainIdToChildTokenDetailsMap = {};
                      l2MappingExtension = {
                        extensions: {
                          bridgeInfo: {}
                        }
                      }; // build out the extensions.bridgeInfo data containing mappings for each L2 chain

                      _context2.next = 6;
                      return Promise.all(l2ChainIds.map( /*#__PURE__*/function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(chainId) {
                          return _regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return getChildTokenDetails(l1Token, chainId, chainIdToMappingsMap);

                                case 2:
                                  chainIdToChildTokenDetailsMap[chainId] = _context.sent;

                                  if (chainIdToChildTokenDetailsMap[chainId].childTokenValid) {
                                    l2MappingExtension.extensions.bridgeInfo[chainId] = {
                                      tokenAddress: chainIdToChildTokenDetailsMap[chainId].childTokenAddress
                                    };
                                  }

                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x10) {
                          return _ref.apply(this, arguments);
                        };
                      }()));

                    case 6:
                      // build the TokenInfo objects with bridgeInfo extension
                      l2ChainIds.concat([ChainId.MAINNET]).forEach(function (chainId) {
                        if (chainId === ChainId.MAINNET || chainIdToChildTokenDetailsMap[chainId].childTokenValid) {
                          var _chainIdToChildTokenD, _bridgeInfo;

                          var tokenInfo = chainId === ChainId.MAINNET ? _extends({}, l1Token, {
                            extensions: Object.keys(l2MappingExtension.extensions.bridgeInfo).length > 0 ? {
                              bridgeInfo: l2MappingExtension.extensions.bridgeInfo
                            } : undefined
                          }) : _extends({}, l1Token, {
                            decimals: (_chainIdToChildTokenD = chainIdToChildTokenDetailsMap[chainId].decimals) != null ? _chainIdToChildTokenD : l1Token.decimals,
                            chainId: chainId,
                            address: chainIdToChildTokenDetailsMap[chainId].childTokenAddress,
                            extensions: {
                              bridgeInfo: (_bridgeInfo = {}, _bridgeInfo[ChainId.MAINNET] = {
                                tokenAddress: ethers.ethers.utils.getAddress(l1Token.address)
                              }, _bridgeInfo)
                            }
                          });
                          multiChainedTokens.push(tokenInfo);
                        }
                      });

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop);
            });
            _iterator = _createForOfIteratorHelperLoose(l1TokenList.tokens);

          case 6:
            if ((_step = _iterator()).done) {
              _context3.next = 10;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 8);

          case 8:
            _context3.next = 6;
            break;

          case 10:
            // build and return final chainified token list
            tokenList = {
              name: "(ChainIds: " + l2ChainIds + ") " + l1TokenList.name,
              timestamp: new Date().toISOString(),
              version: l1TokenList.version,
              tokens: multiChainedTokens.sort(compareTokenInfos)
            };
            return _context3.abrupt("return", tokenList);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _buildList.apply(this, arguments);
}

function hasExistingTokenContract(_x3, _x4) {
  return _hasExistingTokenContract.apply(this, arguments);
}

function _hasExistingTokenContract() {
  _hasExistingTokenContract = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(address, chainId) {
    var contract;
    return _regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            web3.setProvider(getRpcUrl(chainId));
            _context4.prev = 1;
            contract = new web3.eth.Contract(abi, address);
            _context4.next = 5;
            return getTokenSymbolFromContract(contract);

          case 5:
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", false);

          case 10:
            return _context4.abrupt("return", true);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return _hasExistingTokenContract.apply(this, arguments);
}

function getMappingProvider(chainId, l1TokenList) {
  switch (chainId) {
    case ChainId.ARBITRUM_ONE:
      return new ArbitrumMappingProvider(l1TokenList);

    case ChainId.OPTIMISM:
      return new OptimismMappingProvider();

    case ChainId.POLYGON:
      return new PolygonMappingProvider();

    case ChainId.BNB:
      return new BnbMappingProvider();

    case ChainId.AVALANCHE:
      return new AvalancheMappingProvider();

    case ChainId.CELO:
      return new CeloMappingProvider();

    case ChainId.BASE:
      return new BaseMappingProvider();

    case ChainId.BASE_GOERLI:
      return new BaseGoerliMappingProvider();

    default:
      throw new Error("Chain " + chainId + " not supported for fetching mappings.");
  }
}

function generateTokenMappings(_x5, _x6) {
  return _generateTokenMappings.apply(this, arguments);
} // handles both string and object cases for childToken (Polygon mappings return object)


function _generateTokenMappings() {
  _generateTokenMappings = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(chainIds, l1TokenList) {
    var chainIdToMappingsMap, _iterator2, _step2, chainId;

    return _regeneratorRuntime.wrap(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            chainIdToMappingsMap = {};
            _iterator2 = _createForOfIteratorHelperLoose(chainIds);

          case 2:
            if ((_step2 = _iterator2()).done) {
              _context5.next = 10;
              break;
            }

            chainId = _step2.value;

            if (!CHAINS_WITH_MAPPING_PROVIDERS.includes(chainId)) {
              _context5.next = 8;
              break;
            }

            _context5.next = 7;
            return getMappingProvider(chainId, l1TokenList).provide();

          case 7:
            chainIdToMappingsMap[chainId] = _context5.sent;

          case 8:
            _context5.next = 2;
            break;

          case 10:
            return _context5.abrupt("return", chainIdToMappingsMap);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee4);
  }));
  return _generateTokenMappings.apply(this, arguments);
}

function getChildTokenDetails(_x7, _x8, _x9) {
  return _getChildTokenDetails.apply(this, arguments);
}

function _getChildTokenDetails() {
  _getChildTokenDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(l1Token, chainId, chainIdToMappingsMap) {
    var _l1Token$extensions;

    var bridgeInfo, existingMapping, bridgeInfoForChain, childToken, childTokenAddress, childTokenValid, decimals;
    return _regeneratorRuntime.wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            bridgeInfo = l1Token == null ? void 0 : (_l1Token$extensions = l1Token.extensions) == null ? void 0 : _l1Token$extensions.bridgeInfo;

            if (bridgeInfo && typeof bridgeInfo === 'object') {
              bridgeInfoForChain = bridgeInfo[chainId];

              if (bridgeInfoForChain && typeof bridgeInfoForChain === 'object') {
                existingMapping = bridgeInfoForChain.tokenAddress;
              }
            } // use the externally fetched mappings if manual entry doesn't exist for the token/chain mapping
            // and the given chain is supported for fetching mappings


            if (!(CHAINS_WITH_MAPPING_PROVIDERS.includes(chainId) && existingMapping === undefined)) {
              _context6.next = 15;
              break;
            }

            childToken = chainIdToMappingsMap[chainId][l1Token.address.toLowerCase()];
            childTokenAddress = childToken ? ethers.ethers.utils.getAddress(typeof childToken === 'object' ? childToken.childToken : childToken) : undefined;
            _context6.t0 = Boolean;
            _context6.t1 = childTokenAddress;

            if (!_context6.t1) {
              _context6.next = 11;
              break;
            }

            _context6.next = 10;
            return hasExistingTokenContract(childTokenAddress, chainId);

          case 10:
            _context6.t1 = _context6.sent;

          case 11:
            _context6.t2 = _context6.t1;
            childTokenValid = (0, _context6.t0)(_context6.t2);
            decimals = childToken && (chainId === ChainId.BNB || chainId === ChainId.AVALANCHE || chainId === ChainId.CELO) ? childToken.decimals : undefined;
            return _context6.abrupt("return", {
              childTokenValid: childTokenValid,
              childTokenAddress: childTokenAddress,
              decimals: decimals
            });

          case 15:
            return _context6.abrupt("return", {
              childTokenValid: !!existingMapping,
              childTokenAddress: existingMapping
            });

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5);
  }));
  return _getChildTokenDetails.apply(this, arguments);
}

/**
 * Verifies that for each token with extensions.bridgeInfo defined, for every
 * chainId there exists a token with that chainId at the root-level of the
 * token list.
 *
 * @returns input TokenList if valid, throws otherwise
 */
function verifyExtensions(tokenList) {
  var _loop = function _loop() {
    var _token$extensions;

    var token = _step.value;
    if (!((_token$extensions = token.extensions) != null && _token$extensions.bridgeInfo)) return "continue"; // if has extension, make sure that:
    // 1/ other token has root-level entry
    // 2/ other root entry has extension pointing to it

    var _loop2 = function _loop2() {
      var _destToken$extensions;

      var destChainId = _Object$keys[_i];
      var destTokens = tokenList.tokens.filter(function (t) {
        return t.chainId === Number(destChainId) && t.address === // @ts-expect-error TokenList schema does not allow bridgeInfo objetcs yet
        token.extensions.bridgeInfo[destChainId].tokenAddress;
      });

      if (destTokens.length > 1) {
        throw new Error("TokenList has duplicate root-level tokens for " + token.symbol + " " + token.chainId);
      }

      var destToken = destTokens[0];

      if (!destToken) {
        throw new Error("TokenList is missing root-level TokenInfo for " + token.symbol + " " + token.chainId);
      } // ensure destToken has an extension pointing back to this


      var srcToken = // @ts-expect-error TokenList schema does not allow bridgeInfo objects yet
      (_destToken$extensions = destToken.extensions) == null ? void 0 : _destToken$extensions.bridgeInfo[token.chainId];

      if (!srcToken) {
        throw new Error("TokenList is missing root-level TokenInfo.extensions.bridgeInfo for " + token.symbol + " " + token.chainId);
      }

      if (srcToken.tokenAddress !== token.address) {
        throw new Error("TokenList has invalid root-level TokenInfo.extensions.bridgeInfo for " + token.symbol + " " + token.chainId + ". Expected " + token.address + " but got " + srcToken.tokenAddress);
      }
    };

    for (var _i = 0, _Object$keys = Object.keys(token.extensions.bridgeInfo); _i < _Object$keys.length; _i++) {
      _loop2();
    }
  };

  for (var _iterator = _createForOfIteratorHelperLoose(tokenList.tokens), _step; !(_step = _iterator()).done;) {
    var _ret = _loop();

    if (_ret === "continue") continue;
  }

  return tokenList;
}

/**
 * Adds bridgeInfo to the given token list for Optimism, Polygon and Arbitrum.
 * @param l1TokenListOrPathOrUrl
 * @returns TokenList with l2 bridgeInfo filled
 */

function chainify(_x) {
  return _chainify.apply(this, arguments);
}
/**
 * Given a network and a TokenList, returns the TokenList with `extensions` filled.
 * @param l2ChainIds layer 2 chainIds to operate on
 * @param l1TokenListOrPathOrUrl either an L1 TokenList object or a path/url to a TokenList
 * @returns L1 TokenList with `extensions` filled for the given network
 */

function _chainify() {
  _chainify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(l1TokenListOrPathOrUrl) {
    var l1TokenList, l2Chains, chainified, merged;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getTokenList(l1TokenListOrPathOrUrl);

          case 2:
            l1TokenList = _context.sent;
            l2Chains = [ChainId.POLYGON, ChainId.ARBITRUM_ONE, ChainId.OPTIMISM, ChainId.CELO, ChainId.BNB, ChainId.AVALANCHE, ChainId.BASE, ChainId.BASE_GOERLI];
            _context.next = 6;
            return chainifyTokenList(l2Chains, l1TokenListOrPathOrUrl);

          case 6:
            chainified = _context.sent;
            merged = mergeTokenLists(l1TokenList, // providing l1 first to make sure duplicated tokens resolve to this list
            chainified);
            return _context.abrupt("return", merged);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _chainify.apply(this, arguments);
}

function chainifyTokenList(_x2, _x3) {
  return _chainifyTokenList.apply(this, arguments);
}
/** Merges two token lists, resolving conflicts to primary list. */

function _chainifyTokenList() {
  _chainifyTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(l2ChainIds, l1TokenListOrPathOrUrl) {
    var l1TokenList, tokenList;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getTokenList(l1TokenListOrPathOrUrl);

          case 3:
            l1TokenList = _context2.sent;
            _context2.next = 6;
            return buildList(l2ChainIds, l1TokenList);

          case 6:
            tokenList = _context2.sent;
            return _context2.abrupt("return", verifyExtensions(tokenList));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            throw new Error("An error occured: " + _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _chainifyTokenList.apply(this, arguments);
}

function mergeTokenLists(primary, secondary) {
  primary = lodash.cloneDeep(primary);
  secondary = lodash.cloneDeep(secondary);
  var grouped = lodash.groupBy([].concat(secondary.tokens, primary.tokens), function (t) {
    return t.chainId + "-" + t.address.toLowerCase();
  });
  var merged = Object.values(grouped).map(function (group) {
    var _merged$extensions;

    if (group.length === 1) {
      return group[0];
    }

    var merged = lodash.merge(group[0], group[1]);

    if ((_merged$extensions = merged.extensions) != null && _merged$extensions.bridgeInfo && typeof merged.extensions.bridgeInfo === 'object') {
      // remove reference to self-chain from merge
      delete merged.extensions.bridgeInfo[merged.chainId];
    }

    return merged;
  });
  return lodash.cloneDeep(_extends({}, primary, {
    tokens: merged.sort(compareTokenInfos)
  }));
}

exports.chainify = chainify;
exports.chainifyTokenList = chainifyTokenList;
exports.mergeTokenLists = mergeTokenLists;
//# sourceMappingURL=token-list-bridge-utils.cjs.development.js.map
