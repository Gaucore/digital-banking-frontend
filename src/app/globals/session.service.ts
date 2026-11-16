import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly TOKEN = 'token';
  private readonly USERNAME = 'username';
  private readonly ROLE = 'role';

  constructor() {}

  saveSession(token: string, username: string, role: string): void {
    sessionStorage.setItem(this.TOKEN, token);
    sessionStorage.setItem(this.USERNAME, username);
    sessionStorage.setItem(this.ROLE, role);
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN) ?? '';
  }

  getUsername(): string {
    return sessionStorage.getItem(this.USERNAME) ?? '';
  }

  getRole(): string {
    return sessionStorage.getItem(this.ROLE) ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  clearSession(): void {
    sessionStorage.clear();
  }
}
