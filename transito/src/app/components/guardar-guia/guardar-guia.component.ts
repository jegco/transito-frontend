import { Component, OnInit } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { map, tap } from 'rxjs/operators';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-guardar-guia',
  templateUrl: './guardar-guia.component.html',
  styleUrls: ['./guardar-guia.component.css']
})
export class GuardarGuiaComponent extends BaseComponent implements OnInit {

  pasos: Paso[] = [];
  titulo = '';
  descripcion = '';
  tipo = '';
  files: Map<number, any[]> = new Map();
  archivosGuia: any[] = [];
  documentosGuia: Documento[] = [];
  showSpinner = false;

  constructor(
    public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly documentoService: DocumentosService,
    private readonly guiasService: GuiasService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
  }

  addPaso(): void {
    this.pasos.push(new Paso('test titulo', 'test descripcion', []));
  }

  uploadFile(key: number, event: any) {
    this.showSpinner = true;
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.documentoService.guardarDocumento(element).pipe(map(documento => {
        this.pasos[key].anexos.push(documento);
        if (this.files.has(key)) {
          this.files.get(key).push(element);
        } else {
          this.files.set(key, [element]);
        }
      })).subscribe(() => this.showSpinner = false, error => {
        this.showSpinner = false;
        this.handleException(error)
      });

    }
  }

  deleteAttachment(key: number, index: number) {
    debugger;
    this.files.get(key).splice(index, 1)
  }

  uploadFileGuia(event: any) {
    this.showSpinner = true;
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.documentoService.guardarDocumento(element).pipe(
        map(documento => this.documentosGuia.push(documento)))
        .subscribe(() => {
          this.showSpinner = false;
          this.archivosGuia.push(element);
        }, error => this.handleException(error));
    }
  }

  deleteAttachmentGuia(index: number) {
    debugger;
    this.archivosGuia.splice(index, 1)
  }

  obtenerArchivosEnPaso(key: number): any[] {
    return this.files.get(key);
  }

  guardarGuia(): void {
    this.showSpinner = true;
    this.guiasService.guardarGuia(new GuiaDeTramite("", this.titulo, this.descripcion, this.documentosGuia, this.pasos, this.tipo))
      .subscribe(() => this.showSpinner = false, error => {
        this.showSpinner = false;
        this.handleException(error)
      });
      
  }

}
