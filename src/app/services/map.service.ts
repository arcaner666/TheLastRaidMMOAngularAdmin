import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public readonly apiUrl = "https://localhost:44342/api/admin/";

  constructor(
    public http: HttpClient
  ) { }

  CreateMap(region: number, area: number) {
    return this.http.get(this.apiUrl + "createmap/" + region + "/" + area);
  }

  DeleteMap() {
    return this.http.get(this.apiUrl + "deletemap");
  }
}
