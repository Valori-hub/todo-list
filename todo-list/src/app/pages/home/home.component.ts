import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { SafePipe } from '../../safe.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, CommonModule, SafePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userData: any;
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getSessionData();
    this.homeService.getIcons();
    this.userData = this.homeService.getUserData();
  }
  test(index: any) {
    console.log(index);
  }
}
