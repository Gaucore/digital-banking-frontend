export interface LoanDashboardResponse {
  totalLoans: number;
  pendingLoans: number;
  approvedLoans: number;
  rejectedLoans: number;
  disbursedLoans: number;
  closedLoans: number;
  totalRequestedAmount: number;
  totalApprovedAmount: number;
  totalDisbursedAmount: number;
  outstandingAmount: number;
}

export interface PendingLoanResponse {
  loanId: number;
  loanNumber: string;
  customerCode: string;
  customerName: string;
  loanType: string;
  requestedAmount: number;
  interestRate: number;
  tenure: number;
  branch: string;
  appliedDate: string;
  status: string;
}
