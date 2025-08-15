# Hirotsu Farm Website

広津農園の公式サイトです。  
ブルーベリー狩り・みかん狩りの情報や、オンライン予約フォーム（空き状況カレンダー付き）を提供しています。

---

## 🌱 サイト概要
- **ブルーベリーシーズン**（1〜8月）と **みかんシーズン**（9〜12月）でコンテンツが切り替わります。
- 空き状況カレンダーから予約可能。
- Tailwind CSS を利用し、必要なスタイルのみ抽出して軽量化。

---

## 🛠 使用技術
- HTML / CSS / JavaScript
- [Tailwind CSS](https://tailwindcss.com/)
- GitHub Pages（公開予定）

---

## 📂 ディレクトリ構成
```

hirotsu-farm/
├── index.html              # メインページ
├── assets/                 # 画像・スタイル
│   ├── logo.png
│   ├── main.png
│   └── styles.css          # Tailwindビルド後のCSS
├── js/                     # JavaScriptファイル
│   ├── main.js
│   ├── calendar.js
│   └── seasonal.js
├── src/                    # Tailwind入力用CSS
│   └── input.css
├── availability.json       # カレンダー用データ
├── tailwind.config.js
├── package.json
└── .gitignore

````

---

## 💻 開発環境セットアップ
1. リポジトリをクローン
```bash
git clone git@github.com:hirotsu-farm/hirotsu-farm.git
cd hirotsu-farm
````

2. 依存パッケージをインストール（Tailwindなど）

```bash
npm install
```

3. 開発モード（CSSの自動ビルド）

```bash
npm run watch:css
```

---

## 🚀 本番ビルド

```bash
npm run build:css
```

* `assets/styles.css` に **使用中クラスのみ** を抽出し、圧縮されたファイルが生成されます。

---

## 📌 運用メモ

* `availability.json` を更新するとカレンダーの空き状況が変わります。
* 動的に付与されるクラス（例：選択枠や満席表示）は `tailwind.config.js` の `safelist` に登録してください。
* GitHub Pages デプロイは `main` ブランチの最新状態を反映します。

---

## 📄 ライセンス

本プロジェクトのコードおよびコンテンツは広津農園の許可なく無断利用することを禁じます。
