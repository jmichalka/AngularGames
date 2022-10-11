import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosswordBoardComponent } from './crossword-board.component';

describe('CrosswordBoardComponent', () => {
  let component: CrosswordBoardComponent;
  let fixture: ComponentFixture<CrosswordBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrosswordBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrosswordBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
