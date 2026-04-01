class LyricsScroller {
  constructor(options = {}) {
    this.container = options.container || '#lyrics-container';
    this.audioElement = options.audioElement || 'audio';
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
      audio.addEventListener('play', () => this.updateLyrics());
    }
  }

  // 解析 LRC 格式：[mm:ss.xxx]歌词文本
  parseLRC(content) {
    const lines = content.split('\n');
    const lyrics = [];

    lines.forEach(line => {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{3})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const milliseconds = parseInt(match[3]);
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

    // 找到当前应该高亮的歌词行
    for (let i = this.lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= this.lyrics[i].time) {
        nextIndex = i;
        break;
      }
    }

    // 如果当前行改变，更新高亮
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
          // 滚动到当前行
          currentLine.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }
  }

  setLRC(url) {
    this.lrcFile = url;
    this.loadLyrics(url);
  }
}

// 全局导出
window.LyricsScroller = LyricsScroller;
