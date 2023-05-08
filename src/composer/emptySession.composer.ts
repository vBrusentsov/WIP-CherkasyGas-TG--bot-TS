import {Composer} from "grammy";
import {mainMenu} from "../menus/main.menu";

export const emptySessionStartCommand = new Composer();

emptySessionStartCommand.command('start', async (ctx) => {
    if ("first_name" in ctx.msg.chat) {
        //@ts-ignore
        console.log(ctx.session.personalAccount.length);
        await ctx.reply(
            ` Доброго дня ${ctx.msg.chat.first_name} ${ctx.msg.chat.last_name}.
Вас вітає телеграм бот АТ "Черкасигаз".
Якщо ви тільки почали викристовувати наший телеграм-бот то вам потрібно для початку натиснути на кнопку 
"Додати особовий рахнуок"`
            , { reply_markup: mainMenu});
    }
});