import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  adminId = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 🔑 AUTO REDIRECT IF TOKEN EXISTS
  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit() {
    if (!this.adminId || !this.password) {
      alert('Enter admin credentials');
      return;
    }

    const payload = {
      adminId: this.adminId,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:5000/api/admin/login',
      payload
    ).subscribe({
      next: (res) => {
        localStorage.setItem('adminToken', res.token);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      }
    });
  }
}
