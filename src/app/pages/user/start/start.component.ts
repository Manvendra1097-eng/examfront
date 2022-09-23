import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  id: any;
  questions: any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmited = false;

  constructor(
    private location: LocationStrategy,
    private _active: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.id = this._active.snapshot.paramMap.get('id');
    this.loadQuestion();
  }
  loadQuestion() {
    this._question.getQuestionsOfQuizForTest(this.id).subscribe(
      (data) => {
        this.questions = data;
        console.log(this.questions);
        this.questions.forEach((element: any) => {
          element['givenAnswer'] = '';
        });
      },
      (error) => Swal.fire('error', 'Error while fetching data', 'error')
    );
  }

  preventBackButton() {
    history.pushState(null, '', window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: "Don't Submit",
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        // calculation
        this.isSubmited = true;
        this.questions.forEach((q: any) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswer++;
            let singleMarks =
              this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += singleMarks;
          }

          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }
        });
        console.log('correct answers ' + this.correctAnswer);
        console.log('marks got ' + this.marksGot);
        console.log('attempted ' + this.attempted);
      }
    });
  }
}
