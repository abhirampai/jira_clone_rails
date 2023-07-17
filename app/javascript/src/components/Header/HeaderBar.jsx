import React from "react";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

const { Title } = Typography;

const HeaderBar = ({ openSearchModal, openCreateIssueModal }) => (
  <div className="flex justify-between w-full p-5">
    <Button
      className="items-center flex"
      icon={<SearchOutlined />}
      onClick={openSearchModal}
    >
      Search Issues
    </Button>
    <Title level={3}>Kanban board</Title>
    <Button
      className="items-center flex"
      icon={<PlusOutlined />}
      type="primary"
      onClick={openCreateIssueModal}
    >
      Create Issue
    </Button>
  </div>
);

export default HeaderBar;
