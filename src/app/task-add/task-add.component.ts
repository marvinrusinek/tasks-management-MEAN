import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {
  ngTaskAddForm: FormGroup;
  constructor(private fb: FormBuilder, private ts: TasksService) {
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

  ngOnInit() {
  }

  addTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority) {
    this.ts.addTask(TaskTitle, TaskStatus, TaskDateStarted, TaskExpectedTime, TaskDuration, TaskPriority);
  }
}
