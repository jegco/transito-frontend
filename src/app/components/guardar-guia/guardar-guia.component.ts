import { Component, OnInit } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { map, switchMap, catchError, defaultIfEmpty } from 'rxjs/operators';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { Documento } from 'src/app/models/Documento';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Observable, of } from 'rxjs';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/providers/tipos/tipos.service';
import { PuntoAtencion } from 'src/app/models/PuntoAtencion';
import { PuntoAtencionService } from 'src/app/providers/puntosdeatencion/punto-atencion.service';

@Component({
  selector: 'app-guardar-guia',
  templateUrl: './guardar-guia.component.html',
  styleUrls: ['./guardar-guia.component.css']
})
export class GuardarGuiaComponent extends BaseComponent implements OnInit {

  showSpinner = false;
  guia$: Observable<GuiaDeTramite>;
  tipos$: Observable<Tipo[]>;
  categoria: Tipo;
  puntosDeAtencion: { punto: PuntoAtencion, checked: boolean }[];
  buttonOptions = [
    { icon: 'save', action: 'guardarGuia' },
    { icon: 'add', action: 'addPaso'}
  ];

  constructor(
    public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private readonly documentoService: DocumentosService,
    private readonly guiasService: GuiasService,
    private readonly tiposService: TiposService,
    private readonly puntosService: PuntoAtencionService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.guia$ = this.activatedRoute.params
      .pipe(
        map(params => params['nombreGuia']),
        switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)),
        catchError(error => {
          this.handleException(error)
          return of(new GuiaDeTramite('', '', '', [], [],
          new Tipo('', '', new Documento('', '', '', '', '', '', '')),
          '', []));
        }));

    this.tipos$ = this.tiposService.buscarTipos();
    this.puntosService.obtenerPuntosDeAtencion().subscribe(punto => 
      this.puntosDeAtencion ? 
      this.puntosDeAtencion = [...this.puntosDeAtencion, { punto, checked: false }] : this.puntosDeAtencion = [{ punto, checked: false }]
    , error => this.handleException(error));
  }

  addPaso(guia: GuiaDeTramite): void {
    if(guia.pasos) {
    guia.pasos.push(new Paso('', '', []));
    } else {
      guia.pasos = [new Paso('', '', [])];
    }
  }

  uploadFile(paso: Paso, event: any) {
    this.showSpinner = true;
    if (event.length > 0) {
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.documentoService.guardarDocumento(element)
          .subscribe(documento => {
            this.showSpinner = false
            if(paso.anexos) paso.anexos.push(documento);
          else paso.anexos = [documento];
          }, error => {
            this.showSpinner = false;
            this.handleException(error)
          });
      }
    } else {
      this.showSpinner = false;
    }
  }

  deleteAttachment(paso: Paso, index: number) {
    paso.anexos.splice(index, 1);
  }

  uploadFileGuia(event: any, guia: GuiaDeTramite) {
    this.showSpinner = true;
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.documentoService.guardarDocumento(element)
        .subscribe(documento => {
          this.showSpinner = false;
          if(guia.formularios) guia.formularios.push(documento);
          else guia.formularios = [documento];
        }, error => this.handleException(error));
    }
  }

  deleteAttachmentGuia(index: number, guia: GuiaDeTramite) {
    guia.formularios.splice(index, 1);
  }

  obtenerArchivosEnPaso(paso: Paso): any[] {
    return paso.anexos;
  }

  guardarGuia(guia: GuiaDeTramite): void {
    this.showSpinner = true;
    debugger;
    this.puntosDeAtencion.forEach(puntoDeAtencion => {
      if(guia.puntosDeAtencion) [...guia.puntosDeAtencion, puntoDeAtencion.punto]
      else guia.puntosDeAtencion = guia.puntosDeAtencion = [puntoDeAtencion.punto] 
    });
    const guiaAGuardar = new GuiaDeTramite(guia.id ? guia.id : ''
    ,guia.titulo ? guia.titulo : '' , guia.descripcion ? guia.descripcion : ''
    , guia.formularios ? guia.formularios : [], guia.pasos ? guia.pasos : []
    , this.categoria
    , guia.soporteLegal ? guia.soporteLegal : '', guia.puntosDeAtencion ? guia.puntosDeAtencion : []);
    this.guiasService.guardarGuia(guiaAGuardar)
      .subscribe(() => {
        this.showSpinner = false;
        this.toast.success('Se guardo la guia correctamente');
      }, error => {
        this.showSpinner = false;
        this.handleException(error);
      });
  }

  obtenerArchivosEnGuia(guia: GuiaDeTramite): Documento[] {
    return guia.formularios;
  }

  actualizarDescripcion({ editor }: ChangeEvent, guia: GuiaDeTramite) {
    const data = editor.getData();
    guia.descripcion = data;
  }

  actualizarDescripcionEnPaso({ editor }: ChangeEvent, paso: Paso) {
    const data = editor.getData();
    paso.descripcion = data;
  }

  doAction(action: string, guia?: GuiaDeTramite) {
    action === 'guardarGuia' ? this.guardarGuia(guia) : this.addPaso(guia);
  }

  cargarMultimedia(documento: Documento): string {
    return documento.rutaDeDescarga;
  }

}
