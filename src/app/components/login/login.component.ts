import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string ="";
  password : string ="";
  showErrorMessage: boolean = false;

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(private authService: AuthenticationService,
              private router: Router,
              private fb: NonNullableFormBuilder) {

    authService.getLoggedInSubject().subscribe(u => {
      if (u) {
        router.navigate(['jira-dashboard'])
      }
    })
  }

  submit(){

    const username = this.form.get('username')?.value;
    const password =  this.form.get('password')?.value;

    this.authService
     .login(username, password)
     .subscribe(loginWasSuccessful => {
       if (loginWasSuccessful) {
         this.router.navigate(['jira-board', { username: this.username}]);
       } else {
         this.showErrorMessage = true;
       }
     })
  }

  clickRegister(): void {
    this.router.navigate(['register'])
  }

}
