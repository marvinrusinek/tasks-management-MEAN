import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of, BehaviorSubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Task from './Task';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class TasksSearchService {

  private tasksUrl = 'http://localhost:4000/tasks';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* private results = new BehaviorSubject([]);

  public getResults$() {
    return this.results.asObservable();
  }

  public getSuggestion(name: string) {
    this.http.get(this.tasksUrl + 'task/' + name)
      .subscribe(
        (response:any[]) => this.results.next(response),
        this.handleError
      );
  } */

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET tasks from the server */
  getTasks() {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /** GET task by id. Return `undefined` when id not found */
  getTaskNo404<Data>(id: number) {
    const url = `${this.tasksUrl}/?id=${id}`;
    return this.http.get<Task[]>(url)
      .pipe(
        map(tasks => tasks[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} task id=${id}`);
        }),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number) {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /* GET tasks whose name contains search term */
  searchTasks(term: string) {
    if (!term.trim()) {
      // if not search term, return empty task array.
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found tasks matching "${term}"`)),
      catchError(this.handleError<Task[]>('searchTasks', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new task to the server */
  addTask(task: Task) {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask(task: Task | number) {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TaskService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }
}
