import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slider-board',
  templateUrl: './slider-board.component.html',
  styleUrls: ['./slider-board.component.scss'],
})
export class SliderBoardComponent implements OnInit {
  // ---------- CONFIG ----------
  width: number = 4;
  height: number = 4;
  cellSize: number = 80;
  spacing: number = 6;
  baseNumber: number = 2;

  starterPowers: number[] = [1, 2];

  cells = [];
  slots = [];
  
  
  // ---------- LIFE CYCLE -----------

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.slots = [...Array(this.width)].map(e => Array(this.height));
    this.addRandomCell();
    // console.log(this.slots);
  }

  // ---------- EVENTS ----------

  @HostListener('window:keydown.arrowup', ['$event'])
  handleArrowUp(event: KeyboardEvent | MouseEvent) {

    for (let j = 1 ; j < this.height; j++) {
      
      if (this.slots[0][j] !== undefined) {
        continue;
      }
      

      // For each slot starting at the top:

      // (NOT MATTER) If the slot is empty, go to the next one  
      // (NOT MATTER) If the slot is filled, do nothing


      // If the second slot is full, check if first slot is empty
        // If first slot is empty, move to first slot
        // If first slot is full, check for merge
          // (WAITING) If can merge, move to first slot, merge
          // (WAITING) If can't merge, do nothing
      
      // If third slot is full, find last empty slot
      // Move to last empty slot

    }



    // this.cells.forEach((cell) => {
    //   if (cell.y > this.spacing) {
    //     // cell.y -= this.cellSize + this.spacing;
    //     cell.y = this.spacing;
    //   }
    // });
    this.addRandomCell();
    this.showSnackBar('arrow up');
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleArrowLeft(event: KeyboardEvent | MouseEvent) {
    this.cells.forEach((cell) => {
      if (cell.x > this.spacing) {
        // cell.x -= this.cellSize + this.spacing;
        cell.x = this.spacing;

      }
    });
    this.addRandomCell();
    this.showSnackBar('arrow left');
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleArrowRight(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.cells.forEach((cell) => {
      if (cell.x < (this.width - 1) * (this.cellSize + this.spacing)) {
        // cell.x += this.cellSize + this.spacing;
        cell.x = (this.width - 1) * (this.cellSize + this.spacing) + this.spacing;
      }
    });
    this.addRandomCell();
    this.showSnackBar('arrow right');
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  handleArrowDown(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.cells.forEach((cell) => {
      if (cell.y < (this.height - 1) * (this.cellSize + this.spacing)) {
        // cell.y += this.cellSize + this.spacing;
        cell.y = (this.height - 1) * (this.cellSize + this.spacing) + this.spacing;
      }
    });
    this.addRandomCell();
    this.showSnackBar('arrow down');
  }

  // ---------- METHODS ----------

  moveCell():void {

  }

  mergeCells():void {
    
  }

  showSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(message, '', config);
  }

  getRandomStarter(): number {
    let power = this.starterPowers[
      Math.floor(Math.random() * this.starterPowers.length)];
    
    return Math.pow(this.baseNumber, power); 
  }

  addRandomCell(): void {
    
    // Get empty slots
    let emptyCells = [];

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.slots[i][j] === undefined) {
          emptyCells.push(i + this.width * j);
        }
      }
    }

    // Select random empty slot
    let randomCellIndex = Math.floor(Math.random() * emptyCells.length);
    
    let xIndex = randomCellIndex % this.height;
    let yIndex = Math.floor(randomCellIndex / this.height);

    // console.log(randomCellIndex);
    // console.log(emptyCells);
    // console.log(xIndex, yIndex);

    let newCell = {
      x: xIndex * (this.cellSize + this.spacing) + this.spacing,
      y: yIndex * (this.cellSize + this.spacing) + this.spacing,
      value: this.getRandomStarter(),
    };

    this.slots[xIndex][yIndex] = newCell;
    this.cells.push(newCell);
    
    console.log(xIndex, yIndex);

  }

}
