import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  
  // Math = Math;

  @Input() id;

  @Input() initialValue:string;
  displayValue:String = "";
  
  @ViewChild("value") myDiv: ElementRef;

  leftBorderOn:boolean = false;
  rightBorderOn:boolean = false;
  topBorderOn:boolean = false;
  bottomBorderOn:boolean = true;

  ngOnInit(): void {
    // this.displayValue = this.initialValue.toString();
  }

  ngOnChanges():void {
    this.displayValue = this.initialValue.toString();
    console.log("CHANGE");
  }

  focus(event: any) {
    // this.myDiv.nativeElement.focus();
    event.target.focus();
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
