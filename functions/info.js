import fs from 'fs';

async function info() {
  let pluginPath = `${process.cwd()}/plugins/GuGuZhou-plugin/`;
  let pluginData = JSON.parse(await fs.readFileSync(`${pluginPath}package.json`, 'utf8'));
  return pluginData;
}

export { info };