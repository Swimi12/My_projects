import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
})
export class BurgerComponent {
  @Input() isOpen: boolean = false;
  @Output() toggle = new EventEmitter<boolean>();
}
