import { info } from './info.js';
import { load } from './load.js';
import down from './down/index.js';
import { config } from './../config/config.js';
const pp = `${process.cwd()}/plugins/${(await info()).name}`
let ggz = {
  info: info,
  load: load,
  config: config,
  path: pp,
  down: down
};
export default ggz;