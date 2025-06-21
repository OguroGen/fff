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
git commit -m "v0.9.0 完成: 標準的なバージョン管理とSPAルーティング修正

## 標準的な方式への移行
- CHANGELOG.mdを標準形式で作成
- package.jsonを唯一の真の情報源に変更
- HomeView.vueでバージョンを動的取得
- npm versionコマンド対応のスクリプト追加

## SPAルーティング問題の修正
- vite.config.jsにhistoryApiFallback追加
- 本番環境用.htaccessファイル作成
- Vercel用vercel.json設定ファイル作成
- URL直接アクセス時の404エラーを解決

## ファイル構成変更
- src/data/changelog.js → 削除（標準形式に移行）
- 更新履歴管理を業界標準の方式に統一"

echo.
echo === Git Push ===
git push origin main

echo.
echo === Complete ===
pause
