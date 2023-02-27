import 'dotenv/config'
import knex from 'knex'

export default knex({
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.SERVICE_NAME,
    user: process.env.SERVICE_USER,
    password: process.env.SERVICE_PASS
  }
})
