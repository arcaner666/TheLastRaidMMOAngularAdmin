import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public readonly apiUrl = "https://localhost:44336/api/admin/";

  constructor(
    public http: HttpClient
  ) { }

  GetLocationsByRegion(region: number) {
    return this.http.get(this.apiUrl + "getlocationsbyregion/" + region);
  }

  CreateLocations(region: number, area: number) {
    return this.http.get(this.apiUrl + "createlocations/" + region + "/" + area);
  }

  DeleteLocations() {
    return this.http.get(this.apiUrl + "deletelocations");
  }
}
