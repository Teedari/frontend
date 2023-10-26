import { BaseModel } from "../types";
import { APICRUDMixin } from "./base.service";
import { CustomerType } from "./customer.service";

export interface AccountType extends BaseModel {
  accountNumber: any;
  type: string;
  amount: { currency: "GHS"; value: number };
  customer: string | CustomerType;
  createdBy?: string;
  fAmount?: any;
}

export default class AccountService extends APICRUDMixin {
  tb_name: string = "account";
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  // findByAccountNumber = async () => {
  //   const
  // };
}
