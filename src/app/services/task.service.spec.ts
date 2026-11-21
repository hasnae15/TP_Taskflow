import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should start with three tasks', () => {
    expect(service.count()).toBe(3);
  });

  it('should add a task with a new id', () => {
    service.add('Test');

    expect(service.count()).toBe(4);
    expect(service.tasks()[3].id).toBe(4);
  });

  it('should toggle completion and update computed counts', () => {
    service.toggle(1);

    expect(service.completedCount()).toBe(1);
    expect(service.pendingCount()).toBe(2);
  });

  it('should remove a task', () => {
    service.remove(1);

    expect(service.tasks().some(t => t.id === 1)).toBe(false);
  });
});
