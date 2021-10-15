import { IPackage, IPlugin } from './types';
import resolve from 'resolve';
import { winPath } from '@zhall/utils';
interface PresetOptions {
  cwd: string;
  pkg: IPackage;
  presets: string[];
}

export function getPreset(options: PresetOptions): IPlugin[] {
  const presets = options.presets.map((path) => {
    if (typeof path !== 'string') {
      throw new Error(
        `获取插件地址错误,必须为string.\n Plugin: ${JSON.stringify(path)}`,
      );
    }
    return resolve.sync(path, {
      basedir: options.cwd,
      extensions: ['.js', '.ts'],
    });
  });

  return presets.map((path) => ({
    id: winPath(path).replace(/\.js$/, ''),
    path: winPath(path),
    apply: require(path).default,
  }));
}
