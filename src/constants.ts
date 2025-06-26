export enum DisciplineType {
  WallClimb,
  HighJump,
  LongJump,
  Treadmill
}

export enum RankType {
  General = 10,
  ByCategory,
  ByDiscipline
}

export enum UseCases {
  CreateDog = 20,
  UpdateDog,
  DeleteDog,
  GetDog,
  ListDogs,
  CreateShow,
  UpdateShow,
  DeleteShow,
  GetShow,
  ListShows,
  RegisterDog,
  RegisterResults,
  UpdateResults,
  DeleteResults,
  GetResults,
  GetRanking,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetUser,
  ListUsers,
  Login,
  Logout,
  ForgotPassword,
  RefreshToken
}

export enum ErrorCode {
  InvalidRequestErr,
  ValidationErr,
  NotFoundErr,
  UnknownErr
}

export enum UserRole {
  Admin = 100,
  User = 150
}

export enum Category {
  Lightweight = 25,
  Medium,
  Heavy
}

export const NamespaceUuid = "98b2b71b-0b40-4f50-ae6e-0d28875c2e9b";
