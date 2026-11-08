import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');
const visualizationDirectory = resolve(repositoryRoot, 'visualizations/fourier-lowpass');
const fragment = await readFile(resolve(visualizationDirectory, 'explainer-fragment.html'), 'utf8');

const document = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="交互理解傅里叶变换、频率中心、低通 mask 与逆变换。">
  <title>傅里叶变换与低通滤波</title>
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      color-scheme: light;
      background: #ffffff;
      color: #1a1c1f;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body { margin: 0; min-width: 320px; background: #ffffff; color: #1a1c1f; }
    .visual-site-header {
      min-height: 58px;
      padding: 0 24px;
      border-bottom: 1px solid #d5dade;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      font-size: 14px;
    }
    .visual-site-header a { color: #174f62; font-weight: 650; text-decoration: none; }
    .visual-site-header span { color: #667177; }
    main { width: min(100% - 32px, 1400px); margin: 0 auto; padding: 22px 0 34px; }
    @media (max-width: 560px) {
      .visual-site-header { padding: 0 16px; }
      .visual-site-header span { display: none; }
      main { width: min(100% - 24px, 1400px); padding-top: 16px; }
    }
    @media (prefers-color-scheme: dark) {
      :root, body { color-scheme: dark; background: #111416; color: #f4f6f7; }
      .visual-site-header { border-color: #343d42; }
      .visual-site-header a { color: #79c3db; }
      .visual-site-header span { color: #aab4ba; }
      #fourier-lowpass-explainer {
        --background: #111416;
        --foreground: #f4f6f7;
        --card: #1a1f22;
        --card-foreground: #f4f6f7;
        --primary: #62b6d1;
        --primary-foreground: #111416;
        --muted: #293136;
        --muted-foreground: #aab4ba;
        --accent: #173641;
        --accent-foreground: #b7e6f5;
        --border: #343d42;
        --viz-series-1: #62b6d1;
        --viz-series-2: #f18a70;
      }
      #fourier-lowpass-explainer .fl-step { background: #343d42; }
      #fourier-lowpass-explainer .fl-important { background: #332722; }
    }
  </style>
</head>
<body>
  <header class="visual-site-header">
    <a href="../../">← 返回可视化目录</a>
    <span>CS302 · 信号与图像</span>
  </header>
  <main>${fragment}</main>
</body>
</html>
`;

await writeFile(resolve(visualizationDirectory, 'index.html'), document, 'utf8');
console.log('Built visualizations/fourier-lowpass/index.html');
