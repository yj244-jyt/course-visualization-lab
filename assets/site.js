(() => {
  const grid = document.querySelector('#visualization-grid');
  const count = document.querySelector('#visual-count');
  const error = document.querySelector('#catalog-error');

  function createCard(item) {
    const link = document.createElement('a');
    link.className = 'visual-card';
    link.href = `${item.path}?v=3`;

    const preview = document.createElement('div');
    preview.className = 'visual-preview fourier-preview';
    preview.setAttribute('aria-hidden', 'true');
    preview.innerHTML = '<span class="preview-image">I(x,y)</span><span class="preview-arrow">→</span><span class="preview-spectrum"><i></i></span><span class="preview-arrow">→</span><span class="preview-image blurred">Î(x,y)</span>';

    const body = document.createElement('div');
    body.className = 'visual-body';

    const meta = document.createElement('div');
    meta.className = 'meta';
    [item.course, ...item.topics].forEach(value => {
      const span = document.createElement('span');
      span.textContent = value;
      meta.appendChild(span);
    });

    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    const open = document.createElement('span');
    open.className = 'open-label';
    open.textContent = '打开动画 ↗';

    body.append(meta, title, description, open);
    link.append(preview, body);
    return link;
  }

  fetch('visualizations/catalog.json')
    .then(response => {
      if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
      return response.json();
    })
    .then(items => {
      grid.replaceChildren(...items.map(createCard));
      count.textContent = String(items.length);
    })
    .catch(() => {
      error.hidden = false;
    });
})();
