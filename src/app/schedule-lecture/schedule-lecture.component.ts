import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-schedule-lecture',
  templateUrl: './schedule-lecture.component.html',
  styleUrls: ['./schedule-lecture.component.scss']
})
export class ScheduleLectureComponent {
  selectedCity:any
  cities:any

  constructor(public global:GlobalService){}
}
