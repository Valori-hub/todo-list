import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class authService {
  username: string | null = null;
  constructor(private httpClient: HttpService) {}

  async getSessionData() {
    const result = await firstValueFrom(this.httpClient.getSessionData());
    if (result && result.username) {
      this.username = result.username;
    } else {
      console.warn('Error while fetching session data');
      this.username = null;
    }
  }
  isLoggedIn(): boolean {
    return this.username !== null;
  }
  logout() {
    this.httpClient.logout().subscribe((result) => {
      console.log('Logged out successfully:', result);
      this.username = null;
    });
  }
}
