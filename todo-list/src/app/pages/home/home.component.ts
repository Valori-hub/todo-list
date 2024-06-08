import { Component, OnInit } from '@angular/core';
import { authService } from '../../auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private auth: authService) {}
}
