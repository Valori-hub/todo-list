import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { SignUpComponent } from '../../components/sign-up-component/sign-up-conmponent.component';
import { SignInComponent } from '../../components/sign-in-component/sign-in-conmponent.component';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.scss',
  imports: [RouterOutlet, SignUpComponent, SignInComponent],
})
export class AuthenticatorComponent {
  constructor(private router: Router) {
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
}
