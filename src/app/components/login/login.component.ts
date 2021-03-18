import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Result } from 'src/app/models/Result';
import { Player } from 'src/app/models/Player';
import { SessionRecord } from './../../models/SessionRecord';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  player: Player = new Player();
  sessionRecord: SessionRecord = new SessionRecord();
  result: Result = new Result();

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    public auth: AuthService,
    public router: Router
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
    this.sub1 = this.auth.Login(this.player).subscribe((a: Player) => {
      if (a != null) {
        console.log(a);
        localStorage.setItem("token", this.auth.GenerateToken(64));
        this.sessionRecord.PlayerID = a.PlayerID;
        this.sessionRecord.LoginTime = date.getTime().toString();
        this.sessionRecord.LogoutTime = "";
        this.sessionRecord.LoginData = "";
        this.sub2 = this.auth.AddSessionRecord(this.sessionRecord).subscribe((b: Result) => {
          console.log(b);
          localStorage.setItem("sessionId", b.info);
          this.router.navigate(['overview']);
        });
      }
      else {
        this.result.isDone = false;
        this.result.info = "Wrong username or password.";
        console.log(this.result.info);
        this.player = new Player();
      }
    }, error => {
      this.result.isDone = false;
      this.result.info = "Error: " + error;
      console.log(this.result.info);
    });
  }

  Reset() {
    this.result = new Result();
  }
}
