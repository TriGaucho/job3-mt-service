import 'dotenv/config'

export default {
  versao: 20230313,
  knex: {
    asyncStackTraces: true,
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.SERVICE_NAME,
      user: process.env.SERVICE_USER,
      password: process.env.SERVICE_PASS
    },
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  jwt: process.env.SECRET,
  modoSeguro: process.env.MODO_LOGIN
}
