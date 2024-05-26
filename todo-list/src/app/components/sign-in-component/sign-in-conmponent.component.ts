
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../../http-service.service';
import { Router } from '@angular/router';

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
    CommonModule
  ],
  templateUrl: './sign-in-conmponent.component.html',
  styleUrl: './sign-in-conmponent.component.scss'
})
export class SignInComponent {
  hide = true;
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('',  [Validators.required, Validators.minLength(8)])

  })
  constructor(private httpClient: HttpService, private router: Router){}
  
  login(){
    const formValues = this.loginForm.getRawValue();
        this.httpClient.loginUser(formValues).subscribe(
          (response:any) =>{
            if(response.data.success){
              // sessionStorage.setItem('sessionId', response.sessionId);
              // sessionStorage.setItem('username', response.user);
              // sessionStorage.setItem('gender', response.userGender);
              console.log('logged in');
              setTimeout(() => {
                this.router.navigate(['']);
            }, 3000);
            }else{
              console.log(response.message)
            }
          }
        )
      }

}