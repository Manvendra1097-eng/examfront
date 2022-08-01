import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent implements OnInit {
  category = {
    tittle: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.category.tittle.trim() == '' || this.category.tittle == null) {
      this._snack.open('Title Required', 'ok', {
        duration: 3000,
      });
    }

    this.categoryService.addcategory(this.category).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Category added Succesfully', 'success');
        document.querySelector('form')?.reset();
      },
      (error) => {
        Swal.fire('Error', 'Error from Server', 'error');
      }
    );
  }
}
