import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer/services/customer';
import { InternetBankingService } from './internet-banking.service';
import { CustomerResponse } from '../../../models/response/customer/customer.response';
import { GlobalMessage } from '../../../globals/global-message';
import { EnableInternetBankingRequest } from '../../../models/request/internet-banking/internet-banking.model';
import { InternetBankingResponse } from '../../../models/response/internet-banking/internet-banking.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-internet-banking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './internet-banking.html',
  styleUrls: ['./internet-banking.css'],
})
export class InternetBanking implements OnInit {
  internetBankingForm!: FormGroup;
  customerList: CustomerResponse[] = [];
  submitted = false;
  loading = false;

  constructor(
    private formbuilder: FormBuilder,
    private customerService: CustomerService,
    private internetBankingService: InternetBankingService,
    private router: Router,
    private globalMessage: GlobalMessage,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCustomers();
  }

  createForm() {
    this.internetBankingForm = this.formbuilder.group(
      {
        customerId: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordValidator,
      },
    );
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;

    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return {
        passwordMismatch: true,
      };
    }
    return null;
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customerList = response;
      },
      error: (error) => {
        this.globalMessage.error(error.error.message);
      },
    });
  }

  enableInternetBanking() {
    this.submitted = true;
    if (this.internetBankingForm.invalid) {
      return;
    }
    this.loading = true;
    const request: EnableInternetBankingRequest = {
      customerId: Number(this.internetBankingForm.value.customerId),
      username: this.internetBankingForm.value.username,
      password: this.internetBankingForm.value.password,
    };

    this.internetBankingService.enableInternetBanking(request).subscribe({
      next: (response: InternetBankingResponse) => {
        this.loading = false;
        // alert(response.message);
        this.globalMessage.success(response.message);
        this.internetBankingForm.reset();
        this.submitted = false;
      },

      error: (error) => {
        this.loading = false;
        // alert(error.error.message);
        this.globalMessage.error(error.error.message);
      },
    });
  }
}
