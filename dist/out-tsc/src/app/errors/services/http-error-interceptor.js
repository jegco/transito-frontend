import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
export class HttpErrorInterceptor {
    intercept(request, next) {
        return next.handle(request)
            .pipe(retry(1), catchError((error) => {
            return throwError(error);
        }));
    }
}
//# sourceMappingURL=http-error-interceptor.js.map