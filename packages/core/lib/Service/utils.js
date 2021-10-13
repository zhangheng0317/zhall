'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getPreset = getPreset;

function _resolve() {
  const data = _interopRequireDefault(require('resolve'));

  _resolve = function _resolve() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function getPreset(options) {
  console.log('配置插件'); // 获取插件的绝对地址

  const presets = options.presets.map((path) => {
    if (typeof path !== 'string') {
      throw new Error(
        `获取插件地址错误,必须为string.\n Plugin: ${JSON.stringify(path)}`,
      );
    }

    return _resolve().default.sync(path, {
      basedir: options.cwd,
      extensions: ['.js', '.ts'],
    });
  });
  return presets.map((path) => {
    // if(wclsin)
    return {
      id: '',
      apply: () => {},
      path: '',
    };
  });
}
