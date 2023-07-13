import React, { useState } from "react";

import { Modal, Input, Space, Empty, Spin } from "antd";

import useDebounce from "hooks/useDebounce";
import { useSearchIssue } from "hooks/useIssues";
import useIssueStore from "hooks/useIssueStore";

import Task from "./Kanban Board/Task";

const { Search } = Input;

const SearchModal = ({ open, onClose }) => {
  const setIssueId = useIssueStore(state => state.setIssueId);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);
  const { data, isLoading, isFetching } = useSearchIssue(debouncedSearchQuery);

  const RenderTasks = ({ issues }) =>
    issues.length > 0 ? (
      <Space className="w-full mt-4" direction="vertical">
        {issues.map(issue => (
          <Task
            issue={issue}
            key={issue.id}
            setSelectedId={() => setIssueId(issue.id)}
          />
        ))}
      </Space>
    ) : (
      <Empty className="mt-4" />
    );

  return (
    <Modal
      closable
      footer={null}
      open={open}
      title="Search issue"
      onCancel={onClose}
    >
      <Search
        allowClear
        placeholder="input search text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {isLoading || isFetching ? (
        <div className="modal-loader">
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <>{data && <RenderTasks issues={data.data.issues || []} />}</>
      )}
    </Modal>
  );
};

export default SearchModal;
