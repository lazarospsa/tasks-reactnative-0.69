module.exports = {
    // client: 'postgresql',
    // connection: {
    //     database: process.env.database,
    //     user:     process.env.user,
    //     password: process.env.password
    // },
    
    client: 'mysql',
    connection: {
        host : process.env.host,
        port : process.env.port,
        user : process.env.user,
        password : process.env.password,
        database : process.env.database
    },

    // client: 'sqlite3',
    // connection: () => ({
    //     // filename: process.env.database
    //     filename: "./mydb.sqlite"
    // })

    // pool: {
    //     min: 2,
    //     max: 10
    // },
    // migrations: {
    //     tableName: 'knex_migrations'
    // }
};