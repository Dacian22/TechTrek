import {Component, Input} from '@angular/core';
import { type Task} from './task/task.model';
import {TaskService} from './task.service';


@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input() userId!: string;
  @Input() name?: string;
  @Input() tasks: Task[] = [];
  isAddingTask = false;
  constructor(private taskService: TaskService) {
  }

  get selectedUserTasks() {
    return this.taskService.getUserTasks(this.userId);
  }
  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }



}
