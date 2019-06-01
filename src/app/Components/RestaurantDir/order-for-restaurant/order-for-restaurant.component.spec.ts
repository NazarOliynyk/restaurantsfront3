import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForRestaurantComponent } from './order-for-restaurant.component';

describe('OrderForRestaurantComponent', () => {
  let component: OrderForRestaurantComponent;
  let fixture: ComponentFixture<OrderForRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderForRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderForRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
