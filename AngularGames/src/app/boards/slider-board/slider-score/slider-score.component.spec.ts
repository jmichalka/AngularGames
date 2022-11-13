import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderScoreComponent } from './slider-score.component';

describe('SliderScoreComponent', () => {
  let component: SliderScoreComponent;
  let fixture: ComponentFixture<SliderScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
