import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'


import Login  from  './components/Login.vue'
import SignUp from  './components/SignUp.vue'
import Home   from  './components/Home.vue'
import Empleados from './components/Empleados.vue'
import Registros from './components/Registros.vue'
import Capacitaciones from './components/Capacitaciones'
import CrearCapacitaciones from './components/CrearCapacitaciones'
import CrearRegistros from './components/CrearRegistros'
import UpdateCapacitaciones from './components/UpdateCapacitaciones'

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
    path: '/user/registros/crearRegistros',
    name: 'crearregistros',
    component: CrearRegistros
  },
  {
    path: '/user/capacitaciones/updatecapacitaciones',
    name: 'updatecapacitaciones',
    component: UpdateCapacitaciones,
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
