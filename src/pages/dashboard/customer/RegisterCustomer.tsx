import { Button, Card, DatePicker, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { EmploymentStatusOptions } from "../../../utils/types";
import CustomerService from "../../../utils/services/customer.service";
import useAxiosFetch from "../../../utils/hooks/useAxiosFetch";
import { getDateOnlyFromISOString } from "../../../utils/helpers";
const requiredRules = [{ required: true, message: "This field is required" }];
const customerServices = new CustomerService();
const RegisterCustomer = () => {
  const [form] = Form.useForm();
  const [isEmployed, setIsEmployed] = useState(false);
  const { loading, onFetch } = useAxiosFetch({
    fetcher: customerServices.registerCustomer,
    onSuccess: (res) => {
      message.success("Customer created successfully");
    },
  });

  const handleCustomerCreation = (values: any) => {
    let data: any = {
      name: values?.name,
      dateOfBirth: getDateOnlyFromISOString(values?.dateOfBirth["$d"]),
      phoneNumber: values?.phoneNumber,
      maritalStatus: values?.maritalStatus,
      idCard: values?.idCard,
      employmentStatus: values?.employmentStatus,
      address: values?.address,
    };
    if (data.employmentStatus === EmploymentStatusOptions.EMPLOYED)
      data.nameOfEmployee = values?.nameOfEmployee;
    onFetch(data);
  };
  // onFetch();
  return (
    <div className="grid grid-cols-2">
      <Card className="shadow-lg">
        <h3 className="text-3xl">Fill Customer Registration Form</h3>
        <Form
          form={form}
          onFinish={handleCustomerCreation}
          className="form"
          layout="vertical"
        >
          <Form.Item
            name={"name"}
            label="Enter Customer's Fullname"
            rules={requiredRules}
          >
            <Input placeholder="Name goes here ..." />
          </Form.Item>
          <Form.Item
            label="Select Marital Status"
            name={"maritalStatus"}
            rules={requiredRules}
          >
            <Select
              className="custom-selector"
              placeholder="Choose marital status"
              options={[
                { value: "single", label: "SINGLE" },
                { value: "married", label: "MARRIED" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Date of birth"
            name={"dateOfBirth"}
            rules={requiredRules}
          >
            <DatePicker
              className="w-full custom-selector"
              placeholder="Select Date"
            />
          </Form.Item>
          <Form.Item
            label="Identification Number"
            name={"idCard"}
            rules={requiredRules}
          >
            <Input placeholder="Id Number goes here..." />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name={"phoneNumber"}
            rules={requiredRules}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Address" rules={requiredRules} name={"address"}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Employment Status"
            name={"employmentStatus"}
            rules={requiredRules}
          >
            <Select
              className="custom-selector"
              placeholder="Choose employment status"
              onChange={(value) =>
                setIsEmployed(value === EmploymentStatusOptions.EMPLOYED)
              }
              options={[
                { value: EmploymentStatusOptions.EMPLOYED, label: "Employed" },
                { value: EmploymentStatusOptions.RETIRED, label: "RETIRED" },
                {
                  value: EmploymentStatusOptions.SELF_EMPLOYED,
                  label: "SELF EMPLOYED",
                },
                {
                  value: EmploymentStatusOptions.UN_EMPLOYED,
                  label: "UN EMPLOYED",
                },
              ]}
            />
          </Form.Item>
          {isEmployed && (
            <Form.Item label="Name of employer" name={"nameOfEmployee"}>
              <Input placeholder="Enter your employer's name" />
            </Form.Item>
          )}
          <div>
            <Button loading={loading} htmlType="submit" className="btn">
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterCustomer;
