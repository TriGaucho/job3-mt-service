import 'dotenv/config'

export default {
  versao: 20230405,
  cors: {
    //TODO revisar politica de CORS
    methods: 'GET, OPTIONS, PUT, POST, DELETE',
    origin: '*'
  }
}
