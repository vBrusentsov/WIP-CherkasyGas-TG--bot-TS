import {GrammyContext} from "./src/context";

export async function personalAccountList (context: GrammyContext) {
    let list = '';
    return context.session.personalAccount.map(obj => {
        return `\n${obj.name}- ${obj.number}` ;
})}