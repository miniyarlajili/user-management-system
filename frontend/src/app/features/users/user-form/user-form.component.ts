import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/role.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  isEdit = false;
  userId: number | null = null;
  roles: Role[] = [];
  loading = false;
  error = '';
  success = '';

  user = {
    nom: '',
    email: '',
    motDePasse: '',
    roleId: null as number | null,
    actif: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(r => this.roles = r);

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEdit = true;
      this.userService.getById(this.userId).subscribe(u => {
        this.user.nom = u.nom;
        this.user.email = u.email;
        this.user.actif = u.actif;
      });
    }
  }

  save() {
    this.loading = true;
    this.error = '';

    if (!this.user.nom || !this.user.email || !this.user.roleId) {
      this.error = 'Veuillez remplir tous les champs obligatoires';
      this.loading = false;
      return;
    }

    const payload: any = { ...this.user };

    if (this.isEdit) {
      this.userService.update(this.userId!, payload).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (e) => {
          this.error = e.error?.error || 'Erreur lors de la modification';
          this.loading = false;
        }
      });
    } else {
      this.userService.create(payload).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (e) => {
          this.error = e.error?.error || 'Erreur lors de la création';
          this.loading = false;
        }
      });
    }
  }
}
