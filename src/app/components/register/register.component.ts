import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]]
  })
  localStorage: any;
  registeredUsers: any;

  constructor(public authService: AuthenticationService,
    private router: Router,
    private fb: NonNullableFormBuilder) {
  }

  register() {

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.authService
      .register(username, password)
      .subscribe(registerSuccessful => {

        if (registerSuccessful) {
          this.router.navigate(['login', { username: username }])
        } else {
          console.log('user already exists')

        }


      })

  }

}
