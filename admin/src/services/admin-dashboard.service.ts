import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {

  private baseUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getTotalUsers() {
    return this.http.get<any>(
      `${this.baseUrl}/total-users`,
      this.authHeaders()
    );
  }

  getTotalSales() {
    return this.http.get<any>(
      `${this.baseUrl}/total-sales`,
      this.authHeaders()
    );
  }

  getSalesStats(type: 'daily' | 'monthly' | 'yearly') {
    return this.http.get<any>(
      `${this.baseUrl}/sales-stats?type=${type}`,
      this.authHeaders()
    );
  }


  getUserSignups() {
    return this.http.get<any>(
      `${this.baseUrl}/user-signups`,
      this.authHeaders()
    );
  }
}
