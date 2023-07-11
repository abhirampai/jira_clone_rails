import React from "react";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

const HeaderBar = ({ openSearchModal, openCreateIssueModal }) => (
  <div className="flex justify-between w-full p-5">
    <Button
      className="items-center flex"
      icon={<SearchOutlined />}
      onClick={openSearchModal}
    >
      Search Issues
    </Button>
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
