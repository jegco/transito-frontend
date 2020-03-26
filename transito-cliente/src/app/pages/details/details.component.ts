import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { GuiasService } from 'src/app/providers/guias/guias.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseComponent implements OnInit {

  guia: GuiaDeTramite;

  constructor(public readonly router: Router,
              public readonly errorService: ErrorService,
              public readonly toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private guiasService: GuiasService,
              private readonly sanitizer: DomSanitizer) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      map(params => params['nombreGuia']),
      switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)))
      .subscribe(guia => {
        this.guia = guia;
      }, error => this.handleException(error));
  }

  obtenerArchivosEnPaso(key: number): any[] {
    return this.guia.pasos[key].anexos;
  }

  descripcionComoHTML(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(this.guia.descripcion);
  }

}
