import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService } from '../../../core/services/permission.service';
import { RoleService } from '../../../core/services/role.service';
import { Permission } from '../../../core/models/permission.model';
import { Role } from '../../../core/models/role.model';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {

  permissions: Permission[] = [];
  roles: Role[] = [];
  showForm = false;
  error = '';
  success = '';

  newPermission: Permission = { nom: '', description: '' };

  // لربط permission بـ role
  selectedRoleId: number | null = null;
  selectedPermissionId: number | null = null;

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.loadPermissions();
    this.loadRoles();
  }

  loadPermissions() {
    this.permissionService.getAll().subscribe(p => {
      this.permissions = p;
    });
  }

  loadRoles() {
    this.roleService.getAll().subscribe(r => {
      this.roles = r;
    });
  }

  create() {
    if (!this.newPermission.nom) {
      this.error = 'Nom requis';
      return;
    }
    this.permissionService.create(this.newPermission).subscribe({
      next: () => {
        this.newPermission = { nom: '', description: '' };
        this.showForm = false;
        this.error = '';
        this.success = 'Permission créée avec succès';
        this.loadPermissions();
        setTimeout(() => this.success = '', 3000);
      },
      error: () => this.error = 'Erreur lors de la création'
    });
  }

  delete(id: number) {
    if (confirm('Supprimer cette permission ?')) {
      this.permissionService.delete(id).subscribe(() => {
        this.success = 'Permission supprimée';
        this.loadPermissions();
        setTimeout(() => this.success = '', 3000);
      });
    }
  }

  addToRole() {
    if (!this.selectedRoleId || !this.selectedPermissionId) {
      this.error = 'Sélectionnez un rôle et une permission';
      return;
    }
    this.permissionService.addToRole(
      this.selectedRoleId,
      this.selectedPermissionId
    ).subscribe({
      next: () => {
        this.success = 'Permission ajoutée au rôle avec succès';
        this.error = '';
        this.loadRoles();
        setTimeout(() => this.success = '', 3000);
      },
      error: () => this.error = 'Erreur lors de l\'ajout'
    });
  }
}
