import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './components/sign-in-conmponent/sign-in-conmponent.component'
import { AuthenticatorComponent } from './pages/authenticator/authenticator.component';

export const routes: Routes = [
  { path: 'authenticator', component: AuthenticatorComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/authenticator', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  
];
