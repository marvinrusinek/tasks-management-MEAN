import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  uri = 'http://localhost:4000/tasks';

  constructor(private http: HttpClient, private router: Router) {}

  addTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority) {
    const obj = {
      TaskTitle,
      TaskStatus,
      TaskDateStarted,
      TaskExpectedTime,
      TaskDuration,
      TaskPriority
    };

    console.log(obj);

    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getTasks() {
    return this.http.get(`${this.uri}`);
  }

  editTask(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority, id) {
    const obj = {
      TaskTitle,
      TaskStatus,
      TaskDateStarted,
      TaskExpectedTime,
      TaskDuration,
      TaskPriority
    };

    this.http.post(`${this.uri}/update/${id}`, obj).subscribe(res => this.router.navigate(['tasks']));
  }

  deleteTask(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }
}
