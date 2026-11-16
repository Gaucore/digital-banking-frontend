export interface TransactionResponse {
  transactionNumber: string;
  transactionType: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  previousBalance: number;
  currentBalance: number;
  remarks: string;
  createdAt: string;
}