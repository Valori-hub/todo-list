import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './components/sign-in-component/sign-in-conmponent.component';
import { AuthenticatorComponent } from './pages/authenticator/authenticator.component';
import { SignUpComponent } from './components/sign-up-component/sign-up-conmponent.component';
import { loginGuard, homeGuard } from './auth-guard.guard';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
  {
    path: 'authenticator',
    component: AuthenticatorComponent,
    canActivate: [loginGuard],
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
  {
    path: 'app',
    component: HomeComponent,
    canMatch: [homeGuard],
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      { path: 'calendar', component: CalendarComponent },
      { path: 'list/:id', component: ListDetailsComponent },
    ],
  },

  { path: '', redirectTo: '/authenticator', pathMatch: 'full' },
];
