import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

import { LoanService } from '../service/loan.service';
import { LoanDashboardResponse, PendingLoanResponse } from '../../../../models/response/loan/loan-dashboard.model';

import { Chart, registerables } from 'chart.js';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

Chart.register(...registerables);

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-loan-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe,AgGridAngular],
  templateUrl: './loan-dashboard.html',
  styleUrls: ['./loan-dashboard.css'],
})
export class LoanDashboard implements OnInit {
  dashboard!: LoanDashboardResponse;
  loading: boolean = false;
  errorMessage: string = '';
  amountChart!: Chart;
  statusChart!: Chart;
  gridApi!: GridApi;
  pendingLoanApplications: PendingLoanResponse[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    this.loanService.getDashboard().subscribe({
      next: (response: LoanDashboardResponse) => {
        this.dashboard = {
          ...response,
          rejectedLoans: response.rejectedLoans ?? 0,
        };

         this.dashboard=response;

        //   this.pendingLoanApplications =  response.pendingLoanApplications;


        this.createCharts();
        this.loading = false;
        console.log('Loan Dashboard', this.dashboard);
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load dashboard.';
        this.loading = false;
      },
    });
  }

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    animateRows: true,
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'Loan No',
      field: 'loanNumber',
    },
    {
      headerName: 'Customer',
      field: 'customerName',
    },
    {
      headerName: 'Loan Type',
      field: 'loanType',
    },
    {
      headerName: 'Amount',
      field: 'requestedAmount',
    },
    {
      headerName: 'Interest %',
      field: 'interestRate',
    },
    {
      headerName: 'Tenure',
      field: 'tenure',
    },
    {
      headerName: 'Branch',
      field: 'branch',
    },
    {
      headerName: 'Status',
      field: 'status',
    },
  ];

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }

  createCharts(): void {
    if (this.amountChart) {
      this.amountChart.destroy();
    }

    if (this.statusChart) {
      this.statusChart.destroy();
    }

    this.amountChart = new Chart('amountChart', {
      type: 'bar',
      data: {
        labels: ['Requested', 'Approved', 'Disbursed', 'Outstanding'],
        datasets: [
          {
            label: 'Loan Amount',
            data: [
              this.dashboard.totalRequestedAmount,
              this.dashboard.totalApprovedAmount,
              this.dashboard.totalDisbursedAmount,
              this.dashboard.outstandingAmount,
            ],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    this.statusChart = new Chart('statusChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Approved', 'Rejected', 'Disbursed', 'Closed'],
        datasets: [
          {
            data: [
              this.dashboard.pendingLoans,
              this.dashboard.approvedLoans,
              this.dashboard.rejectedLoans,
              this.dashboard.disbursedLoans,
              this.dashboard.closedLoans,
            ],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  refreshDashboard(): void {
    this.loadDashboard();
  }
}
