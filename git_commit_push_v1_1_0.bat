@echo off
echo.
echo ============================================
echo   Version 1.1.0 Git Commit and Push
echo ============================================
echo.

echo [1/4] Adding all changes to git...
git add .

echo.
echo [2/4] Committing changes...
git commit -m "Version 1.1.0 release: 計時開始タイミング調整機能の追加

- 計時開始タイミング調整機能の実装
  - delayTimeMode: よーいの指定秒数後から計時開始（0.1秒単位で調整可能）
  - PlayersViewに設定オプション追加
  - TimeViewに対応ロジック実装

- 設定項目の排他制御機能
  - silentModeとdelayTimeModeの同時選択防止
  - delayTimeModeオフ時の自動リセット（delayTime→1.6秒）

- Vue Composition APIのwatch機能による設定項目相互制御
- 競技クイズの公平性向上のための計時精度改善
- 会場環境に合わせた柔軟なタイミング調整システム

Files changed:
- package.json: version 1.0.0 → 1.1.0
- CHANGELOG.md: Version 1.1.0の変更履歴追加
- src/views/ChangelogView.vue: Version 1.1.0情報追加
- src/stores/settingStore.js: delayTimeMode, delayTime追加
- src/views/PlayersView.vue: 排他制御とリセット機能追加
- src/views/TimeView.vue: delayTimeMode対応"

echo.
echo [3/4] Creating version tag...
git tag -a v1.1.0 -m "Version 1.1.0: 計時開始タイミング調整機能の追加

新機能:
- 計時開始タイミング調整機能（delayTimeMode）
- 設定項目の排他制御機能
- 自動リセット機能

改善:
- 競技クイズの公平性向上
- 会場環境に合わせた柔軟な調整
- Vue Composition APIによる設定項目制御"

echo.
echo [4/4] Pushing to GitHub...
git push origin main
git push origin v1.1.0

echo.
echo ============================================
echo   Version 1.1.0 successfully released!
echo ============================================
echo.
echo Production URL: https://anzan.online/fff/
echo Development URL: https://fff-navy.vercel.app/
echo GitHub Repository: https://github.com/OguroGen/fff
echo.
pause
