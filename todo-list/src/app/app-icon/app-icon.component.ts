import { Component, Input, OnInit } from '@angular/core';
import { SvgIconService } from './icon-sanitizer.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<img [src]="iconUrl" alt="{{ iconName }} icon" />`,
})
export class IconComponent implements OnInit {
  @Input() iconName!: string;
  iconUrl: SafeResourceUrl | undefined;
  constructor(private svgIconService: SvgIconService) {}

  ngOnInit(): void {
    this.svgIconService.getAllIcons();
    this.svgIconService
      .getIcon(this.iconName)
      .subscribe((url: SafeResourceUrl) => {
        this.iconUrl = url;
      });
  }
}
