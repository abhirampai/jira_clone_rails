import React from "react";

import {
  BookTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
  BugTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Typography, Avatar } from "antd";

const { Paragraph } = Typography;

const priorityIcons = {
  high: ArrowUpOutlined,
  low: ArrowDownOutlined,
  medium: LineOutlined,
};

const issueTypeIcons = {
  story: BookTwoTone,
  bug: BugTwoTone,
  task: CheckCircleTwoTone,
};

const Task = ({ issue, setSelectedId }) => {
  const { summary, priority, issue_type } = issue;
  const PriorityIcon = priorityIcons[priority];
  const IssueTypeIcon = issueTypeIcons[issue_type];

  const handleOnDrag = (e, issue) => {
    e.dataTransfer.setData("draggedIssue", JSON.stringify(issue));
  };

  return (
    <div
      draggable
      className="bg-white p-2 hover:border-gray-500 border"
      onClick={() => setSelectedId(issue.id)}
      onDragStart={e => handleOnDrag(e, issue)}
    >
      <Paragraph className="mb-8" ellipsis={{ rows: 2, expandable: false }}>
        {summary}
      </Paragraph>
      <div className="flex py-2 justify-between items-center">
        <div className="flex space-x-2 items-center">
          <IssueTypeIcon className="text-lg" />
          <PriorityIcon className="text-lg" />
        </div>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
      </div>
    </div>
  );
};

export default Task;
