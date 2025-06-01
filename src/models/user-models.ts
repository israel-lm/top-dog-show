import { RequestModel, ResponseData, ListRequestData } from "./base-models";

export class UserData {
  firstName: string;
  lastName: string;
  role: string;
  userId: string;
  password: string;
  email: string;

  constructor(firstName: string, lastName: string, email?: string, role?: string, password?: string, userId?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email ?? "";
    this.password = password ?? "";
    this.role = role ?? "";
    this.userId = userId ?? "";
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
