import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guia-item',
  templateUrl: './guia-item.component.html',
  styleUrls: ['./guia-item.component.css']
})
export class GuiaItemComponent implements OnInit {

  @Input() guia: GuiaDeTramite;
  @Output() details = new EventEmitter<GuiaDeTramite>();

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  showDetails(): void {
    this.details.emit(this.guia);
  }

  descripcionComoHTML(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }

}
