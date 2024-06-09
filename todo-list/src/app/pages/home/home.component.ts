import { Component, OnInit } from '@angular/core';
import { authService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  username: string | null = null;
  constructor(private auth: authService, private router: Router) {}
  ngOnInit(): void {
    this.InitComponent();
  }
  private async InitComponent() {
    this.getSessionData();
  }
  private async getSessionData() {
    await this.auth.getSessionData();
    this.username = this.auth.getUsername();
  }
  //Clearing user session storage and reloading the page
  async logout() {
    this.auth.logout();
    await this.router.navigate(['']);
    window.location.reload();
  }
}
