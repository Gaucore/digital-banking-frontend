export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  remarks: string;
}