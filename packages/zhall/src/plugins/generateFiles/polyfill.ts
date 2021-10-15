import { IPluginAPI } from '@zhall/core';

const plugin = (api: IPluginAPI) => {
  api.onGenerateFiles(async () => {
    console.log('# 生成polyfill');
  });
};
export default plugin;
