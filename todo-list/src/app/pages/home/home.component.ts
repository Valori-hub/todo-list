import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { SafePipe } from '../../safe.pipe';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    CommonModule,
    SafePipe,
    SideBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userData: any;
  test1: any;
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getSessionData();
    this.homeService.getIcons();
    this.userData = this.homeService.getUserData();
    this.test1 = this.userData.todo[0].tasks;
    this.test1.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
    console.log(this.test1);
  }
  test(index: any) {
    console.log(index);
  }
}
