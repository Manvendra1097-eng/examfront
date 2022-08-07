import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css'],
})
export class SidebarUserComponent implements OnInit {
  category: any;
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data) => {
        this.category = data;
      },
      (error) => {
        this._snack.open('Error in loading data', 'ok', {
          duration: 3000,
        });
      }
    );
  }
}
