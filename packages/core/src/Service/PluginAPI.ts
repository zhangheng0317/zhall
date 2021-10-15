import * as utils from '@zhall/utils';
import Service from './Service';
import { ICommand, IHook, IPlugin } from './types';
interface Options {
  id: string;
  // key: string;
  service: Service;
}

class PluginAPI {
  id: string;
  service: Service;
  utils: typeof utils;

  constructor(options: Options) {
    this.id = options.id;
    this.service = options.service;
    this.utils = utils;
  }

  registerHook(hook: IHook) {
    console.log('# 注册hooksByPluginId');
    console.log(hook, '\n');
    this.service.hooksByPluginId[this.id] = (
      this.service.hooksByPluginId[this.id] || []
    ).concat(hook);
  }

  registerCommand(command: ICommand) {
    console.log('# 注册命令');
    console.log(command, '\n');
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
}

export default PluginAPI;
