import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../pages/home/home.service';
import { SafePipe } from '../../safe.pipe';
import { ColorsService } from '../../colors.service';

@Component({
  selector: 'app-dialog-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SafePipe, FormsModule],
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss',
})
export class DialogTaskComponent {
  padzero = (num: any) => (num < 10 ? '0' + num : num);
  today = new Date();
  year = this.today.getFullYear();
  month = this.padzero(this.today.getMonth() + 1);
  day = this.padzero(this.today.getDate());
  hours = this.padzero(this.today.getHours());
  minutes = this.padzero(this.today.getMinutes());
  localDateTime = `${this.year}-${this.month}-${this.day}T${this.hours}:${this.minutes}`;
  defaultList = this.homeService.userData.todo.find(
    ({ name }: { name: string }) => name === 'Unassigned tasks'
  );
  taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    color: new FormControl<string>(this.ColorService.accentColor),
    date: new FormControl<string | Date>(this.localDateTime),
    list: new FormControl(this.defaultList.name),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    private ColorService: ColorsService
  ) {}
  submitData(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const dateValue = formValue.date ? new Date(formValue.date) : null;
      formValue.date = dateValue;
      this.dialogRef.close(formValue);
    }
  }
  openPicker() {
    const inputElement = document.querySelector('input[type="datetime-local"]');
    console.log(this.defaultList);
    if (inputElement) {
      (inputElement as HTMLInputElement).showPicker();
    }
  }
}
