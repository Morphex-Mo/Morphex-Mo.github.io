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

    // 防止容器内的滚动冒泡到页面
    const container = document.querySelector(this.container);
    if (container) {
      // 处理鼠标滚轮事件
      container.addEventListener('wheel', (e) => {
        // 允许容器内部滚动，防止冒泡到页面
        const canScrollUp = container.scrollTop > 0;
        const canScrollDown = container.scrollTop < (container.scrollHeight - container.clientHeight);
        
        if ((e.deltaY < 0 && !canScrollUp) || (e.deltaY > 0 && !canScrollDown)) {
          e.preventDefault();
        }
      }, { passive: false });
      
      // 防止触摸滚动冒泡
      container.addEventListener('touchmove', (e) => {
        e.stopPropagation();
      }, { passive: false });
    }
    
    // 防止键盘滚动（Space、Page Down等）影响页面
    document.addEventListener('keydown', (e) => {
      if (document.activeElement === document.querySelector(this.container) || 
          document.querySelector(this.container).contains(document.activeElement)) {
        if (['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown'].includes(e.key)) {
          e.preventDefault();
          return false;
        }
      }
    }, true);
  }

  // 解析 LRC 格式：[mm:ss.xxx]歌词文本
  parseLRC(content) {
    const lines = content.split('\n');
    const lyrics = [];

    lines.forEach(line => {
      // 匹配时间戳，支持 [mm:ss.xxx] 或 [mm:ss.xx] 格式
      const match = line.match(/\[(\d{1,2}):(\d{2})\.(\d{2,3})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        let milliseconds = parseInt(match[3]);
        
        // 如果只有两位毫秒，补到三位
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

    // 找到当前应该高亮的歌词行 - 使用二分查找以提高性能
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
          
          // 在容器内滚动到当前行
          const container = document.querySelector(this.container);
          if (container) {
            const lineTop = currentLine.offsetTop;
            const containerHeight = container.clientHeight;
            const lineHeight = currentLine.offsetHeight;
            
            // 计算滚动位置，使当前行居中
            const targetScroll = lineTop - (containerHeight / 2) + (lineHeight / 2);
            
            // 立即更新滚动位置（不使用smooth以避免多次触发scrollTo）
            // requestAnimationFrame 确保在DOM更新后执行
            requestAnimationFrame(() => {
              container.scrollTop = targetScroll;
            });
          }
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
