import React from "react";

import { Typography, Layout, theme } from "antd";

import Board from "./Kanban Board/Board";

const { Title } = Typography;

const { Content } = Layout;

const Main = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content style={{ padding: 0, background: colorBgContainer }}>
      <Title className="p-8" level={3}>
        Kanban Board
      </Title>
      <div className="grid grid-cols-4 px-10 column-height">
        <Board />
      </div>
    </Content>
  );
};

export default Main;
