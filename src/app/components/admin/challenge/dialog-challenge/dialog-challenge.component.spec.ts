import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChallengeComponent } from './dialog-challenge.component';

describe('DialogProjectComponent', () => {
  let component: DialogChallengeComponent;
  let fixture: ComponentFixture<DialogChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChallengeComponent]
    });
    fixture = TestBed.createComponent(DialogChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
