import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() initialValue: Number = 0;

  displayValue:Number = 0;
  isEditing:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.displayValue = this.initialValue;

  }

// ---------- EVENTS ----------

  // Mouse enter event
  handleMouseEnter(event: any) {
    console.log(event.target);
    event.target.firstChild.focus();
  }

  handleMouseLeave(event: any) {
    this.isEditing = false;
  }

  handleKeyDown(event: any) {
    event.preventDefault();
    console.log(event.target);
    if (!this.isEditing) {
      event.target.innerText = event.key.toString();
      this.isEditing = true;
    }  else {
      event.target.innerText += event.key.toString();
    }
  }

  check(event: Event) {
    console.log(event)
  }

// ---------- FUNCTIONS ----------

}
