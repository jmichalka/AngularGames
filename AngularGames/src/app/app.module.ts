import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { BoardComponent } from './board/board.component';
import { PaletteComponent } from './palette/palette.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HomePageComponent } from './home-page/home-page.component';
import { SudokuBoardComponent } from './boards/sudoku-board/sudoku-board.component';
import { ChessBoardComponent } from './boards/chess-board/chess-board.component';
import { BoggleBoardComponent } from './boards/boggle-board/boggle-board.component';
import { CrosswordBoardComponent } from './boards/crossword-board/crossword-board.component';
import { SudokuCellComponent } from './boards/sudoku-board/sudoku-cell/sudoku-cell.component';


@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent,
    PaletteComponent,
    HomePageComponent,
    SudokuBoardComponent,
    ChessBoardComponent,
    BoggleBoardComponent,
    CrosswordBoardComponent,
    SudokuCellComponent,
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
