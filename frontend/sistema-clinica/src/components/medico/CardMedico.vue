<template>
  <div class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
    <div class="flex justify-between items-start">
      <div class="space-y-1">
        <p class="font-semibold text-gray-800">Dr(a). {{ medico.usuario?.nome }}</p>
        <p class="text-sm text-blue-600">{{ medico.especialidade?.nome }}</p>
        <p class="text-sm text-gray-400">CRM: {{ medico.crm }}</p>
        <p class="text-sm text-gray-400">{{ medico.usuario?.email }}</p>
      </div>

      <BaseButton
        v-if="gerenciavel"
        variant="ghost"
        size="sm"
        @click="$emit('gerenciar', medico)"
      >
        {{ ativo ? 'Fechar' : 'Disponibilidade' }}
      </BaseButton>
    </div>

    <!-- formulário de disponibilidade -->
    <div v-if="ativo" class="mt-4 border-t pt-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../common/BaseButton.vue'

defineProps({
  medico: { type: Object, required: true },
  gerenciavel: { type: Boolean, default: false },
  ativo: { type: Boolean, default: false },
})

defineEmits(['gerenciar'])
</script>