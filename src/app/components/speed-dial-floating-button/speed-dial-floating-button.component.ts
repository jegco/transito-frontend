import { Component, Output, EventEmitter, Input } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-speed-dial-floating-button',
  templateUrl: './speed-dial-floating-button.component.html',
  styleUrls: ['./speed-dial-floating-button.component.css'],
  animations: [speedDialFabAnimations]
})
export class SpeedDialFloatingButtonComponent {

  @Input()
  fabButtons: [];

  @Output()
  actionBtn = new EventEmitter();
  buttons = [];
  fabTogglerState = 'inactive';

  constructor() {
   }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  onAction(action) {
    this.actionBtn.emit(action);
  }

}
