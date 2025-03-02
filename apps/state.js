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
    const gv = (pkg) => await ggz.pkg.getVersion(pkg);
    //let { vp, vg, vs, vz, vw } = {
    let obj = {
      vp: await gv('Plugin'),
      vg: await gv('GS'),
      vs: await gv('SR'),
      vz: await gv('ZZZ'),
      vw: await gv('WW')
    };
    e.reply(JSON.stringify(obj));
  }
}