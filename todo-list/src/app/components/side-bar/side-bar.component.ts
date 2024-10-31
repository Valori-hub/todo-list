import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { SafePipe } from '../../safe.pipe';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SafePipe, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit, OnDestroy {
  userData: any;
  private subscription!: Subscription;
  constructor(public homeService: HomeService, private router: Router) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getIcons();
    this.homeService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }
  goToDetails(listId: string) {
    this.router.navigate(['/todos', listId]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
