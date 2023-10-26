import React from "react";
// import "./App.css";
import Images from "./utils/images";
import { Button, Form, Input } from "antd";
import useAxiosFetch from "./utils/hooks/useAxiosFetch";
import AuthService from "./utils/services/auth.service";
import { useNavigate } from "react-router-dom";
const auth = new AuthService();
const App = () => {
  const navigate = useNavigate();
  const { loading, onFetch } = useAxiosFetch({
    fetcher: auth.login,
    onSuccess: (res) => {
      navigate("/dashboard");
    },
  });

  const handleFormFinish = (values: any) =>
    onFetch({ email: values?.email, password: values?.password });

  return (
    <section className="w-full h-[100svh] bg-red-200 flex-1">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        <aside className="h-full flex justify-center items-center">
          <section className="max-w-[400px] mx-auto">
            <div className="pb-5 text-white">
              <h3 className="text-xl text-yellow-700">ACCOUNT</h3>
              <h1 className="text-4xl">Sign in to your account</h1>
              <p className="text-sm text-slate-800">
                Enter you credentials to gain access to dashboard
              </p>
            </div>
            <Form onFinish={handleFormFinish} className="form">
              <Form.Item name={"email"}>
                <Input placeholder="Enter email here ..." />
              </Form.Item>
              <Form.Item name={"password"}>
                <Input.Password placeholder="Enter password here ..." />
              </Form.Item>
              <Button htmlType="submit" className="btn" loading={loading}>
                Login
              </Button>
            </Form>
          </section>
        </aside>
        <aside className="md:hidden lg:block flex-1 h-full relative">
          <img
            className="absolute object-cover h-full w-full"
            src={Images.HomeBackground}
            alt="home-login"
          />
        </aside>
      </div>
    </section>
  );
};

export default App;
