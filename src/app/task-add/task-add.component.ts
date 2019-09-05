import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  ngTaskAddForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private ts: TasksService) {
    this.createForm();
  }

  createForm() {
    this.ngTaskAddForm = this.fb.group({
      TaskTitle: ['', Validators.required ],
      TaskStatus: ['', Validators.required ],
      TaskDateStarted: ['', Validators.required ],
      TaskExpectedTime: ['', Validators.required ],
      TaskDuration: ['', Validators.required ],
      TaskPriority: ['', Validators.required ]
    });
  }

  addTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority) {
    this.ts.addTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority);
    this.router.navigate(['tasks']);
  }
}
