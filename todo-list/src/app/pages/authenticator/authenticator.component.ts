import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignUpComponent } from '../../components/sign-up-component/sign-up-conmponent.component';
import { SignInComponent } from '../../components/sign-in-component/sign-in-conmponent.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.scss',
  imports: [RouterOutlet, SignUpComponent, SignInComponent, CommonModule],
})
export class AuthenticatorComponent implements OnInit {
  constructor(private router: Router, private homeService: HomeService) {
    this.router.navigate([
      {
        outlets: {
          primary: [
            'authenticator',
            { outlets: { authentication: ['login'] } },
          ],
        },
      },
    ]);
  }
  private async InitComponent() {
    this.homeService.getIcons();
    console.log(this.homeService.iconList);
  }
  ngOnInit(): void {
    this.InitComponent();
  }
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
