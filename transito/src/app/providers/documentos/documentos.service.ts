import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs';
import { Documento } from 'src/app/models/Documento';
import { Page } from 'src/app/models/Page';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  url: string = `${ENV.serverUrl}/documentos`;
  resourceUrl: string = `${this.url}/resources`;

  constructor(private readonly http: HttpService) { }

  guardarDocumentos(documentos: any[]): Observable<Documento[]> {
    return this.http.postMultipart<any[], Documento[]>(this.url, documentos);
  }

  guardarDocumento(documentos: any): Observable<Documento> {
    return this.http.postMultipart<any, Documento>(this.url, documentos);
  }

  buscarDocumentos(): Observable<Page<Documento>> {
    return this.http.get<Documento[]>(this.url).pipe(map(documentos =>  new Page<Documento>(documentos)));
  }

  buscarDocumentoPorNombre(nombre: string): Observable<Documento> {
    return this.http.getResource<Documento>(this.url, nombre);
  }

  eliminarDocumento(documento: Documento): Observable<void> {
    return this.http.delete<Documento>(this.url, documento);
  }
}
