// ===============================================================================================================
// <copyright file="<http.service.ts>" company="Johnson Controls, Inc.">
// copyright (c) 2019.
//
// use or copying of all or any part of the document, except as permitted
// by the License Agreement is prohibited.
//
// </copyright>
// ===============================================================================================================
// <summary>
// wrapper service to call API"s.
// </summary>
// ===============================================================================================================

import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpRequest,
    HttpResponse,
    HttpParams,
    HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, filter, mergeMap, retry } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    static readonly httpFailureRetryCount: number = 1;

    private static isResponseEvent<T>(event: HttpEvent<T>): event is HttpResponse<T> {
        return event.type === HttpEventType.Response;
    }

    constructor(private readonly http: HttpClient) { }

    get<T = void>(url: string, params?: HttpParams): Observable<T> {
        return this.requestByUrl("GET", url, undefined, params);
    }

    post<TBody, TResult = void>(url: string, body: TBody, params?: HttpParams): Observable<TResult> {
        return this.requestByUrl("POST", url, body, params);
    }

    patch<TBody, TResult = void>(url: string, body: TBody, params?: HttpParams): Observable<TResult> {
        return this.requestByUrl("PATCH", url, body, params);
    }

    put<TBody, TResult = void>(url: string, body: TBody, params?: HttpParams): Observable<TResult> {
        return this.requestByUrl("PUT", url, body, params);
    }

    delete<TBody = void, T = void>(url: string, body?: TBody, params?: HttpParams): Observable<T> {
        return this.requestByUrl("DELETE", url, body, params);
    }

    head<T = void>(url: string, params?: HttpParams): Observable<T> {
        return this.requestByUrl("HEAD", url, undefined, params);
    }

    request<T = void>(request: HttpRequest<any>): Observable<T> {
        return this.handleResponse(
            this.http
                .request<T>(request)
                .pipe(filter(HttpService.isResponseEvent)));
    }

    private requestByUrl<TBody, TResult>(method: string, url: string, body?: TBody, params?: HttpParams): Observable<TResult> {
        const preparedBody = typeof body === "string"
            ? JSON.stringify(body)
            : body;
        return this.request(new HttpRequest(method, url, preparedBody, {
            responseType: "json",
            params: params,
            headers: new HttpHeaders({ "Content-Type": "application/json" , "Access-Control-Allow-Origin": "*"})
        }));
    }

    private handleResponse<T>(observable: Observable<HttpResponse<T>>): Observable<T> {
        return observable.pipe(mergeMap((response: HttpResponse<T>) => of(response.body)))
            .pipe(retry(HttpService.httpFailureRetryCount))
    }

    getResource<T = void>(url: string, ...params: string[]): Observable<T> {
        return this.requestByUrl("GET", `${url}/${params.join('/')}`, undefined);
    }
}
