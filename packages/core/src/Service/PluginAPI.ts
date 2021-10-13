import { ICommand, IHook, IPlugin } from './types';
import Service from './Service';

interface Options {
  id: string;
  // key: string;
  service: Service;
}

class PluginAPI {
  id: string;
  service: Service;

  constructor(options: Options) {
    this.id = options.id;
    this.service = options.service;
  }

  registerHook(hook: IHook) {}

  registerCommand(command: ICommand) {}

  registerPlugin(plugin: IPlugin) {}
}

export default PluginAPI;
