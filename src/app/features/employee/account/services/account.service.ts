import { Injectable } from "@angular/core";
import { CommonService } from "../../../../globals/common.service";
import { AccountRequest } from "../../../../models/request/account/account.request";
import { AccountResponse } from "../../../../models/response/account/account.response";
import { Account_url } from "../../../../globals/global_api";

@Injectable({
    providedIn:'root'
})

export class AccountService {

    constructor(private commonService:CommonService){

    }

    openAccount(request:AccountRequest){
        return this.commonService.post<AccountResponse>(Account_url.openAccount,request);
    }
}

