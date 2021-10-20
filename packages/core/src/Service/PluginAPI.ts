import * as utils from '@zhall/utils';
import Service from './Service';
import { ICommand, IHook, IPlugin } from '../types';
import { getPaths } from './utils';

const { chalk, fs, path } = utils;

interface IOpts {
  id: string;
  // key: string;
  service: Service;
}

class PluginAPI {
  id: string;
  service: Service;
  utils: typeof utils;

  constructor(opts: IOpts) {
    this.id = opts.id;
    this.service = opts.service;
    this.utils = utils;
  }

  registerHook(hook: IHook) {
    // console.log('# 注册hooksByPluginId');
    // console.log(hook, '\n');
    this.service.hooksByPluginId[this.id] = (
      this.service.hooksByPluginId[this.id] || []
    ).concat(hook);
  }

  registerCommand(command: ICommand) {
    // console.log('# 注册命令');
    // console.log(command, '\n');
    this.service.commands[command.name] = command;
  }

  registerPlugin(plugin: IPlugin) {
    console.log('# 注册插件');
    console.log(plugin, '\n');
  }

  onGenerateFiles(fn: () => Promise<void>) {
    this.registerHook({
      pluginId: this.id,
      key: 'onGenerateFiles',
      fn,
    });
  }

  writeTmpFile(opts: { path: string; content: string }) {
    const { absTmpPath, tmpDir } = getPaths();

    const absPath = path.join(absTmpPath, opts.path);
    if (!fs.existsSync(path.dirname(absPath))) {
      console.log(chalk.gray(`# 创建文件夹 ${path.dirname(absPath)}`));
      // rimraf.sync(path.dirname(absPath));
      fs.mkdirSync(path.dirname(absPath));
    }
    console.log(chalk.gray(`# 写入文件 ${absPath}`));
    fs.writeFileSync(absPath, opts.content, 'utf-8');
  }
}

export default PluginAPI;
