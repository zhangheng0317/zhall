import { IPluginAPI } from '@zhall/core';

const plugin = (api: IPluginAPI) => {
  api.onGenerateFiles(async () => {
    console.log(api.utils.chalk.gray('# 生成exports'));
  });
};
export default plugin;
