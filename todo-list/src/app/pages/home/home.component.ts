import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { SafePipe } from '../../safe.pipe';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { SelectDropdownComponent } from "../../components/select-dropdown/select-dropdown.component";

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
    SelectDropdownComponent
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
    this.homeService.userData$.subscribe((data) => {
      this.userData = data;
      this.updateTasks();
    });
    console.log(this.userData);
  }
  updateTasks() {
    this.test1 = this.userData.todo[0].tasks;
    this.test1.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }
  test(index: any) {
    console.log(index);
  }
}
