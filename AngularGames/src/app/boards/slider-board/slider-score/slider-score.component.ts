import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider-score',
  templateUrl: './slider-score.component.html',
  styleUrls: ['./slider-score.component.scss']
})
export class SliderScoreComponent implements OnInit {

  @Input() score: number = 0;

// ---------- LIFECYCLE ----------

  constructor() { }

  ngOnInit(): void {
  }


}
