import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { SelectDropdownComponent } from '../../components/select-dropdown/select-dropdown.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { SafePipe } from '../../safe.pipe';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    CommonModule,
    SafePipe,
    SideBarComponent,
    CalendarComponent,
    SelectDropdownComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  userData: any;
  test1: any;
  private subscription!: Subscription;
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getIcons();
    this.subscription = this.homeService.userData$.subscribe((data) => {
      this.userData = data;
      this.updateTasks();
    });
  }
  updateTasks() {
    this.test1 = this.userData.todo[0].tasks;
    this.test1.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
