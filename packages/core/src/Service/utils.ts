import { IPackage, IPlugin } from './types';
import resolve from 'resolve';
interface PresetOptions {
  cwd: string;
  pkg: IPackage;
  presets: string[];
}

export function getPreset(options: PresetOptions): IPlugin[] {
  console.log('配置插件');

  // 获取插件的绝对地址
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

  return presets.map((path) => {
    // if(wclsin)

    return {
      id: '',
      apply: () => {},
      path: '',
    };
  });
}
