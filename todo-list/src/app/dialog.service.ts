import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTodoComponent } from './components/dialog-todo/dialog-todo.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  // Funkcja otwierająca dialog, zwracająca Observable, który zawiera wynik dialogu
  openDialog(data?: any): Observable<any> {
    const dialogRef = this.dialog.open(DialogTodoComponent, {
      data: data, // Możesz przekazać dane do dialogu
    });

    return dialogRef.afterClosed(); // Zwraca Observable, który można subskrybować
  }
}
