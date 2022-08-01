import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = [];
  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    );
  }
}
