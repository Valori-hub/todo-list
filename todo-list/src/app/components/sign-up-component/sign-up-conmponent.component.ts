import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { HttpService } from '../../http-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-conmponent.component.html',
  styleUrl: './sign-up-conmponent.component.scss'
})
export class SignUpComponent {
errorMessage = '';
hide = true;
validatePasswordConfirmation: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    if (!control.parent) {
      return null;
    }
    const passwordControl = control.parent.get('password');
    const confirmPasswordControl = control.parent.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      return { validatePasswordConfirmation: true };
    }
    return null;
  };
  registrationForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      this.validatePasswordConfirmation,
    ]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    gender: new FormControl<string>('', [Validators.required]),
    todo: new FormControl<[]>([])
  });

  getPasswordLabel(): string {
    return this.registrationForm.hasError('validatePasswordConfirmation')
      ? 'Passwords do not match'
      : 'Confirm your password';
  }
  constructor(private httpClient: HttpService, private router: Router) {
    merge(
      this.registrationForm.controls.email.statusChanges,
      this.registrationForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.registrationForm.controls.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.registrationForm.controls.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  register(): void {
    const formValues = this.registrationForm.getRawValue();
    console.log(formValues)
    this.httpClient.userRegistration(formValues).subscribe((response: any) => {
      if (response.data.success) {
        this.router.navigateByUrl('(authentication:login)');
        console.log('User created!');
      } else if (!response.data.success) {
        console.log('Invalid user data');
      }
    });
  }
}


