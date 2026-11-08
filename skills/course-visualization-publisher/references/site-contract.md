# Course Visualization Lab contract

Read this reference before creating, cataloging, or publishing an explainer.

## Repository

- GitHub: `yj244-jyt/course-visualization-lab`
- Default local checkout: `/Users/tonyj_7/Documents/ChatGPT/CS302`
- Published site: `https://yj244-jyt.github.io/course-visualization-lab/`
- Deployment: `.github/workflows/pages.yml` publishes the repository root after pushes to `main`.

If the checkout is elsewhere, locate it from the Git remote instead of assuming the default path.

## Paths

Each explainer lives at:

```text
visualizations/<slug>/index.html
```

Use lowercase ASCII kebab-case for `<slug>`. The page must be standalone and must not depend on a development server or build step.

The gallery reads:

```text
visualizations/catalog.json
```

Catalog entries use this schema:

```json
{
  "slug": "fourier-lowpass",
  "title": "傅里叶变换与低通滤波",
  "description": "One concise sentence describing the interaction.",
  "course": "CS302",
  "topics": ["信号与图像"],
  "path": "visualizations/fourier-lowpass/",
  "created": "YYYY-MM-DD"
}
```

Use `scripts/add_visualization.py` to add or replace an entry. The script validates required fields, enforces the path from the slug, and sorts entries by newest date then title.

## Verification

Before publishing:

- Serve the repository root over HTTP; do not verify the catalog only through `file://` because the gallery fetches JSON.
- Open the gallery and the new explainer at desktop and mobile widths.
- Exercise every primary control and inspect browser console errors.
- For canvas output, verify that the canvas contains varying pixels after initial render and after interaction.
- Confirm all local links and catalog paths return HTTP 200.
- After pushing, verify the Pages workflow and open the published explainer URL.
