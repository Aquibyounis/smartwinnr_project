import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  totalUsers = 0;
  totalSales = 0;
  activeUsers = 0;

  salesChart!: Chart;
  usersChart!: Chart;

  selectedSalesView: 'daily' | 'monthly' | 'yearly' = 'monthly';
  selectedUserView: 'daily' | 'monthly' | 'yearly' = 'monthly';

  // 🔁 AUTO SYNC (BACKGROUND)
  private autoSyncSub!: Subscription;
  private readonly AUTO_SYNC_INTERVAL = 10000; // 10 seconds

  constructor(
    private dashboardService: AdminDashboardService,
    private router: Router
  ) {}

  // =============================
  // INIT
  // =============================
  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      this.router.navigate(['/admin/login']);
      return;
    }

    // Initial load
    this.refreshDashboard();

    // Background auto sync
    this.autoSyncSub = interval(this.AUTO_SYNC_INTERVAL).subscribe(() => {
      this.refreshDashboard();
    });
  }

  // =============================
  // CLEANUP
  // =============================
  ngOnDestroy(): void {
    if (this.autoSyncSub) {
      this.autoSyncSub.unsubscribe();
    }
  }

  // =============================
  // MANUAL SYNC (BUTTON)
  // =============================
  syncNow() {
    this.refreshDashboard();
  }

  // =============================
  // ONE CENTRAL REFRESH
  // =============================
  refreshDashboard() {
    this.loadStats();
    this.loadSalesChart();
    this.loadUsersChart();
  }

  // =============================
  // DROPDOWN HANDLERS
  // =============================
  onSalesViewChange(view: string) {
    if (view === 'daily' || view === 'monthly' || view === 'yearly') {
      this.selectedSalesView = view;
      this.loadSalesChart();
    }
  }

  onUserViewChange(view: string) {
    if (view === 'daily' || view === 'monthly' || view === 'yearly') {
      this.selectedUserView = view;
      this.loadUsersChart();
    }
  }

  // =============================
  // STATS
  // =============================
  loadStats() {
    this.dashboardService.getTotalUsers().subscribe(res => {
      this.totalUsers = res.totalUsers;
      this.activeUsers = Math.floor(this.totalUsers * 0.6);
    });

    this.dashboardService.getTotalSales().subscribe(res => {
      this.totalSales = res.totalSales;
    });
  }

  // =============================
  // SALES CHART
  // =============================
  loadSalesChart() {
    this.dashboardService.getSalesStats(this.selectedSalesView)
      .subscribe(res => {

        if (this.salesChart) this.salesChart.destroy();

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

  // =============================
  // USERS CHART
  // =============================
  loadUsersChart() {
    this.dashboardService.getUserStats(this.selectedUserView)
      .subscribe(res => {

        if (this.usersChart) this.usersChart.destroy();

        let labels: string[] = [];
        let data: number[] = [];

        if (this.selectedUserView === 'daily') {
          labels = res.stats.map((s: any) => s._id);
          data = res.stats.map((s: any) => s.count);
        }

        if (this.selectedUserView === 'monthly') {
          labels = res.stats.map(
            (s: any) => `${s._id.month}/${s._id.year}`
          );
          data = res.stats.map((s: any) => s.count);
        }

        if (this.selectedUserView === 'yearly') {
          labels = res.stats.map((s: any) => s._id.year);
          data = res.stats.map((s: any) => s.count);
        }

        this.usersChart = new Chart('usersChart', {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'User Growth',
              data,
              borderColor: '#1683D6',
              tension: 0.4,
              fill: false,
              pointRadius: 6,
              pointHoverRadius: 8,
              showLine: true
            }]
          }
        });
      });
  }

  // =============================
  // LOGOUT
  // =============================
  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin/login']);
  }
}
