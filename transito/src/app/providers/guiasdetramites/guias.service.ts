import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';

@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  url: string = ENV.serverUrl + '/guias';

  constructor(private readonly http: HttpService) { }

  guardarGuia(guia: GuiaDeTramite): Observable<GuiaDeTramite> {
    return this.http.post<GuiaDeTramite, GuiaDeTramite>(this.url, guia);
  }

  buscarGuias(): Observable<GuiaDeTramite[]> {
    return this.http.get<GuiaDeTramite[]>(this.url);
  }

  buscarGuiaPorTitulo(titulo: string): Observable<GuiaDeTramite> {
    return this.http.getResource<GuiaDeTramite>(`${this.url}/titulo`, titulo);
  }

  eliminarGuia(guia: GuiaDeTramite): Observable<void> {
    return this.http.delete<GuiaDeTramite, void>(this.url, guia);
  }
}
