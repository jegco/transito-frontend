import { Documento } from './Documento';

export class Paso {
    constructor(
        public titulo: string,
        public descripcion: string,
        public anexo: Documento
    ) { }
}
