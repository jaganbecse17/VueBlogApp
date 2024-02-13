import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes=[
    {
        name:"HomePage",
        path:'/',
        component:()=>import('@/pages/HomePage')
    },
    {
        name:"LoginPage",
        path:'/Login/:screen',
        component:()=>import('@/pages/LoginPage')
    },
    {
        name:"Blogs",
        path:'/Blogs',
        component:()=>import('@/pages/ManageBlog')
    },
    {
        name:"BlogViewer",
        path:'/BlogsView/:blogId',
        component:()=>import('@/pages/ViewBlog')
    },
    {
        name:"CreateBlog",
        path:'/CreatBlogs',
        component:()=>import('@/pages/CreateBlog')
    }
]

const router=new VueRouter({
    mode:"hash",
    routes:routes
})

export default router