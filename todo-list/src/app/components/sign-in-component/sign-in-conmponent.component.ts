import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../../services/http-service.service';
import { Router } from '@angular/router';
import { authService } from '../../services/auth-service.service';
import { StorageService } from '../../services/storage-service.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './sign-in-conmponent.component.html',
  styleUrl: './sign-in-conmponent.component.scss',
})
export class SignInComponent {
  hide = true;
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private auth: authService,
    private storageService: StorageService
  ) {}
  goToRegister() {
    this.router.navigate(['/authenticator/register']);
  }
  login() {
    const formValues = this.loginForm.getRawValue();
    this.httpClient.loginUser(formValues).subscribe((response) => {
      if (response.result.success) {
        this.auth.getSessionData();
        this.storageService.setItem('userData', response.userData);
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 2000);
      } else {
        console.log(response.result.message1);
      }
    });
  }
}
