import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories: any = [];

  quiz = {
    tittle: '',
    description: '',
    maxMarks: '',
    noOfQuestion: '',
    active: false,
    category: [],
  };

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error', 'Not able to load categories', 'error');
      }
    );
  }

  addQuiz() {
    if (this.quiz.tittle.trim() == '' || this.quiz.tittle == null) {
      this._snack.open('Title required', 'ok', {
        duration: 3000,
      });
      return;
    }
    this._quiz.addQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz is added', 'success');
        document.querySelector('form')?.reset();
      },
      (error) => {
        Swal.fire('Error', 'Error while adding quiz', 'error');
      }
    );
  }
}
