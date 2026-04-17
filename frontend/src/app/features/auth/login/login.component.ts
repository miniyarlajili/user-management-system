import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  motDePasse = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService,
              private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';
    this.authService.login({ email: this.email,
                             motDePasse: this.motDePasse })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => {
          this.error = 'Email ou mot de passe incorrect';
          this.loading = false;
        }
      });
  }
}
