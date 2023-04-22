import { createRouter, createWebHistory } from 'vue-router'
import Cabinets from '../views/CabinetsView.vue'
import Classes from '../views/ClassesView.vue'
import Subjects from '../views/SubjectsView.vue'
import Teachers from '../views/TeachersView.vue'
import Schedule from '../views/ScheduleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cabinets',
      component: Cabinets
    },
    {
      path: '/classes',
      name: 'classes',
      component: Classes
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: Subjects
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: Teachers
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    }
  ]
})

export default router
