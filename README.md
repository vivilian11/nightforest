# Nightforest 角色卡藏馆

存一些自己做的角色卡和世界书，做成一个纯静态网页，方便直接甩链接给粉丝浏览 / 下载。

## 本地预览

纯静态站，随便起个本地服务器看效果都行，例如：

```bash
npx serve .
```

## 新增 / 更新角色卡

1. 把角色卡的 `.json`（必须）和同名 `.png` 立绘（可选）放进 `cards/` 目录
2. 重新生成清单：

   ```bash
   node build.js
   ```

   （执行前确保本地有 Node，不需要装任何依赖）
3. 把改动提交并推送到 GitHub，网站会在几十秒内自动更新：

   ```bash
   git add cards/ cards.json
   git commit -m "新增角色卡：XXX"
   git push
   ```

## 部署到 GitHub Pages（一次性设置）

1. 把整个仓库 push 到 GitHub（如果还没 push）
2. 打开仓库的 **Settings → Pages**
3. Source 选 **Deploy from a branch**，Branch 选 `main`，目录选 `/ (root)`，保存
4. 等一两分钟，页面会给出一个形如 `https://vivilian11.github.io/nightforest/` 的链接，把这个链接发给粉丝即可，点开直达，不需要他们做任何操作

## 目录说明

- `cards/` —— 会被网站展示 / 下载的角色卡（json + 同名 png）
- `cards.json` —— 由 `build.js` 自动生成的清单，网页读这个文件渲染画廊，**不要手动改**
- `index.html` / `styles.css` / `app.js` —— 前端页面（打包下载用了浏览器端的 JSZip，不需要后端）
- `build.js` —— 重新生成 `cards.json` 的脚本

## ⚠️ 关于 Keegan.json / Keegan.png

这两个文件故意留在仓库根目录、没被放进 `cards/`，所以不会出现在网站的画廊或下载里（含兄妹向内容，不适合公开分发）。

但要注意：**如果这个仓库在 GitHub 上是 Public 的，这两个文件本身依然可以被任何人通过仓库文件列表或直接链接看到**——"不在网站清单里"只是网站不展示/不下载它，并不等于仓库里完全隐藏。如果你想让它彻底不出现在公开仓库里，需要把它从 git 里删除（包括历史记录），可以让我帮你处理。

## 内容提示

站内角色卡含成人向内容，仅供 18 周岁以上人士浏览，首页有年龄确认弹窗。角色卡仅供个人娱乐与创作交流使用，请勿用于商业用途或恶意传播。
