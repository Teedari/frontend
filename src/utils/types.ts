export interface BaseModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends BaseModel {
  email: string;
  password?: string;
}

export enum EmploymentStatusOptions {
  SELF_EMPLOYED = "self-employed",
  UN_EMPLOYED = "unemployed",
  RETIRED = "retired",
  EMPLOYED = "employed",
}
