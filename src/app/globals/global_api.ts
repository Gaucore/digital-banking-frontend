import { environment } from '../Environment/environment';
const API_URL = environment.API_URL;

const Customer_base_url = `${API_URL}/api/customers`;
const Account_base_url = `${API_URL}/api/accounts`;
const Transaction_base_url = `${API_URL}/api/transactions`;
const Employee_base_url = `${API_URL}/api/employees`;
const Loan_base_url = `${API_URL}/api/employee/loans`;

export const Customer_url = {
  createCustomer: `${Customer_base_url}`,
  getCustomers: `${Customer_base_url}`,
  enableinternetbanking: `${Customer_base_url}/enable-internet-banking`,
};

export const Account_url = {
  openAccount: `${Account_base_url}`,
  getAccount: `${Account_base_url}`,
};

export const Transaction_url = {
  deposit: `${Transaction_base_url}/deposit`,
  withdraw: `${Transaction_base_url}/withdraw`,
  transfer: `${Transaction_base_url}/transfer`,
};

export const Employee_url = {
  profile: `${Employee_base_url}/profile`,
};

export const Loan_url = {
  dashboard: `${Loan_base_url}/dashboard`,
};
