import {createRouter, createWebHistory} from 'vue-router'
import Cabinets from '../views/CabinetsView.vue'
import Classes from '../views/ClassesView.vue'
import Subjects from '../views/SubjectsView.vue'
import Teachers from '../views/TeachersView.vue'
import Conditions from '../views/ConditionView.vue'
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
            path: '/conditions',
            name: 'conditions',
            component: Conditions
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: Schedule
        }
    ]
});

router.beforeEach(async (to) => {
    await store.commit("setLoaded", false);
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && store.state.access_token === '') {
        return '/login';
    }
    if (!authRequired && store.state.access_token !== '') {
        return '/';
    }
});

export default router
