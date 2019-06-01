import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForClientComponent } from './order-for-client.component';

describe('OrderForClientComponent', () => {
  let component: OrderForClientComponent;
  let fixture: ComponentFixture<OrderForClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderForClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
