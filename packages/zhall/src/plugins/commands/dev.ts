import { IPluginAPI } from '@zhall/core';

const plugin = (api: IPluginAPI) => {
  api.registerCommand({
    name: 'dev',
    description: '启动服务',
    fn: async () => {
      console.log('进入command:dev的方法里', '\n');
      await api.service.applyPlugins({
        key: 'onGenerateFiles',
      });
      // new Server().start();
    },
  });
};

export default plugin;
