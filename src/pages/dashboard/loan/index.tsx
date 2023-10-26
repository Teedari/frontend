import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import CustomerService, {
  CustomerType,
} from "../../../utils/services/customer.service";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import LoanService from "../../../utils/services/loan.service";
import { useNavigate } from "react-router-dom";

const customerService = new CustomerService();
const loanService = new LoanService();
const ApplyForLoan = () => {
  const navigate = useNavigate();
  const [modal, toggleModal] = useState<{
    open?: boolean;
    customer?: CustomerType | null;
  }>();
  const [idCardNumber, setIdCardNumber] = useState<string>("");
  const request = useAxiosFetch({
    fetcher: customerService.onQuery,
    onSuccess: (res) => {
      const customers = res?.data?.customers;
      customers?.length <= 0 &&
        message.info("Customer record does not exist in database");
      toggleModal({
        open: true,
        customer: customers?.length > 0 ? customers[0] : null,
      });
    },
  });
  const requestLoan = useAxiosFetch({
    fetcher: loanService.applyForLoan,
    onSuccess: (res) => {
      message.info("Loan request for Customer has been approved");
      toggleModal({
        open: false,
        customer: null,
      });
      navigate("/dashboard/loan/list");
    },
  });
  const handleSearchCustom = () => {
    if (idCardNumber === "") return;
    request.onFetch({ idCard: idCardNumber });
  };
  const handleRequestLoan = (values: any) => {
    requestLoan.onFetch({
      customer: modal?.customer?.id,
      amount: {
        value: values?.amout,
      },
    });
  };
  return (
    <>
      <section className="flex justify-center items-center h-[100svh]">
        <div className="max-w-[800px] w-full mx-auto">
          <div className=" flex items-center border border-rose-300 bg-rose-200 p-1 px-2 rounded-full">
            <input
              value={idCardNumber}
              onChange={(e) => {
                setIdCardNumber(e.target.value);
              }}
              required
              type="text"
              className="text-center flex-1 h-8 bg-transparent text-white placeholder:text-white font-bold focus-within:border-0 focus-within:outline-none"
              placeholder="Enter Id Card number of the customer"
            />
            <Button
              onClick={handleSearchCustom}
              loading={request.loading}
              shape="round"
              className="px-8 btn text-white py-4 rounded-full"
            >
              Find
            </Button>
          </div>
          <p className="text-slate-400 text-center">
            Please enter the Identification number to verify if user exists
          </p>
          {modal?.customer && (
            <div className="text-center">
              <Button
                onClick={() => toggleModal((prev) => ({ ...prev, open: true }))}
                className=""
              >
                Request Loan
              </Button>
            </div>
          )}
        </div>
      </section>
      <Modal
        open={Boolean(modal?.open)}
        onCancel={() => toggleModal((prev) => ({ ...prev, open: false }))}
        footer={<></>}
      >
        <h3 className="text-3xl">Loan Request Form #{modal?.customer?.name}</h3>
        <Form onFinish={handleRequestLoan} className="form" layout="vertical">
          <Form.Item label="Enter amount" name={"amount"}>
            <Input placeholder="Enter amount here ..." type="numeric" min={0} />
          </Form.Item>
          <Button
            loading={requestLoan.loading}
            htmlType="submit"
            className="btn"
          >
            Loan Request
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ApplyForLoan;
