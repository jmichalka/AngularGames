import { Component, ViewChild, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.scss']
})
export class SudokuCellComponent implements OnInit {

  // Management
  @Input() id;

  // Values
  @Input() promptValue: number | undefined;
  @Input() possibleValues: number[] = [0];
  guessValue:Number;
  displayValue:String = "";
  @ViewChild("value") myDiv: ElementRef;

  // Create an event when the value is collapsed
  @Output() collapseEvent = new EventEmitter<object>();

  // Styling
  @Input() size;
  leftBorderOn:boolean = false;
  rightBorderOn:boolean = false;
  topBorderOn:boolean = false;
  bottomBorderOn:boolean = false;
  color = "white";

// ---------- LIFECYCLE ----------

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.displayValue = this.promptValue.toString();
    this.color = this.getColorFromDigit(Number(this.promptValue));
    // console.log(this.color);
  }

  ngOnChanges():void {
    this.displayValue = this.promptValue.toString();
  }

// ---------- EVENTS ----------

  focus(event: any) {
    // this.myDiv.nativeElement.focus();
    event.target.focus();
  }

  insertNumber(event: KeyboardEvent) {
    event.preventDefault();
    let number = parseInt(event.key);
    if (isNaN(number) || number < 0 || number > 9) {
      return;
    }
    this.displayValue = event.key.toString();
    this.color = this.getColorFromDigit(number);
  }

  dragStartHandler(event: any) {
    event.preventDefault();
  }

  dragHandler(event: any) {

  }

  dragEndHandler(event: any) {

  }

  collapseValue(event: any) {
    this.collapseEvent.emit({
      x: this.id.x,
      y: this.id.y,
      value: Number(event.target.innerText),
    });
  }

  // ---------- UTILITIES ----------
  private getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0")
    );
  }

  private getColorFromDigit(val:number):string {
    return `hsl(210, 10%, ${Math.floor(this.mapNumber(val, 0, 9, 5, 75))}%)`;
  }

  private mapNumber(val:number, inMin:number, inMax:number,
    outMin:number, outMax:number) {
      return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

}
