import httpServer from "http-server"
import ggz from "#ggz"

const port = await ggz.config("server", "port")

const server = httpServer.createServer({
	root: ggz.path,
	cors: true,
	cache: -1,
})

server.listen(port, () => {
	logger.info(`服务器已启动，访问地址：http://localhost:${port}`)
})
