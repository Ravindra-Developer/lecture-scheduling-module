import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScheduleLectureComponent } from './schedule-lecture/schedule-lecture.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "schedule-lecture", component: ScheduleLectureComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "add-course", component: AddCourseComponent },
  { path: "add-instructor", component: AddInstructorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
