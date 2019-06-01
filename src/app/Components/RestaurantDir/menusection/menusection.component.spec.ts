import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusectionComponent } from './menusection.component';

describe('MenusectionComponent', () => {
  let component: MenusectionComponent;
  let fixture: ComponentFixture<MenusectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
