import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isFirstTimeKey = 'isFirstTime';

  constructor() {   }
  isFirstTime(): boolean {
    return localStorage.getItem(this.isFirstTimeKey) === null;
  }
  setAppRunBefore() {
    localStorage.setItem(this.isFirstTimeKey, 'false');
  }
}
