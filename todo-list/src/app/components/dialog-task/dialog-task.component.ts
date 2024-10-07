import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../pages/home/home.service';
import { SafePipe } from '../../safe.pipe';
import { ColorsService } from '../../colors.service';
import { FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-dialog-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SafePipe,
    FormsModule,
    FlatpickrModule,
  ],
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss',
})
export class DialogTaskComponent {
  today = new Date();
  selectedDate: string = this.today.toISOString().substring(0, 10);
  selectedTime: string = this.today.toISOString().substring(11, 16);
  taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    color: new FormControl<string>(this.ColorService.accentColor),
    date: new FormControl<string>(this.selectedDate),
    time: new FormControl<string>(this.selectedTime),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    private dialog: MatDialog,
    private ColorService: ColorsService
  ) {}

  submitData(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.getRawValue());
    }
  }
}
