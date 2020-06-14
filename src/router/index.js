import Vue from 'vue'
import VueRouter from 'vue-router'
import Messages from '../components/Messages'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/subject/:subjectId',
    name: 'Subject',
    component: Messages
  },
  {
    path: '*',
    name: 'Default',
    component: Messages
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
