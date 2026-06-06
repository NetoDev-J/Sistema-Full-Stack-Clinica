<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Médicos</h2>
        <BaseButton @click="modalAberto = true">+ Novo Médico</BaseButton>
      </div>

      <!-- Modal cadastro médico -->
      <ModalForm title="Cadastrar Novo Médico" :open="modalAberto" @close="fecharModal">
        <AlertMessage :message="erro" type="error" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput v-model="formMedico.nome" label="Nome" placeholder="Nome completo" />
          <BaseInput v-model="formMedico.email" label="Email" type="email" placeholder="email@clinica.com" />
          <BaseInput v-model="formMedico.senha" label="Senha" type="password" placeholder="Senha de acesso" />
          <BaseInput v-model="formMedico.crm" label="CRM" placeholder="CRM12345" />
          <div class="sm:col-span-2">
            <BaseSelect v-model="formMedico.especialidade_id" label="Especialidade" placeholder="Selecione uma especialidade...">
              <option v-for="esp in especialidadeStore.especialidades" :key="esp.id" :value="esp.id">
                {{ esp.nome }}
              </option>
            </BaseSelect>
          </div>
        </div>
        <BaseButton size="lg" :loading="salvando" @click="handleCadastrar">Cadastrar Médico</BaseButton>
      </ModalForm>

      <!-- Lista -->
      <div v-if="carregando" class="text-center text-gray-400 py-16">Carregando...</div>

      <div v-else-if="medicoStore.medicos.length === 0"
        class="text-center text-gray-400 py-16 bg-white rounded-xl shadow-sm">
        Nenhum médico cadastrado.
      </div>

      <div v-else class="space-y-4">
        <CardMedico
          v-for="medico in medicoStore.medicos"
          :key="medico.id"
          :medico="medico"
          :gerenciavel="true"
          :ativo="medicoSelecionado?.id === medico.id"
          @gerenciar="toggleDisponibilidade"
        >
          <!-- Formulário de disponibilidade -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Adicionar Disponibilidade</h4>

            <AlertMessage :message="erroDisp" type="error" />
            <AlertMessage :message="sucessoDisp" type="success" />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseSelect v-model="formDisp.clinica_id" label="Clínica" placeholder="Selecione uma clínica...">
                <option v-for="clinica in clinicaStore.clinicas" :key="clinica.id" :value="clinica.id">
                  {{ clinica.nome }}
                </option>
              </BaseSelect>

              <BaseSelect v-model="formDisp.dia_semana" label="Dia da Semana" placeholder="Selecione...">
                <option :value="0">Domingo</option>
                <option :value="1">Segunda-feira</option>
                <option :value="2">Terça-feira</option>
                <option :value="3">Quarta-feira</option>
                <option :value="4">Quinta-feira</option>
                <option :value="5">Sexta-feira</option>
                <option :value="6">Sábado</option>
              </BaseSelect>

              <BaseInput v-model="formDisp.hora_inicio" label="Hora Início" type="time" />
              <BaseInput v-model="formDisp.hora_fim" label="Hora Fim" type="time" />

              <div class="sm:col-span-2">
                <BaseInput v-model.number="formDisp.duracao_consulta" label="Duração da Consulta (minutos)" type="number" placeholder="30" />
              </div>
            </div>

            <BaseButton size="lg" variant="secondary" @click="handleAdicionarDisponibilidade">
              Adicionar Disponibilidade
            </BaseButton>

            <!-- Disponibilidades existentes -->
            <div v-if="disponibilidades.length > 0" class="mt-2">
              <h5 class="text-sm font-medium text-gray-700 mb-2">Cadastradas:</h5>
              <div class="space-y-2">
                <div v-for="disp in disponibilidades" :key="disp.id"
                  class="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 text-sm">
                  <span class="text-gray-700">
                    {{ nomeDia(disp.dia_semana) }} — {{ disp.hora_inicio.slice(0,5) }} às {{ disp.hora_fim.slice(0,5) }} — {{ disp.clinica?.nome }}
                  </span>
                  <BaseButton variant="ghost" size="sm" @click="handleDeletar(disp.id, medico.id)">
                    Remover
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </CardMedico>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMedicoStore } from '@/stores/medico.store'
import { useEspecialidadeStore } from '@/stores/especialidade.store'
import { useClinicaStore } from '@/stores/clinica.store'
import Navbar from '@/components/common/Navbar.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import AlertMessage from '@/components/common/AlertMessage.vue'
import ModalForm from '@/components/common/ModalForm.vue'
import CardMedico from '@/components/medico/CardMedico.vue'
import api from '@/services/api'

const medicoStore = useMedicoStore()
const especialidadeStore = useEspecialidadeStore()
const clinicaStore = useClinicaStore()

const carregando = ref(true)
const modalAberto = ref(false)
const salvando = ref(false)
const erro = ref('')
const erroDisp = ref('')
const sucessoDisp = ref('')
const medicoSelecionado = ref(null)
const disponibilidades = ref([])

const formMedico = ref({ nome: '', email: '', senha: '', crm: '', especialidade_id: '', perfil: 'medico' })
const formDisp = ref({ clinica_id: '', dia_semana: '', hora_inicio: '', hora_fim: '', duracao_consulta: 30 })

const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
function nomeDia(num) { return diasSemana[num] }

onMounted(async () => {
  await Promise.all([medicoStore.listar(), especialidadeStore.listar(), clinicaStore.listar()])
  carregando.value = false
})

function fecharModal() {
  modalAberto.value = false
  erro.value = ''
  formMedico.value = { nome: '', email: '', senha: '', crm: '', especialidade_id: '', perfil: 'medico' }
}

async function toggleDisponibilidade(medico) {
  if (medicoSelecionado.value?.id === medico.id) {
    medicoSelecionado.value = null
    disponibilidades.value = []
    return
  }
  medicoSelecionado.value = medico
  erroDisp.value = ''
  sucessoDisp.value = ''
  const { data } = await api.get(`/disponibilidades/${medico.id}`)
  disponibilidades.value = data
}

async function handleCadastrar() {
  erro.value = ''
  salvando.value = true
  try {
    await api.post('/auth/registrar', formMedico.value)
    await medicoStore.listar()
    fecharModal()
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao cadastrar médico.'
  } finally {
    salvando.value = false
  }
}

async function handleAdicionarDisponibilidade() {
  erroDisp.value = ''
  sucessoDisp.value = ''
  try {
    await api.post('/disponibilidades', { ...formDisp.value, medico_id: medicoSelecionado.value.id })
    sucessoDisp.value = 'Disponibilidade adicionada!'
    formDisp.value = { clinica_id: '', dia_semana: '', hora_inicio: '', hora_fim: '', duracao_consulta: 30 }
    const { data } = await api.get(`/disponibilidades/${medicoSelecionado.value.id}`)
    disponibilidades.value = data
  } catch (e) {
    erroDisp.value = e.response?.data?.erro || 'Erro ao adicionar disponibilidade.'
  }
}

async function handleDeletar(id, medico_id) {
  if (!confirm('Remover esta disponibilidade?')) return
  try {
    await api.delete(`/disponibilidades/${medico_id}/${id}`)
    disponibilidades.value = disponibilidades.value.filter(d => d.id !== id)
  } catch (e) {
    erroDisp.value = e.response?.data?.erro || 'Erro ao remover.'
  }
}
</script>