import { update as Update } from "../../other/update.js"
export class Plugin_update extends plugin {
  constructor() {
    super({
      name: "咕咕粥:插件更新",
      dsc: "调用Yunzai自带更新模块进行插件更新",
      event: "message",
      priority: 2000,
      rule: [
        {
          reg: /^#?(ggz|咕咕粥)(插件)?(强制)?更新$/gi,
          fnc: "update_plugin",
          permission: "master",
        },
      ],
    })
  }
  async update_plugin(e) {
    const Type = e.msg.includes("强制") ? "#强制更新" : "#更新"
    if (e) e.msg = Type + "GuGuZhou-Plugin"
    const up = new Update(e)
    up.e = e
    return up.update()
  }
}
