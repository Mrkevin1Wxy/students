import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import context from '@/components/context'
import Personal from '@/components/personal'
import Course from '@/components/course'
import Page3 from '@/components/page3'
import Welcome from '@/components/welcome'
import Publish from '@/components/publish'
import Students from '@/components/students'
Vue.use(Router)

export default new Router({
  routes: [
  
    {
      path: '/',
      component: Home,
    }, 
    {
      path: '/Context',
      component: context,
      children: [
        {
          path: 'Welcome',
          component: Welcome
        },
        {
           path: 'Personal',
           component: Personal
         },
         {
           path: 'Course',
           component: Course
         },
         {
           path: 'Page3',
           component: Page3
         }
       ]
    },
    {
      path: '/Publish',
      component: Publish,
    },
     {
       path: '/Students',
       component: Students,
     }

 
   
   
  ]
})
