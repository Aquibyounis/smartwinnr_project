import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {

  totalUsers = 0;
  totalSales = 0;
  activeUsers = 0;

  salesChart!: Chart;
  usersChart!: Chart;

  // ✅ ADD THIS
  selectedSalesView: 'daily' | 'monthly' | 'yearly' = 'monthly';

  constructor(
    private dashboardService: AdminDashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadCharts();
  }

  // ✅ ADD THIS METHOD
  onSalesViewChange(view: 'daily' | 'monthly' | 'yearly') {
    this.selectedSalesView = view;
    this.loadSalesChart();
  }

  loadStats() {
    this.dashboardService.getTotalUsers().subscribe(res => {
      this.totalUsers = res.totalUsers;
      this.activeUsers = Math.floor(this.totalUsers * 0.6);
    });

    this.dashboardService.getTotalSales().subscribe(res => {
      this.totalSales = res.totalSales;
    });
  }

  loadCharts() {
    this.loadSalesChart();
    this.loadUsersChart();
  }

  // ✅ SPLIT LOGIC (clean & safe)
  loadSalesChart() {
    this.dashboardService
      .getSalesStats(this.selectedSalesView)
      .subscribe(res => {

        if (this.salesChart) {
          this.salesChart.destroy();
        }

        let labels: string[] = [];
        let data: number[] = [];

        if (this.selectedSalesView === 'daily') {
          labels = res.stats.map((s: any) => s._id);
          data = res.stats.map((s: any) => s.total);
        }

        if (this.selectedSalesView === 'monthly') {
          labels = res.stats.map(
            (s: any) => `${s._id.month}/${s._id.year}`
          );
          data = res.stats.map((s: any) => s.total);
        }

        if (this.selectedSalesView === 'yearly') {
          labels = res.stats.map((s: any) => s._id.year);
          data = res.stats.map((s: any) => s.total);
        }

        this.salesChart = new Chart('salesChart', {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Sales',
              data,
              borderWidth: 2,
              tension: 0.4
            }]
          }
        });
      });
  }

  loadUsersChart() {
    this.dashboardService.getUserSignups().subscribe(res => {

      if (this.usersChart) {
        this.usersChart.destroy();
      }

      const labels = res.stats.map(
        (s: any) => `${s._id.month}/${s._id.year}`
      );
      const data = res.stats.map((s: any) => s.count);

      this.usersChart = new Chart('usersChart', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'User Signups',
            data,
            borderColor: '#1683D6',
            fill: false
          }]
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin/login']);
  }
}
