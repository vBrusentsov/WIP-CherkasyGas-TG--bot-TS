import {personalAccountListText} from "./textes";
import {GrammyContext} from "./src/context";

export const getPersonalAccountList = ((context: GrammyContext) => {
    return context.session.personalAccount.map(obj => {
        return `\n${obj.name}- ${obj.number}`;

})});
