"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Row,
  Col,
  Card,
  Layout,
  Menu,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios"; // Ensure axios is installed

const { Header, Content } = Layout;
const { Option } = Select;

interface FormValues {
  companyName: string;
  companyId: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  description: string;
}

const ApplicationForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter(); // To navigate after form submission

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);
    try {
      await axios.post("http://localhost:5000/api/application", values);
      message.success("Application submitted successfully!");
      form.resetFields(); // Reset form fields after submission
      router.push("/dashboard"); // Navigate to dashboard on success (optional)
    } catch (error: any) {
      console.error("Submission error:", error);
      message.error("Failed to submit application.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#001529" }}>
        <div style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
          BisNest
        </div>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Card
          title="New Application"
          bordered={false}
          style={{ maxWidth: "1000px", margin: "0 auto", borderRadius: "8px" }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="companyName"
                  label="Company Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your company name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter company name"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="companyId"
                  label="Company ID"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your company ID!",
                    },
                  ]}
                >
                  <Input placeholder="Enter company ID" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="addressLine1"
              label="Address Line 1"
              rules={[
                { required: true, message: "Please enter address line 1!" },
              ]}
            >
              <Input placeholder="Enter address line 1" />
            </Form.Item>

            <Form.Item name="addressLine2" label="Address Line 2">
              <Input placeholder="Enter address line 2" />
            </Form.Item>

            <Form.Item name="addressLine3" label="Address Line 3">
              <Input placeholder="Enter address line 3" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[
                    { required: true, message: "Please select your country!" },
                  ]}
                >
                  <Select placeholder="Select your country">
                    <Option value="USA">United States</Option>
                    <Option value="CAN">Canada</Option>
                    <Option value="UK">United Kingdom</Option>
                    {/* Add more countries as needed */}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[
                    { required: true, message: "Please enter your state!" },
                  ]}
                >
                  <Input placeholder="Enter state" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    { required: true, message: "Please enter your city!" },
                  ]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="postcode"
                  label="Postcode"
                  rules={[
                    { required: true, message: "Please enter your postcode!" },
                  ]}
                >
                  <Input placeholder="Enter postcode" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "48%", marginRight: "4%" }}
              >
                Submit
              </Button>
              <Button
                type="default"
                onClick={() => router.push("/dashboard")}
                style={{ width: "48%" }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

// Export the component
export default ApplicationForm;
