import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import Login from '../pages/auth/Login.vue'
import Registro from '../pages/auth/Registro.vue'
import Dashboard from '../pages/dashboard/Dashboard.vue'
import MinhasConsultas from '../pages/consultas/MinhasConsultas.vue'
import Agendamento from '../pages/consultas/Agendamento.vue'
import Medicos from '../pages/medicos/Medicos.vue'
import Clinicas from '../pages/clinicas/Clinicas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },

    {
      path: '/registro',
      component: Registro,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/consultas',
      component: MinhasConsultas,
      meta: {
        requiresAuth: true,
        perfis: ['admin', 'medico', 'paciente'],
      },
    },
    {
      path: '/agendar',
      component: Agendamento,
      meta: {
        requiresAuth: true,
        perfis: ['admin', 'paciente'],
      },
    },
    {
      path: '/medicos',
      component: Medicos,
      meta: {
        requiresAuth: true,
        perfis: ['admin'],
      },
    },
    {
      path: '/clinicas',
      component: Clinicas,
      meta: {
        requiresAuth: true,
        perfis: ['admin'],
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.estaLogado) {
    return next('/login')
  }
  if (to.meta.perfis && !to.meta.perfis.includes(authStore.perfil)) {
    return next('/dashboard')
  }
  if (authStore.estaLogado && to.path === '/login') {
    return next('/dashboard')
  }
  next()
})

export default router
