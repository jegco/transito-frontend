import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/models/Documento';
import { Observable, of } from 'rxjs';
import { filter, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent extends BaseComponent implements OnInit {

  documentos$: Observable<Documento>;
  columnas = ['nombre', 'fecha de creacion', 'fecha de actualizacion'];

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly documentosService: DocumentosService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.documentos$ = this.documentosService
      .buscarDocumentos().pipe(
        catchError(error => {
          this.handleException(error);
          return of<Documento>();
        })
      );
  }

  obtenerDatosTablaDocumentos(documentos: Documento[]): any[] {
    return documentos.map(documento => {
      const { nombre, fechaCreacion, fechaActualizacion } = documento;
      return { nombre, fechaCreacion, fechaActualizacion };
    });
  }

  actualizarDocumento(index: number): void {

  }

  eliminarDocumento(index: number): void {
    debugger;
    this.documentos$.pipe(
      filter((documento, i) => i === index),
      switchMap(documento => this.documentosService.eliminarDocumento(documento))
    ).subscribe(() => this.toast.success('Documento eliminado satisfactoriamente'),
      error => this.handleException(error));
  }

}
