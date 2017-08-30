import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/views/index'
import Rank from '@/views/rank'
import SongList from '@/views/songList'
import Other from '@/views/other'
import Detail from '@/views/detail'
import All from '@/views/all'
import Collect from '@/views/collect'
import Love from '@/views/love'
import About from '@/views/about'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',
     redirect: '/all/index',
    },
    {
        path:'/all',component:All,
      	children:[
                  {path:'index',component:Index},
                  {path:'rank',component:Rank},
                  {path:'songList',component:SongList},
                  {path:'other',component:Other},
                  {path:'collect',component:Collect},
                  {path:'love',component:Love}
        ]
    },
    
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/all/about',
      component:About
    }
   
  ]
})
