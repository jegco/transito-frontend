import { Component, OnInit } from '@angular/core';
import { trigger, transition, keyframes, animate } from '@angular/animations';
import { keyframes as kf } from '../../animations/keyframes';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css'],
  animations: [
    trigger('animacion', [
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => bounce', animate(1000, keyframes(kf.bounce)))
    ])
  ]
})
export class PreferenciasComponent implements OnInit {

  colorPrimario = 'azul';
  colorPrimarioToggle = false;
  colorSecundario = 'verde';
  colorSecundarioToggle = false;
  animation: String = 'bounce';
  animacionesDisponibles = Object.keys(kf);

  constructor() { }

  ngOnInit() {
  }

}
