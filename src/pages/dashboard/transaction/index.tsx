import React, { useState } from "react";
import TransactionTable from "../../../components/TransactionTable";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import TransactionService, {
  TransactionType,
} from "../../../utils/services/transaction.service";
const transactionService = new TransactionService();
const ListTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const { loading } = useAxiosFetch({
    fetcher: transactionService.onList,
    fetchOnce: true,
    onSuccess: (res) => {
      setTransactions(res?.data.transactions);
    },
  });
  return (
    <div>
      <TransactionTable loading={loading} dataSource={transactions as never} />
    </div>
  );
};

export default ListTransactions;
