<script setup lang="ts">
const { isGameOver, isWon, resetGame, lastScores, score } = useGameState()

const title = computed(() => isWon.value ? '🎉 You Win!' : '😢 Game Over')
const message = computed(() => isWon.value 
  ? 'Congratulations! You reached 2048!' 
  : 'No more moves available. Try again!')
</script>

<template>
  <div 
    v-if="isGameOver || isWon"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-2xl max-w-sm mx-4">
      <h2 class="text-3xl font-bold mb-4" :class="isWon ? 'text-green-500' : 'text-red-500'">
        {{ title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-2">{{ message }}</p>
      
      <div v-if="score > 0" class="mb-4">
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Your Score: <span class="text-primary-500">{{ score }}</span>
        </p>
      </div>

      <div v-if="lastScores.length > 0" class="mb-6">
        <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Last 5 Scores</h3>
        <div class="flex flex-col gap-1">
          <div 
            v-for="(s, index) in lastScores" 
            :key="index"
            class="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded px-3 py-1"
          >
            {{ index + 1 }}. {{ s }}
          </div>
        </div>
      </div>

      <UButton 
        size="lg" 
        color="primary"
        @click="resetGame"
      >
        Play Again
      </UButton>
    </div>
  </div>
</template>
