<template>
  <div class="bg-white rounded-xl shadow-sm p-5 flex justify-between items-start gap-4 hover:shadow-md transition">
    <div class="space-y-1">
      <p class="font-semibold text-gray-800">
        Dr(a). {{ consulta.medico?.usuario?.nome }}
      </p>
      <p class="text-sm text-blue-600">{{ consulta.medico?.especialidade?.nome }}</p>
      <p class="text-sm text-gray-500">
        {{ formatarData(consulta.data) }} às {{ consulta.hora_inicio?.slice(0, 5) }}
      </p>
      <p class="text-sm text-gray-400">{{ consulta.clinica?.nome }}</p>
      <span :class="statusClasses">{{ consulta.status }}</span>
    </div>

    <BaseButton
      v-if="consulta.status === 'agendada'"
      variant="danger"
      size="sm"
      @click="$emit('cancelar', consulta.id)"
    >
      Cancelar
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from '../common/BaseButton.vue'

const props = defineProps({
  consulta: { type: Object, required: true },
})

defineEmits(['cancelar'])

const statusClasses = computed(() => [
  'inline-block text-xs font-medium px-2 py-1 rounded-full mt-1',
  props.consulta.status === 'agendada'  ? 'bg-green-100 text-green-700' : '',
  props.consulta.status === 'cancelada' ? 'bg-red-100 text-red-600'     : '',
])

function formatarData(data) {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}
</script>