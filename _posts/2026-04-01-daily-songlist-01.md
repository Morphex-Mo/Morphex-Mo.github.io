---
title: 日推歌单 Vol.01｜如果相距很远，那我会开着高达来见你
date: 2026-04-01 19:58:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG]
---

#完成推荐语

今天想推荐的这首，是我私心很重的一曲。它有高达系作品一贯的辽阔感，也有米津玄师嗓音里那种克制而锋利的温度。前奏像夜空里缓慢推进的推进器，副歌却忽然把情绪抬到失重边缘，像人在漫长航道中，终于看见彼岸的灯。

如果说很多歌是在讲相遇，那么这首更像是在讲“抵达”：哪怕相隔再远，也会穿过噪声、穿过黑暗、穿过各自沉默的轨道，去见想见的人。它不是喧哗的热血，而是带着金属光泽的温柔。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
  <li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
    <button class="song-play" data-src="/assets/media/midnight-reflection.mp3" data-title="ミッドナイト・リフレクション" type="button">开始</button>
    <span>ミッドナイト・リフレクション</span>
  </li>
</ul>

<div style="margin-top: 14px;">
  <audio id="daily-player" controls preload="metadata" style="width:100%;">
    <source src="/assets/media/midnight-reflection.mp3" type="audio/mpeg">
    你的浏览器不支持 audio 标签
  </audio>
  <p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: ミッドナイト・リフレクション</p>
</div>

<details style="margin-top:14px;">
  <summary>查看歌词文件（LRC）</summary>
  <p><a href="/assets/lyrics/midnight-reflection.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>

## 歌词（中日双语 · 同步滚动）

> 曲名：ミッドナイト・リフレクション  
> 演唱：米津玄师  
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
    padding: 10px 8px;
    background: var(--card-bg);
    scroll-behavior: smooth;
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

<div id="lrc-panel" data-lrc="/assets/lyrics/midnight-reflection.lrc">
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
