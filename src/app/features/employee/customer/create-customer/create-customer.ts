import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer';
import { GlobalMessage } from '../../../../globals/global-message';
import { CustomerRequest } from '../../../../models/request/customer/customer.request';
import { CustomerResponse } from '../../../../models/response/customer/customer.response';

@Component({
  selector: 'app-create-customer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-customer.html',
  styleUrl: './create-customer.css',
})
export class CreateCustomer implements OnInit {
  customerForm!: FormGroup;
  isSubmitting = false;
  today:any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private globalMessage: GlobalMessage,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  saveCustomer() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const request: CustomerRequest = this.customerForm.value;

    console.log(this.customerForm.value);
    this.customerService.createCustomer(request).subscribe({
      next: (response: CustomerResponse) => {
        this.isSubmitting = false;
        this.globalMessage.success('Customer Created Successfully');
        this.today = new Date().toISOString().split('T')[0];
        this.customerForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.error?.message) {
          this.globalMessage.error(error.error.message);
        } else {
          this.globalMessage.error('Unable to create customer.');
        }
      },
    });
  }

  resetForm() {
    this.customerForm.reset();
  }
}
