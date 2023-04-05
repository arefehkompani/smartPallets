import {createRouter, createWebHistory} from 'vue-router'
import dashboardPage from './pages/dashboardPage.vue'
import projectShowPage from './pages/projectShowPage.vue'

const routes = [
    {name:"dashboard", path: "/", component: dashboardPage},
    {name:"show", path: "/project/:id(\\d+)", component: projectShowPage},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
})

export default router