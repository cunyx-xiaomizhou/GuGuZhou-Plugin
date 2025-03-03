import download from "./download.js"
import { getVersion } from "./getVersion.js"

const pkg = {
	down: download,
	getVersion: getVersion,
}

export default pkg
