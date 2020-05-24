import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { trigger, transition, keyframes, animate } from '@angular/animations';
import { keyframes as kf } from '../../animations/keyframes';
import { BaseComponent } from '../base/base.component';
import { Tipo } from 'src/app/models/Tipo';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PreferenciasDeUsuario } from 'src/app/models/PreferenciasDeUsuario';
import { Animacion } from 'src/app/models/Animacion';
let PreferenciasComponent = class PreferenciasComponent extends BaseComponent {
    constructor(router, errorService, toast, tiposService, documentosService, preferenciasService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.tiposService = tiposService;
        this.documentosService = documentosService;
        this.preferenciasService = preferenciasService;
        this.colorPrimarioToggle = false;
        this.colorSecundarioToggle = false;
        this.iconoUrl = '../../../assets/img/DATT.png';
        this.animacionesDisponibles = Object.keys(kf);
        this.nombre = '';
        this.cambiarAvatar = (file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.iconoUrl = event.target.result;
            };
            this.icono = file[0];
            reader.readAsDataURL(this.icono);
        };
        this.guardarTipo = () => {
            if (this.icono && this.nombre) {
                this.documentosService.guardarDocumento(this.icono)
                    .pipe(switchMap(documento => {
                    return this.tiposService.guardarTipo(new Tipo('', this.nombre, documento));
                })).subscribe((tipo) => {
                    this.toast.success('nueva categoria guardada con exito');
                    this.tipos = [...this.tipos, tipo];
                }, error => this.handleException(error));
            }
            else {
                this.toast.error('debes añadir todos los datos');
            }
        };
        this.cargarMultimedia = (documento) => {
            return documento.rutaDeDescarga;
        };
        this.eliminarTipo = (index) => {
            this.tiposService.eliminarTipo(this.tipos[index])
                .subscribe(() => {
                this.tipos.splice(index, 1);
                this.toast.success('categoria eliminada exitosamente');
            }, error => this.handleException(error));
        };
        this.guardarPreferencias = (preferencia) => {
            this.preferenciasService.guardarPreferencias(preferencia)
                .subscribe(() => this.toast.success('Preferencias de usuario guardadas exitosamente'), error => this.handleException(error));
        };
    }
    ngOnInit() {
        this.tiposService.buscarTipos().subscribe(tipos => {
            this.tipos = tipos;
        }, error => this.handleException(error));
        this.preferencias$ = this.preferenciasService.buscarPreferencias()
            .pipe(map(preferencia => {
            if (!preferencia)
                return new PreferenciasDeUsuario('', '', '', new Animacion('', '', 0, 1000));
            return preferencia;
        }), catchError(error => {
            this.handleException(error);
            return of(new PreferenciasDeUsuario('', '', '', new Animacion('', '', 0, 1000)));
        }));
    }
};
PreferenciasComponent = tslib_1.__decorate([
    Component({
        selector: 'app-preferencias',
        templateUrl: './preferencias.component.html',
        styleUrls: ['./preferencias.component.css'],
        animations: [
            trigger('animacion', [
                transition('* => swing', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.swing)), { params: { delay: 10, time: 1000 } }),
                transition('* => bounce', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.bounce)), { params: { delay: 10, time: 1000 } }),
                transition('* => scale', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.scale)), { params: { delay: 10, time: 1000 } }),
                transition('* => translate', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.translate)), { params: { delay: 10, time: 1000 } })
            ])
        ]
    })
], PreferenciasComponent);
export { PreferenciasComponent };
//# sourceMappingURL=preferencias.component.js.map