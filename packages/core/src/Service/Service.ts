import { EventEmitter } from 'events';
import PluginAPI from './PluginAPI';
import { ICommand, IConfig, IHook, IPackage, IPlugin, IPreset } from './types';
import { getPreset } from './utils';
import { AsyncParallelHook } from 'tapable';

interface IServiceOptions {
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

  // initialPresets: IPreset[];
  // initialPlugins: IPlugin[];

  // hooks
  hooks: { [key: string]: IHook[] } = {};
  hooksByPluginId: { [id: string]: IHook[] } = {};
  // config
  // userConfig: IConfig;
  contig: IConfig | null = null;

  constructor(options: IServiceOptions) {
    super();

    console.log('options:\n', options);
    this.cwd = options.cwd || process.cwd();
    this.pkg = options.pkg;

    this.presets = getPreset({
      cwd: this.cwd,
      pkg: this.pkg,
      presets: options.presets || [],
    });
    // this.plugins = options.plugins;
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
    const command = this.commands[opts.name];
    return command.fn();
  }
}

export default Service;