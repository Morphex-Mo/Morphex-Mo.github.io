---
title: 日推歌单 Vol.04｜LiSA《crossing field》
date: 2026-04-03 12:00:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG]
---

今天想推荐的，是《刀剑神域》第一季艾恩葛朗特篇 OP《crossing field》。这首歌的前奏一响就有“开局即冲刺”的速度感：电子音色和鼓点推进得非常直接，副歌却在爆发里留出一丝清澈，让热血和希望同时成立。

LiSA在这首歌里的演唱非常有“破壁感”，既像是在对抗未知世界的压迫，也像是在给同伴和自己打气。它最迷人的地方在于不回避恐惧，却始终把视线投向前方，正如歌名所写，跨越那条分界线之后，故事才真正开始。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
  <li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
    <button class="song-play" data-src="/assets/media/crossingfield.mp3" data-title="crossing field" type="button" aria-label="播放 crossing field" title="播放">▶</button>
    <span>crossing field</span>
  </li>
</ul>

<div style="margin-top: 14px;">
  <audio id="daily-player" controls preload="metadata" style="width:100%;">
    <source src="/assets/media/crossingfield.mp3" type="audio/mpeg">
    你的浏览器不支持 audio 标签
  </audio>
  <p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: crossing field</p>
</div>

<details style="margin-top:14px;">
  <summary>查看歌词文件（LRC）</summary>
  <p><a href="/assets/lyrics/crossingfield.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>

## 歌词（中日双语 · 同步滚动）

> 曲名：crossing field  
> 演唱：LiSA  
> 作品：《刀剑神域》第一季片头曲  
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

<div id="lrc-panel" data-lrc="/assets/lyrics/crossingfield.lrc">
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
