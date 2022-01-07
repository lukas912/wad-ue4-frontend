import Vue from "vue";
import VueRouter from "vue-router";
import Overview from "@/components/Overview";
import AddTask from "@/components/AddTask";
import EditTask from "@/components/EditTask";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Overview',
        component: Overview
    },
    {
        path: '/add',
        name: 'Add Task',
        component: AddTask
    },
    {
        path: '/edit/:id',
        name: 'Edit Task',
        component: EditTask
    }
]

const router = new VueRouter({
    routes
})

export default router