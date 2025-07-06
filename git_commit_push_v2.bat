@echo off
cd /d C:\dev\fff

echo === Git Status ===
git status

echo.
echo === Git Add All ===
git add .

echo.
echo === Git Status After Add ===
git status

echo.
echo === Git Commit ===
git commit -m "v1.0.0: 制限時間機能と○×ランキング機能追加

■ 主要機能追加 (2件)
1️⃣ TimeViewにおいて制限時間を追加
2️⃣ RankingViewを別の形式のページも作る（○×方式）

■ 新規ファイル (1件)
src/views/CorrectWrongRankingView.vue

■ 変更ファイル (11件)
package.json - version: 0.9.0 -> 1.0.0
src/views/TimeView.vue - 制限時間機能追加
src/components/TimeDisplay.vue - 制限時間コンポーネント
src/components/PlayerTime.vue - プレイヤー時間表示
src/views/RankingView.vue - 既存ランキング調整
src/router/index.js - /correct-wrong-ranking ルート追加
src/stores/playersStore.js - playersCorrectWrongRanked ゲッター
src/stores/settingStore.js - inputMode プロパティ
src/views/PointView.vue - 入力方式分岐ナビゲーション
src/views/ChangelogView.vue - 更新履歴表示改善
git_commit_push_v2.bat - コミットメッセージ更新"

echo.
echo === Git Push ===
git push origin main

echo.
echo === Complete ===
pause
