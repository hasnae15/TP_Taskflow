import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';
import { TaskService } from '../services/task.service';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three tasks initially', () => {
    expect(component.filteredTasks().length).toBe(3);
  });

  it('should add a task and update the count', () => {
    component.newTitle.set('Nouvelle tâche');
    component.addTask();

    expect(component.filteredTasks().length).toBe(4);
    expect(service.count()).toBe(4);
    expect(component.newTitle()).toBe('');
  });

  it('should not add an empty task', () => {
    component.newTitle.set('   ');
    component.addTask();

    expect(component.filteredTasks().length).toBe(3);
  });

  it('should filter tasks by query', () => {
    component.query.set('angular');

    expect(component.filteredTasks().length).toBe(2);
  });

  it('should hide completed tasks when requested', () => {
    component.toggleTask(1);
    component.showCompleted.set(false);

    expect(component.filteredTasks().length).toBe(2);
  });

  it('should remove one task', () => {
    component.removeTask(2);

    expect(service.count()).toBe(2);
  });

  it('should clear all tasks', () => {
    component.clearTasks();

    expect(service.count()).toBe(0);
  });

  it('should restore three tasks', () => {
    component.clearTasks();
    component.restoreTasks();

    expect(service.count()).toBe(3);
  });

  it('should show the empty message after clearing', () => {
    component.clearTasks();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.empty-state')?.textContent).toContain('Aucune tâche disponible');
  });
});
