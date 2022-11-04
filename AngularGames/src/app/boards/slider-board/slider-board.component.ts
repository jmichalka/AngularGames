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
    this.slots = [...Array(this.width)].map((e) => Array(this.height));
    // this.setCells(0, 0, 2);
    this.addCell(0, 1, 2);
    this.addCell(0, 2, 2);
    // this.addRandomCell();
    // console.log(this.slots);
  }

  // ---------- EVENTS ----------

  @HostListener('window:keydown.arrowup', ['$event'])
  handleArrowUp(event: KeyboardEvent | MouseEvent) {

    // Do this for every column, iterate i
    for (let i = 0; i < this.width; i++) {

      // Do this for every cell in a column, iterate j
      for (let j = 0; j < this.height; j++) {

        // Is anything in this cell? If not, skip
        if (this.slots[i][j] === undefined) {
          // console.log('empty');
          continue;
        }

        // Iterate through all slots in column for move/merge
        for (let v = j; v > 0; v--) {
          // Checking this slot for if it's undefined so we can move there
          if (this.slots[i][v - 1] === undefined) {
            // Move to that space
            console.log("Moving");
            this.moveCell(i, v, i, v - 1);
          } else if (this.slots[i][v].value === this.slots[i][v - 1].value) {
            console.log("Merging");
            console.log(this.cells.length);
            this.mergeCells(i, v, i, v - 1);
            console.log(this.cells.length);
          }
        }
      }
    }
    this.showSnackBar('arrow up');
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleArrowLeft(event: KeyboardEvent | MouseEvent) {
    this.cells.forEach((cell) => {
      if (cell.x > 0) {
        cell.x = 0;
      }
    });
    this.addRandomCell();
    this.showSnackBar('arrow left');
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleArrowRight(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.cells.forEach((cell) => {
      if (cell.x < this.width - 1) {
        cell.x = this.width - 1;
      }
    });
    this.addRandomCell();
    this.showSnackBar('arrow right');
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  handleArrowDown(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.cells.forEach((cell) => {
      if (cell.y < this.height - 1) {
        cell.y = this.height - 1;
      }
    });
    this.addRandomCell();
    this.showSnackBar('arrow down');
  }

  // ---------- METHODS ----------

  moveCell(xStart, yStart, xEnd, yEnd): void {
    // Adjustment in list
    const cell = this.slots[xStart][yStart];
    cell.x = xEnd;
    cell.y = yEnd;

    // Adjustment in grid
    this.slots[xEnd][yEnd] = this.slots[xStart][yStart];
    this.slots[xStart][yStart] = undefined;
  }

  mergeCells(xStart, yStart, xEnd, yEnd): void {

    // Adjustment in list
    const startCell = this.slots[xStart][yStart];
    const endCell = this.slots[xEnd][yEnd];

    startCell.x = xEnd;
    startCell.y = yEnd;
    startCell.value += endCell.value;
    console.log(startCell.value, endCell.value);
    this.removeCell(endCell.x, endCell.y);

    // Adjustment in grid
    this.slots[xEnd][yEnd] = this.slots[xStart][yStart];

    // this.slots[xStart][yStart] = undefined;
  }

  showSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(message, '', config);
  }

  getRandomStarter(): number {
    let power =
      this.starterPowers[Math.floor(Math.random() * this.starterPowers.length)];

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
      x: xIndex,
      y: yIndex,
      value: this.getRandomStarter(),
      hasMerged: false,
    };

    this.slots[xIndex][yIndex] = newCell;
    this.cells.push(newCell);

    console.log(xIndex, yIndex);
  }

  addCell(x, y, val): void {
    let newCell = {
      x: x,
      y: y,
      value: val,
      hasMerged: false,
    };

    this.slots[x][y] = newCell;
    this.cells.push(newCell);
  }

  removeCell(x, y) {
    const cell = this.slots[x][y];

    this.slots[x][y] = undefined;
    this.cells.splice(this.cells.indexOf(cell), 1);
  }
}
