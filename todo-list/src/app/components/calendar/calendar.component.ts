import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  today = new Date();
  dates: Date[] = [];
  userData: any;
  allTask: {
    title: string;
    date: string | Date;
    description: string;
    list: string;
  }[] = [];

  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.nextDaysGenerator(this.today);
    this.homeService.userData$.subscribe((data) => {
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
          console.log(taskDate);
          this.allTask.push({
            ...task,
            date: taskDate,
          });
        });
      }
    });
  }
  nextDaysGenerator(startDate: Date) {
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      this.dates.push(nextDate);
    }
    console.log(this.dates.slice(-1)[0]);
    console.log(this.dates);
  }
}
