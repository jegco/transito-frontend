import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-guiasdetramite',
  templateUrl: './guiasdetramite.component.html',
  styleUrls: ['./guiasdetramite.component.css']
})
export class GuiasdetramiteComponent extends BaseComponent implements OnInit {

  guias$: Observable<GuiaDeTramite>;

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly guiasService: GuiasService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.guias$ = this.guiasService.buscarGuias()
    .pipe(
      catchError(error => {
      this.handleException(error);
      return of<GuiaDeTramite>();
    })
    );
  }

  crearGuia() {
    this.openPage('dashboard/guardar-nueva-guia');
  }

  actualizarGuia(guia: GuiaDeTramite) {
    this.openPage(`dashboard/guardar-nueva-guia/${guia.titulo}`);
  }

  eliminarGuia(guiaAEliminar: GuiaDeTramite) {
    this.guiasService.eliminarGuia(guiaAEliminar)
    .pipe(
      switchMap(() => this.guias$.pipe(filter(guia => guiaAEliminar.id === guia.id)))
    ).subscribe(() => {
    this.toast.success('Guia eliminada correctamente');
    },
     error => this.errorService.handleException(error));
  }

  mostrarGuia(guia: GuiaDeTramite) {
    this.openPage(`dashboard/guias/${guia.titulo}`);
  }

}
