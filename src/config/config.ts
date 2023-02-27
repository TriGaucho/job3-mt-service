import 'dotenv/config'

export default {
  knex: {
    asyncStackTraces: true,
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
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
}
