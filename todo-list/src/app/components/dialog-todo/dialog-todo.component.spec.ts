import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTodoComponent } from './dialog-todo.component';

describe('DialogTodoComponent', () => {
  let component: DialogTodoComponent;
  let fixture: ComponentFixture<DialogTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
