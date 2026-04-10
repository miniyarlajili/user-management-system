import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Audit } from '../models/audit.model';

@Injectable({ providedIn: 'root' })
export class AuditService {

  private apiUrl = `${environment.apiUrl}/audit`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Audit[]> {
    return this.http.get<Audit[]>(this.apiUrl);
  }
}
