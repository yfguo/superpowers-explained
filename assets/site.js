(() => {
  const supported = ['both', 'en', 'zh'];
  const buttons = document.querySelectorAll('[data-language][type="button"]');
  const applyLanguage = language => {
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  };
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('superpowers-language'); } catch { /* Reading works when storage is unavailable. */ }
  applyLanguage(supported.includes(savedLanguage) ? savedLanguage : 'both');
  document.querySelector('.language-control').hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    applyLanguage(button.dataset.language);
    try { localStorage.setItem('superpowers-language', button.dataset.language); } catch { /* The current page still switches language. */ }
  }));

  const search = document.querySelector('#skill-search');
  if (!search) return;
  document.querySelector('.search-box').hidden = false;
  document.querySelector('.filter-bar').hidden = false;
  const cards = [...document.querySelectorAll('.library-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  let category = 'all';
  function update() {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const match = (category === 'all' || card.dataset.category === category) && terms.every(term => card.dataset.search.includes(term));
      card.hidden = !match;
      if (match) count++;
    });
    document.querySelector('#result-count').textContent = `${count} / ${cards.length}`;
    document.querySelector('#empty-state').hidden = count !== 0;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  }
  search.addEventListener('input', update);
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; update(); }));
  document.querySelector('#clear-filters').addEventListener('click', () => { search.value = ''; category = 'all'; update(); search.focus(); });
  document.addEventListener('keydown', event => {
    const editing = event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName));
    if (event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      search.focus();
    }
  });
})();
