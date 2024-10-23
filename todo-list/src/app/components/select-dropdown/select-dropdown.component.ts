import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SafePipe } from '../../safe.pipe';
interface Option {
  value: any;
  name: string;
  icon: any;
}
@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, OverlayModule, SafePipe],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
})
export class SelectDropdownComponent {
  @Input() options: Option[] = [];
  @Output() selected = new EventEmitter<any>();

  @ViewChild(CdkOverlayOrigin, { static: true }) trigger!: CdkOverlayOrigin;

  isOpen = false;
  selectedOption: Option | null = null;

  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: Option) {
    this.selectedOption = option;
    this.isOpen = false;
    this.selected.emit(option.value);
  }
}
