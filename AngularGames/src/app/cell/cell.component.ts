import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  
  @Input() initialValue: Number = 0;
  displayValue:String = "";
  
  @ViewChild("value") myDiv: ElementRef;

  ngOnInit(): void {
    this.displayValue = this.initialValue.toString();
  }

  focus(event: MouseEvent) {
    this.myDiv.nativeElement.focus();
  }

  insertNumber(event: KeyboardEvent) {
    let number = parseInt(event.key);
    event.preventDefault();
    if (isNaN(number) || number < 0 || number > 9) {
      return;
    }
    this.displayValue = event.key.toString();
  }
}
