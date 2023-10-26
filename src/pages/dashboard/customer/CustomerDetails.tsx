import { Card } from "antd";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import CustomerService, {
  CustomerType,
} from "../../../utils/services/customer.service";

import { useParams } from "react-router";

const customerService = new CustomerService();

type Customer = {
  account: any;
  customer: CustomerType;
};
const CustomerDetails = () => {
  const params = useParams();
  const [customerInfo, setCustomerInfo] = useState<Customer>();
  const { onFetch, loading } = useAxiosFetch({
    fetcher: customerService.onGet,
    // fetchOnce: true,
    onSuccess: (res) => {
      setCustomerInfo(res?.data.data);
    },
  });
  useEffect(() => {
    onFetch(params?.customerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <LoadingSkeleton loading={loading}>
          <Card className="shadow-lg">
            <h3 className="text-3xl">Customer Information</h3>
            <hr />
            <br />
            <ul className="grid grid-cols-3 gap-4">
              <li>
                <span className="font-bold text-xl">Name</span> <br />
                {customerInfo?.customer?.name}
              </li>
              <li>
                <span className="font-bold text-xl">Date of birth</span> <br />
                {customerInfo?.customer?.dateOfBirth}
              </li>
              <li>
                <span className="font-bold text-xl">Marital Status</span> <br />
                {customerInfo?.customer?.maritalStatus}
              </li>
              <li>
                <span className="font-bold text-xl">Identification Card</span>{" "}
                <br />
                {customerInfo?.customer?.idCard}
              </li>
              <li>
                <span className="font-bold text-xl">Address</span> <br />
                {customerInfo?.customer?.address}
              </li>
              <li>
                <span className="font-bold text-xl">Phone Number</span> <br />
                {customerInfo?.customer?.phoneNumber}
              </li>
              <li>
                <span className="font-bold text-xl">Employment Status</span>{" "}
                <br />
                {customerInfo?.customer?.employmentStatus}
              </li>
              <li>
                <span className="font-bold text-xl">Employer's Name</span>{" "}
                <br />
                {customerInfo?.customer?.nameOfEmployee}
              </li>
            </ul>
            <br />
            {customerInfo?.account && (
              <div className="">
                <h3 className="text-3xl">Account Information</h3>
                <hr />
                <br />
                <ul className="grid grid-cols-3 gap-4">
                  <li>
                    <span className="font-bold text-xl">
                      Account Identification
                    </span>{" "}
                    <br />
                    {customerInfo.account?.number}
                  </li>
                  <li>
                    <span className="font-bold text-xl">Total Amount</span>{" "}
                    <br />
                    {customerInfo.account?.amount?.currency}
                    {customerInfo.account?.amount?.value}
                  </li>
                </ul>
              </div>
            )}
          </Card>
        </LoadingSkeleton>
      </div>
    </div>
  );
};

export default CustomerDetails;
