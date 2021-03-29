import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from './../../services/map.service';
import { Location } from './../../models/Location';
import { Result } from './../../models/Result';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  locations: Location[];

  result: Result = new Result();

  displayedColumns: string[] = ['LocationId', 'PlayerId', 'LocationName', 'Region', 'Area'];

  region: number;
  area: number;
  selectedRegion: number = 1;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(
    public map: MapService
  ) { }

  ngOnInit() {
    this.GetLocationsByRegion(this.selectedRegion);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  GetLocationsByRegion(region: number) {
    this.sub1 = this.map.GetLocationsByRegion(region).subscribe((a: Location[]) => {
      this.locations = a;
    }, error => {
      console.log(error);
    });
  }

  CreateLocations() {
    this.sub2 = this.map.CreateLocations(this.region, this.area).subscribe((a: Result) => {
      if (a.isDone) {
        this.GetLocationsByRegion(this.selectedRegion);
        console.log(a.info);
      }
      else {
        console.log(a.info);
      }
    }, error => {
      console.log(error);
    });
  }

  DeleteLocations() {
    this.sub3 = this.map.DeleteLocations().subscribe((a: Result) => {
      if (a.isDone) {
        this.GetLocationsByRegion(this.selectedRegion);
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
