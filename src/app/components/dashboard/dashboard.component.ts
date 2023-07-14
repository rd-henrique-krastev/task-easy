import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username:string|undefined
  todo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inprogress: string[] = ['Get up', 'Brush teeth', 'Take a shower']
  done: string[] = ['Check e-mail', 'Walk dog'];
  expandedIndex = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      const username: string = p['username'];

      if (username)
        this.username = username;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
