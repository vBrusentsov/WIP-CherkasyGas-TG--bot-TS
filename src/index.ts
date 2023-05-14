import {Bot, Composer, Context, InlineKeyboard} from "grammy";
import {environmentConfig} from "./config";
import {startNotEmptySessionMenu, startEmptySessionMenu} from "./menus/main.menu";
import {emptySessionStartCommand} from "./composer/emptySession.composer";
// import { notEmptySessionStartCommand } from "./composer/notEmptySession.composer";
import { NextFunction, GrammyContext } from "./context";


(async () => {
    const session = {personalAccount : [/*{number: 7200054646, name: 'My'}, {number: 7200055446, name: 'Dima'}*/]};
    const bot = new Bot<GrammyContext>(environmentConfig.BOT_TOKEN);
    bot.use((context: GrammyContext, next: NextFunction)=> {
        context.session = session;
        return next();
    });
    bot.use(startEmptySessionMenu);
    //bot.use(startNotEmptySessionMenu);
    bot.use();
   
    const emptySessionComposer = new Composer<GrammyContext>();
    
    const emptyComposer = emptySessionComposer.filter((context) => context.session.personalAccount.length === 0);
    emptyComposer.use(emptySessionStartCommand);

    const notEmptySessionComposer = new Composer<GrammyContext>();
    
    const notEmptyComposer = notEmptySessionComposer.filter((context) => context.session.personalAccount.length !== 0);
    // notEmptyComposer.use(notEmptySessionStartCommand);
    

    bot.use(emptySessionComposer);
    bot.use(notEmptySessionComposer);

    bot.start();
})();
