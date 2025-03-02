
import axios from 'axios'
import _ from 'lodash'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { Utils } from '#models'

import cfg from '../../../lib/config/config.js'
import { Data } from './Data.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const Path = process.cwd().replace(/\\/g, '/')
const Plugin_Path = join(__dirname, '..').replace(/\\/g, '/')
const Plugin_Name = basename(Plugin_Path)


const remoteVersion = () => {
  const gitApi = Utils.isAbroad ? 'https://api.github.com' : 'https://github.moeyy.xyz/https://api.github.com'
  const { data } = axios.get(`${gitApi}/repos/cunyx-xiaomizhou/GuGuZhou-Plugin/contents/package.json`)
  if(data){
    const url =  Utils.isAbroad ? data.download_url : `${gitApi}/${data.download_url}`
    console.log(url)
    return (axios.get(url)).data.version
  }
  return '未知版本'
}
const pkg = await Data.readJSON('package.json', `${Plugin_Path}`)

let BotName = cfg.package.name

switch (BotName) {
  case 'miao-yunzai':
    BotName = 'Miao-Yunzai'
    break
  case 'yunzai':
    BotName = 'Yunzai-Bot'
    break
  case 'trss-yunzai':
    BotName = 'TRSS-Yunzai'
    break
  default:
    BotName = _.capitalize(BotName)
}


export const Version = {
  get Bot_Name () {
    return BotName
  },
  get Bot_Version () {
    return cfg.package.version
  },
  get Bot_Path () {
    return Path
  },
  get Plugin_Logs () {
    return changelogs
  },
  get Plugin_Path () {
    return Plugin_Path
  },
  get Plugin_Name () {
    return Plugin_Name
  },
  get Plugin_AliasName () {
    return '咕咕粥'
  },
  get Plugin_Version () {
    return pkg.version
  },
  get Plugin_RemoteVersion () {
    return remoteVersion()
  }
}


