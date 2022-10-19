import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCellComponent } from './slider-cell.component';

describe('SliderCellComponent', () => {
  let component: SliderCellComponent;
  let fixture: ComponentFixture<SliderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
