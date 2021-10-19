import { existsSync, statSync } from 'fs';
import { join } from 'path';

// 判断路径是否存在,并且他是一个目录
const isDeirctoryAndExist = (path: string) => {
  return existsSync(path) && statSync(path).isDirectory();
};

// 获取当前的工作路径
const cwd = process.cwd();

// src录入的绝对路径
let absSrcPath = cwd;

// 如果src目录存在,则当前目录下的src目录才是src根目录
if (isDeirctoryAndExist(join(cwd, 'src'))) {
  absSrcPath = join(cwd, 'src');
}

// pages路径
const absPagesPath = join(absSrcPath, 'pages');

// 临时目录名
const tmpDir = '.umi';

// 临时目录路径
const absTmpPath = join(absSrcPath, tmpDir);

export { absSrcPath, absPagesPath, tmpDir, absTmpPath };
