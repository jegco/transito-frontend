import { Component, OnInit } from '@angular/core';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { map, switchMap } from 'rxjs/operators';
import { Documento } from 'src/app/models/Documento';
import { Paso } from 'src/app/models/Paso';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guia-detalles',
  templateUrl: './guia-detalles.component.html',
  styleUrls: ['./guia-detalles.component.css']
})

export class GuiaDetallesComponent extends BaseComponent implements OnInit {

  guia = new GuiaDeTramite('', '', '', new Array<Documento>(), new Array<Paso>(), '');
  descripcion = {};

  constructor(public readonly router: Router
  , public readonly errorService: ErrorService
  , public readonly toast: ToastrService
  , private readonly guiasService: GuiasService
  , private readonly activatedRoute: ActivatedRoute
  , private readonly sanitizer: DomSanitizer) {
  super(router, errorService, toast);
}


  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params => params['nombreGuia']),
        switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)))
      .subscribe(guia => {
        if (guia) {
          this.guia = guia;
        }
      }, error => this.handleException(error));
  }

  obtenerArchivosEnPaso(key: number): any[] {
    return this.guia.pasos[key].anexos;
  }

  descripcionComoHTML(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(this.guia.descripcion);
  }

}
