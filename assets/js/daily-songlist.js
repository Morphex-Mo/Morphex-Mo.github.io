(function () {
  'use strict';

  function parseLrc(text) {
    var lines = text.split(/\r?\n/);
    var items = [];

    lines.forEach(function (line) {
      var m = line.match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/);
      if (!m) return;

      var mm = parseInt(m[1], 10);
      var ss = parseInt(m[2], 10);
      var frac = m[3] || '0';
      var ms = frac.length === 2 ? parseInt(frac, 10) * 10 : parseInt(frac, 10);
      var txt = (m[4] || '').trim();
      if (!txt) return;

      items.push({
        time: mm * 60 + ss + ms / 1000,
        text: txt
      });
    });

    items.sort(function (a, b) {
      return a.time - b.time;
    });

    return items;
  }

  function buildLrc(panel, data) {
    panel.innerHTML = '';

    data.forEach(function (item, i) {
      var row = document.createElement('div');
      row.className = 'lrc-item';
      row.dataset.index = String(i);
      row.dataset.time = String(item.time);

      var line = document.createElement('div');
      line.className = 'lrc-line';
      line.textContent = item.text;

      row.appendChild(line);
      panel.appendChild(row);
    });
  }

  function bind() {
    var player = document.getElementById('daily-player');
    var panel = document.getElementById('lrc-panel');
    var followBtn = document.getElementById('follow-toggle');
    var offsetLabel = document.getElementById('offset-label');
    var offsetBtns = document.querySelectorAll('.offset-step');
    var resetBtn = document.getElementById('offset-reset');

    if (!player || !panel) return;

    var lrcUrl = panel.getAttribute('data-lrc');
    if (!lrcUrl) return;

    var items = [];
    var active = -1;
    var follow = true;
    var offset = 0;

    // Use instant scrolling for timeupdate-driven sync to avoid lagging behind.
    panel.style.scrollBehavior = 'auto';

    fetch(lrcUrl)
      .then(function (r) {
        if (!r.ok) throw new Error('Load LRC failed');
        return r.text();
      })
      .then(function (txt) {
        items = parseLrc(txt);
        if (!items.length) {
          panel.innerHTML = '<p style="margin:8px 10px; color: var(--text-muted-color);">歌词为空或格式不正确</p>';
          return;
        }
        buildLrc(panel, items);
      })
      .catch(function () {
        panel.innerHTML = '<p style="margin:8px 10px; color: var(--text-muted-color);">歌词加载失败</p>';
      });

    function updateOffsetLabel() {
      if (!offsetLabel) return;
      offsetLabel.textContent = '同步偏移：' + offset.toFixed(1) + 's';
    }

    function setActive(idx) {
      if (idx === active) return;

      if (active >= 0) {
        var prev = panel.querySelector('.lrc-item[data-index="' + active + '"]');
        if (prev) prev.classList.remove('active');
      }

      active = idx;
      if (active < 0) return;

      var cur = panel.querySelector('.lrc-item[data-index="' + active + '"]');
      if (!cur) return;

      cur.classList.add('active');

      if (follow) {
        centerLine(cur);
      }
    }

    function centerLine(el) {
      var panelRect = panel.getBoundingClientRect();
      var elRect = el.getBoundingClientRect();

      // Calculate target scroll by visual centers to avoid offset/padding drift.
      var delta = (elRect.top + elRect.height / 2) - (panelRect.top + panelRect.height / 2);
      var target = panel.scrollTop + delta;

      var maxScroll = panel.scrollHeight - panel.clientHeight;
      if (target < 0) target = 0;
      if (target > maxScroll) target = maxScroll;

      panel.scrollTop = target;
    }

    function locate(t) {
      var l = 0;
      var r = items.length - 1;
      var ans = -1;
      while (l <= r) {
        var m = (l + r) >> 1;
        if (items[m].time <= t) {
          ans = m;
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
      return ans;
    }

    player.addEventListener('timeupdate', function () {
      if (!items.length) return;
      var t = player.currentTime + offset;
      setActive(locate(t));
    });

    panel.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== panel && !el.classList.contains('lrc-item')) {
        el = el.parentElement;
      }
      if (!el || el === panel) return;

      var t = parseFloat(el.dataset.time || '0');
      if (!Number.isNaN(t)) {
        player.currentTime = Math.max(0, t - offset);
        if (follow) {
          centerLine(el);
        }
      }
    });

    if (followBtn) {
      followBtn.addEventListener('click', function () {
        follow = !follow;
        followBtn.textContent = '歌词跟随：' + (follow ? '开' : '关');
        if (follow && active >= 0) {
          var cur = panel.querySelector('.lrc-item[data-index="' + active + '"]');
          if (cur) centerLine(cur);
        }
      });
    }

    offsetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = parseFloat(btn.getAttribute('data-step') || '0');
        if (!Number.isNaN(step)) {
          offset += step;
          updateOffsetLabel();
        }
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        offset = 0;
        updateOffsetLabel();
      });
    }

    updateOffsetLabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
