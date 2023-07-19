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
import {MatDialog} from "@angular/material/dialog";
import {CreateJiraComponent} from "../create-jira/create-jira.component";
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
 todo:Column =new Column('todo',[new Task('NewTask','Pesho','Hello Test')]);
 inprogress:Column= new Column('in progress',[]);
 done:Column= new Column('done',[]);

  board: Board = new Board('Моряци',
  [this.todo,
   this.inprogress,
   this.done]);

  username:string|undefined
  


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
        this.todo.tasks.push(result.title + result.assignee + result.description)
        //todo -> make each card to have fields [assignee, description and title, not only a string]
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
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
