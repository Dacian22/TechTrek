import {Component, signal, inject, computed} from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import {TasksService} from "../tasks.service";
import {Task, TASK_STATUS_OPTIONS, taskStatusProvider} from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusProvider]
})
export class TasksListComponent {
  private tasksService= inject(TasksService);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  tasks = computed(() => {
    const allTasks = this.tasksService.allTasks();
    switch (this.selectedFilter()) {
      case 'open':
        return allTasks().filter((task: Task) => task.status === 'OPEN');
      case 'in-progress':
        return allTasks().filter((task: Task) => task.status === 'IN_PROGRESS');
      case 'done':
        return allTasks().filter((task: Task) => task.status === 'DONE');
      default:
        return allTasks();
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
