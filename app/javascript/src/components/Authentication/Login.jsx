import React from "react";

import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { useLogin } from "hooks/useAuthentication";
import { setToLocalStorage } from "utils/storage";

const Login = () => {
  const { mutateAsync: login } = useLogin();

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

  return (
    <div className="justify-center items-center flex flex-col w-full h-full">
      <h2
        className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700"
      >
        Sign In
      </h2>
      <div className="text-center mb-4">
        <Link
          to="/signup"
          className="mt-2 text-sm font-medium text-bb-purple
            transition duration-150 ease-in-out focus:outline-none
            focus:underline"
        >
          Or Register Now
        </Link>
      </div>
      <Form
        autoComplete="off"
        className="w-1/4 border border-gray-300 p-5 bg-white"
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
    </div>
  );
};

export default Login;
