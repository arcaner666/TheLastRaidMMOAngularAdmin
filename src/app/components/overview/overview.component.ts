import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  CheckAPI() {
    this.sub1 = this.auth.CheckAPI().subscribe(a => {
      console.log(a);
    }, error => {
      console.log(error);
    });
  }
}
