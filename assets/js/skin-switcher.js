(function () {
  const STORAGE_MODE = 'skin:mode';
  const STORAGE_SKIN = 'skin:custom';

  function applySavedTheme() {
    const savedMode = localStorage.getItem(STORAGE_MODE);
    const savedSkin = localStorage.getItem(STORAGE_SKIN);

    if (savedMode === 'light' || savedMode === 'dark') {
      document.documentElement.setAttribute('data-mode', savedMode);
    } else {
      document.documentElement.removeAttribute('data-mode');
    }

    if (savedSkin) {
      document.documentElement.setAttribute('data-user-skin', savedSkin);
    } else {
      document.documentElement.removeAttribute('data-user-skin');
    }
  }

  function setMode(mode) {
    if (mode === 'auto') {
      localStorage.removeItem(STORAGE_MODE);
      document.documentElement.removeAttribute('data-mode');
      return;
    }

    localStorage.setItem(STORAGE_MODE, mode);
    document.documentElement.setAttribute('data-mode', mode);
  }

  function setSkin(skin) {
    if (!skin) {
      localStorage.removeItem(STORAGE_SKIN);
      document.documentElement.removeAttribute('data-user-skin');
      return;
    }

    localStorage.setItem(STORAGE_SKIN, skin);
    document.documentElement.setAttribute('data-user-skin', skin);
  }

  function mountSwitcher() {
    if (document.getElementById('skin-switcher')) {
      return;
    }

    const root = document.createElement('div');
    root.id = 'skin-switcher';
    root.innerHTML =
      '<button type="button" class="skin-toggle" aria-label="切换皮肤">🎨</button>' +
      '<div class="skin-panel" aria-label="皮肤面板">' +
      '<button type="button" class="skin-btn" data-action="dark">黑色模式</button>' +
      '<button type="button" class="skin-btn" data-action="light">白色模式</button>' +
      '<button type="button" class="skin-btn" data-action="sepia">暖棕皮肤</button>' +
      '<button type="button" class="skin-btn" data-action="auto">跟随系统</button>' +
      '</div>';

    document.body.appendChild(root);

    const toggle = root.querySelector('.skin-toggle');
    const panel = root.querySelector('.skin-panel');

    toggle.addEventListener('click', function () {
      root.classList.toggle('open');
    });

    panel.addEventListener('click', function (event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const action = target.getAttribute('data-action');
      if (!action) {
        return;
      }

      if (action === 'dark' || action === 'light') {
        setSkin('');
        setMode(action);
      } else if (action === 'sepia') {
        setMode('light');
        setSkin('sepia');
      } else if (action === 'auto') {
        setSkin('');
        setMode('auto');
      }

      root.classList.remove('open');
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        root.classList.remove('open');
      }
    });
  }

  try {
    applySavedTheme();
  } catch (error) {
    // Ignore storage errors.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountSwitcher);
  } else {
    mountSwitcher();
  }
})();
