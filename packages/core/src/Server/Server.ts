import { express, Express } from '@zhall/utils';

class Server {
  app: Express;
  constructor() {
    this.app = express();
  }

  async run() {
    console.log('开启服务');
  }
}
export default Server;
