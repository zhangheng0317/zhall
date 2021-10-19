import { IPluginAPI } from '@zhall/core';

export default (api: IPluginAPI) => {
  const {
    utils: { Mustache },
  } = api;

  api.onGenerateFiles(async () => {
    api.writeTmpFile({ path: 'plugin.ts', content: '生成plugin.ts文件' });
  });
};
