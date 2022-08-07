import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _activateRoute: ActivatedRoute,
    private _quiz: QuizService,
    private _category: CategoryService,
    private _router: Router,
    private _location: Location
  ) {}

  id: any;
  quiz: any;
  categories: any;

  ngOnInit(): void {
    this.id = this._activateRoute.snapshot.paramMap.get('id');

    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error', 'Not able to load categories', 'error');
      }
    );

    this._quiz.getQuiz(this.id).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => console.log(error)
    );
  }

  // update
  updateFormSubmit() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Updated', 'Quiz Updated', 'success').then(() => {
          // this._router.navigate(['/admin/quizzes']);
          this._location.back();
        });
      },
      (error) => {
        Swal.fire('Error', 'Quiz not Updated', 'error');
      }
    );
  }
}
