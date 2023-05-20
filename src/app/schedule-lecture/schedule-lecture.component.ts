import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-schedule-lecture',
  templateUrl: './schedule-lecture.component.html',
  styleUrls: ['./schedule-lecture.component.scss'],
  providers: [MessageService]
})
export class ScheduleLectureComponent {
  scheduledLectures: any = []
  courses: any = [];
  AllInstructors: any = [];
  BatchArr: any = []

  constructor(public global: GlobalService, private fb: FormBuilder, private messageService: MessageService) { }
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
        } else {
          this.scheduleLectureForm.controls['batch'].clearValidators();
        }
        this.scheduleLectureForm.controls['batch'].updateValueAndValidity()
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
    let passdata = {
      lectureDate: this.scheduleLectureForm.controls['lectureDate'].value,
      course_id: this.scheduleLectureForm.controls['course_id'].value,
      batch: this.scheduleLectureForm.controls['batch'].value,
      InstructorId: this.scheduleLectureForm.controls['InstructorId'].value,
      admin_email: sessionStorage.getItem('admin_email')
    }
    this.global.post(this.global.basepath + '/admin/ScheduleLecture', passdata).subscribe((res: any) => {
      if (res.success) {
        this.scheduleLectureForm.reset()
        this.scheduleLectureForm.controls['InstructorId'].setValue('')
        this.scheduleLectureForm.controls["batch"].setValue('')
        this.scheduleLectureForm.controls["course_id"].setValue('')
        this.getAllScheduledLecture()
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Lecture Scheduled Successfully' });
      }
    }, (err: any) => {
      console.log(err);
      
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.msg });
    })
  }

  closeModal() {
    this.scheduleLectureForm.reset()
    this.scheduleLectureForm.controls['InstructorId'].setValue('')
    this.scheduleLectureForm.controls["batch"].setValue('')
    this.scheduleLectureForm.controls["course_id"].setValue('')
  }
}
