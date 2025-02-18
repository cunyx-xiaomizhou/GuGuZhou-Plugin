import fs from 'fs';

async function config(fileName, key, Key) {
  const config_path = process.cwd() + '/plugins/xmz-plugin/config/config/';
  let filePath = config_path + fileName + '.json';
  let content = await fs.readFileSync(filePath);
  let Json = await JSON.parse(content);
  
  return (Key && Key in Json.config && key in Json.config[Key]) ? Json.config[Key][key] : Json.config[key];
}

export { config };
