import { Component } from '@angular/core';
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
import { IconPickerComponent } from '../icon-picker/icon-picker.component';
import { SafePipe } from '../../safe.pipe';
import { ColorsService } from '../../colors.service';

@Component({
  selector: 'app-dialog-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SafePipe, FormsModule],
  templateUrl: './dialog-list.component.html',
  styleUrl: './dialog-list.component.scss',
})
export class DialogListComponent {
  defultIcon = this.homeService.iconList.find(
    ({ filename }) => filename === 'star-sharp-svgrepo-com.svg'
  );
  listForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    color: new FormControl<string>(this.ColorService.accentColor),
    icon: new FormControl(this.defultIcon),
    tasks: new FormControl<[]>([]),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogListComponent>,
    private dialog: MatDialog,
    private ColorService: ColorsService
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
