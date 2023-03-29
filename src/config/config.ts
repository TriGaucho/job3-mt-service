import { database, password, user } from '@shared/consts/ambiente'
import 'dotenv/config'

export default {
  versao: 20230329,
  knex: {
    asyncStackTraces: true,
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      database: database,
      user: user,
      password: password
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
  modoSeguro: process.env.MODO_LOGIN
}
