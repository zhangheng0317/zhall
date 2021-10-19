import { yParser } from '@zhall/utils';

interface IOpts {
  cwd: string;
  args: yParser.Arguments;
}

class Generator {
  cwd: string;
  args: yParser.Arguments;
  constructor(opts: IOpts) {
    this.cwd = opts.cwd;
    this.args = opts.args;
  }

  async run(){
    
  }
}

export default Generator;
