import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor(public global: GlobalService, private router: Router) { }
  activeTab: any = 'schedule-lecture';

  ngOnInit() {
    this.activeTab = sessionStorage.getItem('activeTab')
  }

  navigatesTo(val: any) {
    this.activeTab = val
    sessionStorage.setItem('activeTab', val)
    this.router.navigate(['/' + val])
  }
}
