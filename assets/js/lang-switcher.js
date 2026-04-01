(function () {
  const LANG_STORAGE = 'blog:lang';
  const DEFAULT_LANG = 'zh';
  const MAPPING = { zh: 'zh-CN', en: 'en', ja: 'ja' };

  // Explicit selector-based i18n map for stable runtime switching.
  const UI_TEXT = {
    nav_home: { zh: '首页', en: 'Home', ja: 'ホーム' },
    nav_categories: { zh: '分类', en: 'Categories', ja: 'カテゴリ' },
    nav_tags: { zh: '标签', en: 'Tags', ja: 'タグ' },
    nav_archives: { zh: '归档', en: 'Archives', ja: 'アーカイブ' },
    nav_about: { zh: '关于', en: 'About', ja: 'プロフィール' },
    panel_lastmod: { zh: '最近更新', en: 'Recently Updated', ja: '最近の更新' },
    panel_trending: { zh: '热门标签', en: 'Trending Tags', ja: '人気タグ' },
    skin_light: { zh: '日光（白色）', en: 'Daylight (Light)', ja: '日光（ライト）' },
    skin_dark: { zh: '夜晚（黑色）', en: 'Night (Dark)', ja: '夜（ダーク）' },
    skin_sepia: { zh: '暖棕（护眼）', en: 'Sepia (Eye Comfort)', ja: 'セピア（目に優しい）' },
    skin_auto: { zh: '跟随系统', en: 'Follow System', ja: 'システムに従う' },
    lang_toggle: { zh: 'A文', en: 'Lang', ja: '言語' },
    view_label: { zh: '浏览', en: 'Views', ja: '閲覧' },
    comment_label: { zh: '评论', en: 'Comments', ja: 'コメント' },
    play_label: { zh: '开始', en: 'Play', ja: '再生' }
  };

  const BINDINGS = [
    { selector: '#sidebar a[href="/"] span', key: 'nav_home' },
    { selector: '#sidebar a[href$="/categories/"] span', key: 'nav_categories' },
    { selector: '#sidebar a[href$="/tags/"] span', key: 'nav_tags' },
    { selector: '#sidebar a[href$="/archives/"] span', key: 'nav_archives' },
    { selector: '#sidebar a[href$="/about/"] span', key: 'nav_about' },
    { selector: '#access-lastmod .panel-heading', key: 'panel_lastmod' },
    { selector: '#panel-wrapper section:nth-of-type(2) .panel-heading', key: 'panel_trending' },
    { selector: '#skin-switcher .skin-btn[data-action="light"]', key: 'skin_light' },
    { selector: '#skin-switcher .skin-btn[data-action="dark"]', key: 'skin_dark' },
    { selector: '#skin-switcher .skin-btn[data-action="sepia"]', key: 'skin_sepia' },
    { selector: '#skin-switcher .skin-btn[data-action="auto"]', key: 'skin_auto' },
    { selector: '#lang-switcher .lang-toggle', key: 'lang_toggle' }
  ];

  function getCurrentLangKey() {
    const saved = localStorage.getItem(LANG_STORAGE);
    if (saved && MAPPING[saved]) return saved;
    return DEFAULT_LANG;
  }

  function setTextIfExists(selector, text) {
    if (!text) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }

  function translateUi(lang) {
    BINDINGS.forEach((item) => {
      const dict = UI_TEXT[item.key] || {};
      setTextIfExists(item.selector, dict[lang] || dict.zh);
    });

    // Dynamic labels injected by scripts.
    setTextIfExists('#local-pageviews', '');
    setTextIfExists('#utterances-comments-count', '');
    setTextIfExists('#daily-playlist .song-play', UI_TEXT.play_label[lang] || UI_TEXT.play_label.zh);
    setTextIfExists('#pageviews + *', UI_TEXT.view_label[lang] || UI_TEXT.view_label.zh);
    setTextIfExists('#utterances-comments-count + *', UI_TEXT.comment_label[lang] || UI_TEXT.comment_label.zh);

    document.documentElement.setAttribute('lang', MAPPING[lang] || MAPPING.zh);
  }

  function applyLang(key) {
    const lang = MAPPING[key] ? key : DEFAULT_LANG;
    localStorage.setItem(LANG_STORAGE, lang);
    document.documentElement.setAttribute('data-ui-lang', lang);
    translateUi(lang);
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
      if (!key) {
        return;
      }

      if (!MAPPING[key]) {
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

    // Re-apply a few times for delayed-rendered UI bits (cheap and deterministic).
    [300, 1000, 1800].forEach((delay) => {
      setTimeout(function () {
        translateUi(getCurrentLangKey());
      }, delay);
    });
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
