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

  constructor(private global: GlobalService, private fb: FormBuilder) { }
  addCourseForm = this.fb.group({
    courseName: ["", Validators.required],
    level: ["", Validators.required],
    Description: ["", Validators.required],
    Image: ["", Validators.required]
  })
  batchName: any = ""
  courses: any = []
  course_id: any = ''
  ngOnInit() {
    this.getAllCourses()
  }

  getAllCourses() {
    this.global.get(this.global.basepath + '/admin/getAllCourses').subscribe((res: any) => {
      this.courses = res.data
    })
  }

  onUpload(event: any) {
    let file = event.target.files[0]
    console.log(file);
    let file_extension = file.name.split('.').pop();
    if (this.imageExtensionsArray.includes(file_extension)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let file: any = reader.result
        this.addCourseForm.controls['Image'].setValue(file);
      };
    }
    else {
      this.imgInputVariable.nativeElement.value = '';
    }
  }

  addCourse() {
    this.global.post(this.global.basepath + '/admin/addCourse', this.addCourseForm.value).subscribe((res: any) => {
      if (res.success) {
        this.addCourseForm.reset()
        this.getAllCourses()
      }
    })
  }

  addBatch() {
    console.log(this.course_id, this.batchName);
    this.global.post(this.global.basepath + '/admin/addBatchToCourse', { course_id: this.course_id, batchName: this.batchName }).subscribe((res:any)=>{
      if (res.success) {
        this.getAllCourses()
      }
    })

  }
}
