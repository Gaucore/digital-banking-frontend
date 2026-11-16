import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import { GridOptions, ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { CustomerService } from '../services/customer';
import { GlobalMessage } from '../../../../globals/global-message';
import { CustomerResponse } from '../../../../models/response/customer/customer.response';
import { GridApi, GridReadyEvent } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  standalone: true,
})
export class CustomerList implements OnInit {
  customerList: CustomerResponse[] = [];
  gridApi!: GridApi;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private globalMessage: GlobalMessage,
  ) {}

  ngOnInit() {
    this.GetCustomers();
  }

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }

  GetCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (response: CustomerResponse[]) => {
        this.customerList = [...response];
        console.log(this.customerList);
      },
      error: (error) => {
        if (error.error?.message) {
          this.globalMessage.error(error.error.message);
        } else {
          this.globalMessage.error('Unable to load customers.');
        }
      },
    });
  }

  createCustomer(): void {
    this.router.navigate(['/employee/customer/create']);
  }

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    flex: 1,
  };

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowHeight: 48,
    animateRows: true,
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'Customer Code',
      field: 'customerCode',
      minWidth: 150,
    },

    {
      headerName: 'First Name',
      field: 'firstName',
    },

    {
      headerName: 'Last Name',
      field: 'lastName',
    },

    {
      headerName: 'Email',
      field: 'email',
      minWidth: 220,
    },

    {
      headerName: 'Phone',
      field: 'phone',
    },

    {
      headerName: 'Status',
      field: 'status',
    },
  ];
}
