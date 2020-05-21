import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { environment as ENV } from '../../../environments/environment';
import { PreferenciasDeUsuario } from 'src/app/models/PreferenciasDeUsuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferenciasService {

  url: string = ENV.serverUrl + '/preferencias';

  constructor(private readonly http: HttpService) { }

  buscarPreferencias = (): Observable<PreferenciasDeUsuario> => {
    return this.http.get<PreferenciasDeUsuario>(this.url);
  }

  guardarPreferencias = (preferenciasDeUsuario: PreferenciasDeUsuario): Observable<PreferenciasDeUsuario> => {
    return this.http.post<PreferenciasDeUsuario, PreferenciasDeUsuario>(this.url, preferenciasDeUsuario);
  }
}
