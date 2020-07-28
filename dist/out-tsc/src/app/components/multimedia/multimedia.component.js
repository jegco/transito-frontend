import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
let MultimediaComponent = class MultimediaComponent {
    constructor(documentosService) {
        this.documentosService = documentosService;
        this.loading = true;
        this.showModal = () => {
            this.modalRef.nativeElement.style.display = 'block';
        };
        this.closeModal = () => {
            this.modalRef.nativeElement.style.display = 'none';
        };
        this.descargarArchivo = (documento) => {
            this.documentosService.descargarDocumento(documento).subscribe(data => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = documento.nombre;
                link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                setTimeout(() => {
                    window.open(url);
                    link.remove();
                }, 100);
            });
        };
    }
    ngOnInit() {
        this.image = this.anexo.rutaDeDescarga;
        this.loadingStyle = `rotate`;
    }
    onLoad() {
        this.loading = false;
    }
};
tslib_1.__decorate([
    Input()
], MultimediaComponent.prototype, "anexo", void 0);
tslib_1.__decorate([
    ViewChild('modal', { static: false })
], MultimediaComponent.prototype, "modalRef", void 0);
MultimediaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-multimedia',
        templateUrl: './multimedia.component.html',
        styleUrls: ['./multimedia.component.css']
    })
], MultimediaComponent);
export { MultimediaComponent };
//# sourceMappingURL=multimedia.component.js.map