import { Router } from '@grammyjs/router';
import {GrammyContext} from "../context";

export const router = new Router<GrammyContext>(context => context.session.step);
const registrationPersonalAccount = router.route('registrationPersonalAccount');
registrationPersonalAccount.on('message:text', async context => {
    console.log(context.message.text);
    const personalAccount = context.message.text;
    if (!Number.isNaN(+personalAccount) &&
        personalAccount.length > 8 &&
        personalAccount.length < 11) {
        await context.reply(`Ваш особовмй рахунок ${personalAccount}`);
    } else {
        await context.reply("Ви ввели невірний особовий рахунок");
        return;
    }

    context.session.step = 'namePersonalAccount'
    await context.reply('Вкажіть імя для позначення особового рахунку');
});
