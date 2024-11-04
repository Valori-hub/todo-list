import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Ilist } from '../dialog-list/model';
import { UserData } from '../../models/userData';

@Component({
  selector: 'app-list-details',
  standalone: true,
  imports: [],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.scss',
})
export class ListDetailsComponent implements OnInit {
  listId: string | null = null;
  userData: Ilist | undefined;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listId = params.get('id');
    });

    this.homeService.userData$.subscribe((data: UserData) => {
      console.log(data);
      const userData = data;
      this.userData =
        userData.todo.find(({ _id }) => _id === this.listId) || undefined;
    });
    console.log(this.userData);
  }
}
