import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../pages/home/home.service';
import { IconPickerComponent } from '../icon-picker/icon-picker.component';

@Component({
  selector: 'app-dialog-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-todo.component.html',
  styleUrl: './dialog-todo.component.scss',
})
export class DialogTodoComponent {
  defultIcon = this.homeService.sanitizedIcons.find(
    ({ filename }) => filename === 'star-sharp-svgrepo-com.svg'
  );
  listForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    color: new FormControl(),
    icon: new FormControl(this.defultIcon),
    tasks: new FormControl<[]>([]),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogTodoComponent>,
    private dialog: MatDialog
  ) {}

  openIconPicker(): void {
    const dialogRef = this.dialog.open(IconPickerComponent, {
      panelClass: 'custom-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.defultIcon = result;
      this.listForm.get('icon')?.setValue(this.defultIcon);
    });
  }
  submitData(): void {
    if (this.listForm.valid) {
      this.dialogRef.close(this.listForm.getRawValue());
    }
  }
}
