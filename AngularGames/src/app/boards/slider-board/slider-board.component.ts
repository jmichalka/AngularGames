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

  starterValues: number[] = [2, 4];

  cells = [];

  // ---------- LIFE CYCLE -----------

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.addRandomCell();
  }

  // ---------- EVENTS ----------

  @HostListener('window:keydown.arrowup', ['$event'])
  handleArrowUp(event: KeyboardEvent | MouseEvent) {
    this.cells.forEach((cell) => {
      if (cell.y > this.spacing) {
        // cell.y -= this.cellSize + this.spacing;
        cell.y = this.spacing;
      }
    });
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

  showSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(message, '', config);
  }

  getRandomStarter(): number {
    return this.starterValues[
      Math.floor(Math.random() * this.starterValues.length)
    ];
  }

  addRandomCell(): void {
    let newCell = {
      x:
        Math.floor(Math.random() * this.width) * (this.cellSize + this.spacing) +
        this.spacing,
      y:
        Math.floor(Math.random() * this.height) * (this.cellSize + this.spacing) +
        this.spacing,
      value: this.getRandomStarter(),
    };

    this.cells.push(newCell);
  }
}
