import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { BoggleBoardComponent } from './boards/boggle-board/boggle-board.component';
import { ChessBoardComponent } from './boards/chess-board/chess-board.component';
import { CrosswordBoardComponent } from './boards/crossword-board/crossword-board.component';
import { SudokuBoardComponent } from './boards/sudoku-board/sudoku-board.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sudoku', component: SudokuBoardComponent },
  { path: 'crossword', component: CrosswordBoardComponent },
  { path: 'boggle', component: BoggleBoardComponent },
  { path: 'chess', component: ChessBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
