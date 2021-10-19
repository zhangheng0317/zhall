import { Server } from '@zhall/core';
import { IPluginAPI } from '@zhall/core';

export default (api: IPluginAPI) => {
  api.registerCommand({
    name: 'dev',
    description: '启动服务',
    fn: async () => {
      console.log('进入command:dev的方法里', '\n');
      await api.service.applyPlugins({
        key: 'onGenerateFiles',
      });
      // TODO 启动服务
      await new Server().run();
    },
  });
};
