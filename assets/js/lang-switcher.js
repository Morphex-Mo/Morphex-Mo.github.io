(function () {
  const COOKIE_KEY = 'googtrans';
  const LANG_STORAGE = 'blog:lang';
  const DEFAULT_LANG = '/zh-CN/zh-CN';
  const MAPPING = {
    zh: '/zh-CN/zh-CN',
    en: '/zh-CN/en',
    ja: '/zh-CN/ja'
  };

  function setCookie(name, value) {
    const domain = window.location.hostname;
    document.cookie = name + '=' + value + ';path=/;max-age=31536000';
    document.cookie = name + '=' + value + ';path=/;domain=' + domain + ';max-age=31536000';
  }

  function getCurrentLangKey() {
    const saved = localStorage.getItem(LANG_STORAGE);
    if (saved && MAPPING[saved]) {
      return saved;
    }

    if (document.cookie.indexOf('/zh-CN/en') >= 0) return 'en';
    if (document.cookie.indexOf('/zh-CN/ja') >= 0) return 'ja';
    return 'zh';
  }

  function applyLang(key) {
    const target = MAPPING[key] || DEFAULT_LANG;
    setCookie(COOKIE_KEY, target);
    localStorage.setItem(LANG_STORAGE, key);
    window.location.reload();
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

      applyLang(key);
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        root.classList.remove('open');
      }
    });
  }

  function initGoogleTranslateElement() {
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'zh-CN',
          includedLanguages: 'zh-CN,en,ja',
          autoDisplay: false,
          multilanguagePage: true
        },
        'google_translate_element'
      );
    }
  }

  window.googleTranslateElementInit = initGoogleTranslateElement;

  const holder = document.createElement('div');
  holder.id = 'google_translate_element';
  holder.style.display = 'none';
  document.documentElement.appendChild(holder);

  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountLangSwitcher);
  } else {
    mountLangSwitcher();
  }

  // Ensure default language cookie exists for first-time visitors.
  if (document.cookie.indexOf('googtrans=') < 0) {
    setCookie(COOKIE_KEY, DEFAULT_LANG);
  }
})();
