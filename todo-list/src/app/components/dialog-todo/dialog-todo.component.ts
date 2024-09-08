import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import * as model from './model';
@Component({
  selector: 'app-dialog-todo',
  standalone: true,
  imports: [],
  templateUrl: './dialog-todo.component.html',
  styleUrl: './dialog-todo.component.scss',
})
export class DialogTodoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: model.Ilist,

    public DialogService: DialogService
  ) {}
}
