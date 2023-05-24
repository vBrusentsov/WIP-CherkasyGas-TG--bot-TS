export interface PersonalAccount {
    name: string;
    number: number;
}

export interface SessionData {
    step: string;
    newPersonalAccount: PersonalAccount;
    personalAccount: PersonalAccount[]; 
}
