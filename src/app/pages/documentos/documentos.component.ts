import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/models/Documento';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent extends BaseComponent implements OnInit {

  documentos$: Observable<Documento | Documento[]>;
  temp: Documento;

  @ViewChild('fileInput', {static: false})
  fileInputReference: ElementRef;

  constructor(
    public readonly router: Router,
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

  obtenerDatosTablaDocumentos = (documentos: Documento[]): any[] => {
    return documentos.map(documento => {
      const { nombre, fechaCreacion, fechaActualizacion } = documento;
      return { nombre, fechaCreacion, fechaActualizacion };
    });
  }

  actualizarDocumento = (documento: Documento): void => {
    this.temp = documento;
    this.fileInputReference.nativeElement.click();
  }

  eliminarDocumento = (documento: Documento, documentos: Documento[]): void => {
    this.documentosService.eliminarDocumento(documento)
      .subscribe(() => {
        this.toast.success('Documento eliminado satisfactoriamente');
        documentos.filter(doc => doc === documento);
      },
        error => this.handleException(error));
  }

  updateDocumento = (event: any, documento: Documento) => {
    if (event.length > 0) {
      for (const anexo of event) {
        this.documentosService.guardarDocumento(anexo)
          .subscribe(document => documento = document
            , error => this.handleException(error));
      }
    }
  }

}
