import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/role.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  showForm = false;
  newRole: Role = { nom: '', description: '' };
  error = '';

  constructor(private roleService: RoleService) {}

  ngOnInit() { this.load(); }

  load() {
    this.roleService.getAll().subscribe(r => this.roles = r);
  }

  create() {
    if (!this.newRole.nom) {
      this.error = 'Nom requis';
      return;
    }
    this.roleService.create(this.newRole).subscribe({
      next: () => {
        this.newRole = { nom: '', description: '' };
        this.showForm = false;
        this.error = '';
        this.load();
      },
      error: () => this.error = 'Erreur lors de la création'
    });
  }

  delete(id: number) {
    if (confirm('Supprimer ce rôle ?')) {
      this.roleService.delete(id).subscribe(() => this.load());
    }
  }
}
