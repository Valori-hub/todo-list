import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../pages/home/home.service';
import { IconPickerComponent } from '../icon-picker/icon-picker.component';
import { DialogTodoComponent } from './dialog-todo.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {}
