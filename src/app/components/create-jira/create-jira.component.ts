import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DashboardComponent} from "../dashboard/dashboard.component";
import { Task } from 'src/app/models/task.model';

export interface DialogData {
  title: string;
  description: string;
  assignee: string;
}

@Component({
  selector: 'app-create-jira',
  templateUrl: './create-jira.component.html',
  styleUrls: ['./create-jira.component.css']
})
export class CreateJiraComponent {

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();

  }


}
