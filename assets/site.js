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
    if (item.slug === 'gaussian-pyramid' || item.slug === 'laplacian-pyramid') {
      preview.innerHTML = '<span style="display:flex;align-items:center;gap:12px"><img src="visualizations/pyramid-blending/assets/apple.jpg" alt="" style="width:110px;height:110px"><span>→</span><img src="visualizations/pyramid-blending/assets/apple.jpg" alt="" style="width:55px;height:55px"><span>' + (item.slug === 'gaussian-pyramid' ? '→ ↓2' : '↑2 → −') + '</span></span>';
    } else if (item.slug === 'pyramid-blending') {
      preview.innerHTML = '<span style="display:flex;width:80%;height:150px;overflow:hidden"><img src="visualizations/pyramid-blending/assets/apple.jpg" alt="" style="width:50%;object-fit:cover;object-position:left"><img src="visualizations/pyramid-blending/assets/orange.jpg" alt="" style="width:50%;object-fit:cover;object-position:right"></span>';
    } else if (item.slug === 'edge-tracking-stack-queue') {
      preview.innerHTML = '<svg viewBox="0 0 400 160" width="100%" height="100%"><g fill="none" stroke="#177568" stroke-width="4"><path d="M65 35L105 70L65 105L105 140M105 70L145 35"/><path d="M285 70L245 35M285 70L325 35M285 70L245 110M285 70L325 110"/></g><g fill="#177568"><circle cx="65" cy="35" r="9"/><circle cx="285" cy="70" r="9"/></g><g fill="#eac57e"><circle cx="105" cy="70" r="8"/><circle cx="65" cy="105" r="8"/><circle cx="105" cy="140" r="8"/><circle cx="145" cy="35" r="8"/><circle cx="245" cy="35" r="8"/><circle cx="325" cy="35" r="8"/><circle cx="245" cy="110" r="8"/><circle cx="325" cy="110" r="8"/></g><g fill="currentColor" font-size="14" text-anchor="middle"><text x="100" y="20">Stack · DFS</text><text x="285" y="150">Queue · BFS</text></g></svg>';
    } else if (item.slug === 'frequency-domain-map') {
      preview.classList.add('frequency-map-preview');
      preview.innerHTML = '<span class="frequency-map-flow"><span class="frequency-tile"><img src="visualizations/frequency-domain-map/assets/urban-street.jpg" alt=""><b>I(x,y)</b></span><span class="frequency-op">FFT</span><span class="frequency-tile frequency-spectrum"><i></i><b>|F(u,v)|</b></span><span class="frequency-op">×</span><span class="frequency-tile frequency-mask"><i></i><b>H(u,v)</b></span><span class="frequency-op">IFFT</span><span class="frequency-tile frequency-output"><img src="visualizations/frequency-domain-map/assets/urban-street.jpg" alt=""><b>g(x,y)</b></span></span>';
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
