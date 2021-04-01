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

  displayedColumns: string[] = ['LocationId', 'Region', 'Area', 'PlayerId', 'PlayerName', 'LocationName'];

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

  ngOnDestroy() {
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
    if (region >= 1 && region <= 3) {
      this.sub1 = this.map.GetLocationsByRegion(region).subscribe((a: Location[]) => {
        this.locations = a;
      });
      this.result.isDone = true;
    }
    else {
      this.result.isDone = false;
      this.result.info = "The region entered is invalid!";
    }
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
    });
  }

  NextRegion() {
    this.selectedRegion++;
    this.GetLocationsByRegion(this.selectedRegion);
  }

  PreviousRegion() {
    this.selectedRegion--;
    this.GetLocationsByRegion(this.selectedRegion);
  }

  Reset() {
    this.result = new Result();
  }
}
