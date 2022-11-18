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
  width: number = 2;
  height: number = 2;
  cellSize: number = 80;
  spacing: number = 6;
  baseNumber: number = 2;

  starterPowers = [
    {
      value: 1,
      probability: 0.9,
    },
    {
      value: 2,
      probability: 0.1,
    },
  ];

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

    this.addRandomCell();
    this.addRandomCell();


    this.resetScore();
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
      // console.log('Error finding direction to slide');
    }

    if (this.isSliding) {
      this.addRandomCell();
    }
    this.isSliding = false;

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

    // Add this new value to the score
    this.addToScore(startCell.value);

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
    let probArray = [];
    this.starterPowers.forEach((option, index) => {
      probArray[index] = option.probability;

      if (index > 0) {
        probArray[index] += probArray[index - 1];
      }
    });

    let randomValue = Math.random();

    let selectedIndex = 0;
    probArray.every((probVal, index) => {
      console.log('Probval = ', probVal);
      if (randomValue < probVal) {
        selectedIndex = index;
        return false;
      } else {
        return true;
      }
    });

    let power = this.starterPowers[selectedIndex].value;

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
    this.cells.forEach((cell) => {
      cell.hasMerged = false;
    });
  }


  // Boundary condition
  checkGameOver(): void {
    if (!this.slots.some((column) => column.includes(undefined))) {
      console.log("Board filled!")
      let isMergeable = this.cells.some(cell => {
        return this.checkNeighbors(cell.x, cell.y);
      })

      

      if (!isMergeable) {
        this.endGame();
      } else {
        console.log("Close one!");
      }
    }
  }

  endGame(): void {
    console.log('GAME OVER');
    // this.setup();
  }

  // addNextCell(): void {
  //   for (let i = 0; i < this.width; i++) {
  //     for (let j = 0; j < this.height; j++) {
  //       if (this.slots[i][j] === undefined) {
  //         this.addCell(i, j, this.getRandomStarter());
  //         return;
  //       } else {
  //       }
  //     }
  //   }

  //   alert('GAME OVER');
  // }

  addCell(x, y, val): void {
    let newCell = {
      x: x,
      y: y,
      value: val,
      hasMerged: false,
    };

    this.slots[x][y] = newCell;
    this.cells.push(newCell);

    // console.table(this.getFlippedSlots());
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

  resetScore(): void {
    this.score = 0;
  }

  addToScore(val: number): void {
    this.score += val;
    // this.showSnackBar(`${val} added`);
  }

  updateScore(): void {
    let score = 0;
    this.cells.forEach((cell) => {
      score += cell.value;
    });
    this.score = score;
  }

  checkNeighbors(x, y): boolean {

    const cell = this.slots[x][y];

    // Check up
    if (y > 0) {
      if (this.slots[x][y-1].value === cell.value) {
        return true;
      }
    }
    // Check down
    if (y < this.height - 1) {
      if (this.slots[x][y+1].value === cell.value) {
        return true;
      }
    }
    // Check left
    if (x > 0) {
      if (this.slots[x-1][y].value === cell.value) {
        return true;
      }
    }
    // Check right
    if (x < this.width - 1) {
      if (this.slots[x+1][y].value === cell.value) {
        return true;
      }
    }


    return false;

  }



}
