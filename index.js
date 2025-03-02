import fs from 'node:fs/promises';
import path from 'node:path';
import ggz from '#ggz';
import chalk from 'chalk';

let apps;
let info = await ggz.info();

try {
  const files = (await fs.readdir(`${await ggz.path}/apps`))
    .filter(file => file.endsWith('.js'))

  const ret = await Promise.allSettled(
    files.map(async (file) => {
      const filePath = path.resolve(`${await ggz.path}/apps/${file}`)
      const startModuleTime = Date.now();

      try {
        const module = await import(`file://${filePath}`)
        const endModuleTime = Date.now()
        const loadTime = endModuleTime - startModuleTime

        logger.debug(
          chalk.rgb(0, 255, 255)(`[${info.name}]`) +
          chalk.green(` 🚀 ${file.replace('.js', '')}`) +
          chalk.rgb(255, 223, 0)(` 加载时间: ${loadTime} ms`)
        )

        return module
      } catch (error) {
        logger.error(
          chalk.bgRgb(255, 0, 0).white.bold(' ❌ 载入插件错误：') +
          chalk.redBright(` ${file.replace('.js', '')} `) +
          ' 🚫'
        )
        logger.debug(chalk.red(`📄 错误详情： ${error.message}`))

        return null
      }
    })
  )

  apps = {}

  files.forEach((file, i) => {
    const name = file.replace('.js', '')

    if (ret[i].status !== 'fulfilled' || !ret[i].value) {
      return
    }

    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
  })

  logger.info('--------٩(๑•̀ω•́๑)۶----------')
  logger.info(`${info.name}${info.version}初始化中......`)

} catch (error) {
  logger.error(chalk.red.bold(`❌ 初始化失败: ${error}`))
}

export { apps }