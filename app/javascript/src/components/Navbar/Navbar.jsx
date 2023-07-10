import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Menu, Layout } from "antd";

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
  getItem("Search Issues", "2", <SearchOutlined className="text-lg" />),
  getItem("Create Issues", "3", <PlusOutlined className="text-lg" />),
];

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} trigger={null}>
      <div className="w-full justify-center flex mt-4">
        <Button className="mb-8" type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        defaultOpenKeys={["sub1"]}
        defaultSelectedKeys={["1"]}
        inlineCollapsed={collapsed}
        items={MenuItems}
        mode="inline"
        theme="dark"
      />
    </Sider>
  );
};

export default NavBar;
