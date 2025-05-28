import { RequestModel, ResponseData} from "./base-models";


export class LoginRequestModel extends RequestModel {
    userId: string;
    password: string;

    constructor(userId: string, password: string) {
        super();
        this.userId = userId;
        this.password = password;
    }
}

export class LogoutRequestModel extends RequestModel {
    refreshToken: string;

    constructor(refreshToken: string) {
        super();
        this.refreshToken = refreshToken;
    }
}

export class ForgotPasswordRequestModel extends RequestModel {
    email: string;

    constructor(email: string) {
        super();
        this.email = email;
    }
}

export class RefreshTokenRequestModel extends RequestModel {
    refreshToken: string;

    constructor(refreshToken: string) {
        super();
        this.refreshToken = refreshToken;
    }
}

/*
export class FirstAccessRequestModel extends RequestModel {
    userId: string;
    tempPassword: string;
    newPassword: string;

    constructor(userId: string, tempPassword: string, newPassword: string) {
        super();
        this.userId = userId;
        this.tempPassword = tempPassword;
        this.newPassword = newPassword;
    }
}*/


export class LoginResponseData extends ResponseData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    userId: string;

    constructor(accessToken: string, refreshToken: string, expiresIn: number,userId: string) {
        super();
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.refreshToken = refreshToken;
        this.userId = userId;
    }
}

export class RefreshTokenResponseData extends ResponseData {
    accessToken: string;
    expiresIn: number;

    constructor(accessToken: string, expiresIn: number) {
        super();
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }
}
