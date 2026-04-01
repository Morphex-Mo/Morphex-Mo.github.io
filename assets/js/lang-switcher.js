(function () {
  const LANG_STORAGE = 'blog:lang';
  const DEFAULT_LANG = 'zh';
  const MAPPING = { zh: 'zh-CN', en: 'en', ja: 'ja' };

  // Local dictionary for common site UI text. No external translation service.
  const DICT = {
    en: {
      '首页': 'Home',
      '分类': 'Categories',
      '标签': 'Tags',
      '归档': 'Archives',
      '关于': 'About',
      '搜索': 'Search',
      '最近更新': 'Recently Updated',
      '热门标签': 'Trending Tags',
      '上一篇': 'Previous',
      '下一篇': 'Next',
      '评论': 'Comments',
      '浏览': 'Views',
      '开始': 'Play',
      '切换皮肤': 'Theme',
      '切换语言': 'Language',
      '日光（白色）': 'Daylight (Light)',
      '夜晚（黑色）': 'Night (Dark)',
      '暖棕（护眼）': 'Sepia (Eye Comfort)',
      '跟随系统': 'Follow System'
    },
    ja: {
      '首页': 'ホーム',
      '分类': 'カテゴリ',
      '标签': 'タグ',
      '归档': 'アーカイブ',
      '关于': 'プロフィール',
      '搜索': '検索',
      '最近更新': '最近の更新',
      '热门标签': '人気タグ',
      '上一篇': '前へ',
      '下一篇': '次へ',
      '评论': 'コメント',
      '浏览': '閲覧',
      '开始': '再生',
      '切换皮肤': 'テーマ',
      '切换语言': '言語',
      '日光（白色）': '日光（ライト）',
      '夜晚（黑色）': '夜（ダーク）',
      '暖棕（护眼）': 'セピア（目に優しい）',
      '跟随系统': 'システムに従う'
    }
  };

  function getCurrentLangKey() {
    const saved = localStorage.getItem(LANG_STORAGE);
    if (saved && MAPPING[saved]) return saved;
    return DEFAULT_LANG;
  }

  function replaceTextNodeValue(node, from, to) {
    const raw = node.nodeValue;
    if (!raw) return;

    const trimmed = raw.trim();
    if (trimmed !== from) return;

    const prefixLen = raw.indexOf(trimmed);
    const suffixLen = raw.length - prefixLen - trimmed.length;
    const prefix = raw.slice(0, prefixLen);
    const suffix = raw.slice(raw.length - suffixLen);
    node.nodeValue = prefix + to + suffix;
  }

  function translateDom(lang) {
    const dict = DICT[lang];
    if (!dict) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE' || tag === 'TEXTAREA') {
          return NodeFilter.FILTER_REJECT;
        }

        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      nodes.push(currentNode);
    }

    Object.entries(dict).forEach(([from, to]) => {
      nodes.forEach((node) => replaceTextNodeValue(node, from, to));
    });
  }

  function applyLang(key) {
    const lang = MAPPING[key] ? key : DEFAULT_LANG;
    localStorage.setItem(LANG_STORAGE, lang);
    document.documentElement.setAttribute('lang', MAPPING[lang]);
    document.documentElement.setAttribute('data-ui-lang', lang);
    if (lang !== 'zh') {
      translateDom(lang);
    }
  }

  function mountLangSwitcher() {
    if (document.getElementById('lang-switcher')) {
      return;
    }

    const root = document.createElement('div');
    root.id = 'lang-switcher';
    root.innerHTML =
      '<button type="button" class="lang-toggle" aria-label="切换语言">A文</button>' +
      '<div class="lang-panel" aria-label="语言面板">' +
      '<button type="button" class="lang-btn" data-lang="zh">中文</button>' +
      '<button type="button" class="lang-btn" data-lang="en">English</button>' +
      '<button type="button" class="lang-btn" data-lang="ja">日本語</button>' +
      '</div>';

    document.body.appendChild(root);

    const toggle = root.querySelector('.lang-toggle');
    const panel = root.querySelector('.lang-panel');

    toggle.addEventListener('click', function () {
      root.classList.toggle('open');
    });

    const current = getCurrentLangKey();
    const activeBtn = root.querySelector('[data-lang="' + current + '"]');
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    panel.addEventListener('click', function (event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const key = target.getAttribute('data-lang');
      if (!key || !MAPPING[key]) {
        return;
      }

      root.querySelectorAll('.lang-btn').forEach((btn) => btn.classList.remove('active'));
      target.classList.add('active');
      applyLang(key);
      root.classList.remove('open');
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        root.classList.remove('open');
      }
    });

    // Re-apply translation for dynamically injected nodes.
    const observer = new MutationObserver(function () {
      const selected = getCurrentLangKey();
      if (selected !== 'zh') {
        translateDom(selected);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyLang(getCurrentLangKey());
      mountLangSwitcher();
    });
  } else {
    applyLang(getCurrentLangKey());
    mountLangSwitcher();
  }
})();
