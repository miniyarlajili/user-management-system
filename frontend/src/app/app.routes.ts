import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard, adminOrModGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/user-list/user-list.component')
        .then(m => m.UserListComponent),
    canActivate: [authGuard, adminOrModGuard]
  },

  {
    path: 'users/new',
    loadComponent: () =>
      import('./features/users/user-form/user-form.component')
        .then(m => m.UserFormComponent),
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'users/edit/:id',
    loadComponent: () =>
      import('./features/users/user-form/user-form.component')
        .then(m => m.UserFormComponent),
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'roles',
    loadComponent: () =>
      import('./features/roles/role-list/role-list.component')
        .then(m => m.RoleListComponent),
    canActivate: [authGuard, adminGuard]
  },

  // ✅ زيد هذا
  {
    path: 'permissions',
    loadComponent: () =>
      import('./features/permissions/permission-list/permission-list.component')
        .then(m => m.PermissionListComponent),
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'audit',
    loadComponent: () =>
      import('./features/audit/audit-list/audit-list.component')
        .then(m => m.AuditListComponent),
    canActivate: [authGuard, adminOrModGuard]
  },

  { path: '**', redirectTo: 'dashboard' }
];
