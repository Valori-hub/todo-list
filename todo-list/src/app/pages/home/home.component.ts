import { Component, OnInit } from '@angular/core';
import { authService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogTodoComponent } from '../../components/dialog-todo/dialog-todo.component';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../storage-service.service';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(public homeService: HomeService) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.homeService.getSessionData();
    this.homeService.getUserData();
  }
}
