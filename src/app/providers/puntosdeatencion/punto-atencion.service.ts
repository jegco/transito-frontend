import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PuntoAtencion } from 'src/app/models/PuntoAtencion';
import { concatAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuntoAtencionService {

  url: string = ENV.serverUrl + '/puntoDeAtencion';

  constructor(private readonly http: HttpService) { }

  obtenerPuntosDeAtencion(): Observable<PuntoAtencion> {
    return this.http.get<PuntoAtencion[]>(this.url)
    .pipe(
      concatAll()
    );
  }

  guardarPuntoDeAtencion(puntosDeAtencion: PuntoAtencion[]): Observable<PuntoAtencion> {
    return this.http.post<PuntoAtencion[], PuntoAtencion>(this.url, puntosDeAtencion);
  }

  eliminarPuntoAtencion(puntoDeAtencion: PuntoAtencion): Observable<void> {
    return this.http.delete<PuntoAtencion>(this.url, puntoDeAtencion);
  }
}
