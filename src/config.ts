import * as process from "process";
import dotenv from 'dotenv'
import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions'

dotenv.config();

 interface Env {
     BOT_TOKEN: string
     host: string
     port: number
     username: string
     password: string
     database: string
}

export const environmentConfig = process.env as unknown as Env