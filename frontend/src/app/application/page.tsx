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
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

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
  const router = useRouter();

  const onFinish = async (values: FormValues) => {
    console.log("Form values before submission:", values);
    try {
      // Hantar data ke backend
      const response = await axios.post(
        "http://localhost:3001/api/application",
        values
      );

      // Dapatkan ID dari respons backend
      const newApplicationId = response.data.id;

      message.success("Application submitted successfully!");

      // Arahkan ke halaman view application dengan ID yang baru dihantar
      router.push(`/view?id=${newApplicationId}`);
    } catch (error: any) {
      console.error("Submission error:", error.response?.data || error.message);
      message.error("Failed to submit application.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "10px", backgroundColor: "#f0f2f5" }}>
        <Card
          title="New Application"
          bordered={false}
          style={{ maxWidth: "1000px", margin: "0 auto", borderRadius: "10px" }}
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
                  <Input placeholder="Enter company name" />
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
                    { required: true, message: "Please enter your country!" },
                  ]}
                >
                  <Input placeholder="Enter Country" />
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
              <Input.TextArea rows={2} placeholder="Enter description" />
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

export default ApplicationForm;
