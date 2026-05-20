# Parallax Site Demo

Appleの製品ページ（apple.com/jp/macbook-pro）を参考にした、パララックス効果のデモサイト。

## ファイル構成

```
parallax-site/
├── index.html              ... メインHTML（TailwindCSS CDN利用）
└── js/
    ├── reveal.js           ... .reveal要素のフェードイン（IntersectionObserver）
    ├── hero-parallax.js    ... HEROセクションのピン留め・テキスト/画像の連動
    ├── chip-parallax.js    ... CHIPセクションの段階的な要素出現
    ├── battery-counter.js  ... バッテリー数値のカウントアップ（0→24）
    └── nav.js              ... スクロール量に応じたナビバー切替
```

## 仕組み

### ピン留め（sticky）
`position: sticky` を使って `pin-stage` を画面に固定し、親 `pin-section` の高さ（200vh〜350vh）でスクロール量を確保。

### スクロール進行度
各JSで `getBoundingClientRect()` から `progress`（0〜1）を計算し、要素の `transform` / `opacity` に反映。

```js
const rect = section.getBoundingClientRect();
const total = section.offsetHeight - window.innerHeight;
const progress = clamp(-rect.top / total);
```

### パフォーマンス
- `requestAnimationFrame` でスクロールイベントをスロットリング
- `passive: true` でリスナー登録
- `prefers-reduced-motion` を尊重

## 使い方

ローカルで `index.html` を開くだけ。サーバ不要。

```bash
# 必要ならsimpleなサーバを立てて確認
python3 -m http.server 8000
```

## カスタマイズ

- 各セクションの `style="height: 250vh;"` を変えるとスクロール距離（=演出の長さ）が変わる
- `data-*` 属性で要素をJSから拾っているので、HTML側で追加要素を作って同じパターンで増やせる
