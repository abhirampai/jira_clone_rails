export const findIssues = (board, issues) =>
  issues.find(issue => issue.board === board);

export const createOptions = (labels, icon) =>
  labels.map((label, index) => ({
    label: label[0].toUpperCase() + label.slice(1),
    value: index,
    icon: icon[label],
  }));
