<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1',
      sizeClasses,
      variantClasses,
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    v-bind="$attrs"
  >
    <span v-if="loading" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  
  },
  size: {
    type: String,
    default: 'md',
    
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: Boolean,
  loading: Boolean,
})

const variantClasses = computed(() => ({
  primary:   'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
  danger:    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  ghost:     'text-blue-600 hover:bg-blue-50 focus:ring-blue-400',
}[props.variant]))

const sizeClasses = computed(() => ({
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3 w-full',
}[props.size]))
</script>