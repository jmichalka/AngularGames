import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  
  // Math = Math;

  @Input() id;
  @Input() cellSize;

  @Input() initialValue:string;
  displayValue:String = "";
  
  @ViewChild("value") myDiv: ElementRef;

  leftBorderOn:boolean = false;
  rightBorderOn:boolean = false;
  topBorderOn:boolean = false;
  bottomBorderOn:boolean = true;

  offsetX = 0;
  offsetY = 0;
  boardOffsetX = 0;
  boardOffsetY = 0;
  offsetOutX = '0px';
  offsetOutY = '0px';
  color = "white";


// ---------- LIFECYCLE ----------

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.displayValue = this.initialValue;
    this.color = this.getColorFromDigit(Number(this.initialValue));
    // console.log(this.color);
  }

  ngOnChanges():void {
    this.displayValue = this.initialValue;
    // this.offsetX = Math.floor(Math.random() * 10);
    // this.offsetY = Math.floor(Math.random() * 10);
    this.updateOut();
    // console.log("CHANGE");
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
    // this.boardOffsetX = 
    //   this.elRef.nativeElement.parentElement.offsetLeft
    //   + this.elRef.nativeElement.parentElement.parentElement.offsetLeft;
    // this.boardOffsetY = 
    //   this.elRef.nativeElement.parentElement.parentElement.offsetTop;
  }

  dragHandler(event: any) {
    // this.offsetX = event.clientX - this.boardOffsetX;
    // this.offsetY = event.clientY - this.boardOffsetY;
    // this.updateOut();
  }

  dragEndHandler(event: any) {
    // this.offsetX = 0;
    // this.offsetY = 0;
    // this.updateOut();
  }

  // ---------- UTILITIES ----------
  getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0")
    );
  }

  getColorFromDigit(val:number):string {
    return `hsl(210, 10%, ${Math.floor(this.mapNumber(val, 0, 9, 5, 75))}%)`;
  }

  mapNumber(val:number, inMin:number, inMax:number,
    outMin:number, outMax:number) {
      return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

  updateOut() {
    this.offsetOutX = this.offsetX + 'px';
    this.offsetOutY = this.offsetY + 'px';
  }

}
