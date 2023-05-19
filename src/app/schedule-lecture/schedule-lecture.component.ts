import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-lecture',
  templateUrl: './schedule-lecture.component.html',
  styleUrls: ['./schedule-lecture.component.scss']
})
export class ScheduleLectureComponent {
  scheduledLectures: any = []
  courses: any = [];
  AllInstructors: any = [];
  BatchArr: any = []

  constructor(public global: GlobalService, private fb: FormBuilder) { }
  scheduleLectureForm = this.fb.group({
    lectureDate: ['', Validators.required],
    course_id: ['', Validators.required],
    batch: [''],
    InstructorId: ['', Validators.required],
  })
  ngOnInit() {
    this.getAllCourses()
    this.getAllInstructors()
    this.getAllScheduledLecture()
  }

  getBatches() {
    this.courses.forEach((el: any) => {
      if (el.course_id === this.scheduleLectureForm.controls['course_id'].value) {
        this.BatchArr = el.batches
        if (el.batches.length > 0) {
          this.scheduleLectureForm.controls['batch'].setValidators([Validators.required])
          this.scheduleLectureForm.controls['batch'].updateValueAndValidity()
        }
        
      }
    });
  }

  getAllInstructors() {
    this.global.get(this.global.basepath + '/admin/getAllInstructors').subscribe((res: any) => {
      this.AllInstructors = res.data
    })
  }

  getAllCourses() {
    this.global.get(this.global.basepath + '/admin/getAllCourses').subscribe((res: any) => {
      this.courses = res.data
    })
  }

  getAllScheduledLecture() {
    this.global.get(this.global.basepath + '/admin/getAllScheduledLecture').subscribe((res: any) => {
      console.log(res);
      this.scheduledLectures = res.data
    })
  }

  scheduledLecture() {
    console.log(this.scheduleLectureForm.value);
    this.global.post(this.global.basepath + '/admin/ScheduleLecture', this.scheduleLectureForm.value).subscribe((res: any) => {
      if (res.success) {
        this.scheduleLectureForm.reset()
        this.getAllScheduledLecture()
      }
    }, (err: any) => {
      console.log(err);

    })

  }
}
