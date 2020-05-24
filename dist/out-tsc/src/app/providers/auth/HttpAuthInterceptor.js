export class HttpAuthInterceptor {
    intercept(request, next) {
        const token = localStorage.getItem('token');
        let req = request;
        if (token) {
            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
//# sourceMappingURL=HttpAuthInterceptor.js.map