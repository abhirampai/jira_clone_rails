import React from "react";

import { Typography, Avatar, Tooltip } from "antd";
import { PRIORITY_ICONS, ISSUE_TYPE_ICONS } from "common";
import { capitalize } from "utils";

const { Paragraph } = Typography;

const noop = () => {};

const Task = ({ issue, setSelectedId = noop }) => {
  const { summary, priority, issue_type } = issue;
  const PriorityIcon = PRIORITY_ICONS[priority];
  const IssueTypeIcon = ISSUE_TYPE_ICONS[issue_type];

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
          <Tooltip placement="bottom" title={capitalize(issue_type)}>
            <IssueTypeIcon className="text-lg" />
          </Tooltip>
          <Tooltip placement="bottom" title={capitalize(priority)}>
            <PriorityIcon className="text-lg" />
          </Tooltip>
        </div>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
      </div>
    </div>
  );
};

export default Task;
