import { database, password, user } from '@shared/consts/ambiente'
import knex from 'knex'

export default knex({
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
})
