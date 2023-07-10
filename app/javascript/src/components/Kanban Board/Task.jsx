import React from "react";

import {
  BookTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
} from "@ant-design/icons";
import { Typography, Avatar } from "antd";

const { Paragraph } = Typography;

const Task = () => {
  const icons = [ArrowUpOutlined, ArrowDownOutlined, LineOutlined];
  const priority = Math.floor(Math.random() * icons.length);
  const PriorityIcon = icons[priority];

  return (
    <div className="bg-white p-2">
      <Paragraph className="mb-8" ellipsis={{ rows: 2, expandable: false }}>
        Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym
        Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym
        Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym
        Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym
        Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym
        Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym Lorem Ipsym
      </Paragraph>
      <div className="flex py-2 justify-between items-center">
        <div className="flex space-x-2 items-center">
          <BookTwoTone className="text-lg" />
          <PriorityIcon className="text-lg" />
        </div>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
      </div>
    </div>
  );
};

export default Task;
