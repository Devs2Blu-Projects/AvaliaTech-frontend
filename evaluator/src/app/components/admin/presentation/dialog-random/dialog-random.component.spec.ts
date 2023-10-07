import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRandomComponent } from './dialog-random.component';

describe('DialogRandomComponent', () => {
  let component: DialogRandomComponent;
  let fixture: ComponentFixture<DialogRandomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRandomComponent]
    });
    fixture = TestBed.createComponent(DialogRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
