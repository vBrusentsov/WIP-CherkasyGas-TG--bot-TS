import {Bot, Composer, Context, InlineKeyboard} from "grammy";
import {environmentConfig} from "./config";
import {startNotEmptySessionMenu, startEmptySessionMenu} from "./menus/main.menu";
import {emptySessionStartCommand} from "./composer/emptySession.composer";
import { notEmptySessionStartCommand } from "./composer/notEmptySession.composer";
import { NextFunction, GrammyContext } from "./context";
import { registerPersonalAccountRouter } from './routers/registerPersonalAccount.router'
import {deletePersonalAccountRouter} from "./routers/deletePersonalAccount.router";

(async () => {
    const session = {
        step: 'idle',
        newPersonalAccount: {
            name: '',
            number: 0,

        },
        personalAccount : [{name: 'Vlad', number: 1234578346}, {name: 'Dima', number: 454254574633}] ,
    };
    const bot = new Bot<GrammyContext>(environmentConfig.BOT_TOKEN);
    bot.use((context: GrammyContext, next: NextFunction)=> {
        context.session = session;
        return next();
    });
    bot.use(startEmptySessionMenu);
    bot.use(startNotEmptySessionMenu);

   
    const emptySessionComposer = new Composer<GrammyContext>();
    
    const emptyComposer = emptySessionComposer.filter((context) => context.session.personalAccount.length === 0);
    emptyComposer.use(emptySessionStartCommand);

    const notEmptySessionComposer = new Composer<GrammyContext>();
    
    const notEmptyComposer = notEmptySessionComposer.filter((context) => context.session.personalAccount.length !== 0);
    notEmptyComposer.use(notEmptySessionStartCommand);
    

    bot.use(emptySessionComposer);
    bot.use(notEmptySessionComposer);
    bot.use(registerPersonalAccountRouter);
    bot.use(deletePersonalAccountRouter)

    bot.start();
})();
