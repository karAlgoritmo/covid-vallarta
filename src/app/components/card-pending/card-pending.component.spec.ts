import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPendingComponent } from './card-pending.component';

describe('CardPendingComponent', () => {
  let component: CardPendingComponent;
  let fixture: ComponentFixture<CardPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
