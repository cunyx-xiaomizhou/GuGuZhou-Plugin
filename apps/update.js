import ggz from '#ggz';
import { execSync } from 'child_process';
import { update } from '../../other/update.js';
const Plugin_Name = ggz.info().name;

export class xmzPlugin_update extends plugin {
  constructor () {
	super({
	  name: '咕咕粥插件更新',
	  dsc: '调用Yunzai自带更新模块进行插件更新',
	  event: 'message',
	  priority: 2000,
	  rule: [
		{
		  reg: /^#?(ggz|咕咕粥)(插件)?(强制)?更新$/gi,
		  fnc: 'update_plugin',
                  permission: 'master'
		}
	  ]
    });
  }
  async update_plugin(e){
    e.reply(Plugin_Name);
    let Update_Plugin = new update();
	Update_Plugin.e = e;
	Update_Plugin.reply = e.reply;
	if (Update_Plugin.getPlugin(Plugin_Name)) {
	  if( e.msg.includes('强制')) {
	    await execSync('git reset --hard',{cwd: `${process.cwd()}/plugins/${Plugin_Name}/`});
	  }
	  await Update_Plugin.runUpdate(Plugin_Name);
		if (Update_Plugin.isUp) {
		  setTimeout(() => Update_Plugin.restart(), 2000)
		}
	  }
	return true;
  }
}