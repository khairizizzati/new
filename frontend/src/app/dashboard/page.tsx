"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Layout, Typography, Card, Tooltip } from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import "antd/dist/antd.css";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Application {
  key: string;
  companyName: string;
  companyId: string;
  description: string;
  createdDate: string;
}

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setApplications([
      {
        key: "1",
        companyName: "Tech Innovations",
        companyId: "TIN123",
        description: "Innovative tech solutions.",
        createdDate: "2024-10-01",
      },
    ]);
  }, []);

  const columns = [
    { title: "No.", dataIndex: "key", key: "key" },
    { title: "Company Name", dataIndex: "companyName", key: "companyName" },
    { title: "Company ID", dataIndex: "companyId", key: "companyId" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
  ];

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#001529",
          padding: "0 20px",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          BizNest
        </Title>
        <Tooltip title="Logout">
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              signOut(); // Log out the user
              router.push("/login"); // Navigate to the login page
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Tooltip title="Create a new application">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: "20px" }}
            onClick={() => router.push("/newapplication")}
          >
            New Application Form
          </Button>
        </Tooltip>

        <Card title="Application List" bordered={false}>
          <Table
            columns={columns}
            dataSource={applications}
            pagination={{ pageSize: 5 }}
            bordered
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            } // Optional: Add custom class for alternating row colors
            onRow={(record) => ({
              onClick: () => {
                // Optional: Handle row click
                console.log("Row clicked:", record);
              },
            })}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
