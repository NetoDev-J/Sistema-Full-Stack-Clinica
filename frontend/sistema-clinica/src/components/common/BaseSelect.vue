<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      :value="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full border rounded-lg px-4 py-2 text-sm transition focus:outline-none focus:ring-2',
        error
          ? 'border-red-400 focus:ring-red-300'
          : 'border-gray-300 focus:ring-blue-400',
        disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-white',
      ]"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <slot />
    </select>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  disabled: Boolean,
  error: String,
})

defineEmits(['update:modelValue'])
</script>