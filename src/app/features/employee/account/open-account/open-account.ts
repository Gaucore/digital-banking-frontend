import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalMessage } from '../../../../globals/global-message';
import { CustomerRequest } from '../../../../models/request/customer/customer.request';
import { CustomerResponse } from '../../../../models/response/customer/customer.response';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../../customer/services/customer';

@Component({
  selector: 'app-open-account',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './open-account.html',
  styleUrl: './open-account.css',
})
export class OpenAccount implements OnInit {
  accountForm!: FormGroup;
  loading = false;

  customerList: CustomerResponse[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    private globalMessage: GlobalMessage,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCustomers();
  }

  createForm() {
    this.accountForm = this.formbuilder.group({
      customerCode: ['', Validators.required],
      accountType: ['', Validators.required],
    });
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customerList = response;
      },
      error: () => {
        this.globalMessage.error('Unable to load customers.');
      },
    });
  }

  save() {
    if (this.accountForm.invalid) {
      this.accountForm.markAsTouched();
      return;
    }
    this.loading = true;

    

    this.accountService.openAccount(this.accountForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.globalMessage.success('Account Opened Successfully');
        this.accountForm.reset();
      },
      error: (error) => {
        this.loading = false;
        if (error.error?.message) {
          this.globalMessage.error(error.error.message);
        } else {
          this.globalMessage.error('unable to open account.');
        }
      },
    });
  }
}
