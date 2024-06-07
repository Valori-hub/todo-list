import { HttpService } from './http-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authService {
  username: string | null | undefined;
  constructor(private httpClient: HttpService) {}

  getSessionData() {
    this.httpClient.getSessionData().subscribe((result) => {
      this.username = result.username;
    });
  }
  isLoggedIn(): boolean {
    if (this.username !== '' && this.username !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  getUsername(): string {
    if (this.username != null) {
      return this.username;
    }
    return '';
  }
}
