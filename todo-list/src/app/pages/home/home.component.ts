import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { SafeHtml } from '@angular/platform-browser';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, CommonModule, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getSessionData();
    this.homeService.getIcons();
    this.homeService.getUserData();

    this.homeService.userData.todo.forEach(
      (element: { icon?: { content?: SafeHtml | undefined } }) => {
        if (element.icon && element.icon.content)
          element.icon.content = this.homeService.sanitizeSVG(
            element.icon.content
          );
        console.log(element);
      }
    );
  }
  log(index: any) {
    console.log(index);
  }
}
