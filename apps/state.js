import ggz from "#ggz";
import path from "node:path";
import fs from "node:fs/promises";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_MAP = {
  GS: "原神",
  SR: "星铁",
  WW: "鸣潮",
  ZZZ: "绝区零",
};

export class ggz_state extends plugin {
  constructor() {
    super({
      name: "咕咕粥状态",
      dsc: "获取本地图包版本信息",
      event: "message",
      priority: 1,
      rule: [{ reg: /^#?(ggz|咕咕粥)(图包)?状态/gi, fnc: "state" }],
    });
  }

  async state(e) {
    const localData = await this.getLocalVersions(
      path.join(__dirname, "../resource"),
    );
    const coreVersion = (await ggz.info()).version;
    const value = {
      ggz_ys_version: localData.GS.local || "未安装",
      ggz_sr_version: localData.SR.local || "未安装",
      ggz_zzz_version: localData.ZZZ.local || "未安装",
      ggz_ww_version: localData.WW.local || "未安装",
      ggz_ys_version_view: localData.GS.git || "未安装",
      ggz_sr_version_view: localData.SR.git || "未安装",
      ggz_zzz_version_view: localData.ZZZ.git || "未安装",
      ggz_ww_version_view: localData.WW.git || "未安装",
      ggz_version: coreVersion,
      ggz_version_view: (
        await this.execGitShow(path.join(__dirname, "../"), "package.json")
      ).v,
      uin: Bot.uin || 2996849867,
      nick: Bot.nickname || "云崽机器人",
      pp: await ggz.path
    };
    let htmlContent = await fs.readFile(
      path.join(__dirname, "../resource/html/state.html"),
      "utf-8",
    );
    const basePath = path.join(__dirname, "../resource/html");
    htmlContent = htmlContent.replace(/(src|href)="([^"]+)"/g, (match, p1, p2) => {
      if (p2.startsWith('http') || p2.startsWith('https')) {
        return match;
      }
      const absolutePath = path.resolve(basePath, p2);
      return `${p1}="file://${path.normalize(absolutePath).replace(/\\/g, "/")}"`;
    });
    htmlContent = await ggz.replace(htmlContent, value);
    e.reply(`p:${ggz.path}\na:${await ggz.path}`)
    const replacedContent = await ggz.replace(htmlContent, value);
    await e.reply(segment.image('base64://'+(await ggz.puppeteer(replacedContent, "html", "base64"))));

    // await e.reply([
    //   `=== 咕咕粥状态报告 ===\nUID: ${Bot.uin || 2996849867} | 昵称: ${Bot.nickname || '云崽机器人'}`,
    //   `核心版本: ${coreVersion}\n云端版本:${(await this.execGitShow(path.join(__dirname, '../'),"package.json")).version}\n〓〓〓〓〓〓〓〓〓`,
    //   ...Object.entries(PROJECT_MAP).map(([k, v]) => {
    //     const { name, status, local, git } = localData[k];
    //     return status ? `${v}：${status}` : `${v}：\n  本地 » ${local}\n  Git » ${git}`;
    //   })
    // ].join('\n'));
  }

  async getLocalVersions(basePath) {
    return Object.fromEntries(
      await Promise.all(
        Object.keys(PROJECT_MAP).map(async (proj) => {
          const dir = path.join(basePath, proj.toLowerCase());
          return [
            proj,
            await fs.access(dir).then(
              () => this.getVersions(dir),
              () => ({
                name: PROJECT_MAP[proj],
                status: "请安装后查看",
              }),
            ),
          ];
        }),
      ),
    );
  }

  async getVersions(dir) {
    const [git, local] = await Promise.allSettled([
      this.execGitShow(dir),
      fs.readFile(path.join(dir, "info.json"), "utf-8").then(JSON.parse),
    ]);

    return {
      name: PROJECT_MAP[path.basename(dir).toUpperCase()],
      local: local.value?.version || "损坏安装",
      git: git.value?.version || "Git记录无效",
    };
  }

  async execGitShow(dir, file = "info.json") {
    try {
      const normalizedDir = path.normalize(dir).replace(/\\+$/, "");
      const stdout = await new Promise((resolve, reject) =>
        exec(
          `git -C "${normalizedDir}" show HEAD:${file}`,
          { timeout: 2000 },
          (e, out) => (e ? reject(e) : resolve(out)),
        ),
      );
      return JSON.parse(stdout);
    } catch (err) {
      logger.error(err);
      return { version: "版本获取失败" };
    }
  }
}