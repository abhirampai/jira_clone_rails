import React, { useState } from "react";

// eslint-disable-next-line import/order
import { Typography, Layout, theme, Divider } from "antd";

import { useFetchAllIssues } from "hooks/useIssues";

import CreateIssue from "./CreateIssue";
import HeaderBar from "./Header/HeaderBar";
import Board from "./Kanban Board/Board";
import { findIssues } from "./utils";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [createIssueModalOpen, setCreateIssueModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useFetchAllIssues();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (isLoading || isFetching) return <div>Loading...</div>;

  const { boards, issues, total_issues_count } = data.data;

  return (
    <>
      <Header className="bg-white p-0">
        <HeaderBar openModal={() => setCreateIssueModalOpen(true)} />
      </Header>
      <Divider />
      <Content
        style={{
          background: colorBgContainer,
          overflow: "initial",
        }}
      >
        <Title className="p-8" level={3}>
          Kanban board
        </Title>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:px-10 px-2 row-gap-2 lg:col-gap-2">
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
      <Divider />
      <Footer className="bg-white text-center">
        ©2023 Created by Abhiram Pai
      </Footer>
      <CreateIssue
        open={createIssueModalOpen}
        onClose={() => setCreateIssueModalOpen(false)}
      />
    </>
  );
};

export default Main;
