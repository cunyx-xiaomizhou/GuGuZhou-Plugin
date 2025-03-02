import { info } from "./info.js";
import { load } from "./load.js";
import pkg from "./pkg/index.js";
import { puppeteer } from "./puppeteer.js";
import { config } from "./../config/config.js";
import { fileURLToPath } from 'url'
import path from 'path'
const Path = process.cwd()
const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') + '/'
async function game(e) {
  const msg = e.msg.toLowerCase();
  const regex =
    /^(ggz|咕咕粥)(下载|更新|删除)((原神|ys|gs|genshin)|(崩坏：星穹铁道|崩铁|星铁|sr)|(绝区零|zzz)|(鸣潮|ww|waves?))(图包)?$/gi;
  const match = regex.exec(msg);
  if (match) {
    if (match[4]) {
      return "GS";
    } else if (match[5]) {
      return "SR";
    } else if (match[6]) {
      return "ZZZ";
    } else if (match[7]) {
      return "WW";
    }
  }
  return false;
}

async function replace(string, array) {
  return string.replace(/\{\{(\w+)\}\}/g, (match, p1) => {
    return array.hasOwnProperty(p1) ? String(array[p1]) : match;
  });
}

let ggz = {
  info: info,
  load: load,
  config: config,
  path: __dirname,
  pkg: pkg,
  game: game,
  replace: replace,
  puppeteer: puppeteer,
};
export default ggz;
