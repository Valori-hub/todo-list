import { Router } from '@angular/router';
import { authService } from './auth-service.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: authService, private router: Router) {}
}
