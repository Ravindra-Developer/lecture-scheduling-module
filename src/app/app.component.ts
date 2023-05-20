import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lecture-Scheduling-Module';
  isLoggedIn:boolean=true
  constructor(private router: Router) { }
  sideBar() {
    if (this.router.url.includes('login')) {
      return false
    } else {
      return true
    }
  }
}
