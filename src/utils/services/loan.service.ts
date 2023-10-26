import { BaseModel, User } from "../types";
import { APICRUDMixin } from "./base.service";
import { CustomerType } from "./customer.service";
export interface LoanType extends BaseModel {
  customer: string | CustomerType;
  amount: {
    value: number;
    currency: string;
  };
  startDate: string;
  createdBy?: string | User;
  status?: "approved";
  deposits?: { value: number; currency?: string }[];
  amountPaid?: any;
  totalAmount?: any;
  interestAmount?: any;
  remainingAmount?: any;
  isPaid: false;
}
export interface LoanDepositType extends BaseModel {
  value: number;
  currency?: string;
}

export default class LoanService extends APICRUDMixin {
  tb_name: string = "loan";
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
  applyForLoan = (values: any) => {
    return this.post(`${this.tb_name}/apply`, values);
  };
}
