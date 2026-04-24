import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <span class="navbar-brand">
        <i class="bi bi-shield-lock-fill"></i> User Management
      </span>
      <div class="navbar-right">
        <span class="user-info">
          <i class="bi bi-person-circle"></i>
          {{ currentUser?.email }}
        </span>
        <span class="role-badge">{{ currentUser?.role }}</span>
        <button class="btn-logout" (click)="logout()">
          <i class="bi bi-box-arrow-right"></i> Déconnexion
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      height: 60px; background: #fff;
      border-bottom: 1px solid #e9ecef;
      display: flex; align-items: center;
      justify-content: space-between; padding: 0 1.5rem;
    }
    .navbar-brand {
      font-weight: 600; color: #0C447C; font-size: 16px;
    }
    .navbar-right {
      display: flex; align-items: center; gap: 12px;
    }
    .user-info { font-size: 13px; color: #666; }
    .role-badge {
      background: #e3f0fb; color: #0C447C;
      padding: 2px 10px; border-radius: 20px; font-size: 12px;
    }
    .btn-logout {
      background: transparent; border: 1px solid #dee2e6;
      padding: 5px 12px; border-radius: 6px;
      font-size: 13px; cursor: pointer; color: #dc3545;
    }
    .btn-logout:hover { background: #fff5f5; }
  `]
})
export class NavbarComponent {
  currentUser = this.authService.getCurrentUser();
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); }
}
