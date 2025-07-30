# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-30

### Added
- **計時開始タイミング調整機能**
  - `src/stores/settingStore.js`: `delayTimeMode` と `delayTime` プロパティ追加
  - `src/views/PlayersView.vue`: 計時タイミング設定オプションを追加
  - `src/views/TimeView.vue`: delayTimeModeに対応した計時ロジック実装
  - 「よーい」の指定秒数後から計時開始する機能（0.1秒単位で調整可能）
- **設定項目の排他制御機能**
  - silentModeとdelayTimeModeの同時選択を防ぐ排他制御
  - delayTimeModeオフ時の自動リセット機能（delayTimeを1.6秒に戻す）

### Changed
- `src/views/PlayersView.vue`: Vue Composition APIのwatch機能を活用した設定項目の相互制御
- 競技クイズの公平性向上のための計時精度改善

### Technical Details
- より精密なタイミング制御により会場環境に合わせた調整が可能
- 競技者の反応時間を考慮した柔軟な設定システム

## [1.0.0] - 2025-07-06

### Added
- **制限時間機能の追加**
  - `src/views/TimeView.vue`: 制限時間表示をヘッダーに追加
  - 制限時間モード時の「制限時間○分○秒」表示
  - 制限時間到達時の自動停止機能
- **○×方式ランキング機能の実装**
  - 新規ファイル: `src/views/CorrectWrongRankingView.vue`
  - SVGアイコンによる正誤表示（○×）
  - 下位から順番の正誤発表アニメーション
  - ズームアニメーション付きの最終順位発表
  - 2-10人対応のレスポンシブデザイン
  - 不正解者の順位非表示機能
- **点数入力方式の拡張**
  - `src/views/PointView.vue`: 入力方式選択機能（点数入力/○×方式）
  - ○×方式用の正誤入力UI
  - 入力方式に応じたナビゲーション分岐
- **ストア機能の拡張**
  - `src/stores/playersStore.js`: `playersCorrectWrongRanked` ゲッター追加
  - `src/stores/playersStore.js`: `playersTimeOrder` ゲッター追加  
  - `src/stores/playersStore.js`: `isCorrect` プロパティ追加
  - `src/stores/settingStore.js`: `inputMode` プロパティ追加 ('point'/'correctWrong')
- **ルーティング機能の追加**
  - `src/router/index.js`: `/correct-wrong-ranking` ルート追加

### Changed
- `package.json`: version 0.9.0 → 1.0.0
- `src/views/RankingView.vue`: 入力モードに応じた表示切り替え機能
- `src/components/PlayerTime.vue`: スタイル調整とアニメーション改善
- `src/components/TimeDisplay.vue`: 表示スタイルの改善

### Fixed
- プレイヤー状態管理の改善
- ランキング表示の安定性向上

## [0.9.0] - 2025-06-21

### Added
- 更新履歴表示ページ(/changelog)の追加
- ホーム画面にバージョンバッジを追加
- タイムライン形式の見やすい更新履歴機能
- 変更タイプ別のアイコンと色分け表示
- 更新履歴データ管理システム(changelog.js)

### Fixed
- SPAルーティングの問題を修正（URL直接アクセス時の404エラーを解決）
- Vite設定にhistoryApiFallbackを追加
- 本番環境用.htaccessファイルを追加
- Vercel用vercel.json設定ファイルを追加

### Changed
- package.jsonのバージョンを0.9.0に更新
- ルーターに/changelogパスを追加

## [0.8.0] - 2025-06-21

### Added
- 包括的なREADME.mdの追加
- Vercel自動デプロイ環境の構築
- 技術スタック情報とデプロイ方法の詳細説明
- ファビコン追加: 稲妻デザインのSVGファビコン

### Changed
- Vite設定: Vercel/本番環境の自動切り替え対応
- Vue 3 Composition API規則への対応
- コード品質の向上と命名規則の統一

## [0.7.0] - 2022-11-27

### Added
- 個人タイマー機能の実装
- PersonalTimerView.vueの追加
- 個別練習モードの導入

## [0.6.0] - 2022-09-18

### Added
- 最後の選手のカウントダウン機能

### Changed
- タイマー停止機能の改善

## [0.5.0] - 2022-09-11

### Added
- makeSound()関数の実装
- stopPlayerTimer()関数の実装

### Changed
- 音響効果の改善

## [0.1.0] - 2022-09-07

### Added
- 基本的な早押しクイズ機能
- 選手登録機能
- 時間計測機能
- 得点入力機能
- 成績発表機能
- ストップウォッチ機能

[1.1.0]: https://github.com/OguroGen/fff/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/OguroGen/fff/compare/v0.9.0...v1.0.0
[0.9.0]: https://github.com/OguroGen/fff/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/OguroGen/fff/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/OguroGen/fff/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/OguroGen/fff/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/OguroGen/fff/compare/v0.1.0...v0.5.0
[0.1.0]: https://github.com/OguroGen/fff/releases/tag/v0.1.0
