import {environmentConfig} from "../config";
import {DataSource} from "typeorm";


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: environmentConfig.host,
    port: environmentConfig.port,
    username: environmentConfig.username,
    password: environmentConfig.password,
    database: environmentConfig.database,
})