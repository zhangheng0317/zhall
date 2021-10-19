import Config from './Config/Config';
import Route from './Route/Route';
import Server from './Server/Server';
import PluginAPI from './Service/PluginAPI';
import Service from './Service/Service';
import { ICommand, IConfig, IHook, IRoute } from './types';

interface IPluginAPI extends PluginAPI {
  cwd: typeof Service.prototype.cwd;
  config: IConfig;
  onGenerateFiles(args: () => void): void;
}
export { Config, Route, Server, Service };
export type { ICommand, IConfig, IHook, IPluginAPI, IRoute };
