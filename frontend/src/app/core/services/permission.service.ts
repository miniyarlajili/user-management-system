import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permission } from '../models/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  private apiUrl = `${environment.apiUrl}/permissions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl);
  }

  create(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.apiUrl, permission);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`,
      { responseType: 'text' });
  }

  addToRole(roleId: number, permissionId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/roles/${roleId}/add/${permissionId}`, {});
  }

  removeFromRole(roleId: number, permissionId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/roles/${roleId}/remove/${permissionId}`);
  }
}
