import { portaApi } from '@shared/consts/ambiente'
import 'dotenv/config'

export default {
  versao: 20231116,
  cors: {
    //TODO revisar politica de CORS
    methods: 'GET, OPTIONS, PUT, POST, DELETE',
    origin: '*'
  },
  porta: portaApi
}
