import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvaluatorsComponent } from './list-evaluators.component';

describe('ListEvaluatorsComponent', () => {
  let component: ListEvaluatorsComponent;
  let fixture: ComponentFixture<ListEvaluatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEvaluatorsComponent]
    });
    fixture = TestBed.createComponent(ListEvaluatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
