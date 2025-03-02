import axios from 'axios'
import { exec } from 'child_process'
import { promisify } from 'util'

import { Data, Version } from '#components'

import { isAbroad } from './common.js'

const execAsync = promisify(exec)

/**
 * 获取本地图库版本
 * @param {string} name - 图库名称，简写前缀，如 sr, ys
 * @returns {Promise<string>} - 返回图库的版本号, 此方法优先获取info.json中的version字段，如果未找到，则尝试获取git tag中的版本号
 */
export async function getLocalVersion (name) {
  const basePath = `${Version.Plugin_Path}/resources/Gallery/${name}`
  try {
    const info = await Data.readJSON('info.json', basePath)
    if (info?.version) {
      return info.version
    }

    const { stdout } = await execAsync('git describe --tags --abbrev=0', { cwd: basePath })
    const gitTagVersion = stdout.trim()
    if (gitTagVersion) {
      return gitTagVersion
    }
  } catch (error) {
    console.debug(`⚠️ 获取本地图库版本失败: ${error.message}`)
  }
  return '未安装'
}

/**
 * 获取远程图库版本
 * @param {nam} name - 图库名称，如 sr, ys
 * @returns {Promise<string>} - 返回图库的版本号， 此方法优先从API中获取，如果失败，则尝试从仓库中获取tag
 */
export async function getRemoteVersion (name) {
  /** Gitee APi 真💩 */
  const gitApi = isAbroad ? 'https://api.github.com' : 'https://github.moeyy.xyz/https://api.github.com'
  try{
    const { data } = await axios.get(`${gitApi}/repos/cunyx-xiaomizhou/GuGuZhou-${name}/contents/info.json`)
    if(data){
      const url = isAbroad ? data.download_url : `${gitApi}/${data.download_url}`
      return (await axios.get(url)).data.version
    }
    const repoUrl = `${gitApi}/cunyx-xiaomizhou/GuGuZhou-${name}`
    const { stdout } = await execAsync(`git ls-remote --tags --sort=-v:refname ${repoUrl}`)
    const tags = stdout
      .trim()
      .split('\n')
      .map(line => line.split('refs/tags/')[1])
      .filter(tag => tag && !tag.endsWith('^{}'))

    if (tags.length > 0) {
      return tags[0]
    }
  } catch (error) {
    console.debug(`获取远程图库版本失败: ${error.message}`)
  }

  return '未知'
}
