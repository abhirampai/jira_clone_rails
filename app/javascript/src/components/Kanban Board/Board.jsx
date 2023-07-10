import React from "react";

import { Typography } from "antd";

import Task from "./Task";

const { Title, Paragraph } = Typography;

const Board = ({ issues, boardName, total_issues_count }) => {
  const { board_total_count, issues: issueArray } = issues || {
    board_total_count: 0,
    issueArray: [],
  };

  return (
    <div className="bg-gray-200">
      <div className="flex justify-between p-4">
        <Title level={4}>{boardName}</Title>
        <Paragraph>
          ({board_total_count || 0} of {total_issues_count})
        </Paragraph>
      </div>
      {issueArray && (
        <div className="p-2 mt-2 overflow-y-scroll">
          {issueArray.map(issue => (
            <Task issue={issue} key={issue.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
