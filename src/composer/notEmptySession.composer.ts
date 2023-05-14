import { Composer } from "grammy";
import { startNotEmptySessionMenu } from "../menus/main.menu";
import { notEmptySessionStartCommandText } from "../../textes";

export const notEmptySessionStartCommand = new Composer();

notEmptySessionStartCommand.command('start', async (context) => {
   
        await context.reply(notEmptySessionStartCommandText, { reply_markup: startNotEmptySessionMenu});
});