import { IPluginAPI } from '@zhall/core';

const plugin = (api: IPluginAPI) => {
  const {
    utils: { Mustache },
  } = api;

  api.onGenerateFiles(async () => {
    console.log('# 生成plugin');
  });
};

export default plugin;
