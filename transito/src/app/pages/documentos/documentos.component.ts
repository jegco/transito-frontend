import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/models/Documento';
import { Page } from 'src/app/models/Page';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent extends BaseComponent implements OnInit {

  documentos = new Page<Documento>([]);
  documentosTbDatasource = [];
  subject = new Subject<Page<Documento>>();
  columnas = ['nombre', 'fecha de creacion', 'fecha de actualizacion'];

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly documentosService: DocumentosService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.cargarDocumentos(this.documentos);
  }

  cargarDocumentos(documentos: Page<Documento>) {
    this.documentosService
      .buscarDocumentos()
      .subscribe(documentosPaged => {
        documentos = documentosPaged;
        documentos.results.forEach(documento => {
          const nombre = documento.nombre;
          const fechaCreacion = documento.fechaCreacion;
          const fechaActualizacion = documento.fechaActualizacion;
          this.documentosTbDatasource.push({ nombre, fechaCreacion, fechaActualizacion });
        })
      });
  }

  actualizarDocumento(): void {
    
  }

  pasarPagina(): void {
    this.subject.next(this.documentos);
  }

  eliminarDocumento(index: number): void {
    this.documentosService
      .eliminarDocumento(this.documentos[index])
      .subscribe(() => this.toast.success('Documento eliminado satisfactoriamente'),
        error => this.handleException(error));
  }

}
