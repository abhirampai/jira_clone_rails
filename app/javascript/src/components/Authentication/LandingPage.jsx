import React from "react";

import { ProjectTwoTone } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const LandingPage = ({ children }) => (
  <div className="justify-center items-center flex flex-col w-full h-full">
    <div className="flex space-x-2 items-center">
      <ProjectTwoTone className="text-6xl" />
      <Title className="mb-2">Kanban Board</Title>
    </div>
    {children}
  </div>
);

export default LandingPage;
