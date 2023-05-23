import {Menu, MenuRange} from "@grammyjs/menu";
import {GrammyContext} from "../context";
import {personalAccountList} from '../../utils'
import {
    notEmptySessionStartCommandText,
    emptySessionStartCommandText,
    personalAccountListText} from "../../textes";



export const startEmptySessionMenu = new Menu<GrammyContext>('start-empty-session-menu')
.text('Додати особовий рахунок', async context => {
    await context.reply('Ведіть ваш особовий рахунок');
    context.session.step = 'registrationPersonalAccount'
});

export const backToStartMenu = new Menu<GrammyContext>('back-to-start-menu')
    .text('Повернутись до попереднього меню')

export const startNotEmptySessionMenu = new Menu<GrammyContext>('start-not-empty-session-menu')
    .text('Керування особовимим рахунками', async context => {

        await context.editMessageText(personalAccountListText);
        console.log((JSON.stringify(personalAccountList(context))));
        context.menu.nav('personalAccountsManager-menu');
    }).row()
    .text('Передати показники лічильника', async context => {
        await context.editMessageText(`Тут буде вибір особових рахунків на кнопочках`);
        context.menu.nav('counterReading-menu');
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

export const deletePersonalAccount = new Menu<GrammyContext>('deletePersonalAccount-menu')
    .dynamic((context) => {
        // Generate a part of the menu dynamically!
        const range = new MenuRange<GrammyContext>();
        for (let i = 0; i < context.session.personalAccount.length; i++) {
            const listPersonalAccount =`${ context.session.personalAccount[i].name} - ${ context.session.personalAccount[i].number}`;
            console.log(listPersonalAccount);
            range
                .text(listPersonalAccount, (context) => context.reply(`You chose ${listPersonalAccount}`))
                .row();
        }
        return range;
    })
    .text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(personalAccountListText);
    });

export const counterReadingMenu = new Menu<GrammyContext>('counterReading-menu')
    .text('Передати показники лічиника').row()
    .text('Повернутись до попередьного меню', async context => {
        context.menu.back();
        await context.editMessageText(notEmptySessionStartCommandText);
    });


startNotEmptySessionMenu.register(personalAccountsManagerMenu);
startNotEmptySessionMenu.register(counterReadingMenu);
personalAccountsManagerMenu.register(deletePersonalAccount);