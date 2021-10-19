import { IPackage, IPlugin } from '../types';
import resolve from 'resolve';
import { winPath } from '@zhall/utils';
import { join } from 'path';

interface PresetOptions {
  cwd: string;
  pkg: IPackage;
  plugins: string[];
}

export function getPlugins(options: PresetOptions): IPlugin[] {
  const plugins = options.plugins.map((path) => {
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

  return plugins.map((path) => ({
    id: winPath(path).replace(/\.js$/, ''),
    path: winPath(path),
    apply: require(path).default,
  }));
}

// 获取当前的工作路径
const cwd = process.cwd();

export function getPaths() {
  /**
   * src录入的绝对路径
   */
  const absSrcPath = cwd;

  /**
   * pages路径
   */
  const absPagesPath = join(absSrcPath, 'pages');

  /**
   * 临时目录名
   */
  const tmpDir = '.zhall';

  /**
   * 临时目录路径
   */
  const absTmpPath = join(absSrcPath, tmpDir);

  return {
    absSrcPath,
    absPagesPath,
    tmpDir,
    absTmpPath,
  };
}
