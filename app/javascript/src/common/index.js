import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
  BookTwoTone,
  BugTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const PRIORITY_ICONS = {
  high: ArrowUpOutlined,
  low: ArrowDownOutlined,
  medium: LineOutlined,
};

const ISSUE_TYPE_ICONS = {
  story: BookTwoTone,
  bug: BugTwoTone,
  task: CheckCircleTwoTone,
};

export { PRIORITY_ICONS, ISSUE_TYPE_ICONS };
