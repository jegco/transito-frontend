export class Documento {
    constructor(
        public id: string,
        public nombre: string,
        public archivo: string,
        public fechaCreacion: string,
        public fechaActualizacion: string,
        public rutaDeDescarga: string) { }
}
