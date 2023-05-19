import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder, private global: GlobalService) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ["", Validators.required]
  })

  ngOnInit() {}

  login() {
    this.global.post(this.global.basepath + '/admin/login', this.loginForm.value).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/schedule-lecture'])
      }
    })
  }
}
