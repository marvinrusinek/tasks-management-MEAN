import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import Task from '../Task';
import { TasksService } from '../tasks.service';
import { TasksSearchService } from '../taskssearch.service';


@Component({
  selector: 'app-task-get',
  templateUrl: './task-get.component.html',
  styleUrls: ['./task-get.component.scss']
})
export class TaskGetComponent implements OnInit {
  tasks: Task[];
  @Input() value = 0;
  private currentSortColumn = '';
  private reverse = false;
  tasks$: Observable<Task[]>;
  private searchTerms = new Subject<string>();

  toggleSortOrder(column: string) {
    if (column === this.currentSortColumn) {
      this.tasks.reverse();
      this.reverse = !this.reverse;
    } else {
      this.currentSortColumn = column;
      this.reverse = false;
      this.tasks.sort((itemOne, itemTwo) =>
        (itemOne[column] < itemTwo[column]) ? -1 :
          (itemOne[column] > itemTwo[column]) ? 1 : 0
      );
    }
  }

  arrow(column: string) {
    if (this.currentSortColumn === column) {
      return this.reverse ? '▲' : '▼';
    }
  }

  constructor(private tasksService: TasksService, private tasksSearchService: TasksSearchService) {}

  // Push a search term into the observable stram.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
    });

    this.tasks$ = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.tasksSearchService.searchTasks(term))
    );
  }

  deleteTask(id) {
    this.tasksService.deleteTask(id).subscribe(res => {
      this.tasks.splice(id, 1);
    });
  }
}
