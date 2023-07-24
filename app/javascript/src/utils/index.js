import { either, isEmpty, isNil, not, pipe } from "ramda";

export const findIssues = (board, issues) =>
  issues.find(issue => issue.board === board);

export const capitalize = label => label[0].toUpperCase() + label.slice(1);

export const createOptions = (labels, icon) =>
  labels.map((label, index) => ({
    label: capitalize(label),
    value: index,
    icon: icon[label],
  }));

export const isPresent = pipe(either(isNil, isEmpty), not);
