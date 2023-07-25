import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task-easy';
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    // Check if it's the first time the app is being run
    if (this.localStorageService.isFirstTime()) {
      // Do the initial setup or whatever needs to be done only once

      // Example: Set some initial data in localStorage
      localStorage.setItem('kanban_board', '{"name":"Моряци","columns":[{"name":"to do","tasks":[]},{"name":"in progress","tasks":[]},{"name":"done","tasks":[]}]}');

      // Set the flag to indicate that the app has been run before
      this.localStorageService.setAppRunBefore();
    }
  }
}

