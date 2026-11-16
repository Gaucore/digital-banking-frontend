import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/header/header';
import { Sidebar } from '../../../shared/sidebar/sidebar';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-employee-layout',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './employee-layout.html',
  styleUrl: './employee-layout.css',
  standalone: true,
})
export class EmployeeLayout {}
