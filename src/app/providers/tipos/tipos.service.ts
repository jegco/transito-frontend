import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { Tipo } from 'src/app/models/Tipo';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  url: string = ENV.serverUrl + '/tipos';

  constructor(private readonly http: HttpService) { }

  buscarTipos = (): Observable<Tipo[]> => {
    return this.http.get<Tipo[]>(this.url);
  }

  guardarTipo = (tipo: Tipo): Observable<Tipo> => {
    return this.http.post<Tipo, Tipo>(this.url, tipo);
  }

  eliminarTipo = (tipo: Tipo): Observable<boolean> => {
    return this.http.delete<Tipo, boolean>(this.url, tipo);
  }
}
