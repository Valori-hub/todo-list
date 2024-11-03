import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { authService } from './auth-service.service';

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
  /* Get all icons from directory */
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
  /* Get info about session from db */
  getSessionData(): Observable<SessionInfo | null> {
    return this.http
      .get<SessionInfo>(this.url + 'users/session-info', {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.warn('Unauthorized access - user not logged in');
            return of(null);
          }
          return throwError(() => error);
        })
      );
  }
  /* Sending user data  */
  postUserData(
    type: 'task' | 'list',
    data: any,
    username: any,
    list_id?: any
  ): any {
    switch (type) {
      case 'task':
        return this.http.post(this.url + 'data/post_task', {
          taskObject: data,
          username: username,
          list_id: list_id,
        });
      case 'list':
        return this.http.post(this.url + 'data/post_list', {
          listObject: data,
          username: username,
        });
      default:
        return console.log('invalid action');
    }
  }
  /* Updating user data  */
  updateUserData(type: 'task' | 'list' | 'user', data: any, username?: any) {
    switch (type) {
      case 'task':
        this.http
          .post(this.url + 'data/update_task', {
            taskObject: data,
            username: username,
          })
          .subscribe((result: any) => {
            console.log(result.message, result.success);
          });
        break;
      case 'list':
        this.http
          .post(this.url + 'data/update_list', {
            listObject: data,
            username: username,
          })
          .subscribe((result: any) => {
            console.log(result.message, result.success);
          });
        break;
      case 'user':
        this.http
          .post(this.url + 'data/update_list', {
            listObject: data,
            username: username,
          })
          .subscribe((result: any) => {
            console.log(result.message, result.success);
          });
        break;
      default:
        return console.log('invalid action');
    }
  }
}
