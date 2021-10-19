import { IPluginAPI, Route } from '@zhall/core';

export default (api: IPluginAPI) => {
  const {
    cwd,
    config,
    utils: { Mustache, fs, path },
  } = api;

  api.onGenerateFiles(async () => {
    const template = fs.readFileSync(
      path.join(__dirname, 'routes.tpl'),
      'utf-8',
    );

    api.writeTmpFile({
      path: 'routes.ts',
      content: Mustache.render(template, {
        routes: new Route().getRoutes({ config, cwd }),
      }),
    });
  });
};
