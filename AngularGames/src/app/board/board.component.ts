import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  width = 9;
  height = 9;
  values;

// ---------- LIFECYCLE ----------

  constructor() {
    
    // Generate column array - we go column then row to
    // maintain x,y dimension access to values
    this.values = new Array(this.width);

    // Generate columns in the array of columns
    for (let i = 0; i < this.width; i++) {
      this.values[i] = new Array(this.height);
    }

    // Fill the values array with a puzzle
    // this.generateRandom();
    this.generateSudoku();
  }

// ---------- EVENTS ----------

  handleRightClick(event: any) {
    event.preventDefault();
    this.generateRandom();
  }

// ---------- METHODS ----------

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
    let possibilities = ['1','2','3','4','5','6','7','8','9'];

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
          }
        }

        // Left and right possibilities
        for (let m = 0; m < this.width; m++) {
          const val = this.values[m][j];
          const index = remaining.indexOf(val);

          if (index > -1) {
            remaining.splice(index, 1);
          }
        }

        // Group possibilities
        // for (let g = 0; g < ) {

        // }



        // console.log(remaining);
        const validVal = remaining[(Math.floor(Math.random() * remaining.length))];
        // console.log("Setting this cell to " + validVal);

        this.values[i][j] = validVal;
        




      }
    }

  }

}
