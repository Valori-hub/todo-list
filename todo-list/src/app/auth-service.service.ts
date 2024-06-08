import { HttpService } from './http-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authService {
  username: string | null = null;
  constructor(private httpClient: HttpService) {}

  async getSessionData() {
    await this.httpClient.getSessionData().subscribe((result) => {
      console.log(result.username);
      this.username = result.username;
      console.log(this.username);
    });
  }
  isLoggedIn(): boolean {
    if (
      this.username !== '' &&
      this.username !== undefined &&
      this.username !== null
    ) {
      console.log(this.username + 'zalogowany');
      return true;
    } else {
      console.log(this.username + ' nie jestes zalogowany');
      return false;
    }
  }
  getUsername(): string {
    if (this.username != null) {
      return this.username;
    } else return '';
  }
}
