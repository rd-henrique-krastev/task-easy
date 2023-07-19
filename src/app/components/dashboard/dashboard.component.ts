import {Component, Input} from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Card } from 'src/app/card';
import {MatDialog} from "@angular/material/dialog";
import {CreateJiraComponent} from "../create-jira/create-jira.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  cards: Card[] = [];
  longText = `test`;
  username:string|undefined
  todo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inprogress: string[] = ['Get up', 'Brush teeth', 'Take a shower']
  done: string[] = ['Check e-mail', 'Walk dog'];
  expandedIndex = 0;


  title: string = '';
  description: string = '';
  assignee: string= '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      const username: string = p['username'];

      if (username)
        this.username = username;
    });
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(CreateJiraComponent, {
      data: {assignee: this.assignee, title: this.title, description: this.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todo.push(result.title + result.assignee + result.description)
        //todo -> make each card to have fields [assignee, description and title, not only a string]
      }
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
