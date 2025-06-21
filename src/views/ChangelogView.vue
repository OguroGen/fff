<script setup>
import { useRouter } from 'vue-router'
import { changelog, changeTypeConfig } from '@/data/changelog.js'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const getChangeIcon = (type) => {
  return changeTypeConfig[type]?.icon || "📄"
}

const getChangeClass = (type) => {
  return changeTypeConfig[type]?.class || "change-default"
}

const getChangeLabel = (type) => {
  return changeTypeConfig[type]?.label || "変更"
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
      <p class="subtitle">早押しクイズアプリの開発履歴</p>
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
          <div 
            v-for="(change, index) in release.changes"
            :key="index"
            class="change-item"
            :class="getChangeClass(change.type)"
          >
            <span class="change-icon">{{ getChangeIcon(change.type) }}</span>
            <span class="change-type">{{ getChangeLabel(change.type) }}</span>
            <span class="change-text">{{ change.text }}</span>
          </div>
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

.change-improved {
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
