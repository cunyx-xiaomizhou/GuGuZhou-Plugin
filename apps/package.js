import ggz from "#ggz";
import { exec } from "child_process";
export class downloadImagePackage_ggz extends plugin {
  constructor() {
    super({
      name: "咕咕粥图包管理器",
      dsc: "下载或更新各游戏的咕咕粥面板图包",
      event: "message",
      priority: 1,
      rule: [
        {
          reg: /^(ggz|咕咕粥)(下载|更新)((原神|ys|gs|genshin)|(崩坏：星穹铁道|崩铁|星铁|sr)|(绝区零|zzz)|(鸣潮|ww|waves?))(图包)?$/gi,
          fnc: "imagePackage",
        },
      ],
    });
  }
  async imagePackage(e) {
    if (!e.isMaster) {
      e.reply(`只有主人才可以命令${Bot.nickname || "咕咕粥"}哦(๑＞ڡ＜)☆`);
      return true;
    }
    let game = await ggz.game(e);
    let rp = `${ggz.path}/resources/${game}`;
    if (e.msg.includes("下载")) {
      let source = await ggz.config("source", "source");
      let download_link = (await ggz.config("source", source)) + `${game}.git`;
      try {
        e.reply("开始尝试下载咕咕粥图包至本地", true);
        ggz.pkg.down.download(e, download_link, rp, game);
      } catch (err) {
        logger.error(
          `[${(await ggz.info()).name}]${download_link}克隆本地失败\n\n${err}`,
        );
        e.reply(`下载过程出现错误啦！请截图反馈~\n\n${err}`, true);
      }
    } else if (e.msg.includes("更新")) {
    } else if (e.msg.includes("删除")) {
    }
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
