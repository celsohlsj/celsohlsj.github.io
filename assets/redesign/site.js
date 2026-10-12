/* Shared presentation layer. Both languages remain usable on every screen size. */
(() => {
  const root = document.documentElement;
  const locale = () => root.lang === 'en' ? 'en-US' : 'pt-BR';
  const t = (pt, en) => root.lang === 'en' ? en : pt;
  let scholarStats = null;
  let scholarPapers = null;
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  function renderMetrics() {
    if (!scholarStats) return;
    setText('home-citations', Number(scholarStats.citedby || 0).toLocaleString(locale()));
    setText('home-h', scholarStats.h_index ?? '—');
    setText('home-papers', scholarPapers ? scholarPapers.length.toLocaleString(locale()) : '—');
    const date = scholarStats.updated_at ? new Date(scholarStats.updated_at).toLocaleDateString(locale()) : '';
    setText('metrics-note', `Google Scholar · ${t('Atualizado em', 'Updated')} ${date}`);
    const paperLabel = document.querySelector('#home-papers + .lbl');
    if (paperLabel) paperLabel.textContent = t('Trabalhos indexados', 'Indexed works');
    ['stat-cit', 'stat-h', 'stat-i10'].forEach((id, i) => {
      const value = [scholarStats.citedby, scholarStats.h_index, scholarStats.i10_index][i];
      if (value != null) setText(id, Number(value).toLocaleString(locale()));
    });
    const note = document.getElementById('upd-row');
    if (note && date) {
      note.replaceChildren(document.createTextNode(`${t('Atualizado em', 'Updated')} ${date} · Google Scholar`));
    }
  }
  function setLanguage(next, persist = true) {
    if (!['pt', 'en'].includes(next)) next = 'pt';
    // `lang` is the existing publication module's shared lexical state.
    if (typeof lang !== 'undefined') lang = next;
    root.lang = next === 'pt' ? 'pt-BR' : 'en';
    root.dataset.lang = next;
    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
      const value = el.getAttribute(`data-${next}`);
      if (el.hasAttribute('data-rich')) {
        el.replaceChildren();
        value.split(/<br\s*\/?\s*>/i).forEach((line, i) => {
          if (i) el.append(document.createElement('br'));
          el.append(document.createTextNode(line));
        });
      } else if (!el.children.length) el.textContent = value;
    });
    document.querySelectorAll('[data-pt-alt]').forEach(el => el.alt = el.getAttribute(`data-${next}-alt`));
    document.querySelectorAll('[data-pt-ph]').forEach(el => el.placeholder = el.getAttribute(`data-${next}-ph`));
    document.querySelectorAll('[data-pt-label]').forEach(el => el.setAttribute('aria-label', el.getAttribute(`data-${next}-label`)));
    document.querySelectorAll('[data-language]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.language === next)));
    document.querySelector('.site-nav')?.setAttribute('aria-label', t('Navegação principal', 'Main navigation'));
    const menu = document.querySelector('.menu-toggle');
    if (menu) menu.setAttribute('aria-label', menu.getAttribute('aria-expanded') === 'true' ? t('Fechar menu', 'Close menu') : t('Abrir menu', 'Open menu'));
    const page = location.pathname.split('/').pop() || 'index.html';
    const names = {'publications.html':t('Publicações', 'Publications'), 'projects.html':t('Projetos', 'Projects'), 'fieldwork.html':t('Campo', 'Fieldwork')};
    document.title = names[page] ? `${names[page]} — Celso H. L. Silva-Junior` : `Celso H. L. Silva-Junior | ${t('Florestas, carbono e sensoriamento remoto', 'Forests, carbon, and remote sensing')}`;
    if (typeof renderList === 'function' && typeof activePapers !== 'undefined' && activePapers.length) renderList();
    if (typeof renderTop10 === 'function' && scholarPapers) renderTop10(scholarPapers, scholarStats?.updated_at);
    renderMetrics();
    if (persist) { try { localStorage.setItem('celso-site-language', next); } catch (_) {} }
    document.dispatchEvent(new CustomEvent('site:language', {detail:next}));
  }
  document.querySelectorAll('[data-language]').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.language)));
  let saved = 'pt';
  try { saved = localStorage.getItem('celso-site-language') || 'pt'; } catch (_) {}
  setLanguage(saved, false);
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-toggle');
  function closeMenu() {
    nav.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', t('Abrir menu', 'Open menu'));
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? t('Fechar menu', 'Close menu') : t('Abrir menu', 'Open menu'));
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (menu?.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target)) closeMenu(); });
  window.matchMedia('(min-width:901px)').addEventListener('change', e => { if (e.matches && menu) closeMenu(); });
  // Bind homepage counts to the same dated files as the publication catalogue.
  Promise.all([fetch('data/scholar_data.json').then(r => {if (!r.ok) throw Error('stats');return r.json();}), fetch('data/scholar_papers.json').then(r => {if (!r.ok) throw Error('papers');return r.json();})])
    .then(([stats, papers]) => { scholarStats = stats; scholarPapers = papers; renderMetrics(); })
    .catch(() => { setText('metrics-note', t('Consulte as métricas no Google Scholar.', 'See the metrics on Google Scholar.')); });
})();
