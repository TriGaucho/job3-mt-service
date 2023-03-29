import 'dotenv/config'


export const database =  process.env.DB_AMBIENTE === 'PRD' ? process.env.DATABASE_NAME_PRD : process.env.DATABASE_NAME_HML ;
export const user =  process.env.DB_AMBIENTE === 'PRD' ? process.env.DATABASE_USER_PRD : process.env.DATABASE_USER_HML;
export const password =  process.env.DB_AMBIENTE === 'PRD' ? process.env.DATABASE_PASS_PRD : process.env.DATABASE_PASS_HML;
