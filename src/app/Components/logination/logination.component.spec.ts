import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginationComponent } from './logination.component';

describe('LoginationComponent', () => {
  let component: LoginationComponent;
  let fixture: ComponentFixture<LoginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
