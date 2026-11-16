import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from '../../../globals/common.service';

import { LoginRequest } from '../../../models/request/auth/login.request';

import { LoginResponse } from '../../../models/response/auth/login.response';
import { AuthApi } from '../../../globals/auth.api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private commonService: CommonService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    console.log(request);

    return this.commonService.post<LoginResponse>(AuthApi.login, request);
  }
}
