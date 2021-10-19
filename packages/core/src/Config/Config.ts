import { winPath, deepmerge, fs, path } from '@zhall/utils';
import Service from '../Service/Service';

interface IOpts {
  cwd: string;
  service: Service;
}

const DEFAULT_CONFIG_FILES = ['config/config.ts', 'config/config.js'];

function compatESModuleRequire<T extends { __esModule: boolean; default: any }>(
  m: T,
): T extends { __esModule: true; default: infer U } ? U : T {
  return m.__esModule ? m.default : m;
}

class Config {
  cwd: string;
  service: Service;
  config?: object;
  configFile?: string | null;
  configFiles = DEFAULT_CONFIG_FILES;

  constructor(opts: IOpts) {
    this.cwd = opts.cwd || process.cwd();
    this.service = opts.service;
  }

  async getDefaultConfig() {}

  async getConfig(opts: { defaultConfig: object }) {}

  getUserConfig() {
    const configFile = this.getConfigFile();
    // console.log('configFile', configFile);

    if (configFile) {
      let envConfigFile;

      // 判断是否存在环境配置 config.dev.ts
      if (process.env.ZHALL_ENV) {
        const envConfigFileName = this.addAffix(
          configFile,
          process.env.ZHALL_ENV,
        );
        console.log(envConfigFileName);
      }

      // 获取配置文件
      const files: string[] = [configFile, envConfigFile]
        .filter((file): file is string => !!file)
        .map((file) => path.join(this.cwd, file))
        .filter((file) => fs.existsSync(file));
      console.log('# 配置文件');
      console.log(files);

      let config = {};
      files.map((file) => {
        console.log('59', require(file));
      });

      console.log('#配置');
      console.log(config);

      return { routes: [] };
    } else {
      return {};
    }
  }

  getConfigFile() {
    const configFile = this.configFiles.find((file) =>
      fs.existsSync(path.join(this.cwd, file)),
    );
    return configFile ? winPath(configFile) : null;
  }

  addAffix(file: string, affix: string) {
    const ext = path.extname(file);
    return file.replace(new RegExp(`${ext}$`), `.${affix}${ext}`);
  }
}

export default Config;
