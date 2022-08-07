import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  public loginDetail = {
    username: '',
    password: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginDetail.username.trim() === '' ||
      this.loginDetail.username === null
    ) {
      this._snackBar.open('username must not be empty!', 'ok', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginDetail.password.trim() === '' ||
      this.loginDetail.password === null
    ) {
      this._snackBar.open('password must not be empty!', 'ok', {
        duration: 3000,
      });
      return;
    }

    this.loginService.getToken(this.loginDetail).subscribe(
      (data: any) => {
        // Swal.fire('Success', 'your user token is generated', 'success');
        this.loginService.loginUser(data.token);

        // get current user and save in local storage
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
        });

        if (this.loginService.getUserRole() === 'ADMIN') {
          // route to admin dashboard
          this.router.navigateByUrl('/admin');
        } else if (this.loginService.getUserRole() === 'NORMAL') {
          // goto normal user dashboard
          this.router.navigateByUrl('/user-dashboard/0');
        } else {
          this.loginService.logout();
        }
      },
      (error) =>
        this._snackBar.open('Invalid username or password', 'ok', {
          duration: 3000,
        })
    );
  }
}
