import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { RoleService } from '../../core/services/role.service';
import { AuditService } from '../../core/services/audit.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalRoles = 0;
  activeUsers = 0;
  recentAudits: any[] = [];
  currentUser: any;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private auditService: AuditService,
    private authService: AuthService
  ) {}
getBadgeClass(action: string): string {
  const map: any = {
    'LOGIN': 'badge-login',
    'CREATE_USER': 'badge-create',
    'UPDATE_USER': 'badge-update',
    'DELETE_USER': 'badge-delete',
    'LOGOUT': 'badge-logout'
  };
  return map[action] || 'badge-default';
}
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    this.userService.getAll().subscribe(users => {
      this.totalUsers = users.length;
      this.activeUsers = users.filter(u => u.actif).length;
    });

    this.roleService.getAll().subscribe(roles => {
      this.totalRoles = roles.length;
    });

    this.auditService.getAll().subscribe(audits => {
      this.recentAudits = audits.slice(-5).reverse();
    });
  }
}
