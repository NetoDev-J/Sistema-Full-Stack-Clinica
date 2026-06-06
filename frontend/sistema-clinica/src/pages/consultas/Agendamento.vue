<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <RouterLink to="/dashboard" class="text-blue-600 font-bold text-xl">Clínica</RouterLink>
      <button @click="authStore.logout" class="text-sm text-red-500 hover:underline">Sair</button>
    </nav>

    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Agendar Consulta</h2>

      <div v-if="erro" class="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">{{ erro }}</div>
      <div v-if="sucesso" class="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
        {{ sucesso }}
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <!-- Seleção de médico -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Médico</label>
          <select
            v-model="form.medico_id"
            @change="onMedicoChange"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um médico...</option>
            <option v-for="medico in medicoStore.medicos" :key="medico.id" :value="medico.id">
              Dr(a). {{ medico.usuario?.nome }} — {{ medico.especialidade?.nome }}
            </option>
          </select>
        </div>

        <!-- Seleção de clínica -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Clínica</label>
          <select
            v-model="form.clinica_id"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma clínica...</option>
            <option v-for="clinica in clinicaStore.clinicas" :key="clinica.id" :value="clinica.id">
              {{ clinica.nome }}
            </option>
          </select>
        </div>

        <!-- Calendário -->
        <div v-if="form.medico_id && form.clinica_id">
          <label class="block text-sm font-medium text-gray-700 mb-2">Data</label>

          <!-- Navegação do mês -->
          <div class="flex justify-between items-center mb-3">
            <button @click="mesAnterior" class="text-gray-500 hover:text-blue-600 px-2">
              &#8249;
            </button>
            <span class="font-semibold text-gray-700">{{ nomeMes }} {{ anoAtual }}</span>
            <button @click="proximoMes" class="text-gray-500 hover:text-blue-600 px-2">
              &#8250;
            </button>
          </div>

          <!-- Dias da semana -->
          <div class="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
            <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span> <span>Qui</span
            ><span>Sex</span><span>Sáb</span>
          </div>

          <!-- Dias do mês -->
          <div class="grid grid-cols-7 gap-1 text-center text-sm">
            <!-- Espaços vazios antes do primeiro dia -->
            <div v-for="n in primeiroDiaSemana" :key="'empty-' + n"></div>

            <!-- Dias do mês -->
            <button
              v-for="dia in diasDoMes"
              :key="dia"
              @click="selecionarData(dia)"
              :disabled="!isDiaDisponivel(dia)"
              :class="[
                'rounded-lg py-2 text-sm font-medium transition',
                isDiaDisponivel(dia)
                  ? form.data === formatarData(dia)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-50 text-gray-800 cursor-pointer'
                  : 'text-gray-300 cursor-not-allowed',
              ]"
            >
              {{ dia }}
            </button>
          </div>
        </div>

        <!-- Slots de horário -->
        <div v-if="form.data && disponibilidadeStore.slots.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-2">Horário disponível</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="slot in disponibilidadeStore.slots"
              :key="slot.inicio"
              @click="selecionarSlot(slot)"
              :class="[
                'border rounded-lg py-2 text-sm font-medium transition',
                form.hora_inicio === slot.inicio
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:border-blue-400 text-gray-700',
              ]"
            >
              {{ slot.inicio.slice(0, 5) }}
            </button>
          </div>
        </div>

        <div
          v-else-if="form.data && disponibilidadeStore.slots.length === 0"
          class="text-sm text-gray-500"
        >
          Nenhum horário disponível para este dia.
        </div>

        <!-- Resumo e botão -->
        <div v-if="form.hora_inicio" class="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <p><strong>Data:</strong> {{ form.data }}</p>
          <p>
            <strong>Horário:</strong> {{ form.hora_inicio.slice(0, 5) }} —
            {{ form.hora_fim.slice(0, 5) }}
          </p>
        </div>

        <button
          v-if="form.hora_inicio"
          @click="handleAgendar"
          type="button"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Confirmar Agendamento
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, onMounted } from 'vue'
import { useConsultaStore } from '@/stores/consulta.store'
import { useMedicoStore } from '@/stores/medico.store'
import { useClinicaStore } from '@/stores/clinica.store'
import { useDisponibilidadeStore } from '@/stores/disponibilidade.store'
import { useAuthStore } from '@/stores/auth.store'

const consultaStore = useConsultaStore()
const medicoStore = useMedicoStore()
const clinicaStore = useClinicaStore()
const disponibilidadeStore = useDisponibilidadeStore()
const authStore = useAuthStore()

const erro = ref('')
const sucesso = ref('')

const form = ref({
  medico_id: '',
  clinica_id: '',
  data: '',
  hora_inicio: '',
  hora_fim: '',
})

// Calendário
const hoje = new Date()
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())

const nomesMeses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]
const nomeMes = computed(() => nomesMeses[mesAtual.value])

const diasDoMes = computed(() => {
  return new Date(anoAtual.value, mesAtual.value + 1, 0).getDate()
})

const primeiroDiaSemana = computed(() => {
  return new Date(anoAtual.value, mesAtual.value, 1).getDay()
})

function mesAnterior() {
  if (mesAtual.value === 0) {
    mesAtual.value = 11
    anoAtual.value--
  } else mesAtual.value--
}

function proximoMes() {
  if (mesAtual.value === 11) {
    mesAtual.value = 0
    anoAtual.value++
  } else mesAtual.value++
}

function formatarData(dia) {
  const m = String(mesAtual.value + 1).padStart(2, '0')
  const d = String(dia).padStart(2, '0')
  return `${anoAtual.value}-${m}-${d}`
}

function isDiaDisponivel(dia) {
  const data = new Date(`${formatarData(dia)}T12:00:00`)
  const diaSemana = data.getDay()
  const passado = data < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  const diasDisponiveis = disponibilidadeStore.diasDisponiveisPorClinica(form.value.clinica_id)
  console.log('clinica_id selecionada:', form.value.clinica_id)
  console.log('dias disponíveis:', diasDisponiveis)
  console.log('disponibilidades completas:', disponibilidadeStore.disponibilidades)
  return !passado && disponibilidadeStore.diasDisponiveis.includes(diaSemana)
}

async function selecionarData(dia) {
  if (!isDiaDisponivel(dia)) return
  form.value.data = formatarData(dia)
  form.value.hora_inicio = ''
  form.value.hora_fim = ''
  await disponibilidadeStore.gerarSlots(
    form.value.medico_id,
    form.value.clinica_id,
    form.value.data,
  )
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

// Agendar
async function handleAgendar() {
  erro.value = ''
  sucesso.value = ''
  try {
    await consultaStore.criar(form.value)
    sucesso.value = 'Consulta agendada com sucesso!'
    form.value = { medico_id: '', clinica_id: '', data: '', hora_inicio: '', hora_fim: '' }
    disponibilidadeStore.slots = []
    disponibilidadeStore.disponibilidades = []
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao agendar consulta.'
  }
}
watch(
  () => form.value.clinica_id,
  () => {
    form.value.data = ''
    form.value.hora_inicio = ''
    form.value.hora_fim = ''
    disponibilidadeStore.slots = []
  },
)

onMounted(async () => {
  await medicoStore.listar()
  await clinicaStore.listar()
})
</script>
