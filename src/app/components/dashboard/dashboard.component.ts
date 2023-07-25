import {Component, Input, OnInit} from '@angular/core';

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
export class DashboardComponent implements OnInit {

todo:Column =JSON.parse(localStorage.getItem('kanban_board')||'{}').columns[0];
 inprogress:Column=JSON.parse(localStorage.getItem('kanban_board')||'{}').columns[1];
 done:Column= JSON.parse(localStorage.getItem('kanban_board')||'{}').columns[2];
  username:string|undefined

  private registeredUsers: { [username: string]: string } = {};

board:Board = JSON.parse(localStorage.getItem('kanban_board')|| '{}');
 

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

        this.todo.tasks.push(new Task(result.title,result.assignee,result.description))
        this.board = new Board(this.board.name,[this.todo,this.inprogress,this.done])
        this.saveBoardState();
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
    this.board = new Board(this.board.name,[this.todo,this.inprogress,this.done])
    this.saveBoardState();
  }
  private saveBoardState():void {
  
    localStorage.setItem('kanban_board', JSON.stringify(this.board));
  }
}
