// 扫描 cards/ 目录，重新生成 cards.json 清单。
// 每次新增/修改/删除角色卡后，运行一次：node build.js
const fs = require('fs');
const path = require('path');

const CARDS_DIR = path.join(__dirname, 'cards');

function buildManifest() {
  const files = fs.readdirSync(CARDS_DIR);
  const jsonFiles = files.filter((f) => f.toLowerCase().endsWith('.json'));

  const manifest = jsonFiles.map((jsonFile) => {
    const base = jsonFile.slice(0, -5);
    const hasImage = files.includes(base + '.png');

    let name = base;
    let tags = [];
    let summary = '';
    try {
      const raw = fs.readFileSync(path.join(CARDS_DIR, jsonFile), 'utf-8');
      const data = JSON.parse(raw);
      name = data.name || data.data?.name || base;
      tags = data.tags || data.data?.tags || [];
      const desc = data.description || data.data?.description || '';
      summary = desc.slice(0, 120);
    } catch (e) {
      console.error(`解析卡片失败: ${jsonFile}`, e.message);
    }

    return { id: base, name, tags, summary, hasImage };
  });

  fs.writeFileSync(
    path.join(__dirname, 'cards.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`已生成 cards.json，共 ${manifest.length} 张卡片。`);
}

buildManifest();
