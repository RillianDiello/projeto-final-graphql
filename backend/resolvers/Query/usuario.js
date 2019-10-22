const db = require('../../config/db')
const bcrypt= require('bcrypt-nodejs')
const { getUsuarioLogado} = require('../comum/usuario')


module.exports = {
    async login(_, { dados }){
        const usuario = await db('usuarios').where({ email: dados.email}).first()
        if(!usuario){
            throw new Error( 'Usuario/Senha Invalidos')
        }

        //primeiro paramentro é o do usuario a senha sem hash
        // o segundo é os dados encryptados no banco
        const saoIguais = bcrypt.compareSync(dados.senha, usuario.senha)

        if(!saoIguais){
            throw new Error( 'Usuario/Senha Invalidos')
        }
      

        return getUsuarioLogado(usuario)

    },
   
    usuarios(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('usuarios')
    },
    usuario(_, { filtro }, ctx) {

        ctx && ctx.validarUsuarioiltor(filtro)
        
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            return db('usuarios')
                .where({ id })
                .first()
        } else if(email) {
            return db('usuarios')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}