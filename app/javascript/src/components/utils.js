export const findIssues = (board, issues) =>
  issues.find(issue => issue.board === board);
