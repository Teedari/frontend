import { Card } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { TransactionType } from "../utils/services/transaction.service";
import CustomTable from "./CustomTable";
const columns: ColumnsType<TransactionType> = [
  {
    dataIndex: "id",
    key: "id",
    title: "ID",
  },
  {
    dataIndex: "fAmount",
    key: "fAmount",
    title: "Amount",
  },
  {
    dataIndex: "account",
    key: "account",
    title: "Account Number",
    render: (value) => value?.accountNumber,
  },
  {
    dataIndex: "account",
    key: "account",
    title: "Account Holder",
    render: (value) => {
      return (
        <Card className="inline-block ">
          <h1 className="mb-2 text-yellow-700">Customer Information</h1>
          <hr />
          <p className="mt-2">
            <span className="font-bold">Name:</span> {value?.customer?.name}
          </p>
          <p>
            <span className="font-bold">Identification Number:</span>{" "}
            {value?.customer?.idCard}
          </p>
          <p>
            <span className="font-bold">Phone number:</span>{" "}
            {value?.customer?.phoneNumber}
          </p>
        </Card>
      );
    },
  },
  {
    dataIndex: "date",
    key: "date",
    title: "Date",
  },
];
const TransactionTable: React.FC<{ dataSource: any; loading?: boolean }> = ({
  dataSource,
  loading,
}) => {
  return (
    <CustomTable
      loading={loading}
      title="Transactions"
      columns={columns as never}
      dataSource={dataSource}
    />
  );
};

export default TransactionTable;
