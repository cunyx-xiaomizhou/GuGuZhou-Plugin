import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import ggz from "#ggz";

async function getVersion(pkg) {
  let result = {
    local: "未安装",
    view: "未安装",
  };

  try {
    const isPlugin = pkg === "Plugin";
    const jsonFileName = isPlugin ? "package.json" : "info.json";
    const localPath = isPlugin ? ggz.path : path.join(ggz.path, "resource", pkg);

    if (!fs.existsSync(localPath)) {
      return result;
    }

    const localJsonPath = path.join(localPath, jsonFileName);
    const localJsonData = fs.readFileSync(localJsonPath, "utf-8");
    const localJson = JSON.parse(localJsonData);
    if (localJson && localJson.version) {
      result.local = localJson.version;
    }

    const gitCommand = `git -C ${ggz.path} show HEAD:${jsonFileName}`;
    const gitOutput = execSync(gitCommand, { encoding: "utf-8" });
    const gitJson = JSON.parse(gitOutput);
    if (gitJson && gitJson.version) {
      result.view = gitJson.version;
    }
  } catch (error) {
    logger.error("获取版本失败:", error.message);
  }

  return result;
}

export { getVersion };