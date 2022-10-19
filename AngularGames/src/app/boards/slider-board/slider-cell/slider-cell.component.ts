import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider-cell',
  templateUrl: './slider-cell.component.html',
  styleUrls: ['./slider-cell.component.scss']
})
export class SliderCellComponent implements OnInit {

  @Input() value:number = 0;
  @Input() cellSize:number = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
