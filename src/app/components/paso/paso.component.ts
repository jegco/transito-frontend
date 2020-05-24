import { Component, OnInit, Input } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paso',
  templateUrl: './paso.component.html',
  styleUrls: ['./paso.component.css']
})
export class PasoComponent implements OnInit {

  @Input()
  paso: Paso;

  @Input()
  index: number;

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  descripcionComoHTML = (descripcion: string) => {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }

}
