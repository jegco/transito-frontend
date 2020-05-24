var HttpService_1;
import * as tslib_1 from "tslib";
import { HttpEventType, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { filter, mergeMap, retry } from "rxjs/operators";
let HttpService = HttpService_1 = class HttpService {
    constructor(http) {
        this.http = http;
    }
    static isResponseEvent(event) {
        return event.type === HttpEventType.Response;
    }
    get(url, params) {
        return this.requestByUrl("GET", url, undefined, params);
    }
    post(url, body, params) {
        return this.requestByUrl("POST", url, body, params);
    }
    patch(url, body, params) {
        return this.requestByUrl("PATCH", url, body, params);
    }
    put(url, body, params) {
        return this.requestByUrl("PUT", url, body, params);
    }
    delete(url, body, params) {
        return this.requestByUrl("DELETE", url, body, params);
    }
    head(url, params) {
        return this.requestByUrl("HEAD", url, undefined, params);
    }
    request(request) {
        return this.handleResponse(this.http
            .request(request)
            .pipe(filter(HttpService_1.isResponseEvent)));
    }
    requestByUrl(method, url, body, params) {
        const preparedBody = typeof body === "string"
            ? JSON.stringify(body)
            : body;
        return this.request(new HttpRequest(method, url, preparedBody, {
            responseType: "json",
            params: params,
            headers: new HttpHeaders({ "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" })
        }));
    }
    handleResponse(observable) {
        return observable.pipe(mergeMap((response) => of(response.body)))
            .pipe(retry(HttpService_1.httpFailureRetryCount));
    }
    getResource(url, ...params) {
        return this.requestByUrl("GET", `${url}/${params.join('/')}`, undefined);
    }
    postMultipart(url, body, params) {
        const preparedBody = new FormData();
        preparedBody.append('file', body);
        return this.request(new HttpRequest("POST", url, preparedBody, {
            responseType: "json",
            params: params,
            headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*" })
        }));
    }
    getBlob(url) {
        return this.http.get(url, { responseType: 'blob' });
    }
};
HttpService.httpFailureRetryCount = 1;
HttpService = HttpService_1 = tslib_1.__decorate([
    Injectable({
        providedIn: "root"
    })
], HttpService);
export { HttpService };
//# sourceMappingURL=http.service.js.map