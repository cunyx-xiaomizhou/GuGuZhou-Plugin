import pkg from "./pkg/index.js";
import { config } from "./../config/config.js";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') + '/';

export default new class GGZ {
  constructor() {
    this.config = config;
    this.pkg = pkg;
    this.path = __dirname;
  }

  async game(e) {
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

  async replace(string, array) {
    return string.replace(/\{\{(\w+)\}\}/g, (match, p1) => {
      return array.hasOwnProperty(p1) ? String(array[p1]) : match;
    });
  }

  async getRes(_path) {
    return await fs.readFile(path.join(__dirname, "../resources", _path), 'utf8');
  }

  async info() {
    const pluginPath = `${process.cwd()}/plugins/GuGuZhou-Plugin/`;
    const pluginData = await JSON.parse(
      await fs.readFile(`${pluginPath}package.json`, "utf8")
    );
    return pluginData;
  }

  async readJsonFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      logger.error(`读取位于『${filePath}』的JSON文件时出错：\n${error}`);
    }
  }

  async writeJsonFile(filePath, jsonData) {
    try {
      const content = JSON.stringify(jsonData, null, 2);
      await fs.writeFile(filePath, content, 'utf8');
    } catch (error) {
      logger.error(`写入位于『${filePath}』的JSON文件时出错：\n${error}`);
    }
  }

  async load(conDir, defDir) {
    const info_ = await this.info();
    logger.info('--------٩(๑•̀ω•́๑)۶----------');
    logger.info(`${info_.name_zh}${info_.version}初始化中......`);
    try {
      const files = await fs.readdir(defDir);
      for (const file of files) {
        const defFilePath = path.join(defDir, file);
        const conFilePath = path.join(conDir, file);
        if (path.extname(file) === '.json') {
          const defJson = await this.readJsonFile(defFilePath);
          const fileExists = await fs.access(conFilePath)
            .then(() => true)
            .catch(() => false);
          if (!fileExists) {
            await fs.copyFile(defFilePath, conFilePath);
            logger.info(`配置文件初始化至：${conFilePath}`);
          } else {
            const conJson = await this.readJsonFile(conFilePath);
            if (defJson.version !== conJson.version) {
              await fs.unlink(conFilePath);
              logger.info(`已删除旧文件：${conFilePath}`);
              await this.writeJsonFile(conFilePath, defJson);
              logger.mark(`已强制重写文件${conFilePath}`);
            }
          }
        }
      }
    } catch (error) {
      logger.error('读取文件夹失败：', error);
      process.exit(1);
    }
    logger.info(`${info_.name_zh}${info_.version}初始化完成！`);
  }
};
