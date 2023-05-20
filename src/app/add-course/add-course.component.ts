import { Component, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [MessageService]
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

  constructor(private global: GlobalService, private fb: FormBuilder, private messageService: MessageService) { }
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
        this.addCourseForm.controls['level'].setValue('')
        this.getAllCourses()
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Course Added Successfully' });
      }
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: 'Internal server error' });
    })
  }

  addBatch() {
    this.global.post(this.global.basepath + '/admin/addBatchToCourse', { course_id: this.course_id, batchName: this.batchName }).subscribe((res: any) => {
      if (res.success) {
        this.getAllCourses()
        this.batchName = ""
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Batch added successfully' });
      }
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: 'Internal server error' });
    })
  }

  closeModal(){
    this.addCourseForm.reset()
    this.addCourseForm.controls['level'].setValue('')
    this.batchName = ""
  }
}
