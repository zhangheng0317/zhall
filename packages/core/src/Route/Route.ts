import { IConfig, IRoute } from '../types';
import { fs, lodash, path } from '@zhall/utils';
import { winPath } from '@zhall/utils';

interface IOpts {}

interface IRoutesOpts {
  cwd: string;
  config: IConfig;
  /**
   * 根路径 一般为src/pages
   */
  root?: string;

  /**
   * pages到问文件之间的相对目录
   * 例: pages和pages/index.js之间是'', pages和pages/user/index.js之间是user
   */
  componentPrefix?: string;
}

class Route {
  opts: IOpts;

  constructor(opts?: IOpts) {
    this.opts = opts || {};
  }

  async getRoutes(opts: IRoutesOpts) {
    const { config, root, componentPrefix } = opts;

    let routes = lodash.cloneDeep(config.routes || []);

    for (const route of routes) {
      /**
       * routes:[
       *  {
       *    name:string,
       *    component:string
       *  }
       * ]
       * 1.手机app路由类似扑克牌形式,不同于pc,没有嵌套路由
       * 2.路由不需要显示path
       */
      if (
        route.component &&
        typeof route.component === 'string' &&
        !route.component.startsWith('@/') &&
        !path.isAbsolute(route.component)
      ) {
        route.component = winPath(path.join(opts.root!, route.component));
      }

      if (!('exact' in route)) {
        route.exact = true;
      }
    }
    console.log(routes);
  }

  // getJSON(opts: {
  //   routes: IRoute[];
  //   config: IConfig;
  //   cwd: string;
  //   isServer?: boolean;
  // }) {
  //   return routesToJSON(opts);
  // }
}

export default Route;
