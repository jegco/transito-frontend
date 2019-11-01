import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { debug } from 'util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-guiasdetramite',
  templateUrl: './guiasdetramite.component.html',
  styleUrls: ['./guiasdetramite.component.css']
})
export class GuiasdetramiteComponent extends BaseComponent implements OnInit {

  columnas = ['titulo', 'tipo', '# de pasos'];
  guias = [];

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly guiasService: GuiasService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.guiasService.buscarGuias()
    .subscribe(guias => {
      guias.forEach(guia => {
        const titulo = guia.titulo;
        const tipo = guia.tipo;
        const pasos = guia.pasos.length;
        this.guias.push({ titulo, tipo, pasos})
      });
    }, error => this.handleException(error));
  }

  isDataLoaded(): boolean {
    return this.guias.length !== 0;
  }

}
