import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from '../../http-service.service';
import { SignUpComponent } from "../../components/sign-up-conmponent/sign-up-conmponent.component";
import { SignInComponent } from "../../components/sign-in-conmponent/sign-in-conmponent.component";

@Component({
    selector: 'app-authenticator',
    standalone: true,
    templateUrl: './authenticator.component.html',
    styleUrl: './authenticator.component.scss',
    imports: [RouterOutlet, SignUpComponent, SignInComponent]
})
export class AuthenticatorComponent {


}
