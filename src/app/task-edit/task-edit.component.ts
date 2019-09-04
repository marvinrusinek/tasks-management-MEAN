import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  ngTaskEditForm: FormGroup;
  task: any = {};

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  constructor(private route: ActivatedRoute, private router: Router, private ts: TasksService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.ngTaskEditForm = this.fb.group({
      TaskTitle: ['', Validators.required ],
      TaskStatus: ['', Validators.required ],
      TaskDateStarted: ['', Validators.required ],
      TaskExpectedTime: ['', Validators.required ],
      TaskDuration: ['', Validators.required ],
      TaskPriority: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ts.editTask(params['id']).subscribe(res => {
        this.task = res;
      });
    });
  }

  updateTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority, id) {
    this.route.params.subscribe(params => {
      this.ts.updateTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority, params.id);
      this.router.navigate(['tasks']);
    });
  }
}
