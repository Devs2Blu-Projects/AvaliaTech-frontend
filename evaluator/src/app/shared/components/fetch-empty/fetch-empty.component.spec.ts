import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRegistryComponent } from './fetch-empty.component';

describe('NoRegistryComponent', () => {
  let component: NoRegistryComponent;
  let fixture: ComponentFixture<NoRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoRegistryComponent]
    });
    fixture = TestBed.createComponent(NoRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
