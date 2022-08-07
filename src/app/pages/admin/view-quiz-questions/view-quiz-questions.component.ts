import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  id: any;
  tittle: any;
  question: any = [];

  constructor(
    private _activeRoute: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.paramMap.get('id');
    this.tittle = this._activeRoute.snapshot.paramMap.get('title');
    this._question.getQuestionsOfQuiz(this.id).subscribe(
      (data) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        Swal.fire('Error', 'Error in adding Question', 'error');
      }
    );
  }

  deleteQuestion(quesId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'are you sure , want to delete this question?',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this._question.deleteQuestion(quesId).subscribe((data) => {
            Swal.fire('Success', 'Question deleted', 'success');
          });

          this.question = this.question.filter((q: any) => q.quesId != quesId);
        }
      },
      (error) => {
        Swal.fire('Error', 'Error in deleting', 'error');
      }
    );
  }
}
