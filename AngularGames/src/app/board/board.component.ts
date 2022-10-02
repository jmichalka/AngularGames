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

  constructor() {
    
    // Generate column array - we go column then row to
    // maintain x,y dimension access to values
    let xArray = new Array(this.width);

    // Generate columns in the array of columns
    for (let i = 0; i < this.width; i++) {
      xArray[i] = new Array(this.height);
    }

    this.values = xArray;

    // Fill the values array with a puzzle
    this.generate();
  }

  handleRightClick(event: any) {
    event.preventDefault();
    this.generate()
  }

  generate() {
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
}
