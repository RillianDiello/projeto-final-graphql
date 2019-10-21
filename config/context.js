const jwt = require('jwt-simple')



module.exports = async ({ req }) => {
   //Isso somente em Dev
   await require('./simularUsuarioLogado')(req)

   const auth = req.headers.authorization
   const token = auth && auth.substring(7)

   let usuario = null
   let admin = null

   //Se houver token eu faço as validações necessárias
   if(token){
         try{
         let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET)

         if(new Date(conteudoToken.exp * 1000) > new Date()){
            usuario = conteudoToken
         }
      }catch(e){
         // Token Invalido
      }
   }

   if(usuario && usuario.perfis){
      admin = usuario.perfis.includes('admin')
   }

   const err = new Error("Acesso Negado!")

   return {
      usuario,
      admin,
      validarUsuario(){
         if(!usuario) throw err //Quando vc cria um erro com new ele não dispara, apenas com o throw (lancar)
      },
      validarAdmin(){
         if(!admin) throw err
      }
   }
   
}


