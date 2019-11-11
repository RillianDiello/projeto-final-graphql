import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Store tem como objetivo guardar o estado da aplicação
// Ela é comumente utilizada para armazendar informações para trafegar dentro das paginas
// Token, validação, usuarios logados etc
export default new Vuex.Store({
    state: {
        usuario: null,
    },
    mutations: {
        setUsuario(state, usuario) {
            state.usuario = usuario
        }
    },
    getters: {
        usuario(state) {
            return state.usuario
        },
    },
    actions: {
        setUsuario({ commit }, usuario) {
            if(usuario && usuario.token){
                localStorage.setItem('token', usuario.token)
            }else{
                localStorage.removeItem('token')
            }
            commit('setUsuario', usuario)
        }
    }
})