import {createRouter, createWebHistory} from 'vue-router';
import store from '../store/index.js'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AuthLayout from '../components/AuthLayout.vue'
import MainLayout from '../components/MainLayout.vue'

const routes= [
  {
    path:'/',
    redirect:'/dashboard',
    component: MainLayout,
    meta: {requiresAuth:true},
    children:[
      {
        path:'/dashboard',
        name:'Dashboard',
        component:()=>import('../views/Dashboard.vue')
      },
      {
        path:'/surveys',
        name:'Surveys',
        component:()=>import('../views/Surveys.vue')
      }
    ]
  },
  {
    path:'/auth',
    redirect:'/login',
    name:'Auth',
    meta:{isGuest:true},
    component: AuthLayout,
    children:[
      {
        path:'/login',
        name: 'Login',
        component: Login
      },
      {
        path:'/register',
        name: 'Register',
        component: Register
      }
    ]
  }

];

const router = createRouter({
  history : createWebHistory(),
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth && !store.state.user.token){
    next({name:'Login'})
  }else if(store.state.user.token && (to.meta.isGuest)){
    next({name:'Dashboard'})
  }else{
    next()
  }
})

export default router;
