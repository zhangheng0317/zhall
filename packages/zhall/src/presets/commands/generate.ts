import { IPluginAPI } from '@zhall/core';

export default (api: IPluginAPI) => {
  const {
    utils: { chalk },
  } = api;

  api.registerCommand({
    name: 'generate',
    description: '生成临时代码',
    fn: async () => {
      console.log('进入command:generate的方法里', '\n');
    },
  });
};
