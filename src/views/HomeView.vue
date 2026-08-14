<script setup>
    import { useRouter } from 'vue-router'
    import packageJson from '../../package.json'
    
    const router = useRouter()
    const appVersion = packageJson.version
    const betaUrl = 'https://fff-navy.vercel.app'

    const start = () => {
        document.body.requestFullscreen()
        router.push('/players')       
    }

    const goToChangelog = () => {
        router.push('/changelog')
    }
</script>

<template>
  <div class="home-container">
    <!-- バージョン情報バッジ -->
    <div class="version-badge" @click="goToChangelog">
      <span class="version-text">v{{ appVersion }}</span>
      <span class="changelog-icon">📋</span>
    </div>
    
    <div class="home-main">
      <!-- メインスタートボタン -->
      <button class="btn btn-primary btn-lg p-5" @click="start()">スタート</button>

      <!-- Ver 2.0 ベータ案内 -->
      <a
        class="beta-promo"
        :href="betaUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="beta-label">β</span>
        <span class="beta-text">
          <strong>Ver 2.0 ベータ公開中</strong>
          ミニ大会など新機能を試せます
        </span>
        <span class="beta-link">開く →</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.version-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 100;
}

.version-badge:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #5a6fd8, #6a4c93);
}

.version-text {
  font-family: 'Courier New', monospace;
}

.changelog-icon {
  font-size: 1.1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

button {
  display: block;
  margin: 0 auto;
}

.beta-promo {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 28rem;
  padding: 12px 18px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #343a40;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.beta-promo:hover {
  background: #eef2ff;
  border-color: #c5cae9;
  box-shadow: 0 3px 12px rgba(102, 126, 234, 0.2);
  color: #343a40;
}

.beta-label {
  flex-shrink: 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 999px;
}

.beta-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.9rem;
  line-height: 1.35;
}

.beta-text strong {
  font-size: 1rem;
}

.beta-link {
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: bold;
  color: #667eea;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .version-badge {
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .beta-promo {
    margin: 0 16px;
  }
}

@media (max-width: 480px) {
  .version-badge {
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    font-size: 0.75rem;
  }
  
  .changelog-icon {
    font-size: 1rem;
  }

  .beta-promo {
    flex-wrap: wrap;
  }
}
</style>
