<script setup>
    import { useRouter } from 'vue-router'
    import packageJson from '../../package.json'
    
    const router = useRouter()
    const appVersion = packageJson.version

    const start = () => {
        document.body.requestFullscreen()
        router.push('/players')       
    }
</script>

<template>
  <div class="home-container">
    <div class="version-badge">
      <span class="version-text">v{{ appVersion }}</span>
    </div>
    
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
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.version-text {
  font-family: 'Courier New', monospace;
}

button {
  display: block;
  margin: 0 auto;
}

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
}
</style>
