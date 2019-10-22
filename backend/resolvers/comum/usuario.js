require('dotenv').config()
const jwt = require('jwt-simple')


const {perfis: obterPerfis} = require('../Type/Usuario')

module.exports = {

    async getUsuarioLogado(usuario){
        const perfis = await obterPerfis(usuario)

        const agora = Math.floor(Date.now() / 1000)
        const usuarioInfo = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfis: perfis.map(p => p.nome), //retorna um array com os nomes dos perfis
            iat: agora,
            exp: agora + (3 * 24 * 60 * 60) // Token para expirar em 3 dias
        }

        const authSecrete = process.env.APP_AUTH_SECRET
        // console.log(authSecrete)

        //retorno os dados do usuario e o token q foi gerado para ele utilizando o mentod
        // encode do

        // console.log(jwt.encode(usuarioInfo,authSecrete))
        return {
            ...usuarioInfo,
            token: jwt.encode(usuarioInfo,authSecrete)
        }
    }

}
