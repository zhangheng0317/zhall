'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

class PluginAPI {
  constructor(options) {
    this.id = void 0;
    this.service = void 0;
    this.id = options.id;
    this.service = options.service;
  }

  registerHook(hook) {}

  registerCommand(command) {}

  registerPlugin(plugin) {}
}

var _default = PluginAPI;
exports.default = _default;
