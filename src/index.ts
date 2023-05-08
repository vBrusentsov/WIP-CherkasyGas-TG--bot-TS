import {Bot, Composer, Context, InlineKeyboard} from "grammy";
import {environmentConfig} from "./config";
import {mainMenu} from "./menus/main.menu";
import {emptySessionStartCommand} from "./composer/emptySession.composer";



(async () => {
    const session = {personalAccount : [/*{number: 7200054646, name: 'My'}, {number: 7200055446, name: 'Dima'}*/]};
    const bot = new Bot(environmentConfig.BOT_TOKEN);
    bot.use((ctx, next)=> {
        //@ts-ignore
        ctx.session = session;
        return next()
    })
    bot.use(mainMenu);

    const emptySessionComposer = new Composer();
    //@ts-ignore
    const emptyComposer = emptySessionComposer.filter((context: Context) => context.session.length === 0);
    console.log(emptyComposer);

    const notEmptySessionComposer = new Composer();
    //@ts-ignore
    const notEmptyComposer = notEmptySessionComposer.filter((context: Context) => context.session.length === 0);
    console.log(notEmptyComposer);

    emptyComposer.use(emptySessionStartCommand)

    bot.use(emptySessionComposer);
    bot.use(notEmptySessionComposer)

    bot.start();
})();
