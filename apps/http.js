import httpServer from 'http-server';
import path from 'path';
import ggz from '#ggz';

const resourcePath = path.join(ggz.path, 'resource');

const port = await ggz.config('server', 'port');

const server = httpServer.createServer({
  root: resourcePath,
  cors: true,
  cache: -1,
});

server.listen(port, () => {
  console.log(`服务器已启动，访问地址：http://localhost:${port}`);
  console.log(`资源目录：${resourcePath}`);
});