import {Menu} from "@grammyjs/menu";
import { GrammyContext } from "../context";
import { emptySessionStartCommandText } from "../../textes";


export const startEmptySessionMenu = new Menu<GrammyContext>('start-empty-session-menu')
.text('Додати особовий рахунок', async context => {
    // context.menu.nav('personalAccountsManager-menu');
    await context.reply('Ведіть ваш особовий рахунок');
    context.session.step = 'registrationPersonalAccount'
});

export const backToStartMenu = new Menu<GrammyContext>('back-to-start-menu')
    .text('Повернутись до попереднього меню')

export const personalAccountsManager = new Menu('personalAccountsManager-menu')
    .text('Додати особовий рахунок').row().text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(emptySessionStartCommandText);
    });

export const startNotEmptySessionMenu = new Menu('main-menu')
    .text('Керування особовимим рахунками').row()
    .text('Передати показники лічильника')