import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  startDate: string = '';
  today = new Date();
  chosenDate: Date = new Date();
  dates: Date[] = [];
  userData: any;
  private subscription!: Subscription;
  allTask: {
    title: string;
    date: string | Date;
    description: string;
    list: string;
  }[] = [];

  constructor(private homeService: HomeService) {}
  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef;

  ngAfterViewInit() {
    flatpickr(this.dateInput.nativeElement, {
      defaultDate: this.today.toLocaleDateString(),
      dateFormat: 'Y.m.d',
      position: 'auto center',
    });
  }
  ngOnInit(): void {
    this.generateDays('next');
    this.subscription = this.homeService.userData$.subscribe((data) => {
      this.userData = data;
      this.updateAllTasks();
    });
  }
  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Miesiące są zerowane
    const year = date.getFullYear();
    return `${year}.${month}.${day}`;
  }
  getTasksForDate(date: Date): any[] {
    return this.allTask
      .filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate.toDateString() === date.toDateString();
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  updateAllTasks() {
    this.allTask = [];
    this.userData.todo.forEach((item: any) => {
      if (Array.isArray(item.tasks)) {
        item.tasks.forEach((task: any) => {
          const taskDate = new Date(task.date);
          this.allTask.push({
            ...task,
            date: taskDate,
          });
        });
      }
    });
  }
  generateDays(action: 'previous' | 'next' | 'choose') {
    let start: Date;
    switch (true) {
      case this.dates.length === 0:
        start = new Date();
        break;
      case action === 'previous':
        start = new Date(this.dates[0]);
        break;
      case action === 'next':
        start = new Date(this.dates[this.dates.length - 1]);
        break;
      case action === 'choose':
        const formatDate = this.formatDate(new Date(this.chosenDate));
        start = new Date(formatDate);
        break;
      default:
        console.error('Invalid action');
        return;
    }
    this.dates = [];
    switch (action) {
      case 'previous':
        for (let i = 1; i <= 7; i++) {
          const previousDate = new Date(start);
          previousDate.setDate(start.getDate() - i);
          this.dates.unshift(previousDate);
        }
        break;

      case 'next':
        for (let i = 0; i <= 6; i++) {
          const nextDate = new Date(start);
          nextDate.setDate(start.getDate() + i);
          this.dates.push(nextDate);
        }
        break;
      case 'choose':
        for (let i = 0; i <= 6; i++) {
          const nextDate = new Date(start);
          nextDate.setDate(start.getDate() + i);
          this.dates.push(nextDate);
        }
        break;
      default:
        console.error('Invalid action');
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
