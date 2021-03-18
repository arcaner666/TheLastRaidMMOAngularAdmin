import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AdminSessionRecord } from 'src/app/models/AdminSessionRecord';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  adminSessionRecord: AdminSessionRecord = new AdminSessionRecord();

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

  Logout() {
    this.sub1 = this.auth.GetSessionRecord(parseInt(localStorage.getItem("sessionId"))).subscribe((sr: AdminSessionRecord) => {
      var date: Date = new Date();
      this.adminSessionRecord = sr;
      this.adminSessionRecord.LogoutTime = date.getTime().toString();
      this.sub2 = this.auth.UpdateSessionRecord(this.adminSessionRecord).subscribe(a => {
        console.log(a);
        localStorage.removeItem("sessionId");
        localStorage.removeItem("token");
        this.auth.isLoggedIn = false;
        this.router.navigate(['']);
      });
    });
  }

}
