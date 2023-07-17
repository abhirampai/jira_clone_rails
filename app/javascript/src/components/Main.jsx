import React, { useState } from "react";

// eslint-disable-next-line import/order
import { Layout, theme, Divider, Spin } from "antd";
import { findIssues } from "utils";

import { useFetchAllIssues } from "hooks/useIssues";

import CreateIssue from "./CreateIssue";
import HeaderBar from "./Header/HeaderBar";
import Board from "./Kanban Board/Board";
import SearchModal from "./SearchModal";

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
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:px-10 px-2 row-gap-2 lg:col-gap-2 mt-4">
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
        ©2023 Created with &hearts; Abhiram Pai
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
