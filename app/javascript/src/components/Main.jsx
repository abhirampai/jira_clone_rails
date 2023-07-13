import React, { useState } from "react";

// eslint-disable-next-line import/order
import { Typography, Layout, theme, Divider, Spin } from "antd";

import { useFetchAllIssues } from "hooks/useIssues";

import CreateIssue from "./CreateIssue";
import HeaderBar from "./Header/HeaderBar";
import Board from "./Kanban Board/Board";
import SearchModal from "./SearchModal";
import { findIssues } from "./utils";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [createIssueModalOpen, setCreateIssueModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useFetchAllIssues();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (isLoading || isFetching) {
    return (
      <div className="loader">
        <Spin size="large" tip="Loading">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  const { boards, issues, total_issues_count } = data.data;

  const boardsObject = boards.reduce((a, v, i) => ({ ...a, [v]: i }), {});

  return (
    <>
      <Header className="bg-white p-0">
        <HeaderBar
          openCreateIssueModal={() => setCreateIssueModalOpen(true)}
          openSearchModal={() => setSearchModalOpen(true)}
        />
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
              index={boardsObject[board]}
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
      <SearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      <CreateIssue
        open={createIssueModalOpen}
        onClose={() => setCreateIssueModalOpen(false)}
      />
    </>
  );
};

export default Main;
