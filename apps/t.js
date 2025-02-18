import ggz from '#ggz';
export class ggz_plugin_t extends plugin {
  constructor () {
    super({
      name:"ggz",
      dsc:"ggz",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?ggzt",fnc:"ggzt",}
      ]
    });
  }
  async ggzt(e) {
    e.reply(await ggz.info().name);
  }
}