import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
})
export class BurgerComponent {
  @Input() isOpen: boolean = false
  @Output() toggle = new EventEmitter<void>();
}
