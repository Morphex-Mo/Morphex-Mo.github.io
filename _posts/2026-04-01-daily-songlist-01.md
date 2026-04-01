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

<div id="lrc-panel">
  <p style="margin: 8px 10px; color: var(--text-muted-color);">歌词加载中...</p>
</div>

<script>
  (function () {
    const player = document.getElementById('daily-player');
    const now = document.getElementById('now-playing');
    const buttons = document.querySelectorAll('#daily-playlist .song-play');
    const lrcPanel = document.getElementById('lrc-panel');
    const lrcUrl = '/assets/lyrics/midnight-reflection.lrc';
    let lyricBlocks = [];
    let activeIndex = -1;

    function parseLrc(raw) {
      const rows = raw.split(/\r?\n/);
      const lineRegex = /^\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\](.*)$/;
      const entries = [];

      rows.forEach((row) => {
        const match = row.match(lineRegex);
        if (!match) return;

        const minute = Number(match[1]);
        const second = Number(match[2]);
        const text = (match[3] || '').trim();
        if (!text) return;

        entries.push({
          time: minute * 60 + second,
          text
        });
      });

      entries.sort((a, b) => a.time - b.time);

      const grouped = [];
      const mergeWindow = 0.08;

      entries.forEach((item) => {
        const last = grouped[grouped.length - 1];
        if (last && Math.abs(item.time - last.time) <= mergeWindow) {
          last.lines.push(item.text);
        } else {
          grouped.push({ time: item.time, lines: [item.text] });
        }
      });

      return grouped;
    }

    function renderLyrics(blocks) {
      if (!lrcPanel) return;

      if (!blocks.length) {
        lrcPanel.innerHTML = '<p style="margin: 8px 10px; color: var(--text-muted-color);">未解析到歌词内容</p>';
        return;
      }

      const html = blocks
        .map((block, i) => {
          const lines = block.lines
            .map((line, idx) => '<div class="lrc-line ' + (idx > 0 ? 'sub' : '') + '">' + line + '</div>')
            .join('');
          return '<div class="lrc-item" data-idx="' + i + '" data-time="' + block.time + '">' + lines + '</div>';
        })
        .join('');

      lrcPanel.innerHTML = html;

      lrcPanel.querySelectorAll('.lrc-item').forEach((item) => {
        item.addEventListener('click', function () {
          const t = Number(this.getAttribute('data-time') || '0');
          if (player && Number.isFinite(t)) {
            player.currentTime = t;
            player.play().catch(() => {});
          }
        });
      });
    }

    function updateActiveLyric(currentTime) {
      if (!lyricBlocks.length || !lrcPanel) return;

      let idx = -1;
      for (let i = 0; i < lyricBlocks.length; i++) {
        if (currentTime >= lyricBlocks[i].time) {
          idx = i;
        } else {
          break;
        }
      }

      if (idx === activeIndex || idx < 0) return;

      const prev = lrcPanel.querySelector('.lrc-item.active');
      if (prev) prev.classList.remove('active');

      const next = lrcPanel.querySelector('.lrc-item[data-idx="' + idx + '"]');
      if (next) {
        next.classList.add('active');
        next.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }

      activeIndex = idx;
    }

    async function loadLrc() {
      if (!lrcPanel) return;

      try {
        const resp = await fetch(lrcUrl, { cache: 'no-store' });
        if (!resp.ok) {
          throw new Error('load failed');
        }

        const text = await resp.text();
        lyricBlocks = parseLrc(text);
        renderLyrics(lyricBlocks);
      } catch (err) {
        lrcPanel.innerHTML = '<p style="margin: 8px 10px; color: var(--text-muted-color);">歌词加载失败，请打开上方 LRC 文件查看</p>';
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', async function () {
        const src = this.getAttribute('data-src');
        const title = this.getAttribute('data-title') || 'Unknown';
        if (!src || !player) return;

        if (!player.src || !player.src.endsWith(src)) {
          player.src = src;
        }

        try {
          await player.play();
          if (now) {
            now.textContent = 'Now Playing: ' + title;
          }
        } catch (err) {
          if (now) {
            now.textContent = '播放失败，请手动点击播放器播放。';
          }
        }
      });
    });

    if (player) {
      player.addEventListener('timeupdate', function () {
        updateActiveLyric(player.currentTime);
      });

      player.addEventListener('seeked', function () {
        updateActiveLyric(player.currentTime);
      });
    }

    loadLrc();
  })();
</script>
