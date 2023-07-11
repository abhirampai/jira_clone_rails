import React from "react";

import {
  BookTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
  BugTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Input, Typography, Form, Select, Button, Divider } from "antd";

import { createOptions } from "components/utils";
import { useUpdateIssue } from "hooks/useIssues";

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

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const priorityOptions = createOptions(["medium", "low", "high"], priorityIcons);

const issueTypeOptions = createOptions(
  ["task", "bug", "story"],
  issueTypeIcons
);

const TaskForm = ({ issue, onClose }) => {
  const [form] = Form.useForm();
  const { summary, description, priority, issue_type } = issue;
  const { mutateAsync: updateIssue } = useUpdateIssue();

  const findDefaultValue = (value, list) =>
    list.find(({ label }) => label.toLowerCase() === value).value;

  const onSubmit = async values => {
    await updateIssue(
      { id: issue.id, payload: values },
      { onSuccess: onClose() }
    );
  };

  const intialValues = {
    summary,
    description,
    priority: findDefaultValue(priority, priorityOptions),
    issue_type: findDefaultValue(issue_type, issueTypeOptions),
  };

  return (
    <Form
      form={form}
      initialValues={intialValues}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item label="Summary" name="summary">
        <Input value={summary} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={3} value={description} />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select placeholder="select priority" style={{ width: "100%" }}>
          {priorityOptions.map(({ value, label, icon: Icon }) => (
            <Option key={value} label={label} value={value}>
              <div className="flex items-center space-x-2 pt-1">
                <Icon />
                <Text>{label}</Text>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Type" name="issue_type">
        <Select placeholder="select type" style={{ width: "100%" }}>
          {issueTypeOptions.map(({ value, label, icon: Icon }) => (
            <Option key={value} label={label} value={value}>
              <div className="flex items-center space-x-2 pt-1">
                <Icon />
                <Text>{label}</Text>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="absolute bottom-0 left-0 w-full">
        <Divider style={{ width: "100%" }} />
        <Form.Item>
          <div className="flex space-x-4 justify-end pr-5">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button htmlType="button" onClick={onClose}>
              Close
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default TaskForm;
