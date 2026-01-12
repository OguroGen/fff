<script setup>
import { useRouter } from 'vue-router'
import packageJson from '../../package.json'

// 標準的なCHANGELOG.mdに基づく更新履歴データ
const changelog = [
  {
    version: "1.1.1",
    date: "2025-01-12",
    title: "Ver 1.1.1リリース: 大会名表示機能の追加",
    changes: {
      added: [
        "大会名表示機能: TimeViewとRankingViewに大会名を表示",
        "フォントサイズ調整: 30px～150pxの範囲で指定可能（デフォルト: 48px）",
        "settingStoreに showTournamentName, tournamentName, tournamentNameFontSize プロパティ追加",
        "PlayersViewに大会名表示オプション追加（チェックボックス、入力欄、フォントサイズ設定）",
        "TimeViewのスタートボタン下部に大会名を表示",
        "RankingViewのボタンエリア下部に大会名を表示"
      ],
      changed: [
        "TimeView: 大会名の文字色を視認性の良い色（#2c3e50）に改善",
        "大会名表示機能により、大会の識別が容易に"
      ]
    }
  },
  {
    version: "1.1.0",
    date: "2025-07-30",
    title: "Ver 1.1.0リリース: 計時開始タイミング調整機能の追加",
    changes: {
      added: [
        "計時開始タイミング調整機能: よーいの指定秒数後から計時開始（0.1秒単位調整）",
        "設定項目の排他制御: silentModeとdelayTimeModeの同時選択防止",
        "自動リセット機能: delayTimeModeオフ時にdelayTimeを1.6秒に戻す",
        "settingStoreに delayTimeMode と delayTime プロパティ追加",
        "PlayersViewに計時タイミング設定オプション追加",
        "TimeViewにdelayTimeMode対応の計時ロジック実装"
      ],
      changed: [
        "PlayersView: Vue Composition APIのwatch機能による設定項目相互制御",
        "競技クイズの公平性向上のための計時精度改善",
        "会場環境に合わせた柔軟なタイミング調整システム"
      ]
    }
  },
  {
    version: "1.0.0",
    date: "2025-07-06",
    title: "Ver 1.0.0リリース: 制限時間機能と○×方式ランキングの追加",
    changes: {
      added: [
        "制限時間機能: TimeViewヘッダーに制限時間表示と自動停止",
        "○×方式ランキング: SVGアイコンとアニメーション付きの新成績発表",
        "入力方式選択: PointViewで点数入力/○×方式の選択機能",
        "playersCorrectWrongRanked と playersTimeOrder ゲッター追加",
        "プレイヤーストアに isCorrect プロパティ追加",
        "設定ストアに inputMode プロパティ追加",
        "/correct-wrong-ranking ルート追加"
      ],
      changed: [
        "RankingView: モード別表示切り替え機能",
        "PlayerTime と TimeDisplay コンポーネントのスタイル改善",
        "package.json バージョンを1.0.0に更新"
      ],
      fixed: [
        "プレイヤー状態管理の改善",
        "ランキング表示の安定性向上"
      ]
    }
  },
  {
    version: "0.9.0",
    date: "2025-06-21",
    title: "更新履歴機能とバージョン管理システムの追加",
    changes: {
      added: [
        "更新履歴表示ページ(/changelog)の追加",
        "ホーム画面にバージョンバッジを追加", 
        "タイムライン形式の見やすい更新履歴機能",
        "変更タイプ別のアイコンと色分け表示",
        "更新履歴データ管理システム(changelog.js)"
      ],
      changed: [
        "package.jsonのバージョンを0.9.0に更新",
        "ルーターに/changelogパスを追加"
      ],
      fixed: [
        "SPAルーティングの問題を修正（URL直接アクセス時の404エラーを解決）",
        "Vite設定にhistoryApiFallbackを追加",
        "本番環境用.htaccessファイルを追加",
        "Vercel用vercel.json設定ファイルを追加"
      ]
    }
  },
  {
    version: "0.8.0",
    date: "2025-06-21",
    title: "包括的なアップデート: ドキュメント・環境・コード改善",
    changes: {
      added: [
        "包括的なREADME.mdの追加",
        "Vercel自動デプロイ環境の構築",
        "技術スタック情報とデプロイ方法の詳細説明",
        "ファビコン追加: 稲妻デザインのSVGファビコン"
      ],
      changed: [
        "Vite設定: Vercel/本番環境の自動切り替え対応",
        "Vue 3 Composition API規則への対応",
        "コード品質の向上と命名規則の統一"
      ]
    }
  },
  {
    version: "0.7.0",
    date: "2022-11-27",
    title: "個人タイマー機能の追加",
    changes: {
      added: [
        "個人タイマー機能の実装",
        "PersonalTimerView.vueの追加",
        "個別練習モードの導入"
      ]
    }
  },
  {
    version: "0.6.0",
    date: "2022-09-18",
    title: "カウントダウン機能とタイマー改善",
    changes: {
      added: [
        "最後の選手のカウントダウン機能"
      ],
      changed: [
        "タイマー停止機能の改善"
      ]
    }
  },
  {
    version: "0.5.0",
    date: "2022-09-11",
    title: "音響機能の実装",
    changes: {
      added: [
        "makeSound()関数の実装",
        "stopPlayerTimer()関数の実装"
      ],
      changed: [
        "音響効果の改善"
      ]
    }
  },
  {
    version: "0.1.0",
    date: "2022-09-07",
    title: "初回リリース",
    changes: {
      added: [
        "基本的な早押しクイズ機能",
        "選手登録機能",
        "時間計測機能",
        "得点入力機能",
        "成績発表機能",
        "ストップウォッチ機能"
      ]
    }
  }
]

const router = useRouter()
const currentVersion = packageJson.version

const goBack = () => {
  router.push('/')
}

const getChangeIcon = (type) => {
  const icons = {
    added: "🆕",
    changed: "🔧", 
    fixed: "🐛",
    removed: "🗑️"
  }
  return icons[type] || "📄"
}

const getChangeClass = (type) => {
  return `change-${type}`
}

const getChangeLabel = (type) => {
  const labels = {
    added: "新機能",
    changed: "変更",
    fixed: "修正",
    removed: "削除"
  }
  return labels[type] || "変更"
}
</script>

<template>
  <div class="changelog-container">
    <!-- ヘッダー -->
    <div class="header">
      <button class="btn btn-outline-secondary back-btn" @click="goBack">
        ⬅️ ホームに戻る
      </button>
      <h1 class="title">📋 更新履歴</h1>
      <p class="subtitle">早押しアプリの開発履歴</p>
    </div>

    <!-- 更新履歴タイムライン -->
    <div class="timeline">
      <div 
        v-for="release in changelog" 
        :key="release.version"
        class="timeline-item"
      >
        <!-- バージョンヘッダー -->
        <div class="version-header">
          <div class="version-badge">
            v{{ release.version }}
          </div>
          <div class="version-info">
            <h2 class="version-title">{{ release.title }}</h2>
            <div class="version-date">{{ release.date }}</div>
          </div>
        </div>

        <!-- 変更内容 -->
        <div class="changes-list">
          <template v-for="(changeList, changeType) in release.changes" :key="changeType">
            <div 
              v-for="(change, index) in changeList"
              :key="`${changeType}-${index}`"
              class="change-item"
              :class="getChangeClass(changeType)"
            >
              <span class="change-icon">{{ getChangeIcon(changeType) }}</span>
              <span class="change-type">{{ getChangeLabel(changeType) }}</span>
              <span class="change-text">{{ change }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- フッター -->
    <div class="footer">
      <p>🚀 Vue 3 + Vite + Pinia + Bootstrap 5</p>
      <p>© 2025 早押しクイズアプリ</p>
    </div>
  </div>
</template>

<style scoped>
.changelog-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 0;
  font-weight: bold;
}

.title {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  color: #5a6c7d;
  font-size: 1.2rem;
  margin: 0;
}

.timeline {
  max-width: 900px;
  margin: 0 auto;
}

.timeline-item {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #3498db;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.version-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 20px;
}

.version-badge {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.2rem;
  min-width: 80px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
}

.version-info {
  flex: 1;
}

.version-title {
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 5px 0;
  line-height: 1.3;
}

.version-date {
  color: #7f8c8d;
  font-size: 0.95rem;
  font-weight: 500;
}

.changes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.change-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.change-item:hover {
  transform: translateX(5px);
}

.change-added {
  background: linear-gradient(135deg, #d5f4e6 0%, #c8e6c9 100%);
  border-left: 3px solid #27ae60;
}

.change-changed {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-left: 3px solid #f39c12;
}

.change-fixed {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border-left: 3px solid #e74c3c;
}

.change-removed {
  background: linear-gradient(135deg, #e2e3e5 0%, #d1d3d4 100%);
  border-left: 3px solid #6c757d;
}

.change-icon {
  font-size: 1.1rem;
  min-width: 24px;
}

.change-type {
  font-weight: bold;
  font-size: 0.85rem;
  min-width: 50px;
  color: #2c3e50;
}

.change-text {
  color: #2c3e50;
  line-height: 1.4;
  flex: 1;
}

.footer {
  text-align: center;
  margin-top: 50px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.footer p {
  margin: 5px 0;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .changelog-container {
    padding: 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .version-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .version-badge {
    align-self: flex-start;
  }
  
  .timeline-item {
    padding: 20px;
  }
  
  .change-item {
    flex-direction: column;
    gap: 8px;
  }
  
  .change-type {
    min-width: auto;
  }
  
  .back-btn {
    position: static;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  
  .version-title {
    font-size: 1.2rem;
  }
  
  .timeline-item {
    margin-bottom: 20px;
  }
}
</style>
