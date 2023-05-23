import { Router } from '@grammyjs/router';
import {GrammyContext} from "../context";

export const deletePersonalAccountRouter = new Router<GrammyContext>(context => context.session.step);
const deletePersonalAccount = deletePersonalAccountRouter.route('deletePersonalAccount');

