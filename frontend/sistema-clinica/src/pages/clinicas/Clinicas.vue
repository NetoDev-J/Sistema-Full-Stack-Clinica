<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Clínicas</h2>
        <BaseButton @click="modalAberto = true">+ Nova Clínica</BaseButton>
      </div>

      <!-- Modal de criação -->
      <ModalForm title="Nova Clínica" :open="modalAberto" @close="fecharModal">
        <AlertMessage :message="erro" type="error" />
        <BaseInput v-model="form.nome" label="Nome" placeholder="Nome da clínica" />
        <BaseInput v-model="form.endereco" label="Endereço" placeholder="Endereço completo" />
        <BaseButton size="lg" :loading="salvando" @click="handleCriar">Salvar</BaseButton>
      </ModalForm>

      <!-- Lista -->
      <div v-if="carregando" class="text-center text-gray-400 py-16">Carregando...</div>

      <div v-else-if="clinicaStore.clinicas.length === 0"
        class="text-center text-gray-400 py-16 bg-white rounded-xl shadow-sm">
        Nenhuma clínica cadastrada.
      </div>

      <div v-else class="space-y-3">
        <div v-for="clinica in clinicaStore.clinicas" :key="clinica.id"
          class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
          <p class="font-semibold text-gray-800">{{ clinica.nome }}</p>
          <p class="text-sm text-gray-400">{{ clinica.endereco }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClinicaStore } from '@/stores/clinica.store'
import Navbar from '@/components/common/Navbar.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import AlertMessage from '@/components/common/AlertMessage.vue'
import ModalForm from '@/components/common/ModalForm.vue'

const clinicaStore = useClinicaStore()
const carregando = ref(true)
const modalAberto = ref(false)
const salvando = ref(false)
const erro = ref('')
const form = ref({ nome: '', endereco: '' })

onMounted(async () => {
  await clinicaStore.listar()
  carregando.value = false
})

function fecharModal() {
  modalAberto.value = false
  erro.value = ''
  form.value = { nome: '', endereco: '' }
}

async function handleCriar() {
  erro.value = ''
  salvando.value = true
  try {
    await clinicaStore.criar(form.value)
    fecharModal()
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao criar clínica.'
  } finally {
    salvando.value = false
  }
}
</script>