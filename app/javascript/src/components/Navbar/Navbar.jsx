import React from "react";

import { ProjectOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";

const { Sider } = Layout;

const getItem = (label, key, icon, children, type) => ({
  key,
  icon,
  children,
  label,
  type,
});

const MenuItems = [
  getItem("Dashboard", "1", <HomeOutlined className="text-lg" />),
];

const NavBar = () => (
  <Sider
    collapsed
    trigger={null}
    style={{
      overflow: "auto",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
    }}
  >
    <div>
      <ProjectOutlined />
    </div>
    <div className="pt-10">
      <Menu
        defaultOpenKeys={["sub1"]}
        defaultSelectedKeys={["1"]}
        items={MenuItems}
        mode="inline"
        theme="dark"
      />
    </div>
  </Sider>
);

export default NavBar;
