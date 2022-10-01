import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  width = 9;
  height = 9;
  values = this.generate();

  Number = Number;
  constructor() {

  }

  handleRightClick(event: any) {
    event.preventDefault();
    this.values = this.generate();
  }

  generate():string {
    let possibilities = [1,2,3,4,5,6,7,8,9];

    // let xLine =
    
    let solvedBoard:string = "";
    for (let i = 1; i <= (this.width * this.height); i++) {
      solvedBoard += 
      (Math.floor(Math.random() * possibilities.length) + 1)
      .toString();
    }

    console.log(solvedBoard);
    return solvedBoard;
  }

}
