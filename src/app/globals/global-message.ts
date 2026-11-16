import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessage {
  constructor() {}

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  private show(message: string, icon: SweetAlertIcon): void {
    Swal.fire({
      icon: icon,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#0d6efd',
    });
  }

  confirm(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
    });
  }
}
