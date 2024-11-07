export const REPORT_BUG = "REPORT_BUG";

export const reportBug = (bug) => {
  return {
    type: REPORT_BUG,
    payload: bug,
  };
};
