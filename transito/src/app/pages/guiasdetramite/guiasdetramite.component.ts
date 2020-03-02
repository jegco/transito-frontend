import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';

@Component({
  selector: 'app-guiasdetramite',
  templateUrl: './guiasdetramite.component.html',
  styleUrls: ['./guiasdetramite.component.css']
})
export class GuiasdetramiteComponent extends BaseComponent implements OnInit {

  columnas = ['titulo', 'tipo', '# de pasos'];
  guias: GuiaDeTramite[] = [];
  guiasTableDataSource = [];

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly guiasService: GuiasService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.guiasService.buscarGuias()
    .subscribe(guias => {
      this.guias = guias;
      guias.forEach(guia => {
        const titulo = guia.titulo;
        const tipo = guia.tipo ? guia.tipo : "tipo de ejemplo";
        const pasos = guia.pasos.length;
        this.guiasTableDataSource.push({ titulo, tipo, pasos});
      });
    }, error => this.handleException(error));
  }

  isDataLoaded(): boolean {
    return this.guias.length !== 0;
  }

  crearGuia() {
    this.openPage('dashboard/guardar-nueva-guia');
  }

  actualizarGuia(guia: GuiaDeTramite) {
    this.openPage(`dashboard/guardar-nueva-guia/${guia.titulo}`);
  }

  eliminarGuia(index: number) {
    debugger;
    this.guiasService.eliminarGuia(this.guias[index]).subscribe(() => {
    this.toast.success('Guia eliminada correctamente');
    this.guias = this.guias.splice(index, 1);
    this.guiasTableDataSource = this.guiasTableDataSource.splice(index, 1);
    },
     error => this.errorService.handleException(error));
  }

}
