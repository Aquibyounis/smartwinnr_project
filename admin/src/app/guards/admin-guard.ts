import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('adminToken');

    if (token) {
      return true; // allow access
    }

    // no token → redirect to login
    this.router.navigate(['/admin/login']);
    return false;
  }
}
