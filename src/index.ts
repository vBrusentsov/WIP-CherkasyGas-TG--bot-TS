import {Bot, Composer, Context, InlineKeyboard, session} from "grammy";
import {environmentConfig} from "./config";
import {startNotEmptySessionMenu, startEmptySessionMenu} from "./menus/main.menu";
import {emptySessionStartCommand} from "./composer/emptySession.composer";
import { notEmptySessionStartCommand } from "./composer/notEmptySession.composer";
import { NextFunction, GrammyContext } from "./context";
import { registerPersonalAccountRouter } from './routers/registerPersonalAccount.router'
import {SessionData} from "./interfaces/session.interfaces";

(async () => {
    const bot = new Bot<GrammyContext>(environmentConfig.BOT_TOKEN);
    bot.use(session({
        initial: () => <SessionData>({
            step: 'idle',
            newPersonalAccount: {
                name: '',
                number: 0,

            },
            personalAccount : [],
        })
    }));
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

   await bot.start();
})();
