---
title: 日推歌单 Vol.01｜loong《spiral》
date: 2026-03-31 20:15:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG]
---

今天想推荐的，是loong乐队为《无职转生Ⅱ》献上的片头曲《spiral》。这是一首关于成长的摇滚宣言——吉他音色热烈而纯粹，鼓声节奏感鲜明有力，贝斯沉稳而富有弹性。整曲在张力和释放之间不断切换，像是在演奏一次次突破自我边界的过程。

loong的主唱在这首歌里演绎的不是绝望后的奋起，而是更温暖的力量——那种"我知道会跌倒，但我选择继续向前"的坚定。它适合所有在异世界里重新开始的灵魂：无论是起点多么微末，每一步都值得被认真对待。这不是燃烧殆尽的乐章，而是生命长跑中那份持久的热度。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
  <li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
    <button class="song-play" data-src="/assets/media/spiral.mp3" data-title="spiral" type="button" aria-label="播放 spiral" title="播放">▶</button>
    <span>spiral</span>
  </li>
</ul>

<div style="margin-top: 14px;">
  <audio id="daily-player" controls preload="metadata" style="width:100%;">
    <source src="/assets/media/spiral.mp3" type="audio/mpeg">
    你的浏览器不支持 audio 标签
  </audio>
  <p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: spiral</p>
</div>

<details style="margin-top:14px;">
  <summary>查看歌词文件（LRC）</summary>
  <p><a href="/assets/lyrics/spiral.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>

## 歌词（中日双语 · 同步滚动）

> 曲名：spiral  
> 演唱：loong  
> 作品：《无职转生Ⅱ》片头曲  
> 说明：歌词会随播放进度自动高亮并滚动，点击任意行可跳转到对应时间。

<style>
  #lrc-tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 8px 0 10px;
  }

  #lrc-tools button {
    border: 1px solid var(--btn-border-color);
    background: var(--button-bg);
    color: var(--text-color);
    border-radius: 8px;
    padding: 4px 10px;
    cursor: pointer;
  }

  #lrc-tools .offset-label {
    color: var(--text-muted-color);
    font-size: 0.92em;
    padding: 0 2px;
  }

  #lrc-panel {
    max-height: 420px;
    overflow-y: auto;
    border: 1px solid var(--main-border-color);
    border-radius: 12px;
    padding: 10px 14px 10px 8px;
    background: var(--card-bg);
    scroll-behavior: auto;
    scrollbar-gutter: stable;
  }

  .lrc-item {
    padding: 10px 12px;
    margin: 4px 0;
    border-radius: 10px;
    opacity: 0.6;
    transition: opacity 0.2s ease, background-color 0.2s ease;
    cursor: pointer;
  }

  .lrc-item.active {
    opacity: 1;
    background: var(--sidebar-hover-bg);
    box-shadow: inset 0 0 0 1px var(--btn-border-color);
  }

  .lrc-line {
    line-height: 1.7;
  }

  .lrc-line.sub {
    color: var(--text-muted-color);
    font-size: 0.95em;
  }
</style>

<div id="lrc-panel" data-lrc="/assets/lyrics/spiral.lrc">
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
