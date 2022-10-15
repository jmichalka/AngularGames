import { Component, OnInit, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent implements OnInit {

  @Input() recommendedCellSize;

  // title = 'AngularGames';
  // x:Number = 9;
  // y:Number = 9;

  sliderValue = 60;
  thumbLabel = true;

  width = 9;
  height = 9;
  values;
  groupGridDim = 3;

  possibleValues: Number[] = [1,2,3,4,5,6,7,8,9];
// ---------- LIFECYCLE ----------

  constructor() {

    this.generateBlank();
    // this.generateRandom();
    // this.generateSudoku();
    // this.generateBruteForce();
  }

  ngOnInit(): void {
      
  }

// ---------- EVENTS ----------

  handleRightClick(event: any) {
    event.preventDefault();
    // this.generateRandom();
    // this.generateBruteForce(); 
  }

    handleSliderChange(event:any) {
    console.log(event.value);
    this.sliderValue = event.value;
  }

  collapseCell(input: any) {
    // console.log(this.values[input.x][input.y]);
    this.values[input.x - 1][input.y - 1] = [input.value];
    // console.log(this.values[input.x][input.y]);
  }

// ---------- METHODS ----------

  generateBlank() {
    this.values = new Array(this.width);

    for (let i = 0; i < this.width; i++) {
      this.values[i] = new Array(this.height);
      for (let j=0; j < this.height; j++) {
        this.values[i][j] = [...this.possibleValues];
      }
    }
    console.log(this.values);
  }

  generateRandom() {
    let possibilities = [1,2,3,4,5,6,7,8,9];

    // Fill grid with random values
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.values[i][j] = 
        possibilities[(Math.floor(Math.random() * possibilities.length))]
        .toString();
      }
    }
  }

  generateSudoku() {
    this.generateBlank();

    let possibilities = [1,2,3,4,5,6,7,8,9];

    // Fill the grid with Sudoku values
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {

        // console.log("This is for cell " + i + " , " + j);
        // Reset remaining possibilities
        let remaining = [...possibilities];
        // console.log("Setting remaining back to " + possibilities);

        // Clear out possibilities based on neighbors

        // Up and down possibilities
        for (let n = 0; n < this.height; n++) {
          const val = this.values[i][n];
          const index = remaining.indexOf(val);

          if (index > -1) {
            remaining.splice(index, 1);
            // console.log("Removing " + val + " for up/down - Remaining " + remaining);
          }
        }

        // Left and right possibilities
        for (let m = 0; m < this.width; m++) {
          const val = this.values[m][j];
          const index = remaining.indexOf(val);

          if (index > -1) {
            remaining.splice(index, 1);
            // console.log("Removing " + val + " for left/right - Remaining " + remaining);
          }
        }

        // Group possibilities
        // Figure out what group this cell is in
        let groupX = Math.floor(i / this.groupGridDim);
        let groupY = Math.floor(j / this.groupGridDim);
        // console.log("Group - ", groupX, groupY);

        for (let f = groupX * this.groupGridDim; f < (groupX + 1) * this.groupGridDim; f++) {
          for (let g = groupY * this.groupGridDim; g < (groupY + 1) * this.groupGridDim; g++) {
            const val = this.values[f][g];
            const index = remaining.indexOf(val);
  
            if (index > -1) {
              remaining.splice(index, 1);
              // console.log("Removing " + val + " for group - Remaining " + remaining);
            }
          }
        }

        // Enter a random valid remaining value
        const validVal = remaining[(Math.floor(Math.random() * remaining.length))];
        // console.log(remaining[(Math.floor(Math.random() * remaining.length))]);
        // console.log("Setting this cell to " + validVal);

        this.values[i][j] = validVal;
        
      }
    }

  }

  generateBruteForce() {
    let count = 0;
    do {  
      this.generateSudoku();
      let isValid = this.checkSudoku();
      console.log(isValid);
      count++;
    } while (this.checkSudoku() === false);
    console.log("Puzzles checked - " + count);
  }

  checkSudoku():boolean {

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.values[i][j] === undefined) return false;
      }
    }

    return true;
  }

}
