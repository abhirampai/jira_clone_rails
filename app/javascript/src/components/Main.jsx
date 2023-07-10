import React from "react";

import { Typography, Layout, theme } from "antd";

import { useFetchAllIssues } from "hooks/useIssues";

import Board from "./Kanban Board/Board";
import { findIssues } from "./utils";

const { Title } = Typography;

const { Content } = Layout;

const Main = () => {
  const { data, isLoading } = useFetchAllIssues();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (isLoading) return <div>Loading...</div>;

  const { boards, issues, total_issues_count } = data.data;

  return (
    <Content style={{ padding: 0, background: colorBgContainer }}>
      <Title className="p-8" level={3}>
        Kanban board
      </Title>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:px-10 px-2 column-height row-gap-2 lg:col-gap-2">
        {boards.map(board => (
          <Board
            boardName={board}
            issues={findIssues(board, issues)}
            key={board}
            total_issues_count={total_issues_count}
          />
        ))}
      </div>
    </Content>
  );
};

export default Main;
