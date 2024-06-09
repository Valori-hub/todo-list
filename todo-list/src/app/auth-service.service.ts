import { firstValueFrom } from 'rxjs';
import { HttpService } from './http-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authService {
  username: string | null = null;
  constructor(private httpClient: HttpService) {}

  async getSessionData() {
    const result = await firstValueFrom(this.httpClient.getSessionData());
    if (result.username !== null && result.username !== undefined) {
      this.username = result.username;
    } else {
    }
  }
  isLoggedIn(): boolean {
    return (
      this.username !== '' &&
      this.username !== undefined &&
      this.username !== null
    );
  }

  getUsername(): string {
    return this.username ? this.username : '';
  }
  logout() {
    this.httpClient.logout().subscribe((result) => {
      result;
    });
  }
}
