---
layout: page
icon: fas fa-music
title: 歌词播放器
permalink: /lyrics/
comments: true
---

<div class="lyrics-demo">
  {% include lyrics-player.html %}
</div>

<style>
  .lyrics-demo {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
  }

  .lyrics-widget {
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.05), rgba(150, 100, 255, 0.05));
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(100, 200, 255, 0.2);
  }
</style>

## 使用说明

这是一个 **LRC 歌词同步播放器**，具有以下功能：

### ✨ 功能特性
- 📝 **LRC 格式解析** - 自动解析标准 LRC 歌词文件
- 🎵 **实时同步** - 歌词与音频时间完美同步
- 📱 **响应式设计** - 支持桌面和移动设备
- 🎨 **深色模式** - 自动适配系统主题
- 🖱️ **平滑滚动** - 当前歌词自动居中显示

### 🎬 支持的歌曲
- **Plazma** - 米津玄師
- **Spiral** - LONGMAN

### 📎 如何在你的页面中使用

在任何 Jekyll 页面中包含组件：

```liquid
{% raw %}{% include lyrics-player.html %}{% endraw %}
```

### 🔧 JavaScript API

如果需要程序化控制：

```javascript
const scroller = new LyricsScroller({
  container: '#lyrics-container',      // 歌词容器选择器
  audioElement: '#lyrics-audio',       // 音频元素选择器
  lrcFile: '/assets/lyrics/plazma.lrc' // LRC 文件路径
});

// 切换歌词文件
scroller.setLRC('/assets/lyrics/spiral.lrc');
```

### 🎵 添加新歌曲

1. 将 LRC 文件放在 `/assets/lyrics/` 目录
2. 在 `_includes/lyrics-player.html` 中添加按钮（可选）
3. 对应的音频文件放在 `/assets/audio/` 目录（可选）

## 评论区

{% if site.comments.provider == 'utterances' and page.comments != false %}
{% include comments/utterances.html %}
{% endif %}
