import { Service } from '@zhall/core';
import { yParser } from '@zhall/utils';
import { join } from 'path';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

console.log(args, '\n');

(async function () {
  const service = new Service({
    cwd: process.cwd(),
    pkg: require(join(process.cwd(), 'package.json')),
    presets: [
      require.resolve('./plugins/commands/dev'),
      require.resolve('./plugins/generateFiles/plugin'),
      require.resolve('./plugins/generateFiles/routes'),
      require.resolve('./plugins/generateFiles/polyfill'),
      require.resolve('./plugins/generateFiles/exports'),
    ],
    plugins: [
      // { id: 'dev', apply: require('./plugins/commands/dev') },
      // { id: 'history', apply: require('./plugins/generateFiles/history') },
      // { id: 'routes', apply: require('./plugins/generateFiles/routes') },
      // { id: 'runtime', apply: require('./plugins/generateFiles/plugin') },
    ],
  });

  await service.run({ name: 'dev' });
})();
