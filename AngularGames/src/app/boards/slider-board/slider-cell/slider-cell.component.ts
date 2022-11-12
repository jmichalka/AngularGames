import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider-cell',
  templateUrl: './slider-cell.component.html',
  styleUrls: ['./slider-cell.component.scss'],
})
export class SliderCellComponent implements OnInit {
  @Input() value: number = 0;
  @Input() cellSize: number = 20;
  @Input() spacing: number = 0;
  @Input() xInd: number = 0;
  @Input() yInd: number = 0;

  xPos: number = 0;
  yPos: number = 0;


  constructor() {}

  // ---------- LIEFCYCLE ----------

  ngOnInit(): void {
    // console.log(this.xInd, this.yInd);
  }

  ngOnChanges(): void {
    this.xPos = this.xInd * (this.cellSize + this.spacing) + this.spacing;
    this.yPos = this.yInd * (this.cellSize + this.spacing) + this.spacing;
  }

  // Not sure how to implement this...
  ngOnDestroy(): void {
    // this.isDestroying = true;
  }
}
