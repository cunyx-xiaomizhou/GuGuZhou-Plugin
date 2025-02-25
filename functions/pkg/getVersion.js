import fs from 'fs';
import path from 'path';

async function getVersion(rp, source) {
    let result = {
        local: false,
        view: false
    };

    try {
        if (!fs.existsSync(rp)) {
            throw new Error('未安装指定包体');
        }

        const localInfoPath = path.join(rp, 'info.json');
        const localInfoData = fs.readFileSync(localInfoPath, 'utf-8');
        const localInfo = JSON.parse(localInfoData);
        if (localInfo && localInfo.version) {
            result.local = localInfo.version;
        } else {
            throw new Error('本地 info.json 格式错误');
        }
    } catch (error) {
        logger.error('获取本地版本失败:', error.message);
        result.local = false;
    }

    try {
        const url = `${source}/raw/master/info.json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`网络请求失败: ${response.statusText}`);
        }
        const viewInfo = await response.json();
        if (viewInfo && viewInfo.version) {
            result.view = viewInfo.version;
        } else {
            throw new Error('网络 info.json 格式错误');
        }
    } catch (error) {
        logger.error('获取网络版本失败:', error.message);
        result.view = false;
    }

    return result;
}

export { getVersion };