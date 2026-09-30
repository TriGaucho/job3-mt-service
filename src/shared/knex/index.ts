import { database, password, user } from '@shared/consts/ambiente'
import knex from 'knex'
import { abrirTunelSsh } from './sshTunnel'

export default knex({
  asyncStackTraces: true,
    client: process.env.DATABASE_CLIENT,
    connection: async () => {
      // O túnel só é usado quando SSH_HOST estiver definido (ex.: ambiente local)
      const usarTunel = Boolean(process.env.SSH_HOST)
      return {
        host: usarTunel ? '127.0.0.1' : process.env.DATABASE_HOST,
        port: usarTunel ? await abrirTunelSsh() : Number(process.env.DATABASE_PORT ?? 3306),
        database: database,
        user: user,
        password: password
      }
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