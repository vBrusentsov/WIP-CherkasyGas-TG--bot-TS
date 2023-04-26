import {Bot, InlineKeyboard} from "grammy";
import {environmentConfig} from "./config";
import {mainMenu} from "./menus/main.menu";
import {managingPersonalAccountMenu} from "./menus/managing-personal-account.menu"


(async () => {

    const bot = new Bot(environmentConfig.BOT_TOKEN);

    bot.use(mainMenu);

    bot.command('start', async (ctx) => {
        if ("first_name" in ctx.msg.chat) {
            await ctx.reply(
                ` Доброго дня ${ctx.msg.chat.first_name} ${ctx.msg.chat.last_name}.
Вас вітає телеграм бот АТ "Черкасигаз".
Якщо ви тільки почали викристовувати наший телеграм-бот то вам потрібно для початку натиснути на кнопку 
"Додати особовий рахнуок"`
                , { reply_markup: mainMenu});
        }
    });
    bot.start();
})();
