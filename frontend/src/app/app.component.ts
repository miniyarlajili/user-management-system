import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule],
  template: `
    <div *ngIf="authService.isLoggedIn$ | async; else loginPage">
      <app-navbar></app-navbar>
      <div class="d-flex">
        <app-sidebar></app-sidebar>
        <main class="main-content p-4 flex-grow-1">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
    <ng-template #loginPage>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .main-content {
      min-height: 100vh;
      background: #f8f9fa;
      margin-left: 220px;
      margin-top: 60px;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
