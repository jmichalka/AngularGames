import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  values = [1,2,3,4,5,6,7,8,9];

  constructor() {}

  ngOnInit(): void {}

}
