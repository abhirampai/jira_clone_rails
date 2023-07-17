import React from "react";

import { Button, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { useLogin } from "hooks/useAuthentication";
import { setToLocalStorage } from "utils/storage";

import LandingPage from "./LandingPage";

const { Title, Paragraph } = Typography;

const Login = () => {
  const { mutateAsync: login, isLoading, isFetching } = useLogin();

  const onFinish = values => {
    login(values, {
      onSuccess: ({ data: { authentication_token, email, name } }) => {
        setToLocalStorage("authToken", authentication_token);
        setToLocalStorage("authEmail", email);
        setToLocalStorage("userName", name);
        setAuthHeaders();
        window.location.href = "/";
      },
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="loader">
        <Spin size="large" tip="Logging in...">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <LandingPage>
      <Title className="text-center" level={5}>
        Sign In
      </Title>
      <Paragraph className="text-center mb-4">
        <Link
          to="/signup"
          className="mt-2 font-medium text-bb-purple
            transition duration-150 ease-in-out focus:outline-none
            focus:underline"
        >
          Or Register Now
        </Link>
      </Paragraph>
      <Form
        autoComplete="off"
        className="md:w-1/4 border border-gray-300 p-5 bg-white"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LandingPage>
  );
};

export default Login;
