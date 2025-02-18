/**
 * 感谢『煌』对本文件的修改
 * 修改于2024-05-25 15:35
 * 解决了文件无法强制初始化的问题
 */
import path from 'path';
import { info } from './info.js';
import fs from 'fs/promises';

async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    logger.error(`读取位于『${filePath}』的JSON文件时出错：\n${error}`);
  }
}

async function writeJsonFile(filePath, jsonData) {
  try {
    const content = JSON.stringify(jsonData, null, 2);
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    logger.error(`读取位于『${filePath}』的JSON文件时出错：\n${error}`);
  }
}

async function load(conDir, defDir) {
  let info_ = await info();
  logger.info('--------٩(๑•̀ω•́๑)۶----------');
  logger.info(`${info_.name_zh}${info_.version}初始化中......`);
  try {
    const files = await fs.readdir(defDir);
    for (const file of files) {
      const defFilePath = path.join(defDir, file);
      const conFilePath = path.join(conDir, file);
      if (path.extname(file) === '.json') {
        const defJson = await readJsonFile(defFilePath);
        if (!await fs.access(conFilePath).then(() => true).catch(() => false)) {
          await fs.copyFile(defFilePath, conFilePath);
          logger.info(`配置文件初始化至：${conFilePath}`);
        } else {
          const conJson = await readJsonFile(conFilePath);
          if (defJson.version !== conJson.version) {
            await fs.unlink(conFilePath);
            logger.info(`已删除旧文件：${conFilePath}`);
            await writeJsonFile(conFilePath, defJson);
            logger.mark(`已强制重写文件${conFilePath}`);
          }
        }
      }
    }
  } catch (error) {
    logger.error("读取文件夹失败：", error);
    process.exit(1);
  }
  Bot.logger.info(`${info_.name_zh}${info_.version}初始化完成！`);
}

export { load };
