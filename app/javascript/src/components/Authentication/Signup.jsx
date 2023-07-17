import React from "react";

import { Button, Form, Input, Spin, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";

import { useSignup } from "hooks/useAuthentication";

import LandingPage from "./LandingPage";

const { Title, Paragraph } = Typography;

const Signup = () => {
  const { mutateAsync: signup, isLoading, isFetching } = useSignup();
  const history = useHistory();

  const onFinish = values => {
    signup(values, { onSuccess: history.push("/") });
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
      <Title level={5}>Register</Title>
      <Paragraph className="text-center mb-4">
        <Link
          to="/login"
          className="mt-2 font-medium text-bb-purple
            transition duration-150 ease-in-out focus:outline-none
            focus:underline"
        >
          Or Login Now
        </Link>
      </Paragraph>
      <Form
        autoComplete="off"
        className="md:w-1/4 border border-gray-300 p-5 bg-white"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          label="Password Confirmation"
          name="password_confirmation"
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

export default Signup;
