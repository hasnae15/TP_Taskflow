import { TaskColorPipe } from './task-color-pipe';

describe('TaskColorPipe', () => {
  let pipe: TaskColorPipe;

  beforeEach(() => {
    pipe = new TaskColorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return green for task id 1', () => {
    expect(pipe.transform(1)).toBe('green');
  });

  it('should return blue for task id 2', () => {
    expect(pipe.transform(2)).toBe('blue');
  });

  it('should return orange for other task ids', () => {
    expect(pipe.transform(3)).toBe('orange');
  });
});