<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterUsuarios">
                    Obter Usuários
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="usuarios" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.nome }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.perfis
                                .map(p => p.nome)
                                .join(', ') }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../comum/Erros'
import gql from 'graphql-tag'

export default {
    components: { Erros },
    data() {
        return {
            erros: null,
            usuarios: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Perfis', value: 'perfis' },
            ],
        }
    },
    methods: {
        /*
        * A lista utiliza o conceito de fetchPolicy, que tal como o variables. 
        Indica uma manipulação da nossa consulta. a propriedade fetchPolicy com network-only
        permite que a cache seja limpada e retornada um consulta efetiva ao banco
        e desta forma validamos os acessos
        */
        obterUsuarios() {
            this.$api.query({
                query: gql`query {
                    usuarios { 
                        id nome email perfis { nome }
                    }
                }`,
                fetchPolicy: 'network-only'
            }).then(resultado => {
                this.usuarios = resultado.data.usuarios
                this.erros = null
            }).catch(e => {
                this.usuarios = []
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
