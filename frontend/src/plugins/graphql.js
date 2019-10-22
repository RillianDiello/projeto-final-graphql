import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.use({
    install(Vue) {
        const httpLink = createHttpLink({
            uri: 'http://localhost:4000/'
        })
        // Utiliza interface Apollo Link
        const authLink = setContext((_, { headers }) => {
            const token = localStorage.getItem('token')

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : ''
                }
            }
        })

        /*
        * O metodo concat do authLink, é um metodo especifico que recebe um objeto especifico 
        * Sempre que setarmos um link vamos ter q setar um memoryCache
        */
        Vue.prototype.$api = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        })
    }
})
