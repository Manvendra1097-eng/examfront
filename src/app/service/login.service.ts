import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // current user : which is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate token
  public getToken(loginDetail: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginDetail);
  }

  // set token in local Storage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // check login or not
  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token === undefined || token === '' || token === null) {
      return false;
    } else {
      return true;
    }
  }

  // logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    return true;
  }

  // getToken
  public getLocalToken() {
    return localStorage.getItem('token');
  }

  // set user details
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user Details
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
