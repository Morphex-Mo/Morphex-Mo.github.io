(function () {
  const STORAGE_KEY = 'morphex.search.history';
  const MAX_ITEMS = 3;

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function normalizeQuery(value) {
    return value.trim().replace(/\s+/g, ' ');
  }

  function readHistory() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

      return Array.isArray(data)
        ? data.filter((item) => typeof item === 'string' && item.trim()).slice(0, MAX_ITEMS)
        : [];
    } catch (_) {
      return [];
    }
  }

  function writeHistory(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
    } catch (_) {
      /* localStorage can be blocked in private browsing. */
    }
  }

  function rememberQuery(value) {
    const query = normalizeQuery(value);

    if (!query) {
      return;
    }

    const history = readHistory().filter((item) => item.toLowerCase() !== query.toLowerCase());
    writeHistory([query, ...history]);
  }

  function setupSearchHistory() {
    const search = document.getElementById('search');
    const input = document.getElementById('search-input');

    if (!search || !input) {
      return;
    }

    const dropdown = document.createElement('div');
    dropdown.id = 'search-history-dropdown';
    dropdown.className = 'search-history-dropdown';
    dropdown.setAttribute('role', 'listbox');
    dropdown.hidden = true;

    input.setAttribute('aria-haspopup', 'listbox');
    input.setAttribute('aria-controls', dropdown.id);
    search.appendChild(dropdown);

    function hideDropdown() {
      dropdown.hidden = true;
      input.removeAttribute('aria-activedescendant');
    }

    function renderDropdown() {
      const history = readHistory();
      dropdown.innerHTML = '';

      if (!history.length) {
        hideDropdown();
        return;
      }

      history.forEach((query, index) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'search-history-option';
        option.id = `search-history-option-${index}`;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.innerHTML = '<i class="fa-regular fa-clock fa-fw" aria-hidden="true"></i><span></span>';
        option.querySelector('span').textContent = query;

        option.addEventListener('mousedown', (event) => {
          event.preventDefault();
        });

        option.addEventListener('click', () => {
          input.value = query;
          rememberQuery(query);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          hideDropdown();
          input.focus();
        });

        dropdown.appendChild(option);
      });

      dropdown.hidden = false;
    }

    function options() {
      return Array.from(dropdown.querySelectorAll('.search-history-option'));
    }

    function activateOption(nextIndex) {
      const items = options();

      if (!items.length) {
        return;
      }

      items.forEach((item) => item.setAttribute('aria-selected', 'false'));

      const active = items[(nextIndex + items.length) % items.length];
      active.setAttribute('aria-selected', 'true');
      active.focus();
      input.setAttribute('aria-activedescendant', active.id);
    }

    input.addEventListener('focus', renderDropdown);
    input.addEventListener('click', renderDropdown);

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        rememberQuery(input.value);
        renderDropdown();
        return;
      }

      if (event.key === 'Escape') {
        hideDropdown();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        renderDropdown();
        activateOption(0);
      }
    });

    dropdown.addEventListener('keydown', (event) => {
      const items = options();
      const currentIndex = items.indexOf(document.activeElement);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        activateOption(currentIndex + 1);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        activateOption(currentIndex - 1);
      }

      if (event.key === 'Escape') {
        hideDropdown();
        input.focus();
      }
    });

    input.addEventListener('change', () => {
      rememberQuery(input.value);
      renderDropdown();
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) {
          hideDropdown();
        }
      }, 120);
    });

    const results = document.getElementById('search-results');

    if (results) {
      results.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          rememberQuery(input.value);
        }
      });
    }

    document.getElementById('search-cancel')?.addEventListener('click', hideDropdown);
  }

  onReady(setupSearchHistory);
})();
