// 更新履歴データ
export const changelog = [
  {
    version: "0.9.0",
    date: "2025-06-21",
    title: "更新履歴機能の追加",
    changes: [
      {
        type: "added",
        text: "更新履歴表示ページの追加"
      },
      {
        type: "added",
        text: "ホーム画面にバージョンバッジを追加"
      },
      {
        type: "added",
        text: "タイムライン形式の見やすい更新履歴"
      },
      {
        type: "improved",
        text: "変更タイプ別のアイコンと色分け表示"
      }
    ]
  },
  {
    version: "0.8.0",
    date: "2025-06-21",
    title: "包括的なアップデート: ドキュメント整備・環境構築・コード品質向上",
    changes: [
      {
        type: "added",
        text: "包括的なREADME.mdの追加"
      },
      {
        type: "added",
        text: "Vercel自動デプロイ環境の構築"
      },
      {
        type: "improved",
        text: "Vite設定: Vercel/本番環境の自動切り替え"
      },
      {
        type: "improved",
        text: "Vue 3 Composition API規則への対応"
      },
      {
        type: "improved",
        text: "コード品質の向上と命名規則の統一"
      },
      {
        type: "added",
        text: "ファビコン追加: 稲妻デザインのSVGファビコン"
      },
      {
        type: "added",
        text: "技術スタック情報とデプロイ方法の詳細説明"
      }
    ]
  },
  {
    version: "0.7.0",
    date: "2022-11-27",
    title: "個別モード追加",
    changes: [
      {
        type: "added",
        text: "個人タイマー機能の実装"
      },
      {
        type: "added",
        text: "PersonalTimerView.vueの追加"
      },
      {
        type: "added",
        text: "個別練習モードの導入"
      }
    ]
  },
  {
    version: "0.6.0", 
    date: "2022-09-18",
    title: "ラストプレイヤーカウントダウン機能",
    changes: [
      {
        type: "added",
        text: "最後の選手のカウントダウン機能"
      },
      {
        type: "improved",
        text: "タイマー停止機能の改善"
      }
    ]
  },
  {
    version: "0.5.0",
    date: "2022-09-11", 
    title: "音響効果とタイマー機能",
    changes: [
      {
        type: "added",
        text: "makeSound()関数の実装"
      },
      {
        type: "added",
        text: "stopPlayerTimer()関数の実装"
      },
      {
        type: "improved",
        text: "音響効果の改善"
      }
    ]
  },
  {
    version: "0.1.0",
    date: "2022-09-07",
    title: "初回リリース",
    changes: [
      {
        type: "added",
        text: "基本的な早押しクイズ機能"
      },
      {
        type: "added",
        text: "選手登録機能"
      },
      {
        type: "added",
        text: "時間計測機能"
      },
      {
        type: "added",
        text: "得点入力機能"
      },
      {
        type: "added", 
        text: "成績発表機能"
      },
      {
        type: "added",
        text: "ストップウォッチ機能"
      }
    ]
  }
]

// 変更タイプのアイコンとスタイル
export const changeTypeConfig = {
  added: {
    icon: "🆕",
    label: "新機能",
    class: "change-added"
  },
  improved: {
    icon: "🔧", 
    label: "改善",
    class: "change-improved"
  },
  fixed: {
    icon: "🐛",
    label: "修正", 
    class: "change-fixed"
  },
  removed: {
    icon: "🗑️",
    label: "削除",
    class: "change-removed"
  }
}
