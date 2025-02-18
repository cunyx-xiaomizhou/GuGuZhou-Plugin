import { info } from './info.js';
import { load } from './load.js';
import { config } from './../config/config.js';
const pp = `${process.cwd()}/plugins/GuGuZhou-Plugin`
let ggz = {
  info: info,
  load: load,
  config: config,
  path: pp
};
export default ggz;