import React from "react";

import {
  HomeOutlined,
  LogoutOutlined,
  ProjectTwoTone,
} from "@ant-design/icons";
import { Menu, Layout, Popover, Button, Avatar, Typography } from "antd";

import { useLogout } from "hooks/useAuthentication";
import useLocalStorage from "hooks/useLocalStorage";

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

const { Title, Paragraph } = Typography;

const NavBar = () => {
  const [userName] = useLocalStorage("userName");
  const [userEmail] = useLocalStorage("authEmail");

  const { mutateAsync: logout } = useLogout();

  const handleLogout = e => {
    e.preventDefault();

    logout();
  };

  const RenderPopoverContent = () => (
    <>
      <div className="text-center">
        <Title level={5}>Hi {userName}!</Title>
        <Paragraph>{userEmail}</Paragraph>
      </div>
      <Button
        className="w-full"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );

  return (
    <Sider collapsed trigger={null}>
      <div className="relative top-0 pt-2 flex justify-center w-full">
        <ProjectTwoTone className="text-4xl" />
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
      <div className="flex absolute bottom-0 justify-center w-full pb-2">
        <Popover content={<RenderPopoverContent />} placement="right">
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        </Popover>
      </div>
    </Sider>
  );
};

export default NavBar;
