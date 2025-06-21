<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()

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
      <span class="version-text">v0.9.0</span>
      <span class="changelog-icon">📋</span>
    </div>
    
    <!-- メインスタートボタン -->
    <button class="btn btn-primary btn-lg p-5" @click="start()">スタート</button>
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

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .version-badge {
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    font-size: 0.8rem;
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
}
</style>
