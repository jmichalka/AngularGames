import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() initialValue: Number = 0;

  displayValue:Number = 0;

  constructor() { }

  ngOnInit(): void {
    this.displayValue = this.initialValue;

  }

}
