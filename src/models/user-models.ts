import { RequestModel, ResponseData, ListRequestData } from "./base-models";
import { UserRole } from "../constants";
import { UserSchema } from "./validation-schemas";

export class UserData {
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  email: string;
  userId?: string;

  constructor(data: any) {
    const validatedData = UserSchema.parse(data);
    this.firstName = validatedData.firstName;
    this.lastName = validatedData.lastName;
    this.email = validatedData.email;
    this.password = validatedData.password;
    this.role = validatedData.role;
    this.userId = validatedData.userId;
  }
}

export class CreateUserRequestModel extends RequestModel {
  userData: UserData;

  constructor(userData: UserData) {
    super();
    this.userData = userData;
  }
}

export class UpdateUserRequestModel extends RequestModel {
  userData: UserData;

  constructor(userData: UserData) {
    super();
    this.userData = userData;
  }
}

export class DeleteUserRequestModel extends RequestModel {
  userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}

export class GetUserRequestModel extends RequestModel {
  userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}

export class ListUsersRequestModel extends RequestModel {
  listData: ListRequestData;

  constructor(listData: ListRequestData) {
    super();
    this.listData = listData;
  }
}

export class CreateUserResponseData extends ResponseData {
  userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}

export class UpdateUserResponseData extends ResponseData {
  userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}

export class GetUserResponseData extends ResponseData {
  userData: UserData;

  constructor(userData: UserData) {
    super();
    this.userData = userData;
  }
}

export class ListUsersResponseData extends ResponseData {
  items: UserData[];
  total: number;

  constructor(items: UserData[], total: number) {
    super();
    this.items = items;
    this.total = total;
  }
}
