import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { GlobalMessage } from '../../../../globals/global-message';
import { AccountResponse } from '../../../../models/response/account/account.response';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css',
})
export class Transfer implements OnInit {
  transferForm!: FormGroup;
  accountList:AccountResponse[]=[];

  constructor(
    private formbuilder: FormBuilder,
    private globalMessage: GlobalMessage,
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadAccounts();
  }

  createForm() {
    this.transferForm = this.formbuilder.group({
      fromAccountNumber: ['', Validators.required],
      toAccountNumber: ['', Validators.required],
      amount: ['', Validators.required],
      remarks: ['', Validators.required],
    });
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
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    if (this.transferForm.value.fromAccountNumber === this.transferForm.value.toAccountNumber) {
      this.globalMessage.error('Source and Destination account cannot be same.');

      return;
    }

    this.transactionService.transfer(this.transferForm.value).subscribe({
      next: () => {
        this.globalMessage.success('Amount transferred successfully.');

        this.transferForm.reset({
          remarks: 'Fund Transfer',
        });
      },
    });
  }
}
