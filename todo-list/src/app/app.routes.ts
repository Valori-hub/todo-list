import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './components/sign-in-component/sign-in-conmponent.component';
import { AuthenticatorComponent } from './pages/authenticator/authenticator.component';
import { SignUpComponent } from './components/sign-up-component/sign-up-conmponent.component';

import { authGuard, authHomeHuard } from './auth-guard.guard';

export const routes: Routes = [
  {
    path: 'authenticator',
    component: AuthenticatorComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: SignUpComponent,
      },
    ],
  },
  { path: 'home', component: HomeComponent, canActivate: [authHomeHuard] },
  { path: '', redirectTo: '/authenticator', pathMatch: 'full' },
];
