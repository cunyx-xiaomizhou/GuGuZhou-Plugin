import ggz from '#ggz';
export class ggz_state extends plugin {
  constructor () {
    super({
      name:"咕咕粥状态",
      dsc:"获取云端咕咕粥图包版本和本地咕咕粥图包版本",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
          reg:/^#?(ggz|咕咕粥)(图包)?状态/gi,
          fnc:"state"
        }
      ]
    });
  }
  async state(e) {
    let gz_view = false;
    var source = await ggz.config('source', 'source');
    try {
        const url = `${source}/raw/main/package.json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`网络请求失败: ${response.statusText}`);
        }
        const viewInfo = await response.json();
        if (viewInfo && viewInfo.version) {
            gz_view = viewInfo.version;
        } else {
            throw new Error('网络 package.json 格式错误');
        }
    } catch (error) {
        logger.error('获取网络版本失败:', error.message);
        gz_view = false;
    }
    let state_info = {
      uin: Bot.uin || 2996849867,
      nick: Bot.nickname || '云崽机器人',
      ggz_version: (await ggz.info()).version,
      ggz_version_view: gz_view,
      ggz_ys_version: gs.local || '未安装',
      ggz_ys_version_view: gs.view,
      ggz_sr_version: sr.local || '未安装',
      ggz_sr_version_view: sr.view,
      ggz_zzz_version: zzz.local || '未安装',
      ggz_zzz_version_view: zzz.view,
      ggz_ww_version: ww.local || '未安装',
      ggz_ww_version_view: ww.view
    };
  }
}