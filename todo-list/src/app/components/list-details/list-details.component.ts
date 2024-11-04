import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { UserData, Ilist } from '../../models/userData';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../safe.pipe';

@Component({
  selector: 'app-list-details',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.scss',
})
export class ListDetailsComponent implements OnInit, OnDestroy {
  listId: string | null = null;
  userData: Ilist | undefined;
  private userDataSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listId = params.get('id');
      this.updateUserData();
    });
  }
  convertDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  }
  private updateUserData() {
    if (this.listId) {
      this.userDataSubscription = this.homeService.userData$.subscribe(
        (data: UserData) => {
          this.userData = data.todo.find(({ _id }) => _id === this.listId);
        }
      );
    }
  }
  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
