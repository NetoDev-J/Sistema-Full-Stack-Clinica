<template>
  <Transition name="fade">
    <div
      v-if="message"
      :class="[
        'flex items-start gap-2 text-sm p-3 rounded-lg',
        type === 'error'   ? 'bg-red-50 text-red-600 border border-red-200'     : '',
        type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : '',
        type === 'info'    ? 'bg-blue-50 text-blue-700 border border-blue-200'    : '',
      ]"
    >
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'error',
    
  },
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>