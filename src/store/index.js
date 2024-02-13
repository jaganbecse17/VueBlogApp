import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profile:{
        name:"",
        role:"",
        isActive:true,
        loggedIn:true
    },
    formState:{
      loginForm:{},
      blogForm:{}
    },
    blogList:[
        {
            title:"blog1",
            content:"",
            author:"",
            authorId:""
        }
    ],
  },
  actions:{

  },
  mutations: {
    OnUserLogin(state,payload){
      if(payload.userName){
        state.profile={...payload,loggedIn:true}
      }else{
        state.profile={loggedIn:false}
      }
    }
  }
})

export default store