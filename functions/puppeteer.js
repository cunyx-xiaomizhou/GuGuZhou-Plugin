import puppeteer from 'puppeteer';

async function puppeteer(data, t = 'url', r = 'buffer') {
    let browser;
    try {
        logger.mark('启动浏览器');
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        if (t === 'url') {
            logger.info(`访问URL: ${data}`);
            await page.goto(data, { waitUntil: 'networkidle2' });
        } else if (t === 'html') {
            logger.info('设置HTML内容');
            await page.setContent(data, { waitUntil: 'networkidle2' });
        } else {
            throw new Error('参数t无效');
        }

        let result;
        if (r === 'base64') {
            result = await page.screenshot({ encoding: 'base64', fullPage: true });
            logger.info('生成base64截图');
        } else {
            result = await page.screenshot({ fullPage: true });
            logger.info('生成buffer截图');
        }

        return result;
    } catch (error) {
        logger.error(`错误: ${error.message}`);
        throw error;
    } finally {
        if (browser) {
            logger.mark('关闭浏览器');
            await browser.close();
        }
    }
}

export { puppeteer };