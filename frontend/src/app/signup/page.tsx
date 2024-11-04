"use client";

import { useRouter } from "next/navigation";
import "antd/dist/antd.css";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, message } from "antd";
import React from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api/signup";

export default function SignupPage() {
  const { Title, Paragraph } = Typography;
  const router = useRouter();

  const registerUser = async (values: any) => {
    try {
      const response = await axios.post(BACKEND_URL, values);

      if (response.status === 201) {
        message.success("Account created successfully!");
        router.push("/login");
      } else {
        message.error(response.data.message || "Registration failed.");
      }
    } catch (error: any) {
      // Type assertion here
      console.error("Error:", error);
      message.error(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Network error. Please try again."
      );
    }
  };

  const onFinish = (values: any) => {
    console.log("Signup successful:", values);
    registerUser(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Signup failed:", errorInfo);
    message.error("Please fill out the form correctly.");
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
          display: "flex",
          maxWidth: "70%",
          maxHeight: "85%",
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
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>BizNest</div>
          <div style={{ textAlign: "left" }}>
            <Title
              level={1}
              style={{
                marginTop: "30px",
                marginBottom: "10px",
                fontSize: "35px",
              }}
            >
              Keep your online business organized
            </Title>
            <Paragraph style={{ marginBottom: "18px" }}>
              Sign up to start your 30 days free trial
            </Paragraph>
          </div>
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #d9d9d9",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "55px",
              fontWeight: 500,
            }}
            block
            onClick={() => message.info("Google Sign-In not implemented yet.")}
          >
            <img
              src="/google.ico"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Sign in with Google
          </Button>

          <div style={{ display: "flex", alignItems: "center", margin: "0" }}>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#ccc",
                marginRight: "10px",
              }}
            ></div>
            <span style={{ color: "#999", whiteSpace: "nowrap" }}>or</span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#ccc",
                marginLeft: "10px",
              }}
            ></div>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your name"
                style={{ height: "40px", borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                style={{ height: "40px", borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                style={{ height: "40px", borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  height: "45px",
                  backgroundColor: "#000",
                  borderRadius: "5px",
                }}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div
            style={{
              textAlign: "left",
              marginTop: "-12px",
              marginBottom: "30px",
            }}
          >
            Already have an account?{" "}
            <a onClick={() => router.push("/login")}>
              <b>Login Here</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
