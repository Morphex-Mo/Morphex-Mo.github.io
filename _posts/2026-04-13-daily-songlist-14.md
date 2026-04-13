---
title: 日推歌单 Vol.14｜SawanoHiroyuki[nZk]《LilaS》
date: 2026-04-13 20:00:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG, 86不存在的战区]
---

今天的日推是《86-不存在的战区-》最终集片尾曲《LilaS》。这首歌没有把情绪往外推得很满，而是用很柔和的旋律和逐渐展开的编曲，把告别、回望和余温慢慢铺开，听起来安静，但后劲很强。

SawanoHiroyuki[nZk] 和 たかはしほのか 的组合让整首歌有一种轻盈又克制的漂浮感，像是把一路走来的伤痕和希望都收进花束里。放在《86》的结尾去听，会更容易感受到那种“终于抵达，但并不真正结束”的空落与温柔。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
	<li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
		<button class="song-play" data-src="/assets/media/lilas.mp3" data-title="LilaS" type="button" aria-label="播放 LilaS" title="播放">▶</button>
		<span>LilaS</span>
	</li>
</ul>

<div style="margin-top: 14px;">
	<audio id="daily-player" controls preload="metadata" style="width:100%;">
		<source src="/assets/media/lilas.mp3" type="audio/mpeg">
		你的浏览器不支持 audio 标签
	</audio>
	<p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: LilaS</p>
</div>

<details style="margin-top:14px;">
	<summary>查看歌词文件（LRC）</summary>
	<p><a href="/assets/lyrics/lilas.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>

## 歌词（同步滚动）

> 曲名：LilaS  
> 演唱：SawanoHiroyuki[nZk] / たかはしほのか  
> 作品：《86-不存在的战区-》最终集片尾曲  
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

<div id="lrc-panel" data-lrc="/assets/lyrics/lilas.lrc">
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
