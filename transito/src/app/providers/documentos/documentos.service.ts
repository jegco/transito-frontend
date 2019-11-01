import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpService } from '../base/http.service';
import { Observable, of } from 'rxjs';
import { Documento } from 'src/app/models/Documento';
import { Paso } from 'src/app/models/Paso';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  url: string = ENV.serverUrl + '/documentos';

  constructor(private readonly http: HttpService) { }

  guardarDocumentos(documentos: any[]): Observable<Documento[]> {
    return this.http.postMultipart<any[], Documento[]>(this.url, documentos);
  }

  guardarDocumento(documentos: any): Observable<Documento> {
    return this.http.postMultipart<any, Documento>(this.url, documentos);
  }
}
