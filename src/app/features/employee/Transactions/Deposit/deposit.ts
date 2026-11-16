import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { GlobalMessage } from '../../../../globals/global-message';
import { AccountResponse } from '../../../../models/response/account/account.response';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deposit.html',
  styleUrl: './deposit.css',
})
export class Deposit implements OnInit {
  depositForm!: FormGroup;
  loading = false;
  accountList: AccountResponse[] = [];
  constructor(
    private formbuild: FormBuilder,
    private transactionService: TransactionService,
    private globalMessage: GlobalMessage,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAccounts();
  }

  createForm() {
    this.depositForm = this.formbuild.group({
      accountNumber: ['', Validators.required],
      amount: ['', Validators.required],
      remarks: ['Cash Deposit'],
    });
  }

  getAccounts() {
    this.transactionService.getAllAccounts().subscribe({
      next: (response) => {
        this.accountList = response;
      },
      error: (error) => {
        this.globalMessage.error('Unable to load customers.');
      },
    });
  }

  save() {
    if (this.depositForm.invalid) {
      this.depositForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.transactionService.deposit(this.depositForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.globalMessage.success('Amount Deposit Successfully.');
        console.log(response);

        this.depositForm.reset({
          remark: 'Cash Deposit',
        });
      },
      error: (error) => {
        this.loading = false;
        if (error.error?.message) {
          this.globalMessage.error(error.error.message);
        } else {
          this.globalMessage.error('Unable to deposit amount.');
        }
      },
    });
  }
}
