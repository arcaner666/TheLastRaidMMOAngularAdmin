import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Result } from 'src/app/models/Result';
import { Administrator } from './../../models/Administrator';
import { AdminSessionRecord } from 'src/app/models/AdminSessionRecord';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  admin: Administrator = new Administrator();
  adminSessionRecord: AdminSessionRecord = new AdminSessionRecord();
  result: Result = new Result();

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  Login() {
    this.result = new Result();
    var date: Date = new Date();
    this.sub1 = this.auth.Login(this.admin).subscribe((a: Administrator) => {
      if (a != null) {
        console.log(a);
        localStorage.setItem("token", this.auth.GenerateToken(64));
        this.adminSessionRecord.AdministratorId = a.AdministratorId;
        this.adminSessionRecord.LoginTime = date.getTime().toString();
        this.adminSessionRecord.LogoutTime = "";
        this.adminSessionRecord.LoginData = "";
        this.sub2 = this.auth.AddSessionRecord(this.adminSessionRecord).subscribe((b: Result) => {
          console.log(b);
          localStorage.setItem("sessionId", b.value.toString());
          this.router.navigate(['overview']);
        });
      }
      else {
        this.result.isDone = false;
        this.result.info = "Wrong username or password.";
        console.log(this.result.info);
        this.admin = new Administrator();
      }
    });
  }

  Reset() {
    this.result = new Result();
  }
}
