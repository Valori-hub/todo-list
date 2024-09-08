import { Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialogRef: MatDialogRef<DialogService>) {}
  onClose(): void {
    this.dialogRef.close(DialogService);
  }
}
