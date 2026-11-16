import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../../globals/session.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header implements OnInit {
  username: string = '';

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.username = this.sessionService.getUsername();
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}
