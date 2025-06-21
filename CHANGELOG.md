# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.9.0]: https://github.com/OguroGen/fff/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/OguroGen/fff/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/OguroGen/fff/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/OguroGen/fff/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/OguroGen/fff/compare/v0.1.0...v0.5.0
[0.1.0]: https://github.com/OguroGen/fff/releases/tag/v0.1.0
