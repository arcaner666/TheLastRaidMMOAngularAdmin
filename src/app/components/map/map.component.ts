import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from './../../services/map.service';
import { Location } from './../../models/Location';
import { Result } from './../../models/Result';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  locations: Location[];

  result: Result = new Result();

  displayedColumns: string[] = ['LocationId', 'Region', 'Area', 'PlayerId', 'LocationName'];
  dataSource = new MatTableDataSource<Location>();

  region: number;
  area: number;
  selectedRegion: number = 1;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  @ViewChild(MatSort) sort: MatSort;

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
    this.sub1 = this.map.GetLocationsByRegion(region).subscribe((a: Location[]) => {
      this.locations = a;
      this.dataSource = new MatTableDataSource<Location>(this.locations);
      this.dataSource.sort = this.sort;
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
