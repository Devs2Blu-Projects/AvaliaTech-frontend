import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCreditsComponent } from './footer-credits.component';

describe('FooterCreditsComponent', () => {
  let component: FooterCreditsComponent;
  let fixture: ComponentFixture<FooterCreditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCreditsComponent]
    });
    fixture = TestBed.createComponent(FooterCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
