import {Menu, MenuRange} from "@grammyjs/menu";
import {GrammyContext} from "../context";
import {getPersonalAccountList} from '../../utils'
import {
    notEmptySessionStartCommandText,
    emptySessionStartCommandText,
    personalAccountListText,
    counterReadingText} from "../../textes";
import {sendStartMessageMiddleware} from "../middleware/sendStartMessage.middleware";



export const startEmptySessionMenu = new Menu<GrammyContext>('start-empty-session-menu')
.text('Додати особовий рахунок', async context => {
    await context.reply('Ведіть ваш особовий рахунок');
    context.session.step = 'registrationPersonalAccount'
});


export const startNotEmptySessionMenu = new Menu<GrammyContext>('start-not-empty-session-menu')
    .text('Керування особовимим рахунками', async context => {
        await context.editMessageText(personalAccountListText + getPersonalAccountList(context));
        context.menu.nav('personalAccountsManager-menu');
    }).row()
    .text('Передати показники лічильника', async context => {
        await context.editMessageText(counterReadingText);
        context.menu.nav('receivingCounterReading-menu');

    })

export const personalAccountsManagerMenu = new Menu<GrammyContext>('personalAccountsManager-menu')
    .text('Додати особовий рахунок', async context => {
        await context.reply('Ведіть ваш особовий рахунок');
        context.session.step = 'registrationPersonalAccount';
    }).row()
    .text('Видалити особовий рахунок', async context => {
        await context.editMessageText(`Для того щоб видалити особовий рахунок вам потрібно вибрати однин із особових рахунків`);
        context.menu.nav('deletePersonalAccount-menu');
    }).row()
    .text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(notEmptySessionStartCommandText, {parse_mode: "HTML"});
    });


export const receivingCounterReadingWithButton = new Menu<GrammyContext>('receivingCounterReading-menu')
    .dynamic(context => {
        const rangeReceivingCounterReading = new MenuRange<GrammyContext>();
        for (let i = 0; i < context.session.personalAccount.length; i++) {
            const listPersonalAccount =`${ context.session.personalAccount[i].name} - ${ context.session.personalAccount[i].number}`;
            rangeReceivingCounterReading.text(listPersonalAccount, async context => {
                await context.reply(`Цей: ${listPersonalAccount} особовий рахунок буде використано для передачі покизнику лічильника.`);
            })
                .row()
        }
        return rangeReceivingCounterReading
    })
    .text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(notEmptySessionStartCommandText, {parse_mode: "HTML"});
    })

export const deletePersonalAccountWithButton = new Menu<GrammyContext>('deletePersonalAccount-menu')
    .dynamic(context => {
        // Generate a part of the menu dynamically!
        const rangeDeletePersonalAccountInSession = new MenuRange<GrammyContext>();
        for (let i = 0; i < context.session.personalAccount.length; i++) {
            const listPersonalAccount =`${ context.session.personalAccount[i].name} - ${ context.session.personalAccount[i].number}`;
            rangeDeletePersonalAccountInSession
                .text(listPersonalAccount, async (context) => {
                    await context.reply(`Вибраний вами особовий рахунок буде видалено ${listPersonalAccount}. Дякую`);
                    const personalAccountFromDeleting = listPersonalAccount.slice(listPersonalAccount.indexOf('-')+2);
                    context.session.personalAccount.splice(context.session.personalAccount.findIndex(obj => obj.number === +personalAccountFromDeleting), 1);
                    await sendStartMessageMiddleware(context);
                })
                .row();

        }
        return rangeDeletePersonalAccountInSession;
    })
    .text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(personalAccountListText + getPersonalAccountList(context));
    });


startNotEmptySessionMenu.register(personalAccountsManagerMenu);
startNotEmptySessionMenu.register(receivingCounterReadingWithButton);
personalAccountsManagerMenu.register(deletePersonalAccountWithButton);