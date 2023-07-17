import React from "react";

import { Button, Form, Input } from "antd";

import { useSignup } from "hooks/useAuthentication";

const Signup = () => {
  const { mutateAsync: signup } = useSignup();

  const onFinish = values => {
    // console.log("Success:", values);
    signup(values);
  };

  const onFinishFailed = _ => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="justify-center items-center flex w-full h-full">
      <Form
        autoComplete="off"
        className="w-1/4 border border-gray-300 p-5 bg-white"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
    </div>
  );
};

export default Signup;
