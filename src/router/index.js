import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../components/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Messages',
    component: Chat
  },
  {
    path: '/subject/:subjectId',
    name: 'Subject',
    component: Chat
  },
  {
    path: '*',
    name: 'Default',
    component: Chat
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
