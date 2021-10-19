import { plugin } from './plugin';

export function getRoutes(){
  const routes = [object Promise]

  plugin.applyPlugins({
    key: 'patchRoutes',
    args: { routes },
  });

  return routes
}
