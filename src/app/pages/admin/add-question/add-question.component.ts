import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  id: any = 0;
  public Editor = ClassicEditor;
  question = {
    quiz: {
      id: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _active: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.id = this._active.snapshot.paramMap.get('id');
    this.question.quiz.id = this.id;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      // Swal.fire('Error', "content Can't be null", 'error');
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      // Swal.fire('Error', "option1 Can't be null", 'error');
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      // Swal.fire('Error', "option2 Can't be null", 'error');
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data) => {
        document.querySelector('form')?.reset();
        Swal.fire('Success', 'Question added', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Error while adding Question', 'error');
      }
    );
  }
}
