// import { Service } from '@zhall/core';
import { yParser } from '@zhall/utils';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

console.log(args);

// (async function () {
//   const service = new Service({
//     /**
//      * 插件标准定义
//      * {id:插件名,apply:插件函数}
//      */
//     plugins: [
//       { id: 'dev', apply: require('./plugins/commands/dev') },
//       { id: 'history', apply: require('./plugins/generateFiles/history') },
//       { id: 'routes', apply: require('./plugins/generateFiles/routes') },
//       { id: 'runtime', apply: require('./plugins/generateFiles/plugin') },
//     ],
//   });

//   await service.run({ name: 'dev' });
// })();
