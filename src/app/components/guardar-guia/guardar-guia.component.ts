import { Component, OnInit } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { map, switchMap, catchError } from 'rxjs/operators';
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
  anexos$: Observable<Documento | Documento[]>;
  categoria: Tipo;
  puntosDeAtencion: { punto: PuntoAtencion, checked: boolean }[];
  buttonOptions = [
    { icon: 'save', action: 'guardarGuia' },
    { icon: 'add', action: 'addPaso' }
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
        map(params => params.nombreGuia),
        switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)),
        catchError(error => {
          this.handleException(error);
          return of(new GuiaDeTramite('', '', '', null, [],
            new Tipo('', '', new Documento('', '', '', '', '', '', '')),
            '', []));
        }));

    this.anexos$ = this.documentoService.buscarDocumentos();

    this.tipos$ = this.tiposService.buscarTipos();
    this.puntosService.obtenerPuntosDeAtencion().subscribe(punto =>
      this.puntosDeAtencion ?
        this.puntosDeAtencion = [...this.puntosDeAtencion, { punto, checked: false }] : this.puntosDeAtencion = [{ punto, checked: false }]
      , error => this.handleException(error));
  }

  addPaso(guia: GuiaDeTramite): void {
    if (guia.pasos) {
      guia.pasos.push(new Paso('', '', null));
    } else {
      guia.pasos = [new Paso('', '', null)];
    }
  }

  uploadFile(paso: Paso, event: any) {
    this.showSpinner = true;
    if (event.length > 0 && paso.anexo === null) {
      for (const image of event) {
        const element = image;
        this.documentoService.guardarDocumento(element)
          .subscribe(documento => paso.anexo = documento
            , error => this.handleException(error)
            , () => this.showSpinner = false);
      }
    } else {
      this.showSpinner = false;
    }
  }

  borrarAnexoEnPaso = (paso: Paso) => {
    paso.anexo = null;
  }

  uploadFileGuia(event: any, guia: GuiaDeTramite) {
    this.showSpinner = true;
    if (guia.anexo == null && event.length > 0) {
      for (const anexo of event) {
        this.documentoService.guardarDocumento(anexo)
          .subscribe(documento => guia.anexo = documento
            , error => this.handleException(error)
            , () => this.showSpinner = false);
      }
    } else {
      this.showSpinner = false;
    }
  }

  seleccionarAnexo = (anexo: Documento, guia: GuiaDeTramite) => {
    guia.anexo = anexo;
  }

  seleccionarAnexoEnPaso = (anexo: Documento, paso: Paso) => {
    paso.anexo = anexo;
  }

  borrarAnexoEnGuia = (guia: GuiaDeTramite) => {
    guia.anexo = null;
  }

  guardarGuia = (guia: GuiaDeTramite) => {
    this.showSpinner = true;
    this.puntosDeAtencion.forEach(puntoDeAtencion => {
      if (guia.puntosDeAtencion) {
        guia.puntosDeAtencion = [...guia.puntosDeAtencion, puntoDeAtencion.punto];
      } else {
        guia.puntosDeAtencion = guia.puntosDeAtencion = [puntoDeAtencion.punto];
      }
    });
    const guiaAGuardar = new GuiaDeTramite(guia.id ? guia.id : ''
      , guia.titulo ? guia.titulo : '', guia.descripcion ? guia.descripcion : ''
      , guia.anexo, guia.pasos ? guia.pasos : []
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

  actualizarDescripcion({ editor }: ChangeEvent, guia: GuiaDeTramite) {
    const data = editor.getData();
    guia.descripcion = data;
  }

  actualizarDescripcionEnPaso({ editor }: ChangeEvent, paso: Paso) {
    const data = editor.getData();
    paso.descripcion = data;
  }

  doAction = (action: string, guia?: GuiaDeTramite) => {
    action === 'guardarGuia' ? this.guardarGuia(guia) : this.addPaso(guia);
  }

  cargarMultimedia = (documento: Documento): string => {
    return documento.rutaDeDescarga;
  }

}
