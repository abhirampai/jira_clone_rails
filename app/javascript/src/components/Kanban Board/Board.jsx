import React from "react";

import { Typography } from "antd";

import Task from "./Task";

const { Title, Paragraph } = Typography;

const Board = () => {
  const count = 1;
  const total = 1;

  return (
    <div className="bg-gray-200">
      <div className="flex justify-between p-4">
        <Title level={4}>Column name</Title>
        <Paragraph>
          ({count} of {total})
        </Paragraph>
      </div>
      <div className="p-2 mt-2 overflow-y-scroll">
        <Task />
      </div>
    </div>
  );
};

export default Board;
