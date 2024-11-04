"use client";

import React from "react";
import { Button, Layout, Typography, Card, Tooltip } from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

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
              signOut();
              router.push("/login");
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
            onClick={() => router.push("/application")}
          >
            New Application Form
          </Button>
        </Tooltip>
      </Content>
    </Layout>
  );
};

export default Home;
