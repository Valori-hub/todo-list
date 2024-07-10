import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { authService } from '../../auth-service.service';
import { DialogTodoComponent } from '../../components/dialog-todo/dialog-todo.component';
import { StorageService } from '../../storage-service.service';
import { HttpService } from '../../http-service.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  username: string | null = null;
  userData: any;
  private maxLists: number = 5;
  constructor(
    private auth: authService,
    private router: Router,
    private dialog: MatDialog,
    private storageService: StorageService,
    private http: HttpService
  ) {}
  async getSessionData() {
    await this.auth.getSessionData();
    this.username = this.auth.getUsername();
  }
  getUserData() {
    this.userData = this.storageService.getItem('userData');
    console.log(this.userData);
  }
  //Clearing user session storage and reloading the page
  async logout() {
    this.auth.logout();
    this.storageService.removeItem('userData');
    window.location.reload();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTodoComponent, {
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.name);
    });
  }
  test() {
    if (this.userData.todo.length < this.maxLists) {
      this.userData.todo.push([]);
      this.storageService.setItem('userData', this.userData);
      console.log(this.userData);
    } else {
      console.log('You can have only 4 lists on basic plan');
    }
  }
}
