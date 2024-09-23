import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../pages/home/home.service';
import { SafeHtml } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  standalone: true,
  selector: 'app-icon-selector',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class IconPickerComponent {
  constructor(
    private homeService: HomeService,
    private dialogRef: MatDialogRef<IconPickerComponent>
  ) {}
  iconList: { filename: string; content: SafeHtml }[] =
    this.homeService.iconList;

  selectedIcon(icon: any) {
    if (icon) {
      this.dialogRef.close(icon);
      console.log(icon);
    }
  }
}
