# 个人主页

一个深色科技风格的单页个人网站，包含：关于我、技能、经历、联系方式。

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面结构与文字内容 |
| `style.css` | 全部样式（配色、布局、动画） |
| `script.js` | 导航、滚动动画、打字效果、复制邮箱等交互 |

## 如何查看

直接双击 `index.html` 即可在浏览器中打开，无需安装任何依赖。

## 内容状态

已按提供的信息填写：姓名、身份（学生）、个人简介、专业技能、实践经历。

仍需替换的占位信息：

1. **所在地**：目前是「中国 · 某城市」，出现在 Hero、个人卡片与终端卡片中。
2. **邮箱**：`hello@example.com`（`mailto:` 链接与复制按钮的 `data-copy`）。
3. **社交链接**：GitHub、掘金、X / Twitter 目前指向各平台首页。
4. **头像**：目前是渐变圆 + `ZRM` 缩写，可替换为图片：

```html
<div class="avatar avatar-img">
  <img src="avatar.jpg" alt="张芮铭" />
</div>
```

并在 `style.css` 中补充：

```css
.avatar-img { padding: 0; overflow: hidden; }
.avatar-img img { width: 100%; height: 100%; object-fit: cover; }
```

## 修改配色

打开 `style.css` 顶部的 `:root`，修改以下变量即可整体换色：

```css
--bg: #05070d;        /* 背景 */
--text: #e8eefb;      /* 正文 */
--muted: #8ea0bb;     /* 次要文字 */
--accent: #22d3ee;    /* 主强调色（青） */
--accent-2: #a78bfa;  /* 次强调色（紫） */
--gradient: linear-gradient(120deg, #22d3ee, #818cf8, #c084fc);
```

## 部署

纯静态站点，任选其一：

- **GitHub Pages**：把整个文件夹推到仓库，Settings → Pages 选择分支即可。
- **Vercel / Netlify**：拖拽整个文件夹上传，自动发布。
- **任意静态服务器**：上传文件后用 Nginx / Apache 托管。

## 小提示

- 页面已适配手机、平板与桌面，并支持 `prefers-reduced-motion`（自动关闭动画）。
- 顶部导航会随滚动高亮当前板块。
- 联系板块的「复制」按钮会把邮箱写入剪贴板。
