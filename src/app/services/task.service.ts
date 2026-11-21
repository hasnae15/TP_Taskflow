import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task.model';

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Lire le cours Angular', completed: false, dueDate: new Date(2026, 10, 18) },
  { id: 2, title: 'Installer Angular CLI', completed: false, dueDate: new Date(2026, 10, 19) },
  { id: 3, title: 'Créer mon application TaskFlow', completed: false, dueDate: new Date(2026, 10, 20) }
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly state = signal<Task[]>([...INITIAL_TASKS]);

  readonly tasks = this.state.asReadonly();

  readonly count = computed(() => this.state().length);
  readonly completedCount = computed(() => this.state().filter(t => t.completed).length);
  readonly pendingCount = computed(() => this.count() - this.completedCount());

  add(title: string, dueDate?: Date): void {
    const nextId = Math.max(0, ...this.state().map(t => t.id)) + 1;
    const task: Task = { id: nextId, title, completed: false, dueDate };
    this.state.update(items => [...items, task]);
  }

  toggle(id: number): void {
    this.state.update(items =>
      items.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  remove(id: number): void {
    this.state.update(items => items.filter(t => t.id !== id));
  }

  clear(): void {
    this.state.set([]);
  }

  restore(): void {
    this.state.set([...INITIAL_TASKS]);
  }
}
