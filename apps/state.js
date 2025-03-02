import { Render, Version } from '#components'
import { Utils } from '#models'

export class state extends plugin {
  constructor () {
    super({
      name: '咕咕粥:状态',
      dsc: '获取本地图包版本信息',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^#?(ggz|咕咕粥)(图包)?状态/gi,
          fnc: 'state'
        }
      ]
    })
  }

  async state (e) {
    const [ ys_LocalVersion, sr_LocalVersion, zzz_LocalVersion, ww_LocalVersion ] = await Promise.all([
      Utils.getLocalVersion('YS'),
      Utils.getLocalVersion('SR'),
      Utils.getLocalVersion('ZZZ'),
      Utils.getLocalVersion('WW')
    ])

    const [ ys_RemoteVersion, sr_RemoteVersion, zzz_RemoteVersion, ww_RemoteVersion ] = await Promise.all([
      Utils.getRemoteVersion('YS'),
      Utils.getRemoteVersion('SR'),
      Utils.getRemoteVersion('ZZZ'),
      Utils.getRemoteVersion('WW')
    ])

    const avatarUrl = await Utils.getAvatarUrl(e, e.self_id)
    const renderData = {
      Avatar_Url: avatarUrl,
      uin: Bot[e.self_id].uin,
      Plugin_AliasName: Version.Plugin_AliasName || '咕咕粥',
      Plugin_Name: Version.Plugin_Name || 'GuGuZhou-Plugin',
      Plugin_Version: Version.Plugin_Version || '未知',
      Plugin_RemoteVersion: await Version.Plugin_RemoteVersion || '未知',
      ys_LocalVersion,
      sr_LocalVersion,
      zzz_LocalVersion,
      ww_LocalVersion,
      ys_RemoteVersion,
      sr_RemoteVersion,
      zzz_RemoteVersion,
      ww_RemoteVersion
    }

    const img = await Render.render('state/index', renderData)
    await e.reply(img)
  }
}