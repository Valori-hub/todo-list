import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  userRegistration(userData: any) {
    this.http.post(this.http + 'users', { userData });
  }
}
