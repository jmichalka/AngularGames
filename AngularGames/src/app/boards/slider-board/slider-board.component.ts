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
    this.slots = [...Array(this.width)].map((e) => Array(this.height).fill(undefined));
    this.addCell(1, 0, 2);
    this.addCell(1, 2, 4);
    // this.addCell(0, 2, 2);
    // this.addCell(1, 2, 2);
    // this.addCell(2, 2, 2);
    // this.addCell(3, 2, 2);
    // this.addRandomCell();
    console.table(this.getFlippedSlots());
  }

  // ---------- EVENTS ----------

  @HostListener('window:keydown.arrowup', ['$event'])
  handleArrowUp(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {

        if (this.slots[i][j] === undefined) {
          continue;
        }

        for (let v = j - 1; v >= 0; v--) {
          if (this.slots[i][v] === undefined) {
            this.moveCell(i, v + 1, i, v);
          } else if (this.slots[i][v + 1].value === this.slots[i][v].value) {
            // this.mergeCells(i, v + 1, i, v);
          }
        }
      }
    }
    this.addRandomCell();
    this.showSnackBar('arrow up');
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleArrowLeft(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {

        if (this.slots[i][j] === undefined) {
          continue;
        }

        for (let v = i - 1; v >= 0; v--) {

          if (this.slots[v][j] === undefined) {
            this.moveCell(v + 1, j, v, j);
          } else if (this.slots[v + 1][j].value === this.slots[v][j].value) {
            // this.mergeCells(v + 1, j, v, j);
          }
        }
      }
    }
    this.addRandomCell();
    this.showSnackBar('arrow left');
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleArrowRight(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();

    for (let i = this.width - 1; i >= 0; i--) {
      for (let j = 0; j < this.height; j++) {

        if (this.slots[i][j] === undefined) {
          continue;
        }

        for (let v = i + 1; v < this.width; v++) {
 
          if (this.slots[v][j] === undefined) {
            this.moveCell(v - 1, j, v, j);
          } else if (this.slots[v - 1][j].value === this.slots[v][j].value) {
            // this.mergeCells(v - 1, j, v, j);
          }
        }
      }
    }
    this.addRandomCell();
    this.showSnackBar('arrow right');
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  handleArrowDown(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();

    for (let i = 0; i < this.width; i++) {
      for (let j = this.height - 1; j >= 0; j--) {

        if (this.slots[i][j] === undefined) {
          continue;
        }

        for (let v = j + 1; v < this.height; v++) {

          if (this.slots[i][v] === undefined) {
            this.moveCell(i, v - 1, i, v);
          } else if (this.slots[i][v - 1].value === this.slots[i][v].value) {
            // this.mergeCells(i, v - 1, i, v);
          }
        }
      }
    }
    this.addRandomCell();
    this.showSnackBar('arrow down');
  }

  // ---------- METHODS ----------

  moveCell(xStart, yStart, xEnd, yEnd): void {
    // Adjustment in list
    console.log(`Moving from ${xStart}, ${yStart} to ${xEnd}, ${yEnd}`)
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
    // console.log(startCell.value, endCell.value);
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

    console.table(this.getFlippedSlots());
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

  getFlippedSlots() {
    let flippedSlots = [...Array(this.width)].map((e) => Array(this.height).fill(undefined));
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        flippedSlots[i][j] = this.slots[j][i];
      }
    }

    return flippedSlots;
  }
}
