import { BaseModel } from "../types";
import { APICRUDMixin } from "./base.service";
enum EmploymentStatusOptions {
  SELF_EMPLOYED = "self-employed",
  UN_EMPLOYED = "unemployed",
  RETIRED = "retired",
  EMPLOYED = "employed",
}

export interface CustomerType extends BaseModel {
  name: string;
  maritalStatus: "single" | "married";
  employmentStatus?: EmploymentStatusOptions;
  dateOfBirth: string;
  nameOfEmployee?: string;
  idCard: string;
  address: string;
  phoneNumber: string;
  hasTakenLoan?: boolean;
}
export default class CustomerService extends APICRUDMixin {
  tb_name: string = "customer";
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
  registerCustomer = (values: CustomerType) => {
    return this.post(`${this.tb_name}/create`, values);
  };
}
