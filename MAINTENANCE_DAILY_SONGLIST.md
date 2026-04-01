# 日推歌单维护规范

本规范用于统一维护日推歌单文章，后续所有日推都按本文件执行。

## 适用范围

- 文章文件：`_posts/YYYY-MM-DD-daily-songlist-xx.md`
- 音频资源：`assets/media/*.mp3`
- 歌词资源：`assets/lyrics/*.lrc`
- 播放与歌词逻辑：`assets/js/daily-songlist.js`

## 固定格式（必须保持）

1. Front Matter

```yaml
---
title: 日推歌单 Vol.xx｜歌手《歌名》
date: YYYY-MM-DD HH:mm:ss +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG]
---
```

2. 歌单区结构（必须包含）

```html
<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
  <li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
    <button class="song-play" data-src="/assets/media/your-song.mp3" data-title="Your Song" type="button" aria-label="播放 Your Song" title="播放">▶</button>
    <span>Your Song</span>
  </li>
</ul>

<div style="margin-top: 14px;">
  <audio id="daily-player" controls preload="metadata" style="width:100%;">
    <source src="/assets/media/your-song.mp3" type="audio/mpeg">
    你的浏览器不支持 audio 标签
  </audio>
  <p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: Your Song</p>
</div>

<details style="margin-top:14px;">
  <summary>查看歌词文件（LRC）</summary>
  <p><a href="/assets/lyrics/your-song.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>
```

3. 同步歌词区（必须包含）

```html
<div id="lrc-panel" data-lrc="/assets/lyrics/your-song.lrc">
  <p style="margin: 8px 10px; color: var(--text-muted-color);">歌词加载中...</p>
</div>

<div id="lrc-tools">
  <button id="follow-toggle" type="button">歌词跟随：开</button>
  <button class="offset-step" type="button" data-step="-0.3">-0.3s</button>
  <span id="offset-label" class="offset-label">同步偏移：0.0s</span>
  <button class="offset-step" type="button" data-step="0.3">+0.3s</button>
  <button id="offset-reset" type="button">重置</button>
</div>

<script defer src="/assets/js/daily-songlist.js"></script>
```

## 每次更新流程

1. 准备文件
- 将音频复制为 `assets/media/<slug>.mp3`
- 将歌词复制为 `assets/lyrics/<slug>.lrc`
- 文件名使用英文小写和中划线（例如 `plazma.mp3`）

2. 修改文章
- 更新 `title`
- 更新推荐语两段
- 替换以下 4 处路径/歌名为同一个 `<slug>`：
  - `data-src`
  - `<audio><source src>`
  - `Now Playing`
  - `data-lrc` 与 LRC 链接

3. 校验
- 执行 `./tools/test.sh`
- 页面检查：
  - 播放按钮可播放
  - 歌词能从 LRC 读取（不长期停留“歌词加载中...”）
  - 歌词跟随只滚动歌词面板，不带动整页滚动
  - 偏移按钮 `±0.3s` 生效

## 常见问题处理

1. 歌词一直“加载中”
- 检查 `data-lrc` 路径是否正确
- 检查 `assets/lyrics/*.lrc` 是否实际存在
- 检查页面是否包含 `<script defer src="/assets/js/daily-songlist.js"></script>`

2. 歌词和音频不同步
- 先使用偏移按钮微调
- 若普遍偏移，确认 LRC 时间轴是否正确

3. 自动滚动带动整页滚动
- 保证歌词容器有 `overscroll-behavior: contain;`
- 不使用 `scrollIntoView`，应由 `daily-songlist.js` 控制 `#lrc-panel.scrollTo`

## 推荐语风格建议

- 第一段：声音与编曲质感（听感、层次、氛围）
- 第二段：作品语境与情绪（角色、命题、个人共鸣）
- 避免空泛形容，尽量写出画面感
