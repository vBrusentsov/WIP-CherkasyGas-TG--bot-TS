import { Context, SessionFlavor } from "grammy";
import { SessionData } from "./interfaces/session.interfaces";
export type NextFunction = () => Promise<void>;

export type GrammyContext = Context & SessionFlavor<SessionData>;
