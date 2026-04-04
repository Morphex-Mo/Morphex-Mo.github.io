---
title: 日推歌单 Vol.05｜八奈见杏菜(CV.远野ひかる)《LOVE2000》
date: 2026-04-04 20:00:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG]
---

今天想推荐的，是《败犬女主太多了！》ED《LOVE2000》。这首歌和作品本身一样，表面上带着一点轻飘飘的恋爱喜剧感，实际上却把角色那种“嘴上不承认、心里早就乱掉了”的情绪写得很准。旋律很顺耳，副歌也足够洗脑，属于听一遍就会在脑子里反复回放的类型。

八奈见杏菜的角色气质本来就很强，这首歌又把她那种有点笨拙、又有点可爱的败犬感放大了出来。它不是那种一上来就很燃的歌，而是更像把日常里那些小小的心动、失落和逞强，慢慢揉进旋律里。对看过正片的人来说，代入感会更强一些。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
  <li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
    <button class="song-play" data-src="/assets/media/love2000.mp3" data-title="LOVE2000" type="button" aria-label="播放 LOVE2000" title="播放">▶</button>
    <span>LOVE2000</span>
  </li>
</ul>

<div style="margin-top: 14px;">
  <audio id="daily-player" controls preload="metadata" style="width:100%;">
    <source src="/assets/media/love2000.mp3" type="audio/mpeg">
    你的浏览器不支持 audio 标签
  </audio>
  <p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: LOVE2000</p>
</div>

<details style="margin-top:14px;">
  <summary>查看歌词文件（LRC）</summary>
  <p><a href="/assets/lyrics/love2000.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>

## 歌词（中日双语 · 同步滚动）

> 曲名：LOVE2000  
> 演唱：八奈见杏菜(CV.远野ひかる)  
> 作品：《败犬女主太多了！》ED  
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

<div id="lrc-panel" data-lrc="/assets/lyrics/love2000.lrc">
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