import fs from "node:fs/promises";
import path from "node:path";
import ggz from "#ggz";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defDir = path.join(ggz.path, "config/default");
const configDir = path.join(ggz.path, "config/config");
await ggz.load(configDir, defDir);
const appsDir = path.join(__dirname, `./apps`);
const apps = {};
const updatePath = "file://" + path.join(appsDir, "update.js");
try {
  const updateModule = await import(updatePath);
  apps.update = updateModule[Object.keys(updateModule)[0]];
} catch (error) {
  logger.error(error);
}

// 并行加载其他模块
const files = (await fs.readdir(appsDir)).filter(
  (file) => file.endsWith(".js") && file !== "update.js",
);

const results = await Promise.allSettled(
  files.map((file) => import("file://" + path.join(appsDir, file))),
);

// 处理加载结果
results.forEach((result, index) => {
  const name = path.basename(files[index], ".js");
  if (result.status === "fulfilled") {
    apps[name] = result.value[Object.keys(result.value)[0]];
  } else {
    logger.warn(`[咕咕粥插件] 可选模块 [${name}] 加载跳过`);
    logger.debug(result.reason);
  }
});

export { apps };
