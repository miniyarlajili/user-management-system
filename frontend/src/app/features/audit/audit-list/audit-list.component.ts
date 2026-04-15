import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuditService } from '../../../core/services/audit.service';
import { Audit } from '../../../core/models/audit.model';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './audit-list.component.html'
})
export class AuditListComponent implements OnInit {
  audits: Audit[] = [];
  filtered: Audit[] = [];
  loading = true;
  selectedType = '';
  types = ['LOGIN','CREATE_USER','UPDATE_USER','DELETE_USER','LOGOUT'];

  constructor(private auditService: AuditService) {}

  ngOnInit() {
    this.auditService.getAll().subscribe({
      next: (data) => {
        this.audits = data.reverse();
        this.filtered = this.audits;
        this.loading = false;
      }
    });
  }

  filter(type: string) {
    this.selectedType = type;
    this.filtered = type
      ? this.audits.filter(a => a.action === type)
      : this.audits;
  }

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
}
