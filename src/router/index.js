import { createRouter, createWebHistory } from 'vue-router'
import Cabinets from '../views/CabinetsView.vue'
import Classes from '../views/ClassesView.vue'
import Subjects from '../views/SubjectsView.vue'
import Teachers from '../views/TeachersView.vue'
import Schedule from '../views/ScheduleView.vue'
import LoginView from "@/views/LoginView.vue";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/login',
        name: 'login',
      component: LoginView
    },
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
});

router.beforeEach(async (to) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    console.log(store.state.access_token, authRequired, to)
    if (authRequired && store.state.access_token === '') {
        return '/login';
    }
    console.log(authRequired, store.state.access_token)
    if (!authRequired && store.state.access_token !== '') {
        return '/';
    }
});

export default router
