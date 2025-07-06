#!/bin/bash

echo "=== fff プロジェクト Git Commit & Push v2 ==="
echo "Ver 1.0.0 リリースコミット実行中..."

# 変更されたファイルをステージング（バックアップファイルを除く）
git add .
git reset HEAD SettingsView.vue.backup
git reset HEAD settingsStore.js.backup

# コミット
git commit -m "Release Ver 1.0.0: Add time limit and correct/wrong ranking features

### Added
- Time limit display in TimeView header with automatic stop
- CorrectWrongRankingView with SVG icons and animations
- Input mode selection (point/correctWrong) in PointView
- playersCorrectWrongRanked and playersTimeOrder getters
- isCorrect property in player store
- inputMode property in settings store
- /correct-wrong-ranking route

### Changed
- RankingView with mode-based display switching
- PlayerTime and TimeDisplay component styling
- package.json version to 1.0.0

### Features
- Responsive design for 2-10 players
- Bottom-up correct/wrong reveal animation
- Zoom animation for final ranking
- Incorrect players shown without rank"

# プッシュ
git push origin main

echo "=== Git commit & push 完了 ==="
echo "GitHub: https://github.com/OguroGen/fff"
echo "本番環境: https://anzan.online/fff/"
echo "開発環境: https://fff-4dhyy1yhz-genoguros-projects.vercel.app/"

pause
