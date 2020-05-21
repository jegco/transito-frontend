import { Component, OnInit } from '@angular/core';
import { trigger, transition, keyframes, animate, state } from '@angular/animations';
import { keyframes as kf } from '../../animations/keyframes';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/providers/tipos/tipos.service';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { switchMap, defaultIfEmpty, catchError, map } from 'rxjs/operators';
import { Documento } from 'src/app/models/Documento';
import { Observable, of } from 'rxjs';
import { PreferenciasDeUsuario } from 'src/app/models/PreferenciasDeUsuario';
import { PreferenciasService } from 'src/app/providers/preferencias/preferencias.service';
import { Animacion } from 'src/app/models/Animacion';

@Component({
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
export class PreferenciasComponent extends BaseComponent implements OnInit {

  preferencias$: Observable<PreferenciasDeUsuario>;
  colorPrimarioToggle = false;
  colorSecundarioToggle = false;
  iconoUrl = '../../../assets/img/DATT.png';
  icono: Blob;
  animacionesDisponibles = Object.keys(kf);
  tipos: Tipo[];
  nombre = '';

  constructor(public readonly router: Router
    , public readonly errorService: ErrorService
    , public readonly toast: ToastrService
    , private readonly tiposService: TiposService
    , private readonly documentosService: DocumentosService
    , private readonly preferenciasService: PreferenciasService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.tiposService.buscarTipos().subscribe(tipos => {
      this.tipos = tipos;
    }, error => this.handleException(error));

    this.preferencias$ = this.preferenciasService.buscarPreferencias()
    .pipe(
      map(preferencia => {
        if (!preferencia) return new PreferenciasDeUsuario('', '', '', new Animacion('', '', 0, 1000))
        return  preferencia;
      }),
      catchError(error => {
        this.handleException(error);
        return of(new PreferenciasDeUsuario('', '', '', new Animacion('', '', 0, 1000)));
      })
    );
  }

  cambiarAvatar = (file: any): void => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.iconoUrl = event.target.result;
    }

    this.icono = file[0];

    reader.readAsDataURL(this.icono);
  }

  guardarTipo = (): void => {
    if (this.icono && this.nombre) {
      this.documentosService.guardarDocumento(this.icono)
        .pipe(
          switchMap(documento => {
            return this.tiposService.guardarTipo(new Tipo('', this.nombre, documento))
          })
        ).subscribe((tipo: Tipo) => {
          this.toast.success('nueva categoria guardada con exito');
          this.tipos = [...this.tipos, tipo];
        }, error => this.handleException(error));
    } else {
      this.toast.error('debes añadir todos los datos');
    }
  }

  cargarMultimedia = (documento: Documento): string => {
    return documento.rutaDeDescarga;
  }

  eliminarTipo = (index: number): void => {
    this.tiposService.eliminarTipo(this.tipos[index])
    .subscribe(() => {
      this.tipos.splice(index, 1);
      this.toast.success('categoria eliminada exitosamente')
    },
    error => this.handleException(error));
  }

  guardarPreferencias = (preferencia: PreferenciasDeUsuario) => {
    this.preferenciasService.guardarPreferencias(preferencia)
    .subscribe(() => this.toast.success('Preferencias de usuario guardadas exitosamente'), 
    error => this.handleException(error));
  }

}
