import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, OnDestroy {
  startDate: string = '';
  today = new Date();
  choosenDate: Date = new Date();
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
  ngOnInit(): void {
    this.generateDays('next');
    this.subscription = this.homeService.userData$.subscribe((data) => {
      this.userData = data;
      this.updateAllTasks();
    });
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
        start = new Date(this.choosenDate);
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
