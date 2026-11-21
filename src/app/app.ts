import { Component, computed, inject, signal } from '@angular/core';
import { Home } from './home/home';
import { About } from './about/about';
import { TaskList } from './task-list/task-list';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, About, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly taskService = inject(TaskService);

  title = signal('TaskFlow');

  canDelete = computed(() => this.taskService.count() > 0);

  rename() {
    this.title.set('Mes tâches');
  }

  deleteAll() {
    this.taskService.clear();
  }
}
