import React, { useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { ColumnsType } from "antd/es/table";
import CustomerService, {
  CustomerType,
} from "../../../utils/services/customer.service";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import { Link } from "react-router-dom";
const customerService = new CustomerService();
const ListCustomers = () => {
  const [list, setList] = useState<CustomerType[]>([]);
  const columns: ColumnsType<CustomerType> = [
    {
      dataIndex: "name",
      title: "Customer",
      key: "name",
    },
    {
      dataIndex: "phoneNumber",
      title: "Phone Number",
      key: "phoneNumber",
    },
    {
      dataIndex: "idCard",
      title: "Identification Card",
      key: "idCard",
    },
    {
      dataIndex: "address",
      title: "Address",
      key: "address",
    },
    {
      dataIndex: "id",
      key: "id",
      render: (value, record) => (
        <Link to={`/dashboard/customer/${record.id}`}>View Details</Link>
      ),
    },
  ];

  const { loading } = useAxiosFetch({
    fetcher: customerService.onList,
    fetchOnce: true,
    onSuccess: (res) => {
      setList(res?.data.customers);
    },
  });

  return (
    <div>
      <Link to={"/dashboard/customer/register"} className="link btn">
        Register new customer
      </Link>
      <CustomTable
        loading={loading}
        title="List all customers"
        dataSource={list as never}
        columns={columns as never}
      />
    </div>
  );
};

export default ListCustomers;
