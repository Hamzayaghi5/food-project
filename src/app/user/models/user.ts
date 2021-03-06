import { Invitation } from "./Invitation";

export class User {
    Id: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;

}

export class Person {
    Id: string;
    Email: string;
    UserName: string;
    Password: string;
    ConfirmPassword: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Mobile: string;
    UserId: string;
    Invitation: Invitation[];
}


export class LoginModel {
    userId: number;
    userName: string;
    eMail: string;
    token: string;
    tokenType: string;
    issued: Date;
    expires: Date;
    personId: string;

}

export class TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
    ".expires": string;
    ".issued": string;
    personId: string;
}
