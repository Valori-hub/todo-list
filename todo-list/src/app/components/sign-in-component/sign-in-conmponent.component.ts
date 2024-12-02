import { Component, OnInit } from '@angular/core';
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
import { HomeService } from '../../services/home.service';
import * as animation from '../../animations/login-page-animation';
import { AnimationEvent } from '@angular/animations';
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
  animations: [animation.testAnimation, animation.test1],
})
export class SignInComponent implements OnInit {
  animationState: 'onScreen' | 'offScreen' = 'onScreen';
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
    private storageService: StorageService,
    private homeService: HomeService
  ) {}
  ngOnInit(): void {
    this.animationState = 'offScreen';
    setTimeout(() => {
      this.animationState = 'onScreen';
    }, 200);
  }
  toggleAnimation(): void {}

  goToRegister() {
    setTimeout(() => {
      this.animationState = 'offScreen';
    }, 200);
    // setTimeout(() => {
    //   this.router.navigate(['/authenticator/register']);
    // }, 1000);
  }
  onAnimationDone(event: AnimationEvent, lastElement: number): void {
    if (event.fromState === 'offScreen' && event.toState === 'onScreen') {
      if (lastElement === 1) {
        console.log('super');
      }
    }
    
  }
  login() {
    const formValues = this.loginForm.getRawValue();
    this.httpClient.loginUser(formValues).subscribe((response) => {
      if (response.result.success) {
        this.auth.getSessionData();
        this.storageService.setItem('userData', response.userData);
        this.homeService.setUserData(response.userData);
        setTimeout(() => {
          this.router.navigate(['app']);
        }, 2000);
      } else {
        console.log(response.result.message1);
      }
    });
  }
}
