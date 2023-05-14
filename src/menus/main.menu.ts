import {Menu} from "@grammyjs/menu";
import { emptySessionStartCommandText } from "../../textes";


export const startEmptySessionMenu = new Menu('start-empty-session-menu')
.text('Додати особовий рахунок', async context => {
    context.menu.nav('personalAccountsManager-menu');
    await context.editMessageText('Нажаль не було знайдено вашого особового рахунку. Додайте його будь-ласка');
});


export const personalAccountsManager = new Menu('personalAccountsManager-menu')
    .text('Додати особовий рахунок').row().text('Повернутись до попереднього меню', async context => {
        context.menu.back();
        await context.editMessageText(emptySessionStartCommandText);
    });

    startEmptySessionMenu.register(personalAccountsManager);

export const startNotEmptySessionMenu = new Menu('main-menu')
    .text('Керування особовимим рахунками').row()
    .text('Передати показники лічильника')