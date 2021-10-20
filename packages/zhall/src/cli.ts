import { Service } from '@zhall/core';
import { chalk, yParser } from '@zhall/utils';
import { join } from 'path';

/**
 * zhall [args]
 * -v -version
 */
const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

console.log(args, '\n');

if (args.version) {
  const version = require('../package.json').version;
  console.log(`${chalk.gray('zhall')} ${version}`);
  process.exit(0);
}
if (!args._[0]) {
  console.log(`
${chalk.red('请使用zhall [command] [options]命令格式')}
${chalk.gray(`
command:
  dev        开启服务
  generate   生成临时文件

options:
  -v --version 查看版本
`)}`);
  process.exit(1);
}

(async function () {
  const name = args._[0];
  if (name === 'build') {
    process.env.NODE_ENV = 'production';
  }
  const service = new Service({
    cwd: process.cwd(),
    pkg: require(join(process.cwd(), 'package.json')),
    presets: [
      require.resolve('./presets/commands/dev'),
      require.resolve('./presets/commands/generate'),
      require.resolve('./presets/generateFiles/plugin'),
      require.resolve('./presets/generateFiles/routes'),
      require.resolve('./presets/generateFiles/polyfill'),
      require.resolve('./presets/generateFiles/exports'),
    ],
    plugins: [],
  });

  await service.run({ name });
})();
