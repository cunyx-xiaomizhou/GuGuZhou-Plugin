import ggz from '#ggz';
import {exec} from "child_process";
export class downloadImagePackage_ggz extends plugin {
  constructor() {
    super({
      name: '咕咕粥图包下载器',
      dsc: '下载各游戏的咕咕粥面板图包',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^(ggz|咕咕粥)下载((原神|ys|gs|genshin)|(崩坏：星穹铁道|崩铁|星铁|sr)|(绝区零|zzz)|(鸣潮|ww|waves?))(图包)?$/gi,
          fnc: 'downloadImagePackage',
        },
      ]
    })
  }
  async downloadImagePackage(e) {
    var source = await ggz.config('source', 'source');
    var game = await game(e);
    var download_link = await ggz.config('source', source) + `${game}.git`;
    e.reply(download_link);
  }
  async determineDownloadType(e) {
    const msg = e.msg.toLowerCase();
    const regex = /^(ggz|咕咕粥)下载((原神|ys|gs|genshin)|(崩坏：星穹铁道|崩铁|星铁|sr)|(绝区零|zzz)|(鸣潮|ww|waves?))(图包)?$/gi;
    const match = regex.exec(msg);

    if (match) {
      if (match[3]) {
       return "YS";
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
  /*
    async updateFanSKYPlugin(e) {
        if (!e.isMaster) {
            return true
        }
        let isForce = e.msg.includes('强制')
        let command = 'git  pull'
        if (isForce) {
            command = 'git  checkout . && git  pull'
            e.reply('正在执行强制更新操作，请稍等')
        } else {
            e.reply('正在执行更新操作，请稍等')
        }
        exec(command, {cwd: `${prosessPath}/plugins/FanSky_Qs/`}, function (error, stdout, stderr) {
            if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                e.reply('目前已经是最新版FanSky_Qs了~')
                return true
            }
            if (error) {
                e.reply('FanSky_Qs更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
                return true
            }
            e.reply('FanSky_Qs更新成功，请手动重启Yunzai-Bot以应用更新...')
            return true
        })
        return true
    }
    */
}