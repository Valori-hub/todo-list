import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as model from './model';
import { HomeService } from '../../pages/home/home.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-dialog-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-todo.component.html',
  styleUrl: './dialog-todo.component.scss',
})
export class DialogTodoComponent {
  listForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    tasks: new FormControl<[]>([], [Validators.required]),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogTodoComponent>
  ) {
    // if (inputData) {
    //   this.data = { ...inputData }; // Można zainicjalizować formularz na podstawie danych
    // }
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  submitData(): void {
    this.dialogRef.close(this.listForm.getRawValue()); // Zwraca dane do serwisu
  }
}
