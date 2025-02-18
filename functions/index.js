import { info } from './info.js';
import { load } from './load.js';
import { config } from './../config/config.js';
const pp = `${process.cwd()}/plugins/${info.name}`
let ggz = {
  info: info,
  load: load,
  config: config,
  path: pp
};
export default ggz;