import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../../globals/common.service';
import { EmployeeProfileResponse } from '../../../models/response/profile/employee.model';
import { Employee_url } from '../../../globals/global_api';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private commonService: CommonService) {}

 
  getProfile(): Observable<EmployeeProfileResponse> {
    return this.commonService.get<EmployeeProfileResponse>(Employee_url.profile);
  }

  
}
