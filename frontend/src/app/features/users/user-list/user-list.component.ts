import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filtered: User[] = [];
  loading = true;
  isAdmin = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.getCurrentUser()?.role === 'ADMIN';

    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  search(event: any) {
    const q = event.target.value.toLowerCase();
    this.filtered = this.users.filter(u =>
      u.nom.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }

  delete(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
        this.filtered = this.filtered.filter(u => u.id !== id);
      });
    }
  }
}
