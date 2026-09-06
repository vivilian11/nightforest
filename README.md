# Nightforest 角色卡藏馆

存一些自己做的角色卡和世界书，感谢Claude帮忙做的小网页。

在线地址：https://vivilian11.github.io/nightforest/

## 新增 / 更新角色卡

1. 把角色卡的 `.json`（必须）和同名 `.png` 立绘（可选）放进 `cards/` 目录
2. 重新生成清单：

   ```bash
   node build.js
   ```

3. 提交并推送，网站会在一两分钟内自动更新：

   ```bash
   git add cards/ cards.json
   git commit -m "新增角色卡：XXX"
   git push
   ```

## 目录说明

- `cards/` —— 会被网站展示 / 下载的角色卡（json + 同名 png）
- `cards.json` —— 由 `build.js` 自动生成的清单，网页读这个文件渲染画廊，**不要手动改**
- 根目录下个别没放进 `cards/` 的角色卡 / 世界书文件，是特意留着不上网站的，别手滑挪进去就好

## 内容提示

站内角色卡含成人向内容，仅供 18 周岁以上人士浏览，首页有年龄确认弹窗。角色卡仅供个人娱乐与创作交流使用，请勿用于商业用途或恶意传播。
