import { info } from './info.js';
import { load } from './load.js';
import pkg from './pkg/index.js';
import { config } from './../config/config.js';
const pp = `${process.cwd()}/plugins/${(await info()).name}`
let ggz = {
  info: info,
  load: load,
  config: config,
  path: pp,
  pkg: pkg
};
export default ggz;