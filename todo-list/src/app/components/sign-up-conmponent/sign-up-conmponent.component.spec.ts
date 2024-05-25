import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpConmponentComponent } from './sign-up-conmponent.component';

describe('SignUpConmponentComponent', () => {
  let component: SignUpConmponentComponent;
  let fixture: ComponentFixture<SignUpConmponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpConmponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpConmponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
