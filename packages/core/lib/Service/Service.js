'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

function _events() {
  const data = require('events');

  _events = function _events() {
    return data;
  };

  return data;
}

var _PluginAPI = _interopRequireDefault(require('./PluginAPI'));

var _utils = require('./utils');

function _tapable() {
  const data = require('tapable');

  _tapable = function _tapable() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

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
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

class Service extends _events().EventEmitter {
  // commands
  // presets
  // plugins
  // plugin methods
  // initialPresets: IPreset[];
  // initialPlugins: IPlugin[];
  // hooks
  // config
  // userConfig: IConfig;
  constructor(options) {
    super();
    this.cwd = void 0;
    this.pkg = void 0;
    this.commands = {};
    this.presets = void 0;
    this.plugins = [];
    this.pluginMethods = {};
    this.hooks = {};
    this.hooksByPluginId = {};
    this.contig = null;
    console.log('options:\n', options);
    this.cwd = options.cwd || process.cwd();
    this.pkg = options.pkg;
    this.presets = (0, _utils.getPreset)({
      cwd: this.cwd,
      pkg: this.pkg,
      presets: options.presets || [],
    }); // this.plugins = options.plugins;
  }

  init() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // initPresets
      var _iterator = _createForOfIteratorHelper(_this.presets),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          let preset = _step.value;
          const api = new _PluginAPI.default({
            id: preset.id,
            service: _this,
          });
          preset.apply(api);
        } // initPlugins
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(_this.plugins),
        _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          let plugin = _step2.value;
          const api = new _PluginAPI.default({
            id: plugin.id,
            service: _this,
          });
          plugin.apply(api);
        } // initHooks
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      Object.keys(_this.hooksByPluginId).forEach((id) => {
        const hooks = _this.hooksByPluginId[id];
        hooks.forEach((hook) => {
          const key = hook.key;
          hook.pluginId = id;
          _this.hooks[key] = (_this.hooks[key] || []).concat(hook);
        });
      }); //
    })();
  }

  applyPlugins(opts) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const hooks = _this2.hooks[opts.key] || [];
      const tEvent = new (_tapable().AsyncParallelHook)(['_']);

      var _iterator3 = _createForOfIteratorHelper(hooks),
        _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          const hook = _step3.value;
          tEvent.tapPromise(
            {
              name: hook.pluginId,
            },
            hook.fn,
          );
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return yield tEvent.promise('');
    })();
  }

  run(opts) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.init();
      return _this3.runCommand(opts);
    })();
  }

  runCommand(opts) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const command = _this4.commands[opts.name];
      return command.fn();
    })();
  }
}

var _default = Service;
exports.default = _default;
