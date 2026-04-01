(function () {
  const player = document.getElementById('daily-player');
  const now = document.getElementById('now-playing');
  const buttons = document.querySelectorAll('#daily-playlist .song-play');
  const lrcPanel = document.getElementById('lrc-panel');
  const followToggle = document.getElementById('follow-toggle');
  const offsetLabel = document.getElementById('offset-label');
  const offsetButtons = document.querySelectorAll('.offset-step');
  const offsetReset = document.getElementById('offset-reset');

  if (!player || !lrcPanel) {
    return;
  }

  const lrcUrl = lrcPanel.getAttribute('data-lrc') || '/assets/lyrics/midnight-reflection.lrc';
  let lyricBlocks = [];
  let activeIndex = -1;
  let autoFollow = true;
  let lyricOffset = 0;

  function refreshControlText() {
    if (followToggle) {
      followToggle.textContent = '歌词跟随：' + (autoFollow ? '开' : '关');
    }
    if (offsetLabel) {
      const prefix = lyricOffset >= 0 ? '+' : '';
      offsetLabel.textContent = '同步偏移：' + prefix + lyricOffset.toFixed(1) + 's';
    }
  }

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
      if (text.startsWith('词：') || text.startsWith('曲：') || text.includes('著作权')) return;

      entries.push({ time: minute * 60 + second, text });
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
        if (Number.isFinite(t)) {
          player.currentTime = t;
          player.play().catch(() => {});
        }
      });
    });
  }

  function updateActiveLyric(currentTime) {
    if (!lyricBlocks.length) return;

    const syncedTime = Math.max(0, currentTime + lyricOffset);
    let idx = -1;

    for (let i = 0; i < lyricBlocks.length; i++) {
      if (syncedTime >= lyricBlocks[i].time) {
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
      if (autoFollow) {
        // 步骤1：计算让歌词在面板中心的滚动距离
        const itemTop = next.offsetTop;
        const itemHeight = next.offsetHeight;
        const panelHeight = lrcPanel.clientHeight;
        const panelScrollTop = itemTop - (panelHeight - itemHeight) / 2;
        
        // 步骤2：设置面板滚动
        lrcPanel.scrollTop = Math.max(0, Math.min(panelScrollTop, lrcPanel.scrollHeight - panelHeight));
        
        // 步骤3：让元素在浏览器窗口中心显示
        const rect = next.getBoundingClientRect();
        const offset = rect.top + window.scrollY - (window.innerHeight / 2) + (itemHeight / 2);
        window.scrollTo({ top: offset, behavior: 'auto' });
      }
    }

    activeIndex = idx;
  }

  async function loadLrc() {
    try {
      const resp = await fetch(lrcUrl, { cache: 'no-store' });
      if (!resp.ok) {
        throw new Error('LRC response status: ' + resp.status);
      }

      const text = await resp.text();
      lyricBlocks = parseLrc(text);
      renderLyrics(lyricBlocks);
      updateActiveLyric(player.currentTime || 0);
    } catch (err) {
      lrcPanel.innerHTML = '<p style="margin: 8px 10px; color: var(--text-muted-color);">歌词加载失败，请检查 LRC 路径或格式</p>';
      console.error('[daily-songlist] load LRC failed:', err);
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', async function () {
      const src = this.getAttribute('data-src');
      const title = this.getAttribute('data-title') || 'Unknown';
      if (!src) return;

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

  player.addEventListener('timeupdate', function () {
    updateActiveLyric(player.currentTime);
  });

  player.addEventListener('seeked', function () {
    updateActiveLyric(player.currentTime);
  });

  if (followToggle) {
    followToggle.addEventListener('click', function () {
      autoFollow = !autoFollow;
      refreshControlText();
    });
  }

  offsetButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const step = Number(this.getAttribute('data-step') || '0');
      if (!Number.isFinite(step)) return;
      lyricOffset = Math.max(-3, Math.min(3, Number((lyricOffset + step).toFixed(1))));
      refreshControlText();
      updateActiveLyric(player.currentTime);
    });
  });

  if (offsetReset) {
    offsetReset.addEventListener('click', function () {
      lyricOffset = 0;
      refreshControlText();
      updateActiveLyric(player.currentTime);
    });
  }

  refreshControlText();
  loadLrc();
})();
