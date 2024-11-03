import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { authService } from './auth-service.service';
import { DialogListComponent } from '../components/dialog-list/dialog-list.component';
import { StorageService } from './storage-service.service';
import { HttpService } from './http-service.service';
import { SafeHtml } from '@angular/platform-browser';
import { Ilist } from '../components/dialog-list/model';
import { DialogTaskComponent } from '../components/dialog-task/dialog-task.component';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// interface Iuser {
//   username: string;
//   todo: {
//     name: string;
//     description: string;
//     icon: {
//       filename: string;
//       content: SafeHtml;
//     };
//   };
// }
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  iconList: { filename: string; content: string }[] = [];
  defultIcon: { filename: string; content: SafeHtml }[] = [];
  userData: any;
  private userDataSubject = new BehaviorSubject<any>(this.getUserData());
  userData$ = this.userDataSubject.asObservable();
  private maxLists: number = 5;

  constructor(
    private auth: authService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private http: HttpService,
    private router: Router
  ) {}

  getUserData() {
    return (this.userData = this.storageService.getItem('userData'));
  }
  updateUserData(newData: any) {
    this.userData = newData;
    this.userDataSubject.next(this.userData);
    this.storageService.setItem('userData', this.userData);
  }
  //Clearing user session storage and reloading the page
  logout() {
    this.auth.logout();
    window.location.reload();
  }
  removeElement(element: any) {
    this.userData.todo.splice(element, 1);
    this.storageService.setItem('userData', this.userData);
  }
  getIcons() {
    this.http.getIcons().subscribe((results) => {
      this.iconList = results.data;
    });
  }
  openListDialog(): void {
    const dialogRef = this.dialog.open(DialogListComponent, {
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result: Ilist) => {
      if (this.userData.todo.length < this.maxLists) {
        this.userData.todo.push({
          name: result.title,
          description: result.description,
          tasks: result.tasks,
          color: result.color,
          icon: result.icon,
        });
        this.http
          .postUserData(
            'list',
            this.userData.todo.slice(-1)[0],
            this.userData.username
          )
          .subscribe((result: any) => {
            console.log(result.data.todo);
            this.userData.todo = result.data.todo;
            this.storageService.setItem('userData', this.userData);
            console.log(this.userData.todo);
          });
      } else {
        console.log('You can have only 4 lists on basic plan');
      }
    });
  }
  openTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.list_id) {
        this.userData.todo.map((list: any) => {
          if (result.list_id === list._id) {
            list.tasks.push({
              title: result.title,
              description: result.description,
              color: result.color,
              date: result.date,
              list_id: result.list_id,
            });
            this.http.postUserData(
              'task',
              list.tasks.slice(-1)[0],
              this.userData.username
            );
          }
        });
        this.updateUserData(this.userData);
        console.log(this.userData);
      }
    });
  }
}
