import { Documento } from './Documento';

export class Tipo {
    constructor(public id: string,
        public nombre: string,
        public icono: Documento) {}
}