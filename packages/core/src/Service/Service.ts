import { EventEmitter } from 'events';
import { AsyncParallelHook } from 'tapable';
import Config from '../Config/Config';
import { ICommand, IConfig, IHook, IPackage, IPlugin, IPreset } from '../types';
import PluginAPI from './PluginAPI';
import { getPlugins } from './utils';

interface IServiceOpts {
  cwd: string;
  pkg: IPackage;
  presets: string[];
  plugins: string[];
}

class Service extends EventEmitter {
  cwd: string;
  pkg: IPackage;
  // commands
  commands: { [name: string]: ICommand } = {};
  // presets
  presets: IPreset[];
  // plugins
  plugins: IPlugin[] = [];
  // plugin methods
  pluginMethods: { [name: string]: Function } = {};

  // hooks
  hooks: { [key: string]: IHook[] } = {};
  hooksByPluginId: { [id: string]: IHook[] } = {};
  // config
  // userConfig: IConfig;
  contig: IConfig | null = null;
  userConfig: IConfig;

  constructor(opts: IServiceOpts) {
    super();

    // console.log('options:\n', opts);
    this.cwd = opts.cwd || process.cwd();
    this.pkg = opts.pkg;

    console.log('# 获取配置');
    const configInstance = new Config({
      cwd: this.cwd,
      service: this,
    });
    this.userConfig = configInstance.getUserConfig();
    console.log(this.userConfig);

    this.presets = getPlugins({
      cwd: this.cwd,
      pkg: this.pkg,
      plugins: opts.presets || [],
    });
    // console.log('# 预设插件');
    // console.log(this.presets, '\n');

    this.plugins = getPlugins({
      cwd: this.cwd,
      pkg: this.pkg,
      plugins: opts.plugins || [],
    });
    // console.log('# 额外插件');
    // console.log(this.plugins, '\n');
  }

  async init() {
    // initPresets
    for (let preset of this.presets) {
      const api = new PluginAPI({ id: preset.id, service: this });
      preset.apply(api);
    }

    // initPlugins
    for (let plugin of this.plugins) {
      const api = new PluginAPI({ id: plugin.id, service: this });
      plugin.apply(api);
    }

    // initHooks
    Object.keys(this.hooksByPluginId).forEach((id) => {
      const hooks = this.hooksByPluginId[id];
      hooks.forEach((hook) => {
        const { key } = hook;
        hook.pluginId = id;
        this.hooks[key] = (this.hooks[key] || []).concat(hook);
      });
    });
    // console.log('# hooks');
    // console.log(this.hooks, '\n');

    //
  }

  async applyPlugins(opts: { key: string }) {
    const hooks = this.hooks[opts.key] || [];
    const tEvent = new AsyncParallelHook(['_']);
    for (const hook of hooks) {
      tEvent.tapPromise({ name: hook.pluginId! }, hook.fn);
    }
    return await tEvent.promise('');
  }

  async run(opts: { name: string }) {
    await this.init();
    return this.runCommand(opts);
  }

  async runCommand(opts: { name: string }) {
    if (!opts.name) opts.name = 'help';
    const command = this.commands[opts.name];
    return command.fn();
  }
}

export default Service;
