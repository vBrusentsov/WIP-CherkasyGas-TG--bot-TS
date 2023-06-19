import {ISession} from "@grammyjs/storage-typeorm";
import {Entity} from "typeorm";

@Entity
export class SessionTypeORMEntity implements  ISession {

}