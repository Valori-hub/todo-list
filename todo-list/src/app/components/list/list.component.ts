import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  // tempUserData = this.homeService.userData;
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    // this.homeService.sanitizeSVG(this.tempUserData);
  }
}
