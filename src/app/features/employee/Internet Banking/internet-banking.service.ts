import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../../globals/common.service';
import { EnableInternetBankingRequest } from '../../../models/request/internet-banking/internet-banking.model';
import { InternetBankingResponse } from '../../../models/response/internet-banking/internet-banking.model';
import { Customer_url } from '../../../globals/global_api';

@Injectable({
  providedIn: 'root',
})
export class InternetBankingService {
  constructor(private commonService: CommonService) {}

  enableInternetBanking(
    request: EnableInternetBankingRequest,
  ): Observable<InternetBankingResponse> {
    return this.commonService.post<InternetBankingResponse>(
      Customer_url.enableinternetbanking,
      request,
    );
  }
}
