import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvaluatorComponent } from './dialog-evaluator.component';

describe('DialogEvaluatorComponent', () => {
  let component: DialogEvaluatorComponent;
  let fixture: ComponentFixture<DialogEvaluatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEvaluatorComponent]
    });
    fixture = TestBed.createComponent(DialogEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
