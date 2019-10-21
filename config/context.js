const jwt = require('jwt-simple')



module.exports = async ({ req }) => {
   //Isso somente em Dev
   /*
   *Simula um usuario logado em Dev, do tipo Admini
   */
   await require('./simularUsuarioLogado')(req)


   /**
    * Obtem o usuario, verifica se o usuario esta validade
    * mediante o token que foi enviado
    * verifica se é um usuario administrador
    * 
    */
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

   // console.log(usuario)
   // console.log(admin)

   return {
      usuario,
      admin,
      validarUsuario(){
         if(!usuario) throw err //Quando vc cria um erro com new ele não dispara, apenas com o throw (lancar)
      },
      validarAdmin(){
         if(!admin) throw err
      },
      validarUsuarioFiltro(filtro){
         if(admin) return

         if(!usuario) throw err

         if(!filtro) throw err

         const { id, email} = filtro 
         if(!id && !email) throw err

         if(id && id !== usuario.id) throw err

         if(email && email !== usuario.email) throw err
      }
   }
   
}


