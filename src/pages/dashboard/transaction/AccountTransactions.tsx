import React, { useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { useParams } from "react-router";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import TransactionService, {
  TransactionType,
} from "../../../utils/services/transaction.service";
import { ColumnsType } from "antd/es/table";
import { Card } from "antd";
import TransactionTable from "../../../components/TransactionTable";
const transactionService = new TransactionService();

const AccountTransactions = () => {
  const params = useParams();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const { loading } = useAxiosFetch({
    fetcher: () => transactionService.onQuery({ account: params?.accountId }),
    fetchOnce: true,
    onSuccess: (res) => {
      setTransactions(res?.data.transactions);
    },
  });
  return (
    <div>
      <TransactionTable dataSource={transactions as never} />
    </div>
  );
};

export default AccountTransactions;
