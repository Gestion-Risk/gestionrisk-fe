import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'


import Login  from  './components/Login.vue'
import SignUp from  './components/SignUp.vue'
import Home   from  './components/Home.vue'
import Empleados from './components/Empleados.vue'
import Registros from './components/Registros.vue'
import Capacitaciones from './components/Capacitaciones'
import CrearCapacitaciones from './components/CrearCapacitaciones'
import EliminarCapacitacion from './components/EliminarCapacitacion'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/user/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user/empleados',
    name: 'empleados',
    component: Empleados
  },
  {
    path: '/user/registros',
    name: 'registros',
    component: Registros
  },
  {
    path: '/user/capacitaciones',
    name: 'capacitaciones',
    component: Capacitaciones
  },
  {
    path: '/user/capacitaciones/crearcapacitaciones',
    name: 'crearcapacitaciones',
    component: CrearCapacitaciones
  },
  {
    path: '/user/capacitaciones/eliminarcapacitaciones',
    name: 'eliminarcapacitaciones',
    component: EliminarCapacitacion
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
