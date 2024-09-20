import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-icon-selector',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class IconPickerComponent {
  icons = [{ src: 'test' }, { src: 'test1' }];
  selectedIcon: any;

  selectIcon(icon: any) {
    this.selectedIcon = icon;
    console.log('Selected icon:', icon);
  }
}
