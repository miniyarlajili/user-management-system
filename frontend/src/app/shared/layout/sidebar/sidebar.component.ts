import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="sidebar">
      <div class="sidebar-brand">
        <i class="bi bi-shield-lock"></i>
        <span>UserAdmin</span>
      </div>

      <div class="sidebar-role-badge">{{ role }}</div>

      <ul class="sidebar-nav">

        <!-- Tous -->
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <i class="bi bi-speedometer2"></i> Dashboard
          </a>
        </li>

        <!-- ADMIN + MODERATEUR -->
        <li *ngIf="isAdmin || isMod">
          <a routerLink="/users" routerLinkActive="active">
            <i class="bi bi-people"></i> Utilisateurs
          </a>
        </li>

        <!-- ADMIN seulement -->
        <li *ngIf="isAdmin">
          <a routerLink="/roles" routerLinkActive="active">
            <i class="bi bi-shield"></i> Rôles
          </a>
        </li>

        <!-- ADMIN seulement ← جديد -->
        <li *ngIf="isAdmin">
          <a routerLink="/permissions" routerLinkActive="active">
            <i class="bi bi-key"></i> Permissions
          </a>
        </li>

        <!-- ADMIN + MODERATEUR -->
        <li *ngIf="isAdmin || isMod">
          <a routerLink="/audit" routerLinkActive="active">
            <i class="bi bi-clock-history"></i> Historique
          </a>
        </li>

      </ul>

      <!-- Logout en bas -->
      <div class="sidebar-footer">
        <a (click)="logout()" class="logout-btn">
          <i class="bi bi-box-arrow-right"></i> Déconnexion
        </a>
      </div>

    </nav>
  `,
  styles: [`
    .sidebar {
      width: 220px; height: 100vh; background: #0C447C;
      position: fixed; top: 60px; left: 0; padding: 1rem 0;
      display: flex; flex-direction: column;
    }
    .sidebar-brand {
      color: #fff; font-size: 16px; font-weight: 600;
      padding: 0.5rem 1.5rem 1rem;
      display: flex; align-items: center; gap: 8px;
    }
    .sidebar-role-badge {
      font-size: 10px; color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.1);
      margin: 0 1rem 1rem; padding: 4px 10px;
      border-radius: 20px; text-align: center;
      letter-spacing: 0.5px;
    }
    .sidebar-nav {
      list-style: none; padding: 0; margin: 0; flex: 1;
    }
    .sidebar-nav a {
      display: flex; align-items: center; gap: 10px;
      color: rgba(255,255,255,0.65); padding: 10px 1.5rem;
      text-decoration: none; font-size: 14px; transition: all .2s;
    }
    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background: rgba(255,255,255,0.12); color: #fff;
    }
    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .logout-btn {
      display: flex; align-items: center; gap: 10px;
      color: rgba(255,255,255,0.65); padding: 8px 0.5rem;
      font-size: 14px; cursor: pointer;
      border-radius: 7px; transition: all .2s;
      &:hover { background: rgba(255,255,255,0.12); color: #fff; }
    }
  `]
})
export class SidebarComponent implements OnInit {
  role = '';
  isAdmin = false;
  isMod = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.role = user?.role || '';
    this.isAdmin = this.role === 'ADMIN';
    this.isMod = this.role === 'MODERATEUR';
  }

  logout() {
    this.authService.logout();
  }
}
