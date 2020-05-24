import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { map, switchMap, catchError } from 'rxjs/operators';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { Documento } from 'src/app/models/Documento';
import { of } from 'rxjs';
import { Tipo } from 'src/app/models/Tipo';
let GuardarGuiaComponent = class GuardarGuiaComponent extends BaseComponent {
    constructor(router, errorService, toast, activatedRoute, documentoService, guiasService, tiposService, puntosService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.activatedRoute = activatedRoute;
        this.documentoService = documentoService;
        this.guiasService = guiasService;
        this.tiposService = tiposService;
        this.puntosService = puntosService;
        this.showSpinner = false;
        this.buttonOptions = [
            { icon: 'save', action: 'guardarGuia' },
            { icon: 'add', action: 'addPaso' }
        ];
    }
    ngOnInit() {
        this.guia$ = this.activatedRoute.params
            .pipe(map(params => params['nombreGuia']), switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)), catchError(error => {
            this.handleException(error);
            return of(new GuiaDeTramite('', '', '', [], [], new Tipo('', '', new Documento('', '', '', '', '', '', '')), '', []));
        }));
        this.tipos$ = this.tiposService.buscarTipos();
        this.puntosService.obtenerPuntosDeAtencion().subscribe(punto => this.puntosDeAtencion ?
            this.puntosDeAtencion = [...this.puntosDeAtencion, { punto, checked: false }] : this.puntosDeAtencion = [{ punto, checked: false }], error => this.handleException(error));
    }
    addPaso(guia) {
        if (guia.pasos) {
            guia.pasos.push(new Paso('', '', []));
        }
        else {
            guia.pasos = [new Paso('', '', [])];
        }
    }
    uploadFile(paso, event) {
        this.showSpinner = true;
        if (event.length > 0) {
            for (const image of event) {
                const element = image;
                this.documentoService.guardarDocumento(element)
                    .subscribe(documento => {
                    this.showSpinner = false;
                    if (paso.anexos) {
                        paso.anexos.push(documento);
                    }
                    else {
                        paso.anexos = [documento];
                    }
                }, error => {
                    this.showSpinner = false;
                    this.handleException(error);
                });
            }
        }
        else {
            this.showSpinner = false;
        }
    }
    deleteAttachment(paso, index) {
        paso.anexos.splice(index, 1);
    }
    uploadFileGuia(event, guia) {
        this.showSpinner = true;
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.documentoService.guardarDocumento(element)
                .subscribe(documento => {
                this.showSpinner = false;
                if (guia.formularios)
                    guia.formularios.push(documento);
                else
                    guia.formularios = [documento];
            }, error => this.handleException(error));
        }
    }
    deleteAttachmentGuia(index, guia) {
        guia.formularios.splice(index, 1);
    }
    obtenerArchivosEnPaso(paso) {
        return paso.anexos;
    }
    guardarGuia(guia) {
        this.showSpinner = true;
        this.puntosDeAtencion.forEach(puntoDeAtencion => {
            if (guia.puntosDeAtencion)
                [...guia.puntosDeAtencion, puntoDeAtencion.punto];
            else
                guia.puntosDeAtencion = guia.puntosDeAtencion = [puntoDeAtencion.punto];
        });
        const guiaAGuardar = new GuiaDeTramite(guia.id ? guia.id : '', guia.titulo ? guia.titulo : '', guia.descripcion ? guia.descripcion : '', guia.formularios ? guia.formularios : [], guia.pasos ? guia.pasos : [], this.categoria, guia.soporteLegal ? guia.soporteLegal : '', guia.puntosDeAtencion ? guia.puntosDeAtencion : []);
        this.guiasService.guardarGuia(guiaAGuardar)
            .subscribe(() => {
            this.showSpinner = false;
            this.toast.success('Se guardo la guia correctamente');
        }, error => {
            this.showSpinner = false;
            this.handleException(error);
        });
    }
    obtenerArchivosEnGuia(guia) {
        return guia.formularios;
    }
    actualizarDescripcion({ editor }, guia) {
        const data = editor.getData();
        guia.descripcion = data;
    }
    actualizarDescripcionEnPaso({ editor }, paso) {
        const data = editor.getData();
        paso.descripcion = data;
    }
    doAction(action, guia) {
        action === 'guardarGuia' ? this.guardarGuia(guia) : this.addPaso(guia);
    }
    cargarMultimedia(documento) {
        return documento.rutaDeDescarga;
    }
};
GuardarGuiaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-guardar-guia',
        templateUrl: './guardar-guia.component.html',
        styleUrls: ['./guardar-guia.component.css']
    })
], GuardarGuiaComponent);
export { GuardarGuiaComponent };
//# sourceMappingURL=guardar-guia.component.js.map