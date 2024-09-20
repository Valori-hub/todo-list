import { Component, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../pages/home/home.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconComponent } from '../../app-icon/app-icon.component';
import { CommonModule } from '@angular/common';
import { IconPickerComponent } from '../icon-picker/icon-picker.component';

@Component({
  selector: 'app-dialog-todo',
  standalone: true,
  imports: [
    IconComponent,
    ReactiveFormsModule,
    CommonModule,
    IconPickerComponent,
  ],
  templateUrl: './dialog-todo.component.html',
  styleUrl: './dialog-todo.component.scss',
})
export class DialogTodoComponent {
  listForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    color: new FormControl(),
    icon: new FormControl(),
    tasks: new FormControl<[]>([]),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogTodoComponent>
  ) {}
  openIconPicker(): void {
    this.homeService.openIconPicker();
  }
  submitData(): void {
    if (this.listForm.valid) {
      this.dialogRef.close(this.listForm.getRawValue());
    }
  }
}
