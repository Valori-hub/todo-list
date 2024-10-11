import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../pages/home/home.service';
import { SafePipe } from '../../safe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SafePipe, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  userData: any;
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getSessionData();
    this.homeService.getIcons();
    this.homeService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }
}
