import { Component, OnInit } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { map, switchMap } from 'rxjs/operators';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { Documento } from 'src/app/models/Documento';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-guardar-guia',
  templateUrl: './guardar-guia.component.html',
  styleUrls: ['./guardar-guia.component.css']
})
export class GuardarGuiaComponent extends BaseComponent implements OnInit {

  files: Map<number, any[]> = new Map();
  showSpinner = false;
  guia: GuiaDeTramite;
  buttonOptions = [
    {
      icon: 'save',
      action: 'guardarGuia'
    },
    {
      icon: 'add',
      action: 'addPaso'
    }
  ];

  constructor(
    public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private readonly documentoService: DocumentosService,
    private readonly guiasService: GuiasService) {
    super(router, errorService, toast);
    this.guia = new GuiaDeTramite('', '', '', new Array<Documento>(), new Array<Paso>(), '');
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

  addPaso(): void {
    if (this.guia && this.guia.pasos) {
      this.guia.pasos = [...this.guia.pasos, new Paso('test titulo', 'test descripcion', [])];
    } else {
      this.guia = new GuiaDeTramite(
        '',
        this.guia.titulo,
        this.guia.descripcion,
        new Array<Documento>(),
        [new Paso('', '', [])],
        '');
    }
  }

  uploadFile(key: number, event: any) {
    this.showSpinner = true;
    if (event.length > 0) {
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.documentoService.guardarDocumento(element)
          .subscribe(documento => {
            this.showSpinner = false
            this.guia.pasos[key].anexos.push(documento);
          }, error => {
            this.showSpinner = false;
            this.handleException(error)
          });
      }
    } else {
      this.showSpinner = false;
    }
  }

  deleteAttachment(key: number, index: number) {
    this.guia.pasos[key].anexos.splice(index, 1)
  }

  uploadFileGuia(event: any) {
    this.showSpinner = true;
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.documentoService.guardarDocumento(element)
        .subscribe(documento => {
          debugger;
          this.showSpinner = false;
          this.guia.formularios.push(documento);
        }, error => this.handleException(error));
    }
  }

  deleteAttachmentGuia(index: number) {
    this.guia.formularios.splice(index, 1)
  }

  obtenerArchivosEnPaso(key: number): any[] {
    return this.guia.pasos[key].anexos;
  }

  guardarGuia(): void {
    this.showSpinner = true;
    this.guiasService.guardarGuia(new GuiaDeTramite(
      this.guia.id ? this.guia.id : '',
      this.guia.titulo ? this.guia.titulo : '',
      this.guia.descripcion ? this.guia.descripcion : '',
      this.guia.formularios ? this.guia.formularios : new Array<Documento>(),
      this.guia.pasos ? this.guia.pasos : new Array<Paso>(),
      this.guia.tipo ? this.guia.tipo : ''
    ))
      .subscribe(() => {
        this.showSpinner = false;
        this.toast.success('Se guardo la guia correctamente');
      }, error => {
        this.showSpinner = false;
        this.handleException(error);
      });
  }

  obtenerArchivosEnGuia() {
    return this.guia.formularios;
  }

  actualizarDescripcion({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.guia.descripcion = data;
  }

  actualizarDescripcionEnPaso({ editor }: ChangeEvent, index: number) {
    const data = editor.getData();
    this.guia.pasos[index].descripcion = data;
  }

  doAction(action) {
    action === 'guardarGuia' ? this.guardarGuia() : this.addPaso();
  }

}
