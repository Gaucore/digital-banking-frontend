import { Injectable } from '@angular/core';
import { CommonService } from '../../../../globals/common.service';
import { CustomerRequest } from '../../../../models/request/customer/customer.request';
import { CustomerResponse } from '../../../../models/response/customer/customer.response';
import { Observable } from 'rxjs';
import { Customer_url } from '../../../../globals/global_api';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private commonService: CommonService) {}

  createCustomer(request: CustomerRequest): Observable<CustomerResponse> {
    return this.commonService.post<CustomerResponse>(Customer_url.createCustomer, request);
  }

  getAllCustomers(): Observable<CustomerResponse[]> {
    return this.commonService.get<CustomerResponse[]>(Customer_url.getCustomers);
  }
}
