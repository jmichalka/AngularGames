import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-slider-cell',
  templateUrl: './slider-cell.component.html',
  styleUrls: ['./slider-cell.component.scss']
})
export class SliderCellComponent implements OnInit {

  @Input() value:number = 0;
  @Input() cellSize:number = 20;
  @Input() x:number = 0;
  @Input() y:number = 0;

  constructor() {
  }
  
  ngOnInit(): void {
    console.log(this.x, this.y);
    
  }

  ngOnChanges(): void {
  }

}
