import { Injectable } from '@angular/core';
import { CommonService } from '../../../../globals/common.service';
import { DepositRequest } from '../../../../models/request/transaction/deposit.request';
import { Account_url, Transaction_url } from '../../../../globals/global_api';
import { TransactionResponse } from '../../../../models/response/transaction/transaction.response';
import { AccountResponse } from '../../../../models/response/account/account.response';
import { Observable } from 'rxjs';
import { WithdrawRequest } from '../../../../models/request/transaction/withdraw.request';
import { TransferRequest } from '../../../../models/request/transaction/transfer.request';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private commonService: CommonService) {}

  deposit(request: DepositRequest) {
    return this.commonService.post<TransactionResponse>(Transaction_url.deposit, request);
  }

  Withdraw(request:WithdrawRequest){
    return this.commonService.post<TransactionResponse>(Transaction_url.withdraw,request);
  }
  transfer(request:TransferRequest){
    return this.commonService.post<TransactionResponse>(Transaction_url.transfer,request);
  }

  getAllAccounts(): Observable<AccountResponse[]> {
    return this.commonService.get<AccountResponse[]>(Account_url.getAccount);
  }
}
