import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriterionComponent } from './dialog-criterion.component';

describe('DialogCriterionComponent', () => {
  let component: DialogCriterionComponent;
  let fixture: ComponentFixture<DialogCriterionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCriterionComponent]
    });
    fixture = TestBed.createComponent(DialogCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
