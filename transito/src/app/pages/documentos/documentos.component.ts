import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent extends BaseComponent implements OnInit {

  documentos = new Array<Documento>();
  documentosTbDatasource = [];
  columnas = ['nombre', 'fecha de creacion', 'fecha de actualizacion'];

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly documentosService: DocumentosService) {
      super(router, errorService, toast);
     }

  ngOnInit() {
    this.documentosService
    .buscarDocumentos()
    .subscribe(documentos => {
      this.documentos = documentos
      documentos.forEach(documento => {
        const nombre = documento.nombre;
        const fechaCreacion = documento.fechaCreacion;
        const fechaActualizacion = documento.fechaActualizacion;
        this.documentosTbDatasource.push({nombre, fechaCreacion, fechaActualizacion});
      })
    });
  }

  actualizarDocumento(documento: Documento): void {

  }

  eliminarDocumento(index: number): void {
    this.documentosService
    .eliminarDocumento(this.documentos[index])
    .subscribe(() => this.toast.success('Documento eliminado satisfactoriamente'), 
    error => this.handleException(error));
  }

}
