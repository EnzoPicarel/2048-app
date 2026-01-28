<script setup lang="ts">
const { value } = defineProps<{
  value: number
}>()

import { tileConfig } from './tileConfig'

const config = computed(() => {
  return tileConfig[value] || { bg: 'bg-gray-800', text: 'text-white', size: 'text-xl' }
})
</script>

<template>
  <div
    class="tile w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg font-bold transition-all duration-100"
    :class="[config.bg, config.text, config.size]"
  >
    {{ value || '' }}
  </div>
</template>

<style scoped>
.tile {
  animation: pop 0.15s ease-out;
}

@keyframes pop {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
