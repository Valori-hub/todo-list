import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface SessionInfo {
  username: string | null;
  userId: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}
  getIcons() {
    return this.http.get<any>(this.url + 'icons/content');
  }
  //Posting new user data to the server.
  createUser(user: any) {
    delete user.confirmPassword;
    return this.http.post<any>(this.url + 'users/signup', {
      userObject: user,
    });
  }
  loginUser(user: any) {
    return this.http.post<any>(
      this.url + 'users/login',
      { userObject: user },
      { withCredentials: true }
    );
  }
  //Remove all from the session storage
  logout() {
    return this.http.post(
      this.url + 'users/logout',
      {},
      { withCredentials: true }
    );
  }
  getSessionData(): Observable<SessionInfo> {
    return this.http
      .get<SessionInfo>(this.url + 'users/session-info', {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
          }
          return throwError(error);
        })
      );
  }
}
