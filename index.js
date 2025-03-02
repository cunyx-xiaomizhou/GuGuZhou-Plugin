import fs from 'node:fs/promises'
import path from 'node:path'

import chalk from 'chalk'

import { Version  } from '#components'

let apps

try {
  const files = (await fs.readdir(`${Version.Plugin_Path}/apps`))
    .filter(file => file.endsWith('.js'))

  const ret = await Promise.allSettled(
    files.map(async (file) => {
      const filePath = path.resolve(`${Version.Plugin_Path}/apps/${file}`)
      const startModuleTime = Date.now()

      try {
        const module = await import(`file://${filePath}`)
        const endModuleTime = Date.now()
        const loadTime = endModuleTime - startModuleTime

        logger.debug(
          chalk.rgb(0, 255, 255)(`[${Version.Plugin_AliasName}]`) +
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
  logger.info(`${Version.Plugin_AliasName}${Version.Plugin_Version}初始化中......`)

} catch (error) {
  logger.error(chalk.red.bold(`❌ 初始化失败: ${error}`))
}

export { apps }
