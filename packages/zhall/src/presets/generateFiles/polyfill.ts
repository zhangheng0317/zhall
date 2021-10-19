import { IPluginAPI } from '@zhall/core';

export default (api: IPluginAPI) => {
  api.onGenerateFiles(async () => {
    api.writeTmpFile({ path: 'polyfill.ts', content: 'polyfill.ts文件' });
  });
};
