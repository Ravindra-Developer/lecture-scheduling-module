import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.scss']
})
export class AddInstructorComponent {
  levels: any = [
    { label: "Beginner" },
    { label: "Intermediate" },
    { label: "Advance" },
  ]
  @ViewChild('imgInput')
  imgInputVariable!: ElementRef;
  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']
  AllInstructors: any;

  constructor(private global: GlobalService, private fb: FormBuilder) { }
  addInstructorForm = this.fb.group({
    email: ["", Validators.required],
    InstructorName: ["", Validators.required],
  })
  batchName: any = ""
  courses: any = []
  course_id: any = ''
  ngOnInit() {
    this.getAllInstructors()
  }

  getAllInstructors() {
    this.global.get(this.global.basepath + '/admin/getAllInstructors').subscribe((res: any) => {
      this.AllInstructors = res.data
    })
  }

  addInstructor() {
    console.log(this.course_id, this.batchName);
    this.global.post(this.global.basepath + '/admin/addInstructor', this.addInstructorForm.value).subscribe((res: any) => {
      if (res.success) {
        this.addInstructorForm.reset()
        this.getAllInstructors()
      }
    })

  }
}
