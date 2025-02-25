import { info } from './info.js';
import { load } from './load.js';
import pkg from './pkg/index.js';
import { config } from './../config/config.js';
const pp = `${process.cwd()}/plugins/${(await info()).name}`

async function game(e) {
  const msg = e.msg.toLowerCase();
  const regex = /^(ggz|咕咕粥)下载((原神|ys|gs|genshin)|(崩坏：星穹铁道|崩铁|星铁|sr)|(绝区零|zzz)|(鸣潮|ww|waves?))(图包)?$/gi;
  const match = regex.exec(msg);
  if (match) {
    if (match[3]) {
      return "GS";
    } else if (match[4]) {
      return "SR";
    } else if (match[5]) {
      return "ZZZ";
    } else if (match[6]) {
      return "WW";
    }
  }
  return false;
}

async function replace(string, array) {
  return string.replace(/\{\{(\w+)\}\}/g, (match, p1) => {
    return array.hasOwnProperty(p1) ? array[p1] : match;
  });
}

let ggz = {
  info: info,
  load: load,
  config: config,
  path: pp,
  pkg: pkg,
  game: game,
  replace: replace
};
export default ggz;