import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrator } from './../models/Administrator';
import { AdminSessionRecord } from '../models/AdminSessionRecord';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly apiUrl = "https://localhost:44342/api/admin/";
  public isLoggedIn: boolean = this.AuthControl();

  constructor(
    public http: HttpClient
  ) { }

  CheckAPI() {
    return this.http.get(this.apiUrl + "checkapi")
  }

  AuthControl() {
    var token = localStorage.getItem("token");
    if (token) {
      this.isLoggedIn = true;
      return true;
    }
    else {
      console.log("Token does not exist!");
      this.isLoggedIn = false;
      return false;
    }
  }

  Login(admin: Administrator) {
    return this.http.post(this.apiUrl + "login", admin);
  }

  AddSessionRecord(adminSessionRecord: AdminSessionRecord) {
    return this.http.post(this.apiUrl + "addsessionrecord", adminSessionRecord);
  }

  UpdateSessionRecord(adminSessionRecord: AdminSessionRecord) {
    return this.http.put(this.apiUrl + "updatesessionrecord/" + adminSessionRecord.AdminSessionRecordID, adminSessionRecord);
  }

  GetSessionRecord(sessionId: number) {
    return this.http.get(this.apiUrl + "getsessionrecord/" + sessionId);
  }

  GenerateToken(s: number) {
    var chars: string = "1234567890qwertyuiopasdfghjklzxcvbnm";
    var token: string = "";
    for (let i = 0; i < s; i++) {
      var r = Math.floor(Math.random() * chars.length);
      token += chars.charAt(r);
    }
    return token;
  }
}
