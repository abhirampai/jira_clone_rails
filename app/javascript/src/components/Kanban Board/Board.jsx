import React, { useState } from "react";

import { Typography } from "antd";

import Task from "./Task";
import TaskDrawer from "./TaskDrawer";

const { Title, Paragraph } = Typography;

const Board = ({ issues, boardName, total_issues_count }) => {
  const [selectedIssueId, setSelectedIssueId] = useState(false);

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
      <div className="p-2 mt-2 overflow-y-scroll">
        {issueArray && (
          <>
            {issueArray.map(issue => (
              <Task
                issue={issue}
                key={issue.id}
                setSelectedId={setSelectedIssueId}
              />
            ))}
            {selectedIssueId && (
              <TaskDrawer
                issueId={selectedIssueId}
                open={selectedIssueId}
                onClose={() => setSelectedIssueId(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
