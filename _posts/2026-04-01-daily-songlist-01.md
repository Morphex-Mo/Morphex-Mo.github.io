---
title: 日推歌单 Vol.01｜如果相距很远，那我会开着高达来见你
date: 2026-04-01 19:58:00 +0800
categories: [Music]
tags: [日推歌单, 动漫音乐, ACG]
---

今天这期先放你给的主推曲，播放器支持点击“开始”立即播放。

## 歌单

<ul id="daily-playlist" style="list-style:none; padding-left:0; margin:0;">
  <li style="display:flex; align-items:center; gap:12px; margin:10px 0;">
    <button class="song-play" data-src="/assets/media/midnight-reflection.mp3" data-title="ミッドナイト・リフレクション" type="button">开始</button>
    <span>ミッドナイト・リフレクション</span>
  </li>

  <li style="display:flex; align-items:center; gap:12px; margin:10px 0; opacity:0.7;">
    <button type="button" disabled>开始</button>
    <span>第二首（待补充音频文件）</span>
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

## 歌词（中日双语）

> 曲名：ミッドナイト・リフレクション
>
> 词：+α/あるふぁきゅん。/水野あつ
>
> 曲：水野あつ

我一直都明白

ずっと僕は分かってた

一直都明白

分かってた

即便悲伤的事情与日俱增

悲しい事増えていく

我们也要努力地生活下去

僕らは日々を跨ぐの

原原本本的自己

ありのままの自分がね

绽放着最耀眼的光芒

一番輝いてるよ

我时常陷入沉思之中

考えてしまう

把自己的心逼向了崩溃的境地

心壊れていく

明明不应该是这样的啊

こんなはずじゃないの

尽管现实和理想相距甚远

理想には程遠いけど

此时此刻 我也仍努力地活着

今 生きている

任谁都难免会失去

失うことは誰にもあるよ

一步一步前进的我们

一つずつ進んでいく僕たちは

逐渐随波逐流 逐渐天各一方

流されていく 離れていく

星光如此耀眼

星空が眩しくて

我下意识地移开了目光

目を逸らした

没关系 没关系

大丈夫 大丈夫

哪怕途中和人群走散也没关系

途中で逸れて良い

我不是孤独一人

一人じゃ無い

没关系 没关系

大丈夫 大丈夫

望着眼前熙来攘往的人群

人混み 行き交う

内心感到痛苦不已

苦しくなる

任谁都难免会失去

失うことは誰にもあるよ

一步一步前进的我们

一つずつ進んでいく僕たちは

逐渐随波逐流 逐渐天各一方

流されていく 離れていく

终有一日会化为灰烬

いつかは灰になる

身在此处

この場所で

长夜将尽

夜が明ける

<script>
  (function () {
    const player = document.getElementById('daily-player');
    const now = document.getElementById('now-playing');
    const buttons = document.querySelectorAll('#daily-playlist .song-play');

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
  })();
</script>
