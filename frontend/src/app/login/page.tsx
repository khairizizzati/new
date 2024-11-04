"use client"; // Enables client-side rendering
import React from "react";
import "antd/dist/antd.css";
import { GoogleOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, message, Carousel } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

const LoginForm: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log("Login values: ", values);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        message.error(errorData.message || "Login failed!");
        return;
      }

      const data = await response.json();
      message.success("Logged in successfully!");

      // Store token in local storage or context
      localStorage.setItem("token", data.token);

      // Navigate to dashboard or homepage after login
      router.push("/home");
    } catch (error) {
      message.error("Login failed! Please check your email and password.");
      console.error("Login error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    message.error("Please check the form for errors.");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "90px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxHeight: "85%",

          maxWidth: "40%",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>BizNest</div>
        <Title level={1} style={{ marginBottom: "10px" }}>
          Keep your online business organized
        </Title>

        <Button
          style={{ marginBottom: "20px" }}
          block
          onClick={() => message.info("Google Sign-In not implemented yet.")}
        >
          <img
            src="/google.ico"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
            alt="Google Icon"
          />
          Login with Google
        </Button>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#000", borderRadius: "5px" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "left" }}>
          Don't have an account?{" "}
          <a onClick={() => router.push("/signup")}>
            <b>Sign up here</b>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
