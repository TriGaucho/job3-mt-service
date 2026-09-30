import { readFileSync } from 'fs'
import net, { AddressInfo } from 'net'
import { Client } from 'ssh2'

let tunel: Promise<number> | undefined

// Abre o túnel uma única vez e devolve a porta local que encaminha para o banco
export function abrirTunelSsh(): Promise<number> {
  if (tunel) return tunel

  tunel = new Promise((resolve, reject) => {
    const ssh = new Client()

    ssh
      .on('ready', () => {
        // Cada socket local vira um canal forwardOut; funciona com o pool do knex
        const server = net.createServer((socket) => {
          ssh.forwardOut(
            '127.0.0.1',
            socket.remotePort ?? 0,
            process.env.DATABASE_HOST as string,
            Number(process.env.DATABASE_PORT ?? 3306),
            (err, stream) => {
              if (err) return socket.destroy(err)
              socket.pipe(stream).pipe(socket)
            }
          )
        })
        // Com a porta 0, o sistema escolhe uma porta livre
        server.listen(0, '127.0.0.1', () => resolve((server.address() as AddressInfo).port))
      })
      .on('error', (err) => {
        tunel = undefined
        reject(err)
      })
      .connect({
        host: process.env.SSH_HOST,
        port: Number(process.env.SSH_PORT ?? 22),
        username: process.env.SSH_USER,
        // Autentica por chave privada quando informada; caso contrário, por senha
        privateKey: process.env.SSH_PRIVATE_KEY_PATH ? readFileSync(process.env.SSH_PRIVATE_KEY_PATH) : undefined,
        password: process.env.SSH_PASSWORD,
        keepaliveInterval: 10000
      })
  })

  return tunel
}