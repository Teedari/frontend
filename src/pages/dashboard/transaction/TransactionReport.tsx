import { Card, Tag } from "antd";
import React, { useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { ColumnsType } from "antd/es/table";
import TransactionService, {
  TransactionType,
} from "../../../utils/services/transaction.service";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import TransactionTable from "../../../components/TransactionTable";

const columns: ColumnsType<TransactionType> = [
  {
    dataIndex: "_id",
    key: "_id",
    title: "Transaction ID",
  },
  {
    dataIndex: "amount",
    key: "amount",
    title: "Amount",
    render: (value) => (
      <>
        {value.currency}
        {value?.value}
      </>
    ),
  },
  {
    dataIndex: "type",
    key: "type",
    title: "Type",
    render: (value) => (
      <Tag color={value === "desposite" ? "blue" : "gold"}>
        <span className="uppercase">{value}</span>
      </Tag>
    ),
  },
  {
    dataIndex: "createdAt",
    key: "createdAt",
    title: "Transaction Date",
  },
];
const transactionService = new TransactionService();
const TransactionReport = () => {
  const [reports, setReports] = useState<{
    deposit: any;
    withdrawal: any;
  } | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const requestReports = useAxiosFetch({
    fetcher: transactionService.getTodaysTransactionReport,
    fetchOnce: true,
    onSuccess: (res) => {
      setReports(res?.data.reports);
    },
  });
  const requestTodaysTransactions = useAxiosFetch({
    fetcher: () => transactionService.onQuery({ isToday: true }),
    fetchOnce: true,
    onSuccess: (res) => {
      setTransactions(res?.data.transactions);
    },
  });
  return (
    <div>
      <LoadingSkeleton loading={requestReports.loading}>
        {" "}
        <div className="grid grid-cols-4 gap-5">
          <Card className="shadow-lg">
            <h3 className="text-lg text-yellow-700">Deposits</h3>
            <p className="text-3xl font-bold">
              GHS{reports?.deposit || "0.00"}
            </p>
            <Tag color="green" className="mt-4">
              Today
            </Tag>
          </Card>
          <Card className="shadow-lg">
            <h3 className="text-lg text-yellow-700">Withdrawals</h3>
            <p className="text-3xl font-bold">
              GHS{reports?.withdrawal || "0.00"}
            </p>
            <Tag color="green" className="mt-4">
              Today
            </Tag>
          </Card>
        </div>
      </LoadingSkeleton>
      <br />
      <TransactionTable
        loading={requestTodaysTransactions.loading}
        dataSource={transactions as never}
      />
    </div>
  );
};

export default TransactionReport;
