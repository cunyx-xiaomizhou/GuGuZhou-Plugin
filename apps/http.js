import path from 'path';
import ggz from '#ggz';
import express from 'express';
const resourcePath = path.join(ggz.path, 'resource');
import fs from "fs/promises"
const isTrss = !(JSON.parse((await fs.readFile(path.join(process.cwd(),"package.json")))).dependencies?.icqq)
if (isTrss){
const Router = express.Router()
Bot.express.use("/GuGuZhou",Router)
Router.use("/:keys",async (req,res,next)=>handler(req,res,next))
}else{ 
  const app = express();
  app.use('/GuGuZhou', express.static(resourcePath));
  app.use('/GuGuZhou/:keys', handler);
  app.use("/GuGuZhou/font/:keys",handler)
  Bot.express = app
  Bot.server = Bot.express.listen(2536, () => {
    logger.info('[GuGuZhou] server started on port 2536');
  })
}
async function handler(req, res, _next) {
  if (req.params.keys.includes("ttf")||req.params.keys.includes("woff")||req.params.keys.includes("woff2")) {
    const filePath = path.join(resourcePath, 'font', req.params.keys);
    res.sendFile(filePath);
    return
  }
  const filePath = path.join(resourcePath, 'img', req.params.keys+".png");
  res.sendFile(filePath);
}