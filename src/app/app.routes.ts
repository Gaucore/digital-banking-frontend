import { Routes } from '@angular/router';
import { Login } from './features/authentication/login/login';
import { Dashboard } from './features/employee/dashboard/dashboard';
import { EmployeeLayout } from './layout/employee/employee-layout/employee-layout';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { CreateCustomer } from './features/employee/customer/create-customer/create-customer';
import { CustomerList } from './features/employee/customer/customer-list/customer-list';
import { OpenAccount } from './features/employee/account/open-account/open-account';
import { Deposit } from './features/employee/Transactions/Deposit/deposit';
import { Withdraw } from './features/employee/Transactions/Withdraw/withdraw';
import { Transfer } from './features/employee/Transactions/Transfer/transfer';
import { InternetBanking } from './features/employee/Internet Banking/internet-banking';
import { Profile } from './features/employee/Profile/profile';
import { LoanDashboard } from './features/employee/loan/dashboard/loan-dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: Login,
  },
  {
    path: 'employee',
    component: EmployeeLayout,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['EMPLOYEE'],
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'customers',
        component: CustomerList,
      },
      {
        path: 'customer/create',
        component: CreateCustomer,
      },
      {
        path: 'transaction/deposit',
        component: Deposit,
      },
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: 'transaction/withdraw',
        component: Withdraw,
      },
      {
        path: 'transaction/transfer',
        component: Transfer,
      },
      {
        path: 'account/open',
        component: OpenAccount,
      },
      {
        path: 'internet-banking',
        component: InternetBanking,
      },
      {
        path: 'loan/dashboard',
        component: LoanDashboard,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
