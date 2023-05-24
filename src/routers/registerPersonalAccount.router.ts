import { Router } from '@grammyjs/router';
import {GrammyContext} from "../context";
import {sendStartMessageMiddleware} from "../middleware/sendStartMessage.middleware";
import { personalAccountsManagerMenu } from "../menus/main.menu";
import {PersonalAccount} from "../interfaces/session.interfaces";

export const registerPersonalAccountRouter = new Router<GrammyContext>(context => context.session.step);
const registrationPersonalAccount = registerPersonalAccountRouter.route('registrationPersonalAccount');
registrationPersonalAccount.on('message:text', async context => {
    console.log(context.message.text);
    const personalAccount = context.message.text;
    if (!Number.isNaN(+personalAccount) &&
        personalAccount.length > 8 &&
        personalAccount.length < 11) {
        await context.reply(`Ваш особовий рахунок ${personalAccount}`);
        context.session.newPersonalAccount.number = +personalAccount;
    } else {
        await context.reply("Ви ввели невірний особовий рахунок. Особовий рахунок має містити від 8 до 11 цифр");
        return;
    }

    context.session.step = 'namePersonalAccount'
    await context.reply('Вкажіть імя для позначення особового рахунку');
});

const namePersonalAccount = registerPersonalAccountRouter.route('namePersonalAccount');

namePersonalAccount.on('message:text', async context => {
    const name = context.message.text;
    console.log(name);
    context.session.newPersonalAccount.name = name;
    await context.reply(`Особовий рахунок буде збережено таким чином:
    ${context.session.newPersonalAccount.name} - ${context.session.newPersonalAccount.number}`);
    context.session.personalAccount.push({...context.session.newPersonalAccount});
    await sendStartMessageMiddleware(context);
});



