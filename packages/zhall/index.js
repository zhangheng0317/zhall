let ex = require('./lib/index');
try {
  const zhallExports = require('@@/exports');
  ex = Object.assign(ex, zhallExports);
} catch (e) {}
module.exports = ex;
