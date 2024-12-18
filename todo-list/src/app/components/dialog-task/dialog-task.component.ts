import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { SafePipe } from '../../safe.pipe';
import { ColorsService } from '../../services/colors.service';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import flatpickr from 'flatpickr';
@Component({
  selector: 'app-dialog-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SafePipe,
    FormsModule,
    SelectDropdownComponent,
  ],
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss',
})
export class DialogTaskComponent implements AfterViewInit {
  padzero = (num: any) => (num < 10 ? '0' + num : num);
  today = new Date();
  year = this.today.getFullYear();
  month = this.padzero(this.today.getMonth() + 1);
  day = this.padzero(this.today.getDate());
  hours = this.padzero(this.today.getHours());
  minutes = this.padzero(this.today.getMinutes());
  localDateTime = `${this.year}-${this.month}-${this.day}T${this.hours}:${this.minutes}`;
  defaultList = this.homeService.userData.todo[0]._id;
  taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    color: new FormControl<string>(this.ColorService.accentColor),
    date: new FormControl<string | Date>(this.localDateTime),
    list_id: new FormControl(this.defaultList),
  });
  constructor(
    public homeService: HomeService,
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    private ColorService: ColorsService
  ) {}
  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef;

  ngAfterViewInit() {
    flatpickr(this.dateInput.nativeElement, {
      enableTime: true,
      minDate: this.today,
      defaultDate: this.today,
      dateFormat: 'd.m.Y   H:i',
      position: 'auto center',
      time_24hr: true,
    });
  }
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
  onOptionSelected(value: any) {
    this.defaultList = value._id;
    console.log(this.defaultList);
  }
}
