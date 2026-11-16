import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { EmployeeProfileResponse } from '../../../models/response/profile/employee.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  employee: EmployeeProfileResponse = {
    id: 0,
    employeeCode: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    designation: '',
    branch: '',
    joiningDate: '',
    salary: 0,
    address: '',
    username: '',
    role: '',
    status: '',
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (response: EmployeeProfileResponse) => {
        console.log('Profile Response', response);
        this.employee = response;
      },
      error: (err) => {
        console.error('Profile Error', err);
      },
    });
  }
}
