import React from "react";

import { Modal, Input } from "antd";

const { Search } = Input;

const SearchModal = ({ open, onClose }) => {
  const onSearch = () => {
    // console.log(value);
  };

  return (
    <Modal
      closable
      footer={null}
      open={open}
      title="Search issue"
      onCancel={onClose}
    >
      <Search allowClear placeholder="input search text" onSearch={onSearch} />
    </Modal>
  );
};

export default SearchModal;
