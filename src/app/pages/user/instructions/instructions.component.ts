import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  id: any;
  quiz: any;

  constructor(
    private _active: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._active.snapshot.paramMap.get('id');
    this._quiz.getQuiz(this.id).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error', 'Error while fetching question', 'error');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.id]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
