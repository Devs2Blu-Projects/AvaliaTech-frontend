import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssessmentComponent } from './dialog-assessment.component';

describe('DialogAssessmentComponent', () => {
  let component: DialogAssessmentComponent;
  let fixture: ComponentFixture<DialogAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAssessmentComponent]
    });
    fixture = TestBed.createComponent(DialogAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
