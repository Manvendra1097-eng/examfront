import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  public deletQuiz(Id: number) {
    return this._http.delete(`${baseUrl}/quiz/${Id}`);
  }

  // get single quiz
  public getQuiz(id: number) {
    return this._http.get(`${baseUrl}/quiz/${id}`);
  }

  // update quiz
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  // get quizzess of category
  public getQuizzesOfCategory(cId: any) {
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }

  // get active quizzes
  public getActiveQuizzess() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizzessOfCategory(cId: any) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
