import {notEmptySessionStartCommandText} from "../../textes";
import {startNotEmptySessionMenu} from "../menus/main.menu";
import {Context} from "grammy";

export const sendStartMessageMiddleware = async (context: Context) => {

    await context.reply(notEmptySessionStartCommandText, {reply_markup: startNotEmptySessionMenu});
}