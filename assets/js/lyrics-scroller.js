class LyricsScroller {
  constructor(options = {}) {
    this.container = options.container || '#lyrics-container';
    this.audioElement = options.audioElement || '#lyrics-audio';
    this.lrcFile = options.lrcFile || '';
    this.lyrics = [];
    this.currentIndex = -1;

    this.init();
  }

  async init() {
    if (this.lrcFile) {
      await this.loadLyrics(this.lrcFile);
    }

    const audio = document.querySelector(this.audioElement);
    if (audio) {
      audio.addEventListener('timeupdate', () => this.updateLyrics());
    }

    // 只在容器上添加事件处理，不影响整个页面
    this.setupContainerEvents();
  }

  setupContainerEvents() {
    const container = document.querySelector(this.container);
    if (!container) return;

    // 防止鼠标滚轮在容器上触发页面滚动
    container.addEventListener('wheel', (e) => {
      // 允许容器内部滚动
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom = container.scrollTop >= container.scrollHeight - container.clientHeight - 5;

      // 只有在容器到达边界时才阻止冒泡
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
      }
    }, { passive: false });

    // 防止触摸滚动冒泡
    container.addEventListener('touchmove', (e) => {
      // 检查是否可以继续滚动
      const touch = e.touches[0];
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom = container.scrollTop >= container.scrollHeight - container.clientHeight - 5;
      
      if ((touch.clientY > 0 && isAtTop) || (touch.clientY < 0 && isAtBottom)) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  parseLRC(content) {
    const lines = content.split('\n');
    const lyrics = [];

    lines.forEach(line => {
      const match = line.match(/\[(\d{1,2}):(\d{2})\.(\d{2,3})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        let milliseconds = parseInt(match[3]);

        if (match[3].length === 2) {
          milliseconds = milliseconds * 10;
        }

        const text = match[4].trim();

        const time = minutes * 60 + seconds + milliseconds / 1000;
        if (text) {
          lyrics.push({ time, text });
        }
      }
    });

    return lyrics.sort((a, b) => a.time - b.time);
  }

  async loadLyrics(url) {
    try {
      const response = await fetch(url);
      const content = await response.text();
      this.lyrics = this.parseLRC(content);
      this.renderLyrics();
    } catch (error) {
      console.error('Failed to load lyrics:', error);
    }
  }

  renderLyrics() {
    const container = document.querySelector(this.container);
    if (!container) return;

    container.innerHTML = '';
    this.lyrics.forEach((lyric, index) => {
      const line = document.createElement('div');
      line.className = 'lyrics-line';
      line.dataset.index = index;
      line.textContent = lyric.text;
      container.appendChild(line);
    });
  }

  updateLyrics() {
    const audio = document.querySelector(this.audioElement);
    if (!audio) return;

    const currentTime = audio.currentTime;
    let nextIndex = -1;

    if (this.lyrics.length > 0) {
      let left = 0;
      let right = this.lyrics.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (this.lyrics[mid].time <= currentTime) {
          nextIndex = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }

    if (nextIndex !== this.currentIndex) {
      if (this.currentIndex >= 0) {
        const prevLine = document.querySelector(
          `.lyrics-line[data-index="${this.currentIndex}"]`
        );
        if (prevLine) prevLine.classList.remove('active');
      }

      this.currentIndex = nextIndex;

      if (nextIndex >= 0) {
        const currentLine = document.querySelector(
          `.lyrics-line[data-index="${nextIndex}"]`
        );
        if (currentLine) {
          currentLine.classList.add('active');
          this.scrollToLine(currentLine);
        }
      }
    }
  }

  scrollToLine(line) {
    const container = document.querySelector(this.container);
    if (!container) return;

    const lineTop = line.offsetTop;
    const containerHeight = container.clientHeight;
    const lineHeight = line.offsetHeight;

    // 计算目标滚动位置使歌词居中
    const targetScroll = lineTop - (containerHeight / 2) + (lineHeight / 2);

    // 直接设置滚动位置
    container.scrollTop = targetScroll;
  }

  setLRC(url) {
    this.lrcFile = url;
    this.loadLyrics(url);
  }
}

window.LyricsScroller = LyricsScroller;
