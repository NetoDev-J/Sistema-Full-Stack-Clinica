<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <button
            @click="$emit('close')"
            type="button"
            class="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <!-- Conteúdo -->
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  open: Boolean,
  title: String,
})

defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>