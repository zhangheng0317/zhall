import PluginAPI from './Service/PluginAPI';
import Service from './Service/Service';
import { ICommand, IHook } from './Service/types';

interface IPluginAPI extends PluginAPI {
  onGenerateFiles(args: () => void): void;
}
export { Service };
export { ICommand, IHook, IPluginAPI };
