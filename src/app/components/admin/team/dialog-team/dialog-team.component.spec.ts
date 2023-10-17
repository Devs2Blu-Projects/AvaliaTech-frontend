import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeamComponent } from './dialog-team.component';

describe('DialogTeamComponent', () => {
  let component: DialogTeamComponent;
  let fixture: ComponentFixture<DialogTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTeamComponent]
    });
    fixture = TestBed.createComponent(DialogTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
