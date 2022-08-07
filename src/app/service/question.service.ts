import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(id: any) {
    return this._http.get(`${baseUrl}/question/quiz/${id}`);
  }

  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }
  public deleteQuestion(qId: any) {
    return this._http.delete(`${baseUrl}/question/${qId}`);
  }
}
