import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  private cache: Map<string, SafeResourceUrl> = new Map();

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  getIcon(iconName: string): Observable<SafeResourceUrl> {
    const cachedIcon = this.cache.get(iconName);
    if (cachedIcon) {
      return of(cachedIcon);
    }

    const iconPath = `assets/svg_list_icons/${iconName}.svg`;
    return this.http.get(iconPath, { responseType: 'text' }).pipe(
      map((svg) => {
        const sanitizedSvg = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/svg+xml;base64,${btoa(svg)}`
        );
        this.cache.set(iconName, sanitizedSvg);
        return sanitizedSvg;
      }),
      catchError(() => {
        console.error(`Icon ${iconName} not found`);
        return of('');
      })
    );
  }
}
