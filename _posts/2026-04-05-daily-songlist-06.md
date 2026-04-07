---
title: 日推歌单 Vol.06｜《明日方舟》EP《秋绪》
date: 2026-04-05 20:00:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG, 明日方舟]
---

今天的日推想留给《明日方舟》EP《秋绪》。这首歌的听感不是那种直接冲击情绪的类型，而是更像一阵慢慢铺开的风：前段克制、后段抬升，层次一点点推上来，把“秋天将尽但情绪未散”的余味拉得很长。

它最打动人的地方，在于旋律里那种温柔又疏离的平衡感。你会感觉它在讲离别，也在讲和解；像是把很多说不出口的话，交给编曲和人声去完成。晚上戴耳机听会非常有画面感，适合安静地循环。每次听到它，就仿佛亲眼看到了日本泡沫经济破碎之前欣欣向荣的景象。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
	<li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
		<button class="song-play" data-src="/assets/media/qiuxu.mp3" data-title="秋绪" type="button" aria-label="播放 秋绪" title="播放">▶</button>
		<span>秋绪</span>
	</li>
</ul>

<div style="margin-top: 14px;">
	<audio id="daily-player" controls preload="metadata" style="width:100%;">
		<source src="/assets/media/qiuxu.mp3" type="audio/mpeg">
		你的浏览器不支持 audio 标签
	</audio>
	<p id="now-playing" style="margin:8px 0 0; color:#9aa0a6;">Now Playing: 秋绪</p>
</div>

<details style="margin-top:14px;">
	<summary>查看歌词文件（LRC）</summary>
	<p><a href="/assets/lyrics/qiuxu.lrc" target="_blank" rel="noopener">打开 LRC 歌词</a></p>
</details>

## 歌词（同步滚动）

> 曲名：秋绪  
> 作品：《明日方舟》EP  
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

<div id="lrc-panel" data-lrc="/assets/lyrics/qiuxu.lrc">
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
