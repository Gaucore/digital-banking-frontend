import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanDashboardResponse } from '../../../../models/response/loan/loan-dashboard.model';
import { CommonService } from '../../../../globals/common.service';
import { Loan_url } from '../../../../globals/global_api';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private commonService: CommonService) {}

  getDashboard(): Observable<LoanDashboardResponse> {
    return this.commonService.get<LoanDashboardResponse>(Loan_url.dashboard);
  }
}
