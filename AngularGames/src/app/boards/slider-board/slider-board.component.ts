import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slider-board',
  templateUrl: './slider-board.component.html',
  styleUrls: ['./slider-board.component.scss']
})
export class SliderBoardComponent implements OnInit {

// ---------- CONFIG ----------
width:number = 4;
height:number = 4;
cellSize:number = 80;
spacing:number = 6;

starterValues: number[] = [2, 4];

@HostListener('window:keydown.arrowup', ['$event'])
handleArrowUp(event: KeyboardEvent) {
  console.log("arrow up");
  this.showSnackBar("arrow up");
}
@HostListener('window:keydown.arrowleft', ['$event'])
handleArrowLeft(event: KeyboardEvent) {
  console.log("arrow left");
  this.showSnackBar("arrow left");

}
@HostListener('window:keydown.arrowright', ['$event'])
handleArrowRight(event: KeyboardEvent) {
  console.log("arrow right");
  this.showSnackBar("arrow right");

}
@HostListener('window:keydown.arrowdown', ['$event'])
handleArrowDown(event: KeyboardEvent) {
  console.log("arrow down");
  this.showSnackBar("arrow down");

}

// ---------- LIFE CYCLE -----------

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

// ---------- EVENTS ----------


// ---------- METHODS ----------

showSnackBar(message:string) {
  let config = new MatSnackBarConfig;
  config.duration = 3000;
  this._snackBar.open(message,'', config);
}

getRandomStarter():number {
  return this.starterValues[Math.floor(Math.random()*this.starterValues.length)]
}

}
