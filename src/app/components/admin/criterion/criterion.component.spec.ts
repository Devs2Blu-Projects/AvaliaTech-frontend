import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionComponent } from './criterion.component';

describe('CriterionComponent', () => {
  let component: CriterionComponent;
  let fixture: ComponentFixture<CriterionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriterionComponent]
    });
    fixture = TestBed.createComponent(CriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
