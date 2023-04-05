import { createStore } from 'vuex'



const store = createStore({
    state () {
      return {
        user : null,
        token : null,
      }
    },
    getters: {
        user : (state) => {
            return state.user
        },

        isAuthenticated : (state) =>{
            return true
        },

        getToken : (state) => {
            return state.token
        }
        
    },
    actions: { // Save in store
        user(context, user){
            context.commit('user',user)
        },

        setToken(context, newToken){
            context.commit('token', newToken)
        }
    },
    mutations: { // Save out of store
        user(state, user){
            state.user = user
        },
        setToken(state, newToken){
            state.token = newToken
        }
    }
  })

export default store