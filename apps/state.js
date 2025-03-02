import ggz from "#ggz"
export class state extends plugin {
  constructor() {
    super({
      name: "咕咕粥:状态",
      dsc: "获取本地图包版本信息",
      event: "message",
      priority: 1,
      rule: [
        {
          reg: /^#?(ggz|咕咕粥)(图包)?状态/gi,
          fnc: "state",
        },
      ],
    })
  }

  async state(e) {
    const gv = async (pkg) => await ggz.pkg.getVersion(pkg)
    let { vp, vg, vs, vz, vw } = {
      vp: await gv("Plugin"),
      vg: await gv("GS"),
      vs: await gv("SR"),
      vz: await gv("ZZZ"),
      vw: await gv("WW"),
    }
    let host = `http://127.0.0.1:${ await ggz.config('server', 'port')}`;
    const gz = {
      uin: Bot[e.self_id].uin || 2996849867,
      nick: Bot.nickname || '云崽机器人',
      copyright: await ggz.replace(await ggz.getRes('common/copyright.html'), {version:vp.local}),
      root: `:root{--Genshen-font: '${host}/resource/font/Genshin.woff';}`,
      host: host,
      ggz_version: vp.loval,
      ggz_version_view: vp.view,
      ggz_ys_version: vg.loval,
      ggz_ys_version_view: vg.view,
      ggz_sr_version: vs.loval,
      ggz_sr_version_view: vs.view,
      ggz_zzz_version: vz.loval,
      ggz_zzz_version_view: vz.view,
      ggz_ww_version: vw.loval,
      ggz_ww_version_view: vw.view
    };
    e.reply(JSON.stringify(gz));
  }
}
