<script setup>
import { useRouter } from "vue-router";
import { useSettingStore } from "@/stores/settingStore";
import packageJson from "../../package.json";

const router = useRouter();
const settingStore = useSettingStore();
const appVersion = packageJson.version;

const modes = [
  {
    id: "buzzer",
    title: "早押しアプリ",
    desc: "時間計測 → 得点 → 順位発表（今までのもの）",
  },
  { id: "mini", title: "ミニ大会", desc: "問題出題 → 早押し → 順位ポイント累計" },
  {
    id: "stopwatch",
    title: "個別ストップウォッチ",
    desc: "選手ごとに独立して計時",
  },
  { id: "timer", title: "個別タイマー", desc: "選手ごとに制限時間で計測" },
];

const start = (mode) => {
  settingStore.appMode = mode;
  try {
    const fs = document.body.requestFullscreen();
    if (fs && typeof fs.catch === "function") fs.catch(() => {});
  } catch (e) {
    /* 全画面にできない環境でも遷移する */
  }
  router.push("/players");
};
</script>

<template>
  <div class="home-container">
    <div class="version-badge">
      <span class="version-text">v{{ appVersion }}</span>
    </div>

    <div class="mode-grid">
      <button
        v-for="mode in modes"
        :key="mode.id"
        class="mode-card"
        type="button"
        @click="start(mode.id)"
      >
        <span class="mode-title">{{ mode.title }}</span>
        <span class="mode-desc">{{ mode.desc }}</span>
      </button>
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
  padding: 80px 40px 40px;
  box-sizing: border-box;
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
  font-family: "Courier New", monospace;
}

.mode-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 28px;
  width: min(1100px, 100%);
  height: min(560px, calc(100vh - 140px));
}

.mode-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 4px solid darkcyan;
  border-radius: 18px;
  background: #f0f8ff;
  color: #2c5f7c;
  cursor: pointer;
  padding: 24px;
}

.mode-card:hover,
.mode-card:focus-visible {
  background: darkcyan;
  color: lightcyan;
  outline: none;
}

.mode-title {
  font-size: clamp(1.5rem, 2.6vw, 2.3rem);
  font-weight: bold;
  white-space: nowrap;
}

.mode-desc {
  font-size: clamp(0.9rem, 1.4vw, 1.15rem);
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
