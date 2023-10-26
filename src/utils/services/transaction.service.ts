import { BaseModel, User } from "../types";
import { AccountType } from "./account.service";
import { APICRUDMixin } from "./base.service";

export enum TransactionOptions {
  DEPOSIT = "deposit",
  WITH_DRAWAL = "withdrawal",
}

export interface TransactionType extends BaseModel {
  type: TransactionOptions;
  account: string | AccountType;
  // customer: string | CustomerType;
  amount: { currency: "GHS"; value: number };
  date: string;
  createdBy: string | User;
  fAmount?: any;
}

export default class TransactionService extends APICRUDMixin {
  tb_name: string = "transaction";
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  createTransaction = (values: {
    type: TransactionOptions;
    amount: number;
    account: string;
  }) => {
    return this.post(`${this.tb_name}/create`, {
      type: values.type,
      amount: {
        currency: "GHS",
        value: values.amount,
      },
      account: values.account,
    });
  };
  getTodaysTransactionReport = () => {
    return this.get(`${this.tb_name}/todays-report`);
  };
}
