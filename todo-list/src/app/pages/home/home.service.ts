import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { authService } from '../../auth-service.service';
import { DialogListComponent } from '../../components/dialog-list/dialog-list.component';
import { StorageService } from '../../storage-service.service';
import { HttpService } from '../../http-service.service';
import { SafeHtml } from '@angular/platform-browser';
import { Ilist } from '../../components/dialog-list/model';
import { DialogTaskComponent } from '../../components/dialog-task/dialog-task.component';
import { BehaviorSubject } from 'rxjs';
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
  username: string | null = null;
  userData: any;
  private userDataSubject = new BehaviorSubject<any>(this.getUserData());
  userData$ = this.userDataSubject.asObservable();
  private maxLists: number = 5;

  constructor(
    private auth: authService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private http: HttpService
  ) {}

  async getSessionData() {
    await this.auth.getSessionData();
    this.username = this.auth.getUsername();
  }
  getUserData() {
    return (this.userData = this.storageService.getItem('userData'));
  }
  updateUserData(newData: any) {
    this.userData = newData;
    this.userDataSubject.next(this.userData);
    this.storageService.setItem('userData', this.userData);
    this.http.postUserData('user', this.userData);
  }
  //Clearing user session storage and reloading the page
  async logout() {
    this.auth.logout();
    this.storageService.removeItem('userData');
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
        this.storageService.setItem('userData', this.userData);
        console.log(this.userData);
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
      if (result.list) {
        this.userData.todo.map((list: any) => {
          if (result.list === list.name) {
            list.tasks.push({
              title: result.title,
              description: result.description,
              color: result.color,
              date: result.date,
              list: result.list,
            });
          }
        });
        this.updateUserData(this.userData);
      }
    });
  }
}
