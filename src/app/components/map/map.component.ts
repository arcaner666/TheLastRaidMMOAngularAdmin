import { MapService } from './../../services/map.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result } from './../../models/Result';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  result: Result = new Result();

  region: number;
  area: number;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    public map: MapService
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

  CreateMap() {
    this.sub1 = this.map.CreateMap(this.region, this.area).subscribe((a: Result) => {
      if (a.isDone) {
        console.log(a.info);
      }
      else {
        console.log(a.info);
      }
    }, error => {
      console.log(error);
    });
  }

  DeleteMap() {
    this.sub2 = this.map.DeleteMap().subscribe((a: Result) => {
      if (a.isDone) {
        console.log(a.info);
      }
      else {
        console.log(a.info);
      }
    }, error => {
      console.log(error);
    });
  }

  Reset() {
    this.result = new Result();
  }
}
