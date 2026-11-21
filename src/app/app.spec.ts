import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TaskService } from './services/task.service';

describe('App', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render TaskFlow title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TaskFlow');
  });

  it('should rename the title (signal)', () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;

    component.rename();

    expect(component.title()).toBe('Mes tâches');
  });

  it('should disable delete when there are no tasks', () => {
    const fixture = TestBed.createComponent(App);
    const service = TestBed.inject(TaskService);

    expect(fixture.componentInstance.canDelete()).toBe(true);

    service.clear();

    expect(fixture.componentInstance.canDelete()).toBe(false);
  });

});
