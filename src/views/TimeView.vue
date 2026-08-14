<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { usePlayersStore } from "@/stores/playersStore";
import { useSettingStore } from "@/stores/settingStore";
import { usePlayerCardRows } from "@/composables/usePlayerCardRows";
import { useSyncedBuzzerTimer } from "@/composables/useSyncedBuzzerTimer";
import TimeDisplay from "@/components/TimeDisplay.vue";
import PlayerTime from "@/components/PlayerTime.vue";

const playersStore = usePlayersStore();
const settingStore = useSettingStore();
const router = useRouter();

const startButton = ref(null);

const { time, startTimer, stopTimer, resetTimer, limitMode, limitMin, limitSec } =
  useSyncedBuzzerTimer({
    onStopped() {
      settingStore.startButtonCaption = "RESET";
    },
  });

const cardsRoot = ref(null);
const { topRow, bottomRow, isTwoRows, cardSlots } = usePlayerCardRows(
  () => playersStore.players,
  cardsRoot
);

const startButtonClass = computed(() => {
  switch (settingStore.startButtonCaption) {
    case "START":
      return "btn-primary";
    case "STOP":
      return "btn-danger";
    case "RESET":
      return "btn-secondary";
  }
});

const start = () => {
  startButton.value.blur();

  if (settingStore.startButtonCaption == "START") {
    startTimer();
    settingStore.startButtonCaption = "STOP";
  } else if (settingStore.startButtonCaption == "STOP") {
    stopTimer();
  } else {
    resetTimer();
    settingStore.startButtonCaption = "START";
    playersStore.initialize();
  }
};

const prev = () => {
  router.push("/players");
};

const next = () => {
  router.push("/point");
};
</script>

<template>
  <header class="row">
    <button
      class="btn btn-outline-info col-2"
      @click="prev"
      :disabled="settingStore.startButtonCaption == 'STOP'"
    >
      《　選手情報
    </button>
    <div class="text-center col-8">
      <div class="limitTime" v-if="limitMode">
        制限時間{{ limitMin }}分{{ limitSec }}秒
      </div>
    </div>
    <button
      class="btn btn-outline-info col-2"
      @click="next"
      :disabled="settingStore.startButtonCaption == 'STOP'"
    >
      得点入力　》
    </button>
  </header>

  <TimeDisplay :time="time" />
  <div
    ref="cardsRoot"
    class="player-cards"
    :style="{ '--card-slots': cardSlots }"
  >
    <div class="player-row">
      <PlayerTime
        v-for="player in topRow"
        :key="player.keyCode"
        :player="player"
      />
    </div>
    <div v-if="isTwoRows" class="player-row">
      <PlayerTime
        v-for="player in bottomRow"
        :key="player.keyCode"
        :player="player"
      />
    </div>
  </div>
  <button
    id="startButton"
    ref="startButton"
    class="btn btn-lg py-3 px-5"
    :class="startButtonClass"
    @click="start()"
  >
    {{ settingStore.startButtonCaption }}
  </button>
  <div
    v-if="settingStore.showTournamentName"
    class="tournament-name"
    :style="{ fontSize: settingStore.tournamentNameFontSize + 'px' }"
  >
    {{ settingStore.tournamentName }}
  </div>
</template>

<style scoped>
#startButton {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
}

header .btn {
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.limitTime {
  text-align: center;
  font-size: 1.6rem;
  color: #d2691e;
  font-family: "RocknRoll One", sans-serif;
  font-weight: bold;
  background-color: transparent;
  border-bottom: 3px solid #ffa07a;
  padding: 0;
  margin: -10px auto 0;
  display: inline-block;
}

.tournament-name {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.player-cards {
  width: 100%;
}

.player-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
}

.player-row > * {
  flex: 0 0 calc(100% / var(--card-slots));
  max-width: calc(100% / var(--card-slots));
  min-width: 0;
}
</style>
