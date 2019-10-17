# projeto-final-graphql

Final Project of GraphQL course from COD3

The present project uses a connection with database MySQL. Together with Apollo Server, that permit the building of APIs GraphQL quickly, with documentations and tests. He has a beautiful Grafic Interface to tests, called PlayGround, very util and simple to use. (https://www.apollographql.com/docs/apollo-server/)

Was used the Knex, to building and maintenance from Querys, with him is possible build complex queries , with many relationships, conditional inserts and any other functionality of a CRUD. More informations are available in: (http://knexjs.org/)

It was also used the packages:  bcrypt-nodejs, which although it is depreciated, presents a good solution to encryption of passwords to our fake users.(https://www.npmjs.com/package/bcrypt-nodejs). To autentication, was used jwt-simple, which is a package relatively actualizad. (https://www.npmjs.com/package/jwt-simple)

it was necessary to instalations of NPX, for direct execution of  knex binaries for ease. (https://www.npmjs.com/package/npx)

# How start 

Alter the file env_exemplo, to file .env, and insert your respectives database configurations, as  schema, hostname, user and password.
The project has a set of Migrations, that generate the tables: Usuarios, Perfis and Usuarios_Perfis.  For others tables, it is necessary the build of others Migrations

To install oc packages from package.json:
```
$ npm i
```

To start migrations:
```
$ npx knex migrate:latest
```

To start project:
```
$ npm start
```

# How to check that it is Running

Acess the Apollo Server Playground, through the browser in: http://localhost:4000/. This configurations can be different according the dev ambient of your machine and ports configuration that you uses.




