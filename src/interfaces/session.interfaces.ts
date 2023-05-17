export interface PersonalAccount {
    number: number;
    name: string;
}

export interface SessionData {
    step: string;
    newPersonalAccount: PersonalAccount;
    personalAccount: PersonalAccount[]; 
}
