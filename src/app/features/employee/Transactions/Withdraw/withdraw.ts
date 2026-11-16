import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { GlobalMessage } from '../../../../globals/global-message';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './withdraw.html',
  styleUrl: './withdraw.css',
})
export class Withdraw implements OnInit {
  withdrawForm!: FormGroup;
  accountList: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private globalMessage: GlobalMessage,
  ) {}

  ngOnInit() {
    this.withdrawForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: ['', Validators.required],
      remarks: ['Cash Withdraw'],
    });

    this.loadAccounts();
  }

  loadAccounts() {
    // call API here
    this.transactionService.getAllAccounts().subscribe({
      next: (response) => {
        this.accountList = response;
      },
      error: (error) => {
        this.globalMessage.error(error.error.message);
      },
    });
  }

  save() {
    if (this.withdrawForm.invalid) {
      this.withdrawForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.transactionService.Withdraw(this.withdrawForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.globalMessage.success('Amount Withdraw Successfully.');
        console.log(response);

        this.withdrawForm.reset({
          remark: 'Cash Withdraw',
        });
      },
      error: (error) => {
        this.loading = false;
        this.globalMessage.error(error.error.message);
      },
    });

    console.log(this.withdrawForm.value);
  }
}
