import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewEventComponent } from './form-new-event.component';

describe('FormNewEventComponent', () => {
  let component: FormNewEventComponent;
  let fixture: ComponentFixture<FormNewEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewEventComponent]
    });
    fixture = TestBed.createComponent(FormNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
