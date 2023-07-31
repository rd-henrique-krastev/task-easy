import {Component, ɵɵqueryRefresh} from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgIf} from "@angular/common";

/** @title Menu with Standalone Trigger. */
@Component({
  selector: 'nav-component',
  styleUrls: ['nav.component.scss'],
  templateUrl: 'nav.component.html',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, RouterLink, NgIf],
})
export class NavComponent {

  userIsLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {

    authService.getLoggedInSubject()
      .subscribe(s => {this.userIsLoggedIn = s});
  }

  logout(): void {
    this.authService.logout()
    this.userIsLoggedIn = false
    this.router.navigate(['login'])
  }
  clearBoard():void{
    localStorage.setItem('kanban_board', '{"name":"Моряци","columns":[{"name":"to do","tasks":[]},{"name":"in progress","tasks":[]},{"name":"done","tasks":[]}]}');
    window.location.reload();
  }

}