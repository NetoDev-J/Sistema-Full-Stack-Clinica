<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Agendar Consulta</h2>

      <AlertMessage :message="erro" type="error" class="mb-4" />
      <AlertMessage :message="sucesso" type="success" class="mb-4" />

      <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">

        <!-- Médico -->
        <BaseSelect v-model="form.medico_id" label="Médico" placeholder="Selecione um médico..." @change="onMedicoChange">
          <option v-for="medico in medicoStore.medicos" :key="medico.id" :value="medico.id">
            Dr(a). {{ medico.usuario?.nome }} — {{ medico.especialidade?.nome }}
          </option>
        </BaseSelect>

        <!-- Clínica -->
        <BaseSelect v-model="form.clinica_id" label="Clínica" placeholder="Selecione uma clínica...">
          <option v-for="clinica in clinicaStore.clinicas" :key="clinica.id" :value="clinica.id">
            {{ clinica.nome }}
          </option>
        </BaseSelect>

        <!-- Calendário -->
        <div v-if="form.medico_id && form.clinica_id">
          <label class="block text-sm font-medium text-gray-700 mb-2">Data</label>

          <div class="flex justify-between items-center mb-3">
            <button @click="mesAnterior" type="button" class="text-gray-400 hover:text-blue-600 px-2 text-lg">&#8249;</button>
            <span class="font-semibold text-gray-700">{{ nomeMes }} {{ anoAtual }}</span>
            <button @click="proximoMes" type="button" class="text-gray-400 hover:text-blue-600 px-2 text-lg">&#8250;</button>
          </div>

          <div class="grid grid-cols-7 text-center text-xs font-medium text-gray-400 mb-1">
            <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span>
            <span>Qui</span><span>Sex</span><span>Sáb</span>
          </div>

          <div class="grid grid-cols-7 gap-1 text-center text-sm">
            <div v-for="n in primeiroDiaSemana" :key="'e-' + n"></div>
            <button
              v-for="dia in diasDoMes"
              :key="dia"
              type="button"
              @click="selecionarData(dia)"
              :disabled="!isDiaDisponivel(dia)"
              :class="[
                'rounded-lg py-2 text-sm font-medium transition',
                isDiaDisponivel(dia)
                  ? form.data === formatarData(dia)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-50 text-gray-800'
                  : 'text-gray-200 cursor-not-allowed',
              ]"
            >
              {{ dia }}
            </button>
          </div>
        </div>

        <!-- Slots -->
        <div v-if="form.data && disponibilidadeStore.slots.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-2">Horário disponível</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="slot in disponibilidadeStore.slots"
              :key="slot.inicio"
              type="button"
              @click="selecionarSlot(slot)"
              :class="[
                'border rounded-lg py-2 text-sm font-medium transition',
                form.hora_inicio === slot.inicio
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-200 hover:border-blue-400 text-gray-700',
              ]"
            >
              {{ slot.inicio.slice(0, 5) }}
            </button>
          </div>
        </div>

        <div v-else-if="form.data && disponibilidadeStore.slots.length === 0"
          class="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
          Nenhum horário disponível para este dia.
        </div>

        <!-- Resumo -->
        <div v-if="form.hora_inicio" class="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 space-y-1">
          <p><strong>Data:</strong> {{ form.data }}</p>
          <p><strong>Horário:</strong> {{ form.hora_inicio.slice(0, 5) }} — {{ form.hora_fim.slice(0, 5) }}</p>
        </div>

        <BaseButton v-if="form.hora_inicio" size="lg" :loading="agendando" @click="handleAgendar">
          Confirmar Agendamento
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useConsultaStore } from '@/stores/consulta.store'
import { useMedicoStore } from '@/stores/medico.store'
import { useClinicaStore } from '@/stores/clinica.store'
import { useDisponibilidadeStore } from '@/stores/disponibilidade.store'
import Navbar from '@/components/common/Navbar.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import AlertMessage from '@/components/common/AlertMessage.vue'

const consultaStore = useConsultaStore()
const medicoStore = useMedicoStore()
const clinicaStore = useClinicaStore()
const disponibilidadeStore = useDisponibilidadeStore()

const erro = ref('')
const sucesso = ref('')
const agendando = ref(false)

const form = ref({ medico_id: '', clinica_id: '', data: '', hora_inicio: '', hora_fim: '' })

// Calendário 
const hoje = new Date()
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())
const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const nomeMes = computed(() => nomesMeses[mesAtual.value])
const diasDoMes = computed(() => new Date(anoAtual.value, mesAtual.value + 1, 0).getDate())
const primeiroDiaSemana = computed(() => new Date(anoAtual.value, mesAtual.value, 1).getDay())

function mesAnterior() {
  if (mesAtual.value === 0) { mesAtual.value = 11; anoAtual.value-- }
  else mesAtual.value--
}
function proximoMes() {
  if (mesAtual.value === 11) { mesAtual.value = 0; anoAtual.value++ }
  else mesAtual.value++
}
function formatarData(dia) {
  return `${anoAtual.value}-${String(mesAtual.value + 1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`
}
function isDiaDisponivel(dia) {
  const data = new Date(`${formatarData(dia)}T12:00:00`)
  const passado = data < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  const dias = disponibilidadeStore.diasDisponiveisPorClinica(form.value.clinica_id)
  return !passado && dias.includes(data.getDay())
}
async function selecionarData(dia) {
  if (!isDiaDisponivel(dia)) return
  form.value.data = formatarData(dia)
  form.value.hora_inicio = ''
  form.value.hora_fim = ''
  await disponibilidadeStore.gerarSlots(form.value.medico_id, form.value.clinica_id, form.value.data)
  await disponibilidadeStore.filtrarSlotsDisponiveis(form.value.medico_id, form.value.clinica_id, form.value.data)
}
function selecionarSlot(slot) {
  form.value.hora_inicio = slot.inicio
  form.value.hora_fim = slot.fim
}

// Médico 
async function onMedicoChange() {
  form.value.data = ''
  form.value.hora_inicio = ''
  form.value.hora_fim = ''
  disponibilidadeStore.slots = []
  if (form.value.medico_id) {
    await disponibilidadeStore.buscarPorMedico(form.value.medico_id)
  }
}

watch(() => form.value.clinica_id, () => {
  form.value.data = ''
  form.value.hora_inicio = ''
  form.value.hora_fim = ''
  disponibilidadeStore.slots = []
})

// Agendar 
async function handleAgendar() {
  erro.value = ''
  sucesso.value = ''
  agendando.value = true
  try {
    await consultaStore.criar(form.value)
    sucesso.value = 'Consulta agendada com sucesso!'
    form.value = { medico_id: '', clinica_id: '', data: '', hora_inicio: '', hora_fim: '' }
    disponibilidadeStore.slots = []
    disponibilidadeStore.disponibilidades = []
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao agendar consulta.'
  } finally {
    agendando.value = false
  }
}

onMounted(async () => {
  await medicoStore.listar()
  await clinicaStore.listar()
})
</script>