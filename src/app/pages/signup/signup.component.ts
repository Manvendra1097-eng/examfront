import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    if (this.user.username === '' || this.user.username === null) {
      this._snackBar.open('username must not be empty!', 'ok', {
        duration: 3000,
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['login']);
        Swal.fire(
          'Registration Completed',
          'your user id is ' + data.id,
          'success'
        );
      },
      (error) =>
        this._snackBar.open('Registration fail!', 'ok', {
          duration: 3000,
        })
    );
  }
}
