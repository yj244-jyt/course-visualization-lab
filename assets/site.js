(() => {
  const grid = document.querySelector('#visualization-grid');
  const count = document.querySelector('#visual-count');
  const error = document.querySelector('#catalog-error');

  function createCard(item) {
    const link = document.createElement('a');
    link.className = 'visual-card';
    link.href = `${item.path}?v=5`;

    const preview = document.createElement('div');
    preview.className = 'visual-preview';
    preview.setAttribute('aria-hidden', 'true');
    if (item.slug === 'frequency-domain-map') {
      preview.classList.add('fourier-preview');
      preview.innerHTML = '<span class="preview-image">I<sub>p</sub></span><span class="preview-arrow">→</span><span class="preview-spectrum"><i></i></span><span class="preview-arrow">×</span><span class="preview-spectrum"><i></i></span><span class="preview-arrow">→</span><span class="preview-image blurred">g</span>';
    } else if (item.slug === 'convolution-pixel-accumulation') {
      preview.classList.add('convolution-preview');
      preview.innerHTML = '<span class="preview-grid input-grid"><i>2</i><i>1</i><i>0</i><i>3</i><i>5</i><i>2</i><i>0</i><i>1</i><i>4</i></span><span class="preview-operator">×</span><span class="preview-grid kernel-grid"><i>0</i><i>0</i><i>1</i><i>0</i><i>0</i><i>0</i><i>1</i><i>0</i><i>1</i></span><span class="preview-operator">=</span><span class="preview-sum">Σ</span>';
    } else if (item.slug === 'image-gradient-direction') {
      preview.classList.add('gradient-preview');
      preview.innerHTML = '<span class="gradient-plane"><i class="gradient-axis-x"></i><i class="gradient-axis-y"></i><i class="gradient-edge"></i><i class="gradient-vector"></i><b>θ</b></span><span class="gradient-formula">∇I = (Gx, Gy)</span>';
    } else {
      preview.classList.add('fourier-preview');
      preview.innerHTML = '<span class="preview-image">I(x,y)</span><span class="preview-arrow">→</span><span class="preview-spectrum"><i></i></span><span class="preview-arrow">→</span><span class="preview-image blurred">Î(x,y)</span>';
    }

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
