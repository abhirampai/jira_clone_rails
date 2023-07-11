import React from "react";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

const HeaderBar = ({ openModal }) => (
  <div className="flex justify-between w-full p-5">
    <Button className="items-center flex" icon={<SearchOutlined />}>
      Search Issues
    </Button>
    <Button
      className="items-center flex"
      icon={<PlusOutlined />}
      type="primary"
      onClick={openModal}
    >
      Create Issue
    </Button>
  </div>
);

export default HeaderBar;
