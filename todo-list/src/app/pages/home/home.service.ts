import { contentChild, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { authService } from '../../auth-service.service';
import { DialogTodoComponent } from '../../components/dialog-todo/dialog-todo.component';
import { StorageService } from '../../storage-service.service';
import { HttpService } from '../../http-service.service';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { DialogRef } from '@angular/cdk/dialog';
import { Ilist } from '../../components/dialog-todo/model';
import { IconPickerComponent } from '../../components/icon-picker/icon-picker.component';
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
    const dialogRef = this.dialog.open(DialogTodoComponent, {
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
}
