import { Dir, Direction } from '@angular/cdk/bidi';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const Directions = Object.freeze({
  Up: Symbol('up'),
  Down: Symbol('down'),
  Left: Symbol('left'),
  Right: Symbol('right'),
});

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
  isSliding: boolean = false;

  score: number = 9999;

  // ---------- LIFE CYCLE -----------

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setup();
  }

  // ---------- EVENTS ----------

  @HostListener('window:keydown.arrowup', ['$event'])
  handleArrowUp(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.slide(Directions.Up);
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleArrowLeft(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.slide(Directions.Left);
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleArrowRight(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.slide(Directions.Right);
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  handleArrowDown(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    this.slide(Directions.Down);
  }

  // ---------- METHODS ----------

  setup(): void {
    this.slots = [...Array(this.width)].map((e) =>
      Array(this.height).fill(undefined)
    );
    this.cells = [];

    
    this.addCell(1, 0, 2);
    this.addCell(1, 2, 4);

    this.updateScore();

    console.table(this.getFlippedSlots());
  }

  slide(direction) {
    this.isSliding = false;

    switch (direction) {
      case Directions.Up:
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.height; j++) {
            if (this.slots[i][j] === undefined) {
              continue;
            }

            for (let v = j - 1; v >= 0; v--) {
              if (this.slots[i][v] === undefined) {
                this.moveCell(i, v + 1, i, v);
              } else if (
                this.slots[i][v + 1].value === this.slots[i][v].value
              ) {
                this.mergeCells(i, v + 1, i, v);
              }
            }
          }
        }
        break;
      case Directions.Down:
        for (let i = 0; i < this.width; i++) {
          for (let j = this.height - 1; j >= 0; j--) {
            if (this.slots[i][j] === undefined) {
              continue;
            }

            for (let v = j + 1; v < this.height; v++) {
              if (this.slots[i][v] === undefined) {
                this.moveCell(i, v - 1, i, v);
              } else if (
                this.slots[i][v - 1].value === this.slots[i][v].value
              ) {
                this.mergeCells(i, v - 1, i, v);
              }
            }
          }
        }
        break;
      case Directions.Left:
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.height; j++) {
            if (this.slots[i][j] === undefined) {
              continue;
            }

            for (let v = i - 1; v >= 0; v--) {
              if (this.slots[v][j] === undefined) {
                this.moveCell(v + 1, j, v, j);
              } else if (
                this.slots[v + 1][j].value === this.slots[v][j].value
              ) {
                this.mergeCells(v + 1, j, v, j);
              }
            }
          }
        }
        break;
      case Directions.Right:
        for (let i = this.width - 1; i >= 0; i--) {
          for (let j = 0; j < this.height; j++) {
            if (this.slots[i][j] === undefined) {
              continue;
            }

            for (let v = i + 1; v < this.width; v++) {
              if (this.slots[v][j] === undefined) {
                this.moveCell(v - 1, j, v, j);
              } else if (
                this.slots[v - 1][j].value === this.slots[v][j].value
              ) {
                this.mergeCells(v - 1, j, v, j);
              }
            }
          }
        }
        break;
      default:
        console.log('Error finding direction to slide');
    }

    if (this.isSliding) {
      this.addRandomCell();
    }

    this.isSliding = false;
    this.updateScore();
    this.checkGameOver();
    this.cleanCells();
  }

  moveCell(xStart, yStart, xEnd, yEnd): void {
    // Adjustment in list
    this.isSliding = true;
    const cell = this.slots[xStart][yStart];
    cell.x = xEnd;
    cell.y = yEnd;

    // Adjustment in grid
    this.slots[xEnd][yEnd] = this.slots[xStart][yStart];
    this.slots[xStart][yStart] = undefined;
  }

  mergeCells(xStart, yStart, xEnd, yEnd): void {
    // Get references to start cell and end cell
    const startCell = this.slots[xStart][yStart];
    const endCell = this.slots[xEnd][yEnd];

    // If either cell has already merged, don't merge
    if (startCell.hasMerged === true || endCell.hasMerged === true) {
      return;
    }

    // Start the merge process
    this.isSliding = true;
    startCell.hasMerged = true;
    endCell.hasMerged = true;

    // Adjust start cell
    startCell.value += endCell.value;
    startCell.x = endCell.x;
    startCell.y = endCell.y;
    this.slots[xStart][yStart] = undefined;

    // Adjust end cell
    this.slots[xEnd][yEnd] = startCell;
    this.cells.splice(this.cells.indexOf(endCell), 1);

  }

  showSnackBar(message: string, button: string = null) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(message, button, config);
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
          emptyCells.push({ x: i, y: j });
        }
      }
    }

    if (emptyCells.length < 1) {
      this.showSnackBar('Game Over');
      return;
    }

    // Select random empty slot
    let randomEmptyCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.addCell(randomEmptyCell.x, randomEmptyCell.y, this.getRandomStarter());
  }

  cleanCells(): void {
    this.cells.forEach( cell => {
      cell.hasMerged = false;
    })
  }

  checkGameOver(): void {
    if (!this.slots.some((column) => column.includes(undefined))) {
      console.log('Found none');
      this.endGame();
    } else {
      console.log('Found some');
    }
  }

  endGame(): void {
    this.showSnackBar('GAME OVER');
    this.setup();
  }

  addNextCell(): void {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.slots[i][j] === undefined) {
          this.addCell(i, j, this.getRandomStarter());
          return;
        } else {
        }
      }
    }

    alert('GAME OVER');
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

    console.table(this.getFlippedSlots());
  }

  removeCell(x, y) {
    const cell = this.slots[x][y];

    this.slots[x][y] = undefined;
    this.cells.splice(this.cells.indexOf(cell), 1);
  }

  getFlippedSlots() {
    let flippedSlots = [...Array(this.width)].map((e) =>
      Array(this.height).fill(undefined)
    );
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        flippedSlots[i][j] = this.slots[j][i];
      }
    }

    return flippedSlots;
  }

  updateScore(): void {
    let score = 0;
    this.cells.forEach(cell => {
      score += cell.value;
    });
    this.score = score;
  }
}
