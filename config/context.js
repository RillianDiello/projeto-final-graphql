module.exports = async ({ req }) => {
   //Isso somente em Dev
   await require('./simularUsuarioLogado')(req)

   const auth = req.headers.authorization
   console.log(auth)
}


