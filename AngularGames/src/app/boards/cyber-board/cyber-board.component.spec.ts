import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberBoardComponent } from './cyber-board.component';

describe('CyberBoardComponent', () => {
  let component: CyberBoardComponent;
  let fixture: ComponentFixture<CyberBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
