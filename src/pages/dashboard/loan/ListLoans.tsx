import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import LoanService, {
  LoanDepositType,
  LoanType,
} from "../../../utils/services/loan.service";
import CustomTable from "../../../components/CustomTable";
import { Card, Modal, Radio, Tag } from "antd";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import { getDateTime } from "../../../utils/helpers";
const loanService = new LoanService();

const ListLoans = () => {
  const [transactions, setTransactions] = useState<LoanDepositType[] | null>(
    null
  );
  const [loans, setLoans] = useState<LoanType[]>([]);
  const { loading } = useAxiosFetch({
    fetcher: loanService.onList,
    fetchOnce: true,
    onSuccess: (res) => {
      setLoans(res?.data.loans);
    },
  });
  const columns: ColumnsType<LoanType> = [
    {
      dataIndex: "_id",
      key: "_id",
      title: "ID",
    },
    {
      dataIndex: "customer",
      key: "customer",
      title: "Customer",
      render: (value, record) => {
        return !value ? (
          <>N/A</>
        ) : (
          <Card className="inline-block ">
            <h1 className="mb-2 text-yellow-700">Customer Information</h1>
            <hr />
            <p className="mt-2">
              <span className="font-bold">Name:</span> {value?.name}
            </p>
            <p>
              <span className="font-bold">Identification Number:</span>{" "}
              {value?.idCard}
            </p>
            <p>
              <span className="font-bold">Phone number:</span>{" "}
              {value?.phoneNumber}
            </p>
          </Card>
        );
      },
    },
    {
      dataIndex: "amount",
      key: "amount",
      title: "Principal",
      render: (value) => (
        <>
          {value?.currency}
          {value?.value}
        </>
      ),
    },
    {
      dataIndex: "interestAmount",
      key: "interestAmount",
      title: "Interest",
    },
    {
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      dataIndex: "amountPaid",
      key: "amountPaid",
      title: "Amount Paid",
    },
    {
      dataIndex: "deposits",
      key: "deposits",
      title: "Transactions",
      render: (value: []) => {
        return (
          <button
            onClick={() => setTransactions(value?.length > 0 ? value : null)}
            className="bg-primary px-4 p-2 font-bold rounded-full"
          >
            View Transactions ({value?.length})
          </button>
        );
      },
    },
    {
      dataIndex: "isPaid",
      key: "isPaid",
      title: "Is Loan Paid off",
      render: (value) => <Radio value={Boolean(value)} />,
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (value) => (
        <Tag color="green">
          <span>{value}</span>
        </Tag>
      ),
    },
  ];
  return (
    <div>
      <CustomTable
        loading={loading}
        title="Loans"
        columns={columns as never}
        dataSource={loans as never}
      />
      <Modal
        open={Boolean(transactions)}
        onCancel={() => setTransactions(null)}
        footer={<></>}
      >
        {transactions &&
          transactions.map((transaction, index) => (
            <Card key={index} className=" mt-4">
              <ul>
                {transaction?.createdAt && (
                  <li>
                    <small className="text-rose-400 font-bold">
                      Date:
                      {getDateTime(transaction?.createdAt)}
                    </small>
                  </li>
                )}
                <li>
                  <small>Amount</small>
                </li>
              </ul>
              <h3 className="text-3xl">
                {transaction.currency}
                {transaction.value}
              </h3>
            </Card>
          ))}
      </Modal>
    </div>
  );
};

export default ListLoans;
