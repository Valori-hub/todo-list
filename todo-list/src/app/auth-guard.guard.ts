import { Injectable, OnInit, inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { authService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private auth: authService, private router: Router) {}
  username: string | null = null;
  async canActivate(): Promise<boolean> {
    try {
      await this.auth.getSessionData();
      this.username = this.auth.getUsername();
      if (this.username) {
        setTimeout(() => this.router.navigate(['/home']), 0);
        return false;
      } else {
        setTimeout(() => this.router.navigate(['/authenticator']), 0);
        return true;
      }
    } catch (error) {
      setTimeout(() => this.router.navigate(['/authenticator']), 0);
      return true;
    }
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
export const authHomeHuard: CanActivateFn = (route, state) => {
  return !!inject(PermissionsService).canActivate();
};
