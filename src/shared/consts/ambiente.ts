import 'dotenv/config'

export const ambiente = process.env.DB_AMBIENTE
export const database =  ambiente === 'PRD' ? process.env.DATABASE_NAME_PRD : process.env.DATABASE_NAME_HML ;
export const user =  ambiente === 'PRD' ? process.env.DATABASE_USER_PRD : process.env.DATABASE_USER_HML;
export const password =  ambiente === 'PRD' ? process.env.DATABASE_PASS_PRD : process.env.DATABASE_PASS_HML;
export const porta =  ambiente === 'PRD' ? process.env.PORT_PRD : process.env.PORT_HML;
