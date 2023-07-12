import { create } from "zustand";

const useIssueStore = create(set => ({
  issueId: null,
  setIssueId: id => set(state => ({ ...state, issueId: id })),
}));

export default useIssueStore;
