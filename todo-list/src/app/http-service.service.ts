import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  userRegistration(userData: any) {
    delete userData.confirmPassword;
    return this.http.post(this.http + 'users/register', { userData });
  }
  loginUser(user:any){
    console.log('hej')
    return this.http.post<any>(this.url + 'users/login', { userObject: user });
  }
}
