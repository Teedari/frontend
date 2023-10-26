import { Button, Card, Form, Input, Modal, Select, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { StyleProvider } from "@ant-design/cssinjs";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import AccountService, {
  AccountType,
} from "../../../utils/services/account.service";
import TransactionService from "../../../utils/services/transaction.service";
import { Link } from "react-router-dom";
const accountService = new AccountService();
const transactionService = new TransactionService();
const CreateTransaction = () => {
  const [result, setResult] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [account, setAccount] = useState<AccountType | null>(null);
  const [transactionForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const requestAccountValidation = useAxiosFetch({
    fetcher: accountService.onQuery,
    onSuccess: (res) => {
      res?.data?.accounts.length > 0 && setAccount(res?.data.accounts[0]);
      message.success("Account found");
    },
  });
  const requestTransaction = useAxiosFetch({
    fetcher: transactionService.createTransaction,
    onSuccess: (res) => {
      // console.log("RESULTS ", res?.data);
      setResult(res?.data.results);
      transactionForm.resetFields();
      searchForm.resetFields();
      message.success("Transaction Created Successfully");
    },
  });

  const searchAccountHandler = (values: any) => {
    setIsCreating(false);
    setAccount(null);
    requestAccountValidation.onFetch({ accountNumber: values?.accountNumber });
  };

  const transactionSubmitHandler = (values: any) => {
    requestTransaction.onFetch({
      account: account?.id,
      amount: values?.amount,
      type: values?.type,
    });
  };

  return (
    <StyleProvider hashPriority="high">
      <div className="flex flex-col items-center">
        <p className="text-3xl py-5">Create transaction for a customer</p>
        <Form
          form={searchForm}
          onFinish={searchAccountHandler}
          className="form flex max-w-[400px] w-full"
        >
          <Form.Item
            name={"accountNumber"}
            required
            rules={[{ required: true }]}
          >
            <Input
              type="number"
              maxLength={10}
              placeholder="Enter account number here"
            />
          </Form.Item>
          <Button
            className="btn primary"
            loading={requestAccountValidation.loading}
            htmlType="submit"
          >
            Find
          </Button>
        </Form>
        <br />
        {!isCreating ? (
          <LoadingSkeleton
            isEmpty={!requestAccountValidation.loading && !account}
            loading={requestAccountValidation.loading}
          >
            <div className="text-center">
              <p>
                <Tag color="green">Balance</Tag>
              </p>
              <h3 className="text-3xl">{account?.fAmount}</h3>
              <p>
                <Tag color="green">Account Holder Name</Tag>
              </p>
              <p>
                {typeof account?.customer !== "string"
                  ? account?.customer.name
                  : ""}
              </p>
            </div>
            <ul className="flex gap-4 py-4">
              <li>
                <Tag color="green">Date of birth</Tag>
                <p>
                  {" "}
                  {typeof account?.customer !== "string"
                    ? account?.customer.dateOfBirth
                    : ""}
                </p>
              </li>
              <li>
                <Tag color="green">Phone number</Tag>
                <p>
                  {" "}
                  {typeof account?.customer !== "string"
                    ? account?.customer.phoneNumber
                    : ""}
                </p>
              </li>
              <li>
                <Tag color="green">Identification Card Number</Tag>
                <p>
                  {" "}
                  {typeof account?.customer !== "string"
                    ? account?.customer.idCard
                    : ""}
                </p>
              </li>
            </ul>
            <div className="space-x-5 pt-5">
              <Button
                onClick={() => {
                  setIsCreating(true);
                  searchForm.resetFields();
                }}
                className="btn"
              >
                Create a transaction
              </Button>
              <Link
                to={`/dashboard/transaction/account/${account?.id}`}
                className="btn"
              >
                List all transactios
              </Link>
            </div>
          </LoadingSkeleton>
        ) : (
          <div className="max-w-screen-lg w-full">
            <h2 className="text-2xl py-4">
              Creating a transaction for account number #
              <span className="text-yellow-700 font-thin">
                {account?.accountNumber}
              </span>
            </h2>
            <Form
              form={transactionForm}
              onFinish={transactionSubmitHandler}
              className="form"
              layout="vertical"
            >
              <Form.Item
                name={"type"}
                label="Select transaction type"
                required
                rules={[{ required: true, message: "Select Transaction Type" }]}
              >
                <Select
                  placeholder="Select Transaction Type"
                  className="custom-selector"
                  options={[
                    { value: "deposit", title: "Deposit" },
                    { value: "withdrawal", title: "Withdrawal" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name={"amount"}
                label="Enter amount here"
                required
                rules={[
                  {
                    required: true,
                    message: "You are required to enter the amount",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter account number here" />
              </Form.Item>
              <div>
                <Button
                  htmlType="submit"
                  loading={requestTransaction.loading}
                  className="btn primary"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
      <Modal
        open={Boolean(result)}
        onCancel={() => setResult(null)}
        footer={<></>}
      >
        <h3 className="text-3xl font-bold">Transaction Details</h3>
        <div className="mt-4">
          <ul className="grid grid-cols-2 gap-4">
            <li>
              <span className="font-bold text-yellow-600 mb-4 border-b border-yellow-600 p-1 rounded-full ">
                Name
              </span>
              {typeof account?.customer !== "string" && (
                <p className="text-xl mt-2">{account?.customer.name}</p>
              )}
            </li>
            <li>
              <span className="font-bold text-yellow-600 mb-4 border-b border-yellow-600 p-1 rounded-full ">
                Identification Card
              </span>
              {typeof account?.customer !== "string" && (
                <p className="text-xl mt-2">{account?.customer.idCard}</p>
              )}
            </li>
            <li>
              <span className="font-bold text-yellow-600 mb-4 border-b border-yellow-600 p-1 rounded-full ">
                Transaction Amount
              </span>
              <p className="text-xl mt-2">
                {result?.transaction?.amount?.currency}
                {result?.transaction?.amount?.value}
              </p>
            </li>
            <li>
              <span className="font-bold text-yellow-600 mb-4 border-b border-yellow-600 p-1 rounded-full ">
                Previous Account Balance
              </span>
              <p className="text-xl mt-2">
                {account?.amount.currency}
                {account?.amount.value}
              </p>
            </li>
            <li>
              <span className="font-bold text-green-600 mb-4 border-b border-green-600 p-1 rounded-full ">
                Current Account Balance
              </span>
              <p className="text-xl mt-2">
                {" "}
                {result?.account?.amount?.currency}
                {result?.account?.amount?.value}
              </p>
            </li>
            <li>
              <span className="font-bold text-yellow-600 mb-4 border-b border-yellow-600 p-1 rounded-full ">
                Transaction Date
              </span>
              <p className="text-lg mt-2">{result?.transaction?.createdAt}</p>
            </li>
          </ul>
        </div>
      </Modal>
    </StyleProvider>
  );
};

export default CreateTransaction;
