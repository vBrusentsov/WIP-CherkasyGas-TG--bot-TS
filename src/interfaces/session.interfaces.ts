export interface PersonalAccount {
    number: number;
    name: string;
}

export interface SessionData {
    personalAccount: PersonalAccount[]; 
}
