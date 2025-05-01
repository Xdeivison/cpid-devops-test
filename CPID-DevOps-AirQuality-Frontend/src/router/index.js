import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Map from "../views/Map.vue"
import About from '../views/About.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name:'home',
            component: Home
        },
        {
            path: '/map',
            name: 'Map',
            component: Map
        },
        {
            path:'/about',
            name:'About',
            component: About
        }
    ]

})

export default router