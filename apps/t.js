import ggz from '#ggz';
export class ggz_plugin_t extends plugin {
  constructor () {
    super({
      name:"ggz",
      dsc:"ggz",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"#?鼓周",fnc:"gg"}
      ]
    });
  }
  async gg(e) {
    e.reply(await ggz.info().name);
    Bot.logger.mark(await ggz.info().name);
  }
}