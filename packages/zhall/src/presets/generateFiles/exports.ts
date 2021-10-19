import { IPluginAPI } from '@zhall/core';

export default (api: IPluginAPI) => {
  api.onGenerateFiles(async () => {
    api.writeTmpFile({ path: 'exports.ts', content: '生成exports.ts文件' });
  });
};
