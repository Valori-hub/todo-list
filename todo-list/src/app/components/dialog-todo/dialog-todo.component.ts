import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../../dialog.service';
import * as model from './model';
@Component({
  selector: 'app-dialog-todo',
  standalone: true,
  imports: [],
  templateUrl: './dialog-todo.component.html',
  styleUrl: './dialog-todo.component.scss',
})
export class DialogTodoComponent {
  public data = { name: '', email: '' }; // Przykładowe pola danych
  constructor(
    public dialogRef: MatDialogRef<DialogTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any // Pobiera dane wejściowe przekazane z serwisu
  ) {
    if (inputData) {
      this.data = { ...inputData }; // Można zainicjalizować formularz na podstawie danych
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitData(): void {
    this.dialogRef.close(this.data); // Zwraca dane do serwisu
  }
}
