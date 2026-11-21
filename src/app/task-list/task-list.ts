import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskColorPipe } from '../pipes/task-color-pipe';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, FormsModule, TaskColorPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  protected readonly taskService = inject(TaskService);

  newTitle = signal('');
  query = signal('');
  showCompleted = signal(true);

  filteredTasks = computed(() => {
    const q = this.query().trim().toLowerCase();
    const showDone = this.showCompleted();

    return this.taskService
      .tasks()
      .filter(t => t.title.toLowerCase().includes(q) && (showDone || !t.completed));
  });

  addTask() {
    const title = this.newTitle().trim();
    if (!title) {
      return;
    }
    this.taskService.add(title, new Date());
    this.newTitle.set('');
  }

  toggleTask(id: number) {
    this.taskService.toggle(id);
  }

  removeTask(id: number) {
    this.taskService.remove(id);
  }

  clearTasks() {
    this.taskService.clear();
  }

  restoreTasks() {
    this.taskService.restore();
  }

  toggleShowCompleted() {
    this.showCompleted.update(v => !v);
  }
}
