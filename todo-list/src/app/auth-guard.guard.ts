import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from './services/auth-service.service';

export const homeGuard = () => {
  const auth = inject(authService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/authenticator']);
  return false;
};
export const loginGuard = async () => {
  const auth = inject(authService);
  const router = inject(Router);
  try {
    const sessionData = await auth.getSessionData();
    if (sessionData === null) {
      return true;
    }
  } catch (error) {
    console.error('Error while fetching session data:', error);
    return true;
  }
  const loggedIn = auth.isLoggedIn();

  if (loggedIn) {
    router.navigate(['home']);
    return false;
  }
  return true;
};
