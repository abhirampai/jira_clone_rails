import React from "react";

import { Button } from "antd";

const Footer = ({ onSubmit, onClose, form }) => (
  <div className="flex space-x-4 justify-end pr-5">
    <Button type="primary" onClick={() => onSubmit(form)}>
      Submit
    </Button>
    <Button onClick={onClose}>Close</Button>
  </div>
);

export default Footer;
