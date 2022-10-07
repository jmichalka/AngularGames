import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularGames';
  x:Number = 9;
  y:Number = 9;

  value = 50;
  thumbLabel = true;

  handleSliderChange(event:any) {
    console.log(event.value);
    this.value = event.value;
  }

}
