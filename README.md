# 早押しアプリ (fff)

競技クイズ・早押しクイズ向けの計測・管理 Web アプリです。プロジェクター表示を想定しています。

- **公開中（安定版）**: [1.1.1](https://github.com/OguroGen/fff/releases/tag/v1.1.1)（`main`）
- **開発中**: 2.0.0-beta.1（このリポジトリの `v2` ブランチ）

## 使い方

1. スタート（全画面化）→ 選手情報
2. 選手名とオプションを設定（A〜J キー、最大 10 名）
3. 時間計測（「よーい」「はじめ」の音声案内、キーボードで停止）
4. 点数入力（点数、または ○×）
5. 順位発表

選手情報画面から、個別ストップウォッチ・個別タイマーにも入れます。

### オプション

- 最後の選手の自動終了
- サイレントモード（音声案内なし）
- 制限時間
- 計時開始タイミングの調整（「よーい」の指定秒後から計時）
- 大会名の表示
- 順位発表の方式（点数ランキング / ○×発表）

サイレントモードと計時開始タイミング調整は同時に使えません。

## 開発

```bash
npm install
npm run dev
```

```bash
npm run build
```

本番向けビルドは `base` が `/fff/` になります。Vercel 上では `/` です。

## 公開

| 環境 | 場所 | 更新 |
|------|------|------|
| 本番 | 内部サーバー（`/fff/`） | `npm run build` のあと `dist` を手動アップロード |
| Vercel（試用） | https://fff-navy.vercel.app | Git 連携時は push でデプロイ |

2.0 の作業中は `main` へ push せず、本番の `dist` も上書きしません。

## 技術

Vue 3（Composition API） / Vite / Pinia / Vue Router / Bootstrap 5 / Web Speech API

## ライセンス

[MIT License](LICENSE)

作者: 小黒元 ([OguroGen](https://github.com/OguroGen))
