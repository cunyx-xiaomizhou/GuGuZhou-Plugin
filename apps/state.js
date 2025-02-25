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
    //
  }
}