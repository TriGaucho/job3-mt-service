import 'dotenv/config'

export default {
  versao: 20230404,
  cors: {
    //TODO revisar politica de CORS
    methods: 'GET, OPTIONS, PUT, POST, DELETE',
    origin: '*'
  }
}
