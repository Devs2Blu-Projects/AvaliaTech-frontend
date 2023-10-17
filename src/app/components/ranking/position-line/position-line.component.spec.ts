import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionIconComponent } from './position-line.component';

describe('PositionIconComponent', () => {
  let component: PositionIconComponent;
  let fixture: ComponentFixture<PositionIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionIconComponent]
    });
    fixture = TestBed.createComponent(PositionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
