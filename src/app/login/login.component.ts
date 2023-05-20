import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder, private global: GlobalService, private messageService: MessageService) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ["", Validators.required]
  })

  ngOnInit() { }

  login() {
    this.global.post(this.global.basepath + '/admin/login', this.loginForm.value).subscribe((res: any) => {
      if (res.success) {
        sessionStorage.setItem("admin_email", String(this.loginForm.controls['email'].value))
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Login Success' });
        setTimeout(() => {
          this.router.navigate(['/schedule-lecture'])
        }, 500);
      }
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: 'Inavlid Credentials' });
    })
  }
}
