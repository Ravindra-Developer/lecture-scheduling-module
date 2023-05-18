import { Component, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  levels: any = [
    { label: "Beginner" },
    { label: "Intermediate" },
    { label: "Advance" },
  ]
  @ViewChild('imgInput')
  imgInputVariable!: ElementRef;
  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']
  file: any;

  constructor(private global: GlobalService, private fb: FormBuilder) { }
  addCourseForm = this.fb.group({
    courseName: ["", Validators.required],
    level: ["", Validators.required],
    Description: ["", Validators.required]
  })

  courses: any = []
  ngOnInit() {
    this.getAllCourses()
  }

  getAllCourses() {
    this.global.get(this.global.basepath + '/admin/getAllCourses').subscribe((res: any) => {
      console.log(res);
      
      this.courses = res.data
    })
  }

  onUpload(event: any) {
    let file = event.target.files[0]
    console.log(file);
    let file_extension = file.name.split('.').pop();
    if (this.imageExtensionsArray.includes(file_extension)) {
      this.file = file
      console.log(this.file);
    }
    else {
      this.imgInputVariable.nativeElement.value = '';
    }
  }

  addCourse() {
    console.log(this.addCourseForm.value);

    let formData = new FormData()
    formData.append('courseName', String(this.addCourseForm.controls['courseName'].value))

  }
}
