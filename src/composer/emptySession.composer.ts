import {Composer} from "grammy";
import { startEmptySessionMenu } from "../menus/main.menu";
import { emptySessionStartCommandText } from "../../textes";

export const emptySessionStartCommand = new Composer();

emptySessionStartCommand.command('start', async (context) => {
    await context.reply(emptySessionStartCommandText, { reply_markup: startEmptySessionMenu, parse_mode: "HTML"});
    });