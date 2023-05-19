import {Menu} from "@grammyjs/menu";
import {GrammyContext} from "../context";
import {notEmptySessionStartCommandText} from "../../textes";


export const startEmptySessionMenu = new Menu<GrammyContext>('start-empty-session-menu')
.text('Додати особовий рахунок', async context => {
    await context.reply('Ведіть ваш особовий рахунок');
    context.session.step = 'registrationPersonalAccount'
});

export const backToStartMenu = new Menu<GrammyContext>('back-to-start-menu')
    .text('Повернутись до попереднього меню')

export const startNotEmptySessionMenu = new Menu<GrammyContext>('start-not-empty-session-menu')
    .text('Керування особовимим рахунками', async context => {
        const personalAccountList = context.session.personalAccount.map(obj => {
            return `\n${obj.name}- ${obj.number}` ;
        })
        await context.editMessageText(`В цьому меню ви можете додавати або видаляти ваші особові рахунки.
Ось перелік уже доданий вами особових рахунків: ${personalAccountList}`.trim());
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
    .text('Видалити особовий рахунок').row()
    .text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(notEmptySessionStartCommandText);
    });
export const counterReadingMenu = new Menu<GrammyContext>('counterReading-menu')
    .text('Передати показники лічиника').row()
    .text('Повернутись до попередьного меню', async context => {
        context.menu.back();
        await context.editMessageText(notEmptySessionStartCommandText);
    });

startNotEmptySessionMenu.register(personalAccountsManagerMenu);
startNotEmptySessionMenu.register(counterReadingMenu);