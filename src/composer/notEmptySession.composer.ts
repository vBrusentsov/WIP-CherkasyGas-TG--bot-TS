import { Composer } from "grammy";
import {sendStartMessageMiddleware} from "../middleware/sendStartMessage.middleware";

export const notEmptySessionStartCommand = new Composer();

notEmptySessionStartCommand.command('start', sendStartMessageMiddleware);