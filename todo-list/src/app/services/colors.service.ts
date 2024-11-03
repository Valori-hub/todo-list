import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  styles = getComputedStyle(document.documentElement);
  primaryColor = this.styles.getPropertyValue('--primary').trim();
  secondaryColor = this.styles.getPropertyValue('--secondary').trim();
  whiteColor = this.styles.getPropertyValue('--white').trim();
  accentColor = this.styles.getPropertyValue('--accent').trim();
  constructor() {}
}
