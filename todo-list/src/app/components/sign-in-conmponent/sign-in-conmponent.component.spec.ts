import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInConmponentComponent } from './sign-in-conmponent.component';

describe('SignInConmponentComponent', () => {
  let component: SignInConmponentComponent;
  let fixture: ComponentFixture<SignInConmponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInConmponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInConmponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
