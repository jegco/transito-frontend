import { Documento } from './Documento';
import { Paso } from './Paso';

export class GuiaDeTramite {
    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public formularios: Documento[],
        public pasos: Paso[],
        public tipo: string
    ) { }
}