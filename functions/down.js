import { exec } from 'child_process';

let downloadingLinks = {};

function downloadGitRepo(e, path, link, taskName = '') {
  if (!taskName) {
    taskName = link;
  }

  if (downloadingLinks[link]) {
    const { taskName, progress } = downloadingLinks[link];
    e.reply(`已经在下载「${taskName}」了，当前进度: ${progress}%`, true);
    return;
  }

  const activeDownloads = Object.keys(downloadingLinks).length;
  if (activeDownloads > 0) {
    e.reply(`正在下载「${taskName}」，请下载完成后再试`, true);
    return;
  }

  downloadingLinks[link] = {
    taskName,
    progress: 0,
    process: null
  };

  const command = `git clone ${link} ${path}`;
  const downloadProcess = exec(command);

  downloadingLinks[link].process = downloadProcess;

  downloadProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    if (output.includes('%')) {
      const progressMatch = output.match(/(\d+)%/);
      if (progressMatch) {
        downloadingLinks[link].progress = progressMatch[1];
      }
    }
  });

  downloadProcess.on('close', (code) => {
    if (code === 0) {
      e.reply(`报告主人！「${taskName}」下载完成`, true);
    } else {
      e.reply(`报告主人！小的无能，「${taskName}」下载失败`, true);
    }

    delete downloadingLinks[link];
  });

  downloadProcess.on('error', (err) => {
    e.reply(`报告主人！下载「${taskName}」出现了错误诶\n\n${err}`, true);
    delete downloadingLinks[link];
  });
}

function checkDownloadProgress(e, link) {
  if (downloadingLinks[link]) {
    const { taskName, progress } = downloadingLinks[link];
    e.reply(`「${taskName}」当前下载进度: ${progress}%`, true);
  } else {
    e.reply('没有找到相应的下载任务或任务已完成', true);
  }
}

export const down = {
  download: downloadGitRepo,
  check: checkDownloadProgress
};
